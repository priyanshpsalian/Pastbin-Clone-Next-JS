// vased from:: https://github.com/TheBoringDude/nextjs-fauna-auth0/blob/main/src/fauna/models/user-model.ts

import { adminClient, getClient, q } from '@lib/fauna';
import { ObjectProps } from '@utils/interfaces/query';

type GetTokenRespProps = {
  ref: ObjectProps;
  ts: number;
  instance: ObjectProps;
  secret: string;
};

const obtainFaunaDBToken = async (user: string): Promise<string | undefined> => {
  return adminClient
    .query(
      q.Create(q.Tokens(), {
        instance: q.Select('ref', q.Get(q.Match(q.Index('user_by_id'), user)))
      })
    )
    .then((res: GetTokenRespProps) => res?.secret) // return only the secret
    .catch((e) => {
      console.error(e);
      return undefined;
    });
};

const invalidateFaunaDBToken = async (token: string) => {
  // NOTE: setting to true will logout all tokens (with the defined user api key)
  return await getClient(token).query(q.Logout(false));
};

export { obtainFaunaDBToken, invalidateFaunaDBToken };
