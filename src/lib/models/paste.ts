import { Client, errors, Expr } from 'faunadb';
import { getQuery, getQueryError } from '@lib/handleQuery';

import { q, getClient } from '../fauna';

import { Paste, UpdatePaste } from '@utils/interfaces/paste';
import {
  CreatePasteQuery,
  DeletePasteQuery,
  GetLatestPastesQuery,
  GetPasteByIdQuery,
  GetPasteByRefQuery,
  GetPasteResponse,
  GetRawPasteQuery,
  GetUserPastesQuery,
  MultiplePastesQuery,
  PasteQueryResponse,
  RawPaste,
  UpdatePasteQuery
} from '@utils/interfaces/query';

// main paste model
export class PasteModel {
  _client: Client;

  constructor(token: string) {
    this._client = getClient(token);
  }

  // create a new paste
  async createPaste(data: Paste, isUser: boolean): Promise<CreatePasteQuery> {
    return this._client
      .query(
        q.Create(q.Collection('pastes'), {
          data: {
            ...data,
            user: isUser ? q.CurrentIdentity() : {}
          },
          ttl: data.willExpire ? q.Time(data.expiryDate) : undefined
        })
      )
      .then((r: PasteQueryResponse) => getQuery<Paste>(r.data))
      .catch((e: errors.FaunaHTTPError) => getQueryError(e));
  }

  // retrieve paste from id string
  async getPaste(id: string): Promise<GetPasteByIdQuery> {
    return this._client
      .query(
        q.Let(
          {
            pasteDoc: q.Get(q.Match(q.Index('pasteByID'), id))
          },
          {
            id: q.Select(['ref', 'id'], q.Var('pasteDoc')),
            paste: q.Select('data', q.Var('pasteDoc')),
            user: q.If(
              q.Select(['data', 'isOwnedByUser'], q.Var('pasteDoc')),
              q.Select('data', q.Get(q.Select(['data', 'user'], q.Var('pasteDoc')))),
              null
            )
          }
        )
      )
      .then((r: GetPasteResponse) => getQuery<GetPasteResponse>(r))
      .catch((e: errors.FaunaHTTPError) => {
        console.error(e);
        return getQueryError(e);
      });
  }

  // get paste by it's ref id
  async getPasteByRef(id: string): Promise<GetPasteByRefQuery> {
    return this._client
      .query(q.Get(q.Ref(q.Collection('pastes'), id)))
      .then((res: PasteQueryResponse) => getQuery<Paste>(res.data))
      .catch((e: errors.FaunaHTTPError) => getQueryError(e));
  }

  async verifyPasteByUserRef(userRef: Expr): Promise<boolean> {
    return this._client.query(q.Equals(userRef, q.CurrentIdentity()));
  }

  // get latest pastes
  async getLatestPastes(): Promise<GetLatestPastesQuery> {
    return this._client
      .query(
        q.Map(
          q.Paginate(q.Match(q.Index('latestPublicPastesByDate'), false)),
          q.Lambda(['a', 'ref'], q.Get(q.Var('ref')))
        )
      )
      .then((res: MultiplePastesQuery) => getQuery<PasteQueryResponse[]>(res.data))
      .catch((e: errors.FaunaHTTPError) => {
        console.error(e);
        return getQueryError(e);
      });
  }

  // get user's paste with subId
  async getUserPastes(): Promise<GetUserPastesQuery> {
    return this._client
      .query(
        q.Map(
          q.Paginate(q.Match(q.Index('pastes_by_userRef'), q.CurrentIdentity())),
          q.Lambda(['a', 'ref'], q.Get(q.Var('ref')))
        )
      )
      .then((res: MultiplePastesQuery) => getQuery<PasteQueryResponse[]>(res.data))
      .catch((e) => getQueryError(e));
  }

  // get pasteid raw content
  async getRawPasteContentOnly(id: string, filename: string): Promise<GetRawPasteQuery> {
    return this._client
      .query(q.Get(q.Match(q.Index('pasteByID_onlyContent'), id)))
      .then((res: PasteQueryResponse) => {
        const data = {
          content: res.data.content,
          filename: res.data.filename
        };

        if (data.filename === filename) {
          return getQuery<RawPaste>(data);
        }
        return {
          error: true,
          code: 404,
          description: 'No data found.'
        };
      })
      .catch((e: errors.FaunaHTTPError) => getQueryError(e));
  }

  // update paste
  async updatePaste(id: string, data: UpdatePaste): Promise<UpdatePasteQuery> {
    return this._client
      .query(
        q.Update(q.Ref(q.Collection('pastes'), id), {
          data: data,
          ttl: data.willExpire ? q.Time(data.expiryDate) : null
        })
      )
      .then((r: PasteQueryResponse) => getQuery<Paste>(r.data))
      .catch((e: errors.FaunaHTTPError) => getQueryError(e));
  }

  // delete paste
  async deletePasteByRef(id: string): Promise<DeletePasteQuery> {
    return this._client
      .query(q.Delete(q.Ref(q.Collection('pastes'), id)))
      .then(() => {
        return {
          error: false,
          code: 200,
          description: 'Paste has been removed!'
        };
      })
      .catch((e: errors.FaunaHTTPError) => getQueryError(e));
  }
}
