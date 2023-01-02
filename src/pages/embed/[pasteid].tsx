import { GetServerSideProps } from 'next';


import { joinString, jsonify } from '@ootiq/blank';

import { GetPasteHandler } from '@functions/getPaste';
import { GetPasteByIdQuery } from '@utils/interfaces/query';

type GetPasteProps = {
  pasteid: string;
  initialPaste: GetPasteByIdQuery;
};

export const getServerSideProps: GetServerSideProps<GetPasteProps> = async ({ req, res, params }) => {
  const { pasteid } = params;

  const q = await GetPasteHandler(req, res, joinString(pasteid));

  return {
    props: {
      pasteid: joinString(pasteid),
      initialPaste: jsonify(q)
    }
  };
};

export default function EmbedPaste({ pasteid, initialPaste }: GetPasteProps) {
  // get response
  // const { data: paste } = useSWR<GetPasteByIdQuery>(pasteid ? `/api/pastes/get/${pasteid}` : null, {
  //   initialData: initialPaste
  // });

  // return <PasteContainer paste={paste} />;
}
