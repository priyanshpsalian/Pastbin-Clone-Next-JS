import { useUser } from '@auth0/nextjs-auth0';
import MainEditor from '@components/Editor';
import Layout from '@components/Layout';
import { joinString } from '@ootiq/blank';
import { useRouter } from 'next/router';
import { useRef } from 'react';

export default function Home() {
  const router = useRouter();

  const { filename, description, content } = router.query;
  const { user } = useUser();

  const isAnonymousRef = useRef<HTMLInputElement>(null);

  return (
    <Layout title="Welcome ">
      <div className="w-5/6 mx-auto mt-8 flex items-center justify-between">
        <p className="tracking-wide text-primary-500 opacity-90 text-lg font-bold">Create A New Paste</p>

        {user && (
          <div className="inline-flex items-center" title="Publish this paste as anonymous user">
            <input ref={isAnonymousRef} type="checkbox" name="" id="" />
            <label className="lowercase ml-2 text-sm text-secondary-700" htmlFor="use-anonymouse">
              Use Anonymous
            </label>
          </div>
        )}
      </div>
      <MainEditor
        queryData={{
          filename: joinString(filename),
          description: joinString(description),
          content: joinString(content)
        }}
        isAnonymousRef={isAnonymousRef}
      />
    </Layout>
  );
}
