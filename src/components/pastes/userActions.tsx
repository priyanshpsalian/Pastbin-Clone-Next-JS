import Link from 'next/link';
import Router from 'next/router';

type PasteUserActionsProps = { refid: string; pasteid: string };

export const UserActions = ({ refid, pasteid }: PasteUserActionsProps) => {
  const handleRemovePaste = () => {
    Router.push(`/user/pastes/delete/${refid}`);
  };

  return (
    <>
      <div className="inline-flex items-center justify-between">
        <Link href={`/user/pastes/update/${refid}/${pasteid}`}>
          <a className="bg-white h-6 w-6 mx-1 hover:text-primary-500" title="Update paste">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </a>
        </Link>
        <button
          onClick={handleRemovePaste}
          className="bg-white h-6 w-6 mx-1 hover:text-primary-500"
          title="Delete paste"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </>
  );
};
