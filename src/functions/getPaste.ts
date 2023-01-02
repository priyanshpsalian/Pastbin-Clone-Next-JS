import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingMessage, ServerResponse } from 'node:http';

import { getTokenAPI } from '@lib/hooks/useTokenAPI';
import { PasteModel } from '@lib/models/paste';

export const GetPasteHandler = async (
  req: NextApiRequest | IncomingMessage,
  res: NextApiResponse | ServerResponse,
  pasteid: string
) => {
  const p = new PasteModel(getTokenAPI(req, res));

  return await p.getPaste(pasteid);
};
