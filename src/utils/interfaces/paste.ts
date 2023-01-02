import { Expr } from 'faunadb';
import { ObjectProps } from './query';

// paste info data
export interface Paste {
  content: string;
  filename: string;
  description: string;
  isPrivate: boolean;
  isCode?: boolean;
  codeLanguage?: null | string;
  pasteId?: string;
  isOwnedByUser: boolean;
  ownedByUsername: string;
  user?: Expr | ObjectProps;
  willExpire?: boolean;
  expiryDate?: string;
  createdDate: string;
  updated?: boolean;
  updatedDate?: string;
}

export interface UpdatePaste {
  filename?: string;
  content?: string;
  description?: string;
  isPrivate?: boolean;
  isCode?: boolean;
  codeLanguage?: null | string;
  willExpire?: boolean;
  expiryDate?: string;
  updated?: boolean;
  updatedDate?: string;
}

// user paste basic data
export interface PasteUserData {
  sub: string;
  subId: string;
  name: string;
  photo: string;
}

// fields need to be defined in req.body
export interface ApiCreatePasteBody {
  filename: string;
  content: string;
  description: string;
  isPrivate: boolean;
  expiryDate: string;
}

// fields needed for req.body in update
export interface ApiUpdatePasteBody {
  filename: string;
  content: string;
  description: string;
  isPrivate: boolean;
  expiryDate: string;
}

// fields for the indec router.query
export interface RouterPasteQueryData {
  filename: string;
  description: string;
  content: string;
}
