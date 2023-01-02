import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingMessage, ServerResponse } from 'node:http';

import { getTokenAPI } from '@lib/hooks/useTokenAPI';
import { PasteModel } from '@lib/models/paste';

export const RemovePasteHandler = async (
  req: NextApiRequest | IncomingMessage,
  res: NextApiResponse | ServerResponse,
  refid: string
) => {
  const p = new PasteModel(getTokenAPI(req, res));
  const q = await p.deletePasteByRef(refid);

  return q;
};
