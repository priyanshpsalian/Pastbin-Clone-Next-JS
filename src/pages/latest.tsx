import { GetServerSideProps } from 'next';

import { jsonify } from '@ootiq/blank';

import Layout from '@components/Layout';
import { RenderLatestPastes } from '@components/pastes/render/latestPastes';

import { GetLatestPasteHandler } from '@functions/getLatest';
import { GetLatestPastesQuery } from '@utils/interfaces/query';

type LatestProps = {
  pastes: GetLatestPastesQuery;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const q = await GetLatestPasteHandler(req, res);
  // console.log(q,"qqs");
  
  return {
    props: { pastes: jsonify(q) }
  };
};

export default function Latest({ pastes }: LatestProps) {
  // console.log(pastes);
  
  return (
    <Layout title="Latest Pastes">
      <div className="py-8 w-5/6 mx-auto">
        <h3 className="font-bold tracking-wide text-xl">Latest</h3>

        <RenderLatestPastes initialPastes={pastes} />
      </div>
    </Layout>
  );
}
