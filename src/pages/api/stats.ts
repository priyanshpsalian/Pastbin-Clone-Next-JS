/*
  NOTE: /api/pastes/stats -> returns the app's data statistics
*/

import type { NextApiRequest, NextApiResponse } from 'next';

import methodHandler from '@lib/middleware/methods';
import { Stats } from '@lib/models/stats';

import { GetStatsQuery } from '@utils/interfaces/query';

export type ApiGetStats = GetStatsQuery;

const getStats = async (req: NextApiRequest, res: NextApiResponse<ApiGetStats>) => {
  const q = await Stats.getStats();

  res.status(q.code).json(q);
};

export default methodHandler(getStats, ['GET']);
