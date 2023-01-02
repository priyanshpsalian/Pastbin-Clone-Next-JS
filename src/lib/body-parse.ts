import { QueryErrorResponse } from '@utils/interfaces/query';

interface ErrParseBodyProps {
  rdata: null;
  ok: boolean;
  err: QueryErrorResponse;
}

const errParseBody = (description: string, code = 400): ErrParseBodyProps => {
  return {
    rdata: null,
    ok: false,
    err: {
      error: code === 400,
      code: code,
      description: description
    }
  };
};

export { errParseBody };
