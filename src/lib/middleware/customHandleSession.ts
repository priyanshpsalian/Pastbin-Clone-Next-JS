// rebased from:: https://github.com/auth0/nextjs-auth0/blob/main/src/helpers/with-api-auth-required.ts

import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { getSession } from '@auth0/nextjs-auth0';

import { getBearerToken } from '@lib/hooks/getBearerToken';
import { getTokenAPI } from '@lib/hooks/useTokenAPI';
import { isTokenPublic } from '@lib/isToken';

/* this is a custom session handler */
export const withCustomSessionHandler =
  (handler: NextApiHandler, availablePublic = false) =>
  (req: NextApiRequest, res: NextApiResponse) => {
    // checks and requires the use of another token
    if (!availablePublic) {
      const token = getTokenAPI(req, res);

      if (isTokenPublic(token)) {
        res.status(401).json({
          error: true,
          description: 'Unauthorized access.'
        });
        return;
      }
    }

    const bearerToken = getBearerToken(req);

    if (!bearerToken) {
      const session = getSession(req, res);

      if (!session || !session.user) {
        res.status(401).json({
          error: 'not_authenticated',
          description: 'The user does not have an active session or is not authenticated'
        });
        return;
      }
    }

    return handler(req, res);
  };
