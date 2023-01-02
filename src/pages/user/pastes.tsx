import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import Layout from '@components/Layout';
import { RenderUserPastes } from '@components/pastes/render/userPastes';

export default withPageAuthRequired(function UserPastes() {
  return (
    <Layout title="User Pastes">
      <div className="py-8 w-5/6 mx-auto">
        <h3 className="font-bold tracking-wide text-xl">My Latest Pastes</h3>

        <RenderUserPastes />
      </div>
    </Layout>
  );
});
