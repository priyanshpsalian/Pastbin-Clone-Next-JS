import { adminClient, getClient, q } from '@lib/fauna';
import { getQuery, getQueryError } from '@lib/handleQuery';
import { BaseStatsProps, GetStatsQuery, GetUserStatsQuery, UserPasteStatsProps } from '@utils/interfaces/query';
import { Client } from 'faunadb';

export class Stats {
  _client: Client;

  constructor(token: string) {
    this._client = getClient(token);
  }

  // get stats
  static async getStats(): Promise<GetStatsQuery> {
    return adminClient
      .query(q.Map(['users', 'pastes'], q.Lambda('col', q.Count(q.Documents(q.Collection(q.Var('col')))))))
      .then((r: number[]) =>
        getQuery<BaseStatsProps>({
          users: r[0],
          pastes: r[1]
        })
      )
      .catch((e) => getQueryError(e));
  }

  async getUserStats(): Promise<GetUserStatsQuery> {
    return this._client
      .query(
        q.Let(
          {
            user: q.Get(q.CurrentIdentity()),
            count: q.Count(q.Match(q.Index('pastes_by_userRef'), q.CurrentIdentity()))
          },
          {
            user: q.Select(['data', 'name'], q.Var('user')),
            totalPastes: q.Var('count')
          }
        )
      )
      .then((r: UserPasteStatsProps) => getQuery<UserPasteStatsProps>(r))
      .catch((e) => getQueryError(e));
  }
}
