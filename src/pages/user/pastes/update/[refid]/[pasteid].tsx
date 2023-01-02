import { useRouter } from 'next/router';
import Error from 'next/error';

import useSWR from 'swr';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { joinString } from '@ootiq/blank';

import MainEditor from '@components/Editor';
import { Loading } from '@components/Loading';
import Layout from '@components/Layout';

import { ApiGetPasteRefResponse } from 'pages/api/pastes/get/ref/[refid]';

export default withPageAuthRequired(function UserPage() {
  const router = useRouter();
  const { refid, pasteid } = router.query;

  const { data: paste } = useSWR<ApiGetPasteRefResponse>(refid ? `/api/pastes/get/ref/${refid}` : null);

  if (!paste) {
    return <Loading title="Update Paste" />;
  }

  if (paste.data?.pasteId != pasteid) {
    // the pasteid in the url is not similar from the paste's pasteid
    return <Error statusCode={404} />;
  }

  if (!paste.isOwnedByCurrentUser) {
    // the paste is not owned by the current user
    return <Error statusCode={403} />;
  }

  if (paste.error) {
    return <Error statusCode={paste.code} />;
  }

  return (
    <Layout title={`${paste.data.filename} - Update`}>
      <div className="w-5/6 mx-auto mt-8">
        <p className="tracking-wide text-primary-500 opacity-90 text-lg font-bold">
          Update <strong className="bg-secondary-100 py-1 px-2 rounded-lg">{paste.data.filename}</strong>
        </p>
      </div>
      {paste.data && <MainEditor update={true} data={paste.data} refid={joinString(refid)} />}
    </Layout>
  );
});
