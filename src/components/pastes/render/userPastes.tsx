import { PasteQueryResponse } from '@utils/interfaces/query';
import axios from 'axios';
import Link from 'next/link';
import useSWR from 'swr';
import { UserActions } from '../userActions';
export const RenderUserPastes = () => {
  // var pastes;
  const fetcher = async (url) =>
    await axios.get(url).then((res) => {
      console.log(res.data,'dta');
    // pastes=res;
      return res.data;
    });

  const { data: pastes, error } = useSWR('/api/pastes/user', fetcher);
  // const { data: pastes, error } = useSWR<GetUserPastesQuery>('/api/pastes/user');
  // console.log(error, 'pastes');

  if (!pastes) {
    return <p className="mt-6">Loading...</p>;
  }

  if (error) {
    return <p className="mt-6">There was a problem while trying to fetch your pastes.</p>;
  }

  return (
    <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-4">
      {pastes.data.length > 0 ? (
        pastes.data.map((paste: PasteQueryResponse, index) => (
          <li
            className="relative border-2 border-secondary-200 py-4 px-6 rounded hover:border-primary-300 flex flex-col"
            key={index}
          >
            <Link href={`/p/${paste.data.pasteId}`}>
              <a>
                <div className="flex flex-col">
                  <h4 className="font-bold text-primary-600 tracking-wide">{paste.data.filename} </h4>
                  <span className="text-secondary-500 text-sm font-normal mt-1 truncate">
                    {paste.data.description ? `(${paste.data.description})` : <br />}
                  </span>
                </div>
              </a>
            </Link>

            <div className="text-secondary-500 absolute top-2 right-2">
              <UserActions refid={paste.ref['@ref'].id} pasteid={paste.data.pasteId} />
            </div>

            <div className="mt-2 text-secondary-400">
              <div className="flex items-center justify-between">
                <span className="text-xs">
                  {[
                    `${
                      paste.data.updated
                        ? `${new Date(paste.data.updatedDate).toUTCString()}-updated`
                        : new Date(paste.data.createdDate).toUTCString()
                    }`
                  ]}
                </span>
                <span className="bg-secondary-400 text-xs p-1 text-white ml-3">
                  {paste.data.isPrivate ? 'private' : 'public'}
                </span>
              </div>
            </div>
          </li>
        ))
      ) : (
        <p className="text-secondary-600 tracking-wide text-sm">
          You have not created any pastes yet! Try to create one and check it here!
        </p>
      )}
    </ul>
  );
};
