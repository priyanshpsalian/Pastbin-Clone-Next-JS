import { UserProfile } from '@auth0/nextjs-auth0';

import { ApiProps, ApiRefProps } from '@utils/interfaces/api';
import { sealAPI } from './api-seal';
import { adminClient, q } from './fauna';
import { obtainFaunaDBToken } from './models/userAuth';

const { If, Exists, Match, Index, Create, Collection, Get, Select } = q;

const CreateUserIfNotExists = (user: UserProfile) => {
  return adminClient.query(
    If(
      Exists(Match(Index('user_by_id'), user.sub)),
      true,
      Create(Collection('users'), {
        data: {
          user: user.sub,
          picture: user.picture,
          name: user.name
        }
      })
    )
  );
};

const CreateApiKeyIfNotExists = async (token: string, usersub: string): Promise<string> => {
  // (was supposed to be) CurrentIdentity won't work for this case since
  //  token changes every user login.
  const exists = await adminClient
    .query(Get(Match(Index('apiByUserSub'), usersub)))
    .then((r: ApiRefProps) => r.data.key)
    .catch(() => undefined);

  if (exists) return exists;

  const tk = await obtainFaunaDBToken(usersub);
  const api = sealAPI(tk);

  return await adminClient
    .query(
      Create(Collection('apis'), {
        data: <ApiProps>{
          owner: Select('ref', Get(Match(Index('user_by_id'), usersub))),
          user: usersub,
          key: api
        }
      })
    )
    .then(() => api)
    .catch((e) => {
      console.error(e);
      return '';
    });
};

export { CreateUserIfNotExists, CreateApiKeyIfNotExists };
