import { NextApiRequest, NextApiResponse } from 'next';

import { getSession } from '@auth0/nextjs-auth0';

import { UserModel } from '@lib/models/user';
import { getBearerToken } from './getBearerToken';

type GetUserProps = {
  isUser: boolean;
  name: string;
};

const getUserFromToken = async (token: string) => {
  const u = new UserModel(token);
  const user = await u.getUser();

  return user;
};

const getUser = async (req: NextApiRequest, res: NextApiResponse): Promise<GetUserProps> => {
  const bearerToken = getBearerToken(req);
  if (bearerToken) {
    const user = await getUserFromToken(bearerToken);
    if (user) {
      return {
        isUser: true,
        name: user.data.name
      };
    }
  }

  const session = getSession(req, res);
  if (session) {
    return {
      isUser: true,
      name: session.user.name
    };
  }

  // default username for public users
  return {
    isUser: false,
    name: 'anonymous'
  };
};

export { getUser };
