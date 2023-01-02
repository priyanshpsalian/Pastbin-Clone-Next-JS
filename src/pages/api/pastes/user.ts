/*
  NOTE: /api/user/pastes -> returns the current user's pastes
*/

import type { NextApiRequest, NextApiResponse } from 'next';
import methodHandler from '@lib/middleware/methods';
import { PasteModel } from '@lib/models/paste';
import { getTokenAPI } from '@lib/hooks/useTokenAPI';
import { GetUserPastesQuery } from '@utils/interfaces/query';
import { withCustomSessionHandler } from '@lib/middleware/customHandleSession';

const getUserPastes = async (req: NextApiRequest, res: NextApiResponse<GetUserPastesQuery>) => {
  const p = new PasteModel(getTokenAPI(req, res));
  const q = await p.getUserPastes();

  res.status(q.code).json(q);
};

export default methodHandler(withCustomSessionHandler(getUserPastes), ['GET']);
