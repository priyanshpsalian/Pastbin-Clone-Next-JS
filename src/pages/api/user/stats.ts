/*
  NOTE: /api/user/sstats -> returns the app's data statistics
*/

import type { NextApiRequest, NextApiResponse } from 'next';

import methodHandler from '@lib/middleware/methods';
import { Stats } from '@lib/models/stats';

import { getTokenAPI } from '@lib/hooks/useTokenAPI';
import { getUser } from '@lib/hooks/getUser';

const getStats = async (req: NextApiRequest, res: NextApiResponse) => {
  const { isUser } = await getUser(req, res);

  if (!isUser) {
    res.status(403).json({
      error: true,
      code: 403,
      description: 'Invalid user token!'
    });
    return;
  }

  const token = getTokenAPI(req, res);

  const p = new Stats(token);
  const q = await p.getUserStats();

  res.status(q.code).json(q);
};

export default methodHandler(getStats, ['GET']);
