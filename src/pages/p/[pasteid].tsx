import { GetServerSideProps } from 'next';

import useSWR from 'swr';

import { joinString, jsonify } from '@ootiq/blank';

import Layout from '@components/Layout';
import { CopyEmbed } from '@components/pastes/embed';
import { PasteContainer } from '@components/pastes/page';
import { GetPasteHandler } from '@functions/getPaste';
import { GetPasteByIdQuery } from '@utils/interfaces/query';
import { useRef } from 'react';

type ViewPasteProps = {
  pasteid: string;
  initialPaste: GetPasteByIdQuery;
};

export const getServerSideProps: GetServerSideProps<ViewPasteProps> = async ({ req, res, params }) => {
  const { pasteid } = params;

  const q = await GetPasteHandler(req, res, joinString(pasteid));
//  console.log(q,"q");
 
  return {
    props: {
      pasteid: joinString(pasteid),
      initialPaste: jsonify(q)
    }
  };
};

export default function ViewPaste({ pasteid, initialPaste }: ViewPasteProps) {
  // get response
  const { data:paste,error } = useSWR<GetPasteByIdQuery>(pasteid ? `/api/pastes/get/${pasteid}` : null, {
    initialData: initialPaste
  });
  // console.log(initialPaste, 'data');
  
// const { data: paste } = useSWR<GetPasteByIdQuery>(pasteid ? `/api/pastes/get/${pasteid}` : null, {
//   initialData: initialPaste
// });
  const pasteContainerRef = useRef<HTMLDivElement>(null);

  return (
    <Layout title={initialPaste.error ? initialPaste.description : initialPaste.data.paste.filename}>
      <PasteContainer paste={initialPaste} pasteContainerRef={pasteContainerRef} />

      {!initialPaste.error && <CopyEmbed pasteid={pasteid} pasteContainerRef={pasteContainerRef} />}
    </Layout>
  );
}
