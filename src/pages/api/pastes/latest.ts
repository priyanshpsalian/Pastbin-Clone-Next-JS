/*
  NOTE: /api/pastes/latest -> returns all of the latest public pastes
*/

import type { NextApiRequest, NextApiResponse } from 'next';
import methodHandler from '@lib/middleware/methods';
import { GetLatestPastesQuery } from '@utils/interfaces/query';
import { GetLatestPasteHandler } from '@functions/getLatest';

const getLatest = async (req: NextApiRequest, res: NextApiResponse<GetLatestPastesQuery>) => {
  const q = await GetLatestPasteHandler(req, res);

  res.status(q.code).json(q);
};

export default methodHandler(getLatest, ['GET']);
