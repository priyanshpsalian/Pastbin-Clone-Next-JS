import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingMessage, ServerResponse } from 'node:http';

import { PasteModel } from '@lib/models/paste';
import { getTokenAPI } from '@lib/hooks/useTokenAPI';

export const GetLatestPasteHandler = async (
  req: NextApiRequest | IncomingMessage,
  res: NextApiResponse | ServerResponse
) => {
  const p = new PasteModel(getTokenAPI(req, res));

  return await p.getLatestPastes();
};
