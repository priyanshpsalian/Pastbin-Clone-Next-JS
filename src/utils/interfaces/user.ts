import { UserProfile } from '@auth0/nextjs-auth0';
import { Expr } from 'faunadb';

interface UserCustomSessionProps extends UserProfile {
  token?: string;
  api_key?: string;
}
type SessionProps = { user: UserCustomSessionProps };

interface UserDataProps {
  user: string;
  picture: string;
  name: string;
}
interface UserDataRefProps {
  ref: Expr;
  ts: number;
  data: UserDataProps;
}

export type { UserCustomSessionProps, SessionProps, UserDataProps, UserDataRefProps };
