/*
  NOTE: /api/pastes/get/ref/[refid] -> returns the paste data, if only the user is logged in.
*/

import type { NextApiRequest, NextApiResponse } from 'next';

import { joinString } from '@ootiq/blank';

import { PasteModel } from '@lib/models/paste';
import methodHandler from '@lib/middleware/methods';
import { getTokenAPI } from '@lib/hooks/useTokenAPI';
import { withCustomSessionHandler } from '@lib/middleware/customHandleSession';

import { ApiBaseQueryResponse } from '@utils/interfaces/query';
import { Paste } from '@utils/interfaces/paste';

export interface ApiGetPasteRefResponse extends ApiBaseQueryResponse<Paste> {
  isOwnedByCurrentUser?: boolean;
}

const getPasteRef = async (req: NextApiRequest, res: NextApiResponse<ApiGetPasteRefResponse>) => {
  const { refid } = req.query;

  const p = new PasteModel(getTokenAPI(req, res));
  const q = await p.getPasteByRef(joinString(refid));

  if (q.error) {
    res.status(q.code).json(q);
    return;
  }

  const isOwnedByCurrentUser = await p.verifyPasteByUserRef(q.data.user);

  res.status(200).json({ ...q, isOwnedByCurrentUser });
};

export default methodHandler(withCustomSessionHandler(getPasteRef), ['GET']);
