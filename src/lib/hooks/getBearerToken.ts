import { unsealAPI } from '@lib/api-seal';
import { NextApiRequest } from 'next';
import { IncomingMessage } from 'node:http';

export const getBearerToken = (req: IncomingMessage | NextApiRequest) => {
  const token = req.headers.authorization;

  if (!token) return null;

  return unsealAPI(token.substr(7));
};
