/*
  NOTE: /api/pastes/get/[pasteid] -> returns the paste's data using the pasteId
*/

import type { NextApiRequest, NextApiResponse } from 'next';

import { joinString } from '@ootiq/blank';

import methodHandler from '@lib/middleware/methods';

import { GetPasteByIdQuery } from '@utils/interfaces/query';

import { GetPasteHandler } from '@functions/getPaste';

const getPaste = async (req: NextApiRequest, res: NextApiResponse<GetPasteByIdQuery>) => {
console.log("get paste");

  
  const { pasteid } = req.query;
  
  const q = await GetPasteHandler(req, res, joinString(pasteid));
  
  
  res.status(q.code).json(q);
};

export default methodHandler(getPaste, ['GET']);
