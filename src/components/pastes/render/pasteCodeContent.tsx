import Highlight from 'react-highlight';

type RenderPasteCodeContentProps = {
  content: string;
  codeLanguage: string;
};

export const RenderPasteCodeContent = ({ content, codeLanguage }: RenderPasteCodeContentProps) => {
  return (
    <div className="p-4 rounded-md shadow-2xl border border-secondary-200 relative">
      <div className="absolute top-1 right-1 inline-flex items-center">
        {/* redirect to carbon */}
        <a
          rel="noreferrer"
          title="Create Carbon Image"
          className="text-primary-400 hover:text-primary-500"
          target="_blank"
          href={`https://carbon.now.sh/?bg=rgba%28171%2C+184%2C+195%2C+1%29&t=seti&wt=none&l=auto&ds=true&dsyoff=20px&dsblur=68px&wc=true&wa=true&pv=56px&ph=56px&ln=false&fl=1&fm=Hack&fs=14px&lh=133%25&si=false&es=2x&wm=false&code=${encodeURI(
            content
          )}`}
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
            navigator.clipboard.writeText(content);
          }}
          className="text-secondary-400 hover:text-secondary-500"
          title="Copy Code"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
            <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
          </svg>
        </button>
        {/* end copy button */}
      </div>
      <Highlight className={`text-sm ${codeLanguage}`}>{content}</Highlight>
    </div>
  );
};
