import { Paste } from './paste';
import { UserDataProps } from './user';

type ObjectProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

interface QueryResponse {
  ref: ObjectProps;
  ts: number;
}

interface PasteQueryResponse extends QueryResponse {
  data: Paste;
}

type MultiplePastesQuery = {
  data: PasteQueryResponse[];
};

interface RawPaste {
  content: string;
  filename: string;
}

// query responses
interface GetPasteResponse {
  id?: number;
  paste: Paste;
  user: UserDataProps;
}

interface BaseQuery<T> {
  error: boolean;
  code: number;
  description?: string;
  data?: T;
}

type QueryErrorResponse = BaseQuery<null>;

// api/pastes/get/[pasteid]
type GetPasteByIdQuery = BaseQuery<GetPasteResponse>;

// api/pastes/get/ref/[refid]
type GetPasteByRefQuery = BaseQuery<Paste>;

// api/pastest/latest
type GetLatestPastesQuery = BaseQuery<PasteQueryResponse[]>;

// api/pastes/user
type GetUserPastesQuery = GetLatestPastesQuery;

// api/raw/[pasteid]/[filename]
type GetRawPasteQuery = BaseQuery<RawPaste>;

// /api/pastes/update/[refid]/[pasteid]
type UpdatePasteQuery = BaseQuery<Paste>;

// api/pastes/delete/[refid]
type DeletePasteQuery = BaseQuery<null>;

// api/pastes/create
type CreatePasteQuery = BaseQuery<Paste>;

// api/stats
interface BaseStatsProps {
  users: number;
  pastes: number;
}
type GetStatsQuery = BaseQuery<BaseStatsProps>;

// api/user/stats
interface UserPasteStatsProps {
  user: string;
  totalPastes: number;
}
type GetUserStatsQuery = BaseQuery<UserPasteStatsProps>;

// EXPORT
export type {
  ObjectProps,
  GetPasteResponse,
  PasteQueryResponse,
  GetRawPasteQuery,
  RawPaste,
  GetLatestPastesQuery,
  QueryErrorResponse,
  BaseQuery as ApiBaseQueryResponse,
  GetPasteByIdQuery,
  GetPasteByRefQuery,
  MultiplePastesQuery,
  GetUserPastesQuery,
  UpdatePasteQuery,
  DeletePasteQuery,
  CreatePasteQuery,
  GetStatsQuery,
  BaseStatsProps,
  UserPasteStatsProps,
  GetUserStatsQuery
};
