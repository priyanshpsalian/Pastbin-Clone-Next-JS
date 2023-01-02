import { GetUserStatsQuery } from '@utils/interfaces/query';
import useSWR from 'swr';

export const UserPastesCount = () => {
  const { data: stats } = useSWR<GetUserStatsQuery>('/api/user/stats');

  if (!stats) return <></>;

  return (
    <div className="text-center border p-2 rounded-lg mt-4 border-secondary-300">
      <span className="text-secondary-700">Total Pastes: </span>{' '}
      <strong className="text-xl font-black text-primary-500">{stats.data.totalPastes}</strong>
    </div>
  );
};
