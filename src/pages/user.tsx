import { useRef } from 'react';
import Image from 'next/image';

import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';

import Layout from '@components/Layout';
import { UserPastesCount } from '@components/user-paste-count';

export default withPageAuthRequired(function UserPage() {
  const { user } = useUser();
  const api = typeof user.api_key === 'string' ? user.api_key : '';

  const btnCopy = useRef<HTMLButtonElement>(null);

  return (
    <Layout title={`${user.name} - User`}>
      <section className="w-4/5 mx-auto py-12">
        <div className="border rounded-md border-secondary-200 shadow p-8">
          <div className="flex flex-col md:flex-row items-center justify-center">
            <Image src={user.picture} height="200" width="200" className="rounded-full" />
            <div className="ml-0 md:ml-8 mt-2 md:mt-0">
              <h3 className="text-4xl md:text-5xl font-black tracking-wide mb-2 text-primary-500">{user.name}</h3>
              <p className="bg-secondary-400 p-1 text-white text-right">@{user.sub.split('|')[0]}</p>
            </div>
          </div>
          <UserPastesCount />
        </div>

        <div className="mt-4">
          <h3>Api Key: </h3>
          <section className="py-2 px-4 bg-secondary-100 rounded-md flex items-center justify-between">
            <p className="overflow-x-auto mr-2 text-sm">{api}</p>
            <button
              ref={btnCopy}
              onClick={() => {
                btnCopy.current.innerHTML = 'Copied';
                navigator.clipboard.writeText(api);
              }}
              className="py-1 px-4 rounded-full bg-secondary-500 hover:bg-secondary-600 text-white text-xs"
            >
              Copy
            </button>
          </section>
          <p className="text-xl py-4 text-primary-500">NOTE!: Api keys are not yet usable...</p>
        </div>
      </section>
    </Layout>
  );
});
