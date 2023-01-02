/*
  NOTE: /api/pastes/delete/[refid] -> deletes the paste using it's refId
*/

import type { NextApiRequest, NextApiResponse } from 'next';

import { joinString } from '@ootiq/blank';

import methodHandler from '@lib/middleware/methods';
import { withCustomSessionHandler } from '@lib/middleware/customHandleSession';

import { DeletePasteQuery } from '@utils/interfaces/query';

import { RemovePasteHandler } from '@functions/removePaste';

const deletePaste = async (req: NextApiRequest, res: NextApiResponse<DeletePasteQuery>) => {
  const { refid } = req.query;

  const q = await RemovePasteHandler(req, res, joinString(refid));

  res.status(q.code).json(q);
};

export default methodHandler(withCustomSessionHandler(deletePaste), ['DELETE']);
