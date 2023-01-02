/*
  NOTE: /api/auth/[...auth] -> nextjs-auth0 api router handler
*/

import { AfterCallback, getSession, handleAuth, handleCallback, handleLogout, Session } from '@auth0/nextjs-auth0';
import { invalidateFaunaDBToken, obtainFaunaDBToken } from '@lib/models/userAuth';
import { CreateApiKeyIfNotExists, CreateUserIfNotExists } from '@lib/userExists';
import { NextApiRequest, NextApiResponse } from 'next';

/* get the user's token and add it to the session.user */
const afterCallback: AfterCallback = async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
  return await CreateUserIfNotExists(session.user).then(async () => {
    const token = await obtainFaunaDBToken(session.user.sub);
    const api_key = await CreateApiKeyIfNotExists(token, session.user.sub);

    session.user.token = token;
    session.user.api_key = api_key;

    return session;
  });
};

export default handleAuth({
  async callback(req: NextApiRequest, res: NextApiResponse) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },

  /* custom logout, invalidate user token */
  async logout(req, res) {
    try {
      const session = getSession(req, res);
      if (session) {
        let logout = await invalidateFaunaDBToken(session.user.token);
        if (logout) {
          logout = null;
        }
      }
      await handleLogout(req, res);
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  }
});
