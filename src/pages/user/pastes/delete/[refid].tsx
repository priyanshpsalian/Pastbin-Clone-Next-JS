import { GetServerSideProps } from 'next';
import Router from 'next/router';

import { mutate } from 'swr';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import { joinString } from '@ootiq/blank';

import { DeletePasteQuery } from '@utils/interfaces/query';
import { RemovePasteHandler } from '@functions/removePaste';

type DeletePastePageProps = {
  q: DeletePasteQuery;
};

export default function DeletePaste({ q }: DeletePastePageProps) {
  if (q.error) {
    // there was a problem during deletion
    return <p>there was a problem while trying to remove the paste</p>;
  }

  // mutate -> then, redirect
  mutate('/api/pastes/user').then(() => {
    Router.push('/user/pastes');
  });
  return null;
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ req, res, params }) => {
    const { refid } = params;

    const q = await RemovePasteHandler(req, res, joinString(refid));

    return {
      props: {
        q
      }
    };
  }
});
