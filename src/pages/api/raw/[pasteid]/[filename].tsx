/*
  NOTE: /api/raw/[pasteid]/[filename] -> returns the raw content of the paste
*/

import type { NextApiRequest, NextApiResponse } from 'next';

import { joinString } from '@ootiq/blank';

import { PasteModel } from '@lib/models/paste';
import { GetRawPasteQuery } from '@utils/interfaces/query';
import { getTokenAPI } from '@lib/hooks/useTokenAPI';
import methodHandler from '@lib/middleware/methods';

type ApiGetRawPaste = GetRawPasteQuery;

const getRawPaste = async (req: NextApiRequest, res: NextApiResponse<ApiGetRawPaste>) => {
  const { pasteid, filename } = req.query;

  const p = new PasteModel(getTokenAPI(req, res));
  const q = await p.getRawPasteContentOnly(joinString(pasteid), joinString(filename));

  if (q.error) {
    res.status(q.code).json(q);
    return;
  }

  res.status(200).end(q.data.content);
};

export default methodHandler(getRawPaste, ['GET']);
