import { ApiBaseQueryResponse, QueryErrorResponse } from '@utils/interfaces/query';
import { errors } from 'faunadb';

const getQueryError = (e: errors.FaunaHTTPError): QueryErrorResponse => {
  const r = e.requestResult;

  return {
    error: true,
    description: e.description,
    code: r ? r.statusCode : 500
  };
};

// unsure about this
const getQuery = <T>(data: T): ApiBaseQueryResponse<T> => {
  return {
    error: false,
    code: 200,
    data: data
  };
};

export { getQuery, getQueryError };
