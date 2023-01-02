import Head from 'next/head';
import Link from 'next/link';
import Error from 'next/error';

import { useUser } from '@auth0/nextjs-auth0';
import Highlight from 'react-highlight';

import { GetPasteByIdQuery } from '@utils/interfaces/query';
import { MutableRefObject } from 'react';

type PasteContainerProps = {
  paste: GetPasteByIdQuery;
  pasteContainerRef?: MutableRefObject<HTMLDivElement>;
};

export const PasteContainer = ({ paste, pasteContainerRef }: PasteContainerProps) => {
  const { user } = useUser();
  const getPrivacy = paste.data?.paste.isPrivate ? 'private' : 'public';
  const getUser = paste.data?.paste.ownedByUsername ? paste.data.paste.ownedByUsername : 'anonymous';
  const getExpiryDate = paste.data?.paste.willExpire ? new Date(paste.data.paste.expiryDate).toLocaleString() : null;

  if (paste.error) return <Error statusCode={paste.code} />;

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/highlightjs-themes@1.0.0/vs.css" />
      </Head>

      <div className="w-5/6 mx-auto my-12" ref={pasteContainerRef}>
        <div className="p-6 border border-primary-300 rounded-lg shadow-xl">
          <div className="pb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div>
              <h4 id="paste-filename" className="text-primary-500 text-lg font-bold tracking-wider">
                {paste.data.paste.filename}
              </h4>
              <p id="paste-description" className="ml-2 text-secondary-500 mt-1 tracking-wide text-sm">
                {paste.data.paste.description}
              </p>
            </div>
            <div className="inline-flex text-sm mt-3 sm:mt-0">
              {user && user?.sub == paste.data.user?.user && (
                <Link href={`/user/pastes/update/${paste.data.id}/${paste.data.paste.pasteId}`}>
                  <a className="mr-2 bg-primary-400 hover:bg-primary-500 p-1 text-white rounded-md">update</a>
                </Link>
              )}
              <Link href={`/api/raw/${paste.data.paste.pasteId}/${paste.data.paste.filename}`}>
                <a
                  className="bg-secondary-400 hover:bg-secondary-500 text-white py-1 px-3 rounded-md tracking-wide"
                  target="_blank"
                >
                  raw
                </a>
              </Link>
            </div>
          </div>
          <hr className="my-4" />
          {paste.data.paste.willExpire && user?.sub == paste.data.user?.user && (
            <p className="text-secondary-400 text-sm text-right my-2">
              expire in: <span className="underline">{getExpiryDate}</span>
            </p>
          )}
          <div className="p-4 rounded-md border border-secondary-200 shadow relative">
            <div className="absolute top-1 right-1 inline-flex items-center">
              {/* redirect to carbon */}
              <a
                title="Create Carbon Image"
                className="text-primary-400 hover:text-primary-500"
                target="_blank"
                href={`https://carbon.now.sh/?bg=rgba%28171%2C+184%2C+195%2C+1%29&t=seti&wt=none&l=${
                  paste.data.paste.codeLanguage
                }&ds=true&dsyoff=20px&dsblur=68px&wc=true&wa=true&pv=56px&ph=56px&ln=false&fl=1&fm=Hack&fs=14px&lh=133%25&si=false&es=2x&wm=false&code=${encodeURI(
                  paste.data.paste.content
                )}`}
                rel="noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path
                    fillRule="evenodd"
                    d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              {/* end redirect to carbon */}

              {/* copy button */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(paste.data.paste.content);
                }}
                className="text-secondary-400 hover:text-secondary-500"
                title="Copy Code"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
              </button>
              {/* end copy button */}
            </div>
            <Highlight className={`text-sm ${paste.data.paste.codeLanguage}`}>{paste.data.paste.content}</Highlight>
          </div>

          <div className="flex items-center justify-between mt-6">
            <p className="bg-secondary-300 text-secondary-500 p-1 text-xs rounded-md">{getPrivacy}</p>
            <p className="text-secondary-600 underline text-sm">@{getUser}</p>
          </div>
        </div>
      </div>
    </>
  );
};
