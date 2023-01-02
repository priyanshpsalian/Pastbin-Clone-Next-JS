/*
  NOTE: /api/pastes/create -> endpoint for creating a paste
*/

import { errParseBody } from '@lib/body-parse';
import { getCodeLanguage } from '@lib/code';
import { getUser } from '@lib/hooks/getUser';
import { getTokenAPI } from '@lib/hooks/useTokenAPI';
import methodHandler from '@lib/middleware/methods';
import { PasteModel } from '@lib/models/paste';
import { schemaValidate } from '@lib/validate';
import { ApiCreatePasteBody, Paste } from '@utils/interfaces/paste';
import { CreatePasteQuery, QueryErrorResponse } from '@utils/interfaces/query';
import { ApiCreateBodySchema } from '@utils/schema/createBody';
import type { NextApiRequest, NextApiResponse } from 'next';

export type ApiCreatePasteResponse = CreatePasteQuery;
type ValidateCreateProps = { rdata: ApiCreatePasteBody; ok: boolean; err?: QueryErrorResponse };

// MAIN API
const createPaste = async (req: NextApiRequest, res: NextApiResponse<ApiCreatePasteResponse>) => {
  try {
    // console.log('server2');
    // get and check `post data` first
    const { rdata, ok, err } = await getPostCreateData(req);
    console.log(rdata,"rdata");
    
    if (!ok) {
      res.status(err.code).json(err);
      return;
    }
    
    const token = getTokenAPI(req, res);
    // console.log('yaha');
    const { isUser, name } = await handleUser(req, res);
     
     
    const data: Paste = {
      createdDate: new Date().toISOString(),
      isCode: true,
      codeLanguage: getCodeLanguage(rdata.filename),
      // pasteId: nanoid(50),
      pasteId: rdata.filename,
      isOwnedByUser: isUser,
      ownedByUsername: name,
      willExpire: !!rdata.expiryDate,
      ...rdata
    };

    const p = new PasteModel(token);
    const q = await p.createPaste(data, isUser);

    res.status(q.code).json(q);
    
  } catch (error) {
    console.log(error,"jj");
    
    
  }
  
};

const handleUser = async (req: NextApiRequest, res: NextApiResponse): Promise<{ isUser: boolean; name: string }> => {
  try {
    console.log('server');

    const { isAnonymous } = req.query;
    if (isAnonymous === 'true') {
      return {
        isUser: false,
        name: 'anonymous'
      };
    }

    const { isUser, name } = await getUser(req, res);
    return { isUser, name };
    
  } catch (e) {
    console.log(e,"server error");
    
    
  }
  
};

// Getter and Validator for req.body
const getPostCreateData = async (req: NextApiRequest): Promise<ValidateCreateProps> => {
  console.log('server3');
  const d: ApiCreatePasteBody = req.body;

  const r = await schemaValidate(ApiCreateBodySchema, d);
  if (r.error) {
    return errParseBody(r.message);
  }

  return { rdata: r.result, ok: true };
};

export default methodHandler(createPaste, ['PUT', 'POST']);
