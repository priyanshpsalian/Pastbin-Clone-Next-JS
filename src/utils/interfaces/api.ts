import { Expr } from 'faunadb';
import { ObjectProps } from './query';

interface ApiProps {
  owner: ObjectProps | Expr; // a reference
  user: string; // user.sub
  key: string;
}

interface ApiRefProps {
  ref: ObjectProps;
  ts: number;
  data: ApiProps;
}

export type { ApiProps, ApiRefProps };
