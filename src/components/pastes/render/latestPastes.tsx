import { isNew } from '@lib/isNew';
import { GetLatestPastesQuery, PasteQueryResponse } from '@utils/interfaces/query';
import Link from 'next/link';

type RenderLatestPastesProps = {
  initialPastes: GetLatestPastesQuery;
};

export const RenderLatestPastes = ({ initialPastes }: RenderLatestPastesProps) => {
  // const { data: pastes, error } = useSWR<GetLatestPastesQuery>('/api/pastes/latest', { initialData: initialPastes });
    // console.log(initialPastes);
    
  if (!initialPastes) {
    return <p className="mt-6">Loading...</p>;
  }

  // if (error) {
  //   return <p className="mt-6">There was a problem while trying to fetch the latest pastes.</p>;
  // }

  return (
    <ul className="mt-6">
      {initialPastes.data.length > 0 ? (
        initialPastes.data.map((paste: PasteQueryResponse, index) => (
          <li className="my-3" key={index}>
            <Link href={`/p/${paste.data.pasteId}`}>
              <a
                className="relative col-span-11 border border-secondary-300 py-3 px-6 flex flex-col md:flex-row items-start md:items-center justify-between rounded hover:border-primary-500"
                title="View paste"
              >
                {isNew(paste.data.createdDate) && (
                  <span
                    title="Paste is newly created"
                    className="absolute -top-2 -left-2 bg-primary-500 text-white rounded-md p-1 text-xs"
                  >
                    new
                  </span>
                )}

                {/* start paste info */}
                <div className="w-full md:w-1/2 justify-start inline-flex">
                  <h4 className="truncate">
                    {paste.data.filename}{' '}
                    <span className="text-secondary-500 text-sm">
                      {paste.data.description ? `(${paste.data.description})` : null}
                    </span>
                  </h4>
                </div>
                {/* end paste info */}

                {/* start paste other details */}
                <div className="w-full md:w-1/2 mt-1 md:mt-0 justify-end inline-flex items-center text-secondary-500">
                  <div className="text-sm text-secondary-400 md:ml-8 inline-flex flex-col md:flex-row items-end md:items-center">
                    <span title="author">@{paste.data.ownedByUsername ? paste.data.ownedByUsername : 'anonymous'}</span>{' '}
                    <span className="ml-1 text-xs text-secondary-300" title="paste created date">
                      {[
                        `${
                          paste.data.updated
                            ? `${new Date(paste.data.updatedDate).toUTCString()}-updated`
                            : new Date(paste.data.createdDate).toUTCString()
                        }`
                      ]}
                    </span>
                  </div>
                </div>
                {/* end paste other details */}
              </a>
            </Link>
          </li>
        ))
      ) : (
        <p className="text-secondary-600 tracking-wide text-sm">
          No latest pastes yet! Try to create one and check it here!
        </p>
      )}
    </ul>
  );
};
