import { MutableRefObject, useEffect, useRef } from 'react';

type CopyEmbedProps = {
  pasteid: string;
  pasteContainerRef: MutableRefObject<HTMLDivElement>;
};

const getAppUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
};

export const CopyEmbed = ({ pasteid, pasteContainerRef }: CopyEmbedProps) => {
  const embedRef = useRef<HTMLTextAreaElement>(null);

  // the component depends on the MutableRef props (pasteContainerRef)
  // there is a possibility to cause an error if using it the normal way
  // since `pasteContainerRef` might not be mounted first?
  useEffect(() => {
    const generateIframe = (): string => {
      const u = getAppUrl();
      const e = `embed/${pasteid}`;
      const url = u.endsWith('/') ? u + e : u + '/' + e;

      return url;
    };

    const height = pasteContainerRef.current?.clientHeight + 100; // cause of the spaces

    embedRef.current.value = `<iframe src="${generateIframe()}" height="${height}" width="800" style="border: 1px solid #ddd; border-radius: 10px; margin:0px auto; display:block;"></iframe>`;
    embedRef.current.readOnly = true;
  }, [pasteid, pasteContainerRef]);

  return (
    <div className="w-4/5 flex flex-col mx-auto mb-12">
      <strong className="text-secondary-600 tracking-wide mb-2">Embed Paste</strong>
      <div className="relative">
        {/* copy button */}
        <button
          onClick={() => {
            navigator.clipboard.writeText(embedRef.current.value);
            embedRef.current.select();

            setTimeout(() => {
              embedRef.current.blur();
            }, 2000);
          }}
          className="text-secondary-400 hover:text-secondary-500 absolute top-1 right-1"
          title="Copy Embed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
          </svg>
        </button>
        {/* end copy button */}
        <textarea
          ref={embedRef}
          className="text-sm tracking-wide w-full text-secondary-700 h-20 border-2 border-secondary-200 p-4 rounded-lg focus:outline-none focus:border-primary-300"
        ></textarea>
      </div>
    </div>
  );
};
