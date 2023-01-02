import Link from 'next/link';
import { ExternalLinkButton } from './shared/link';

const Footer = () => {
  return (
    <footer className="py-8">
      <section className="w-11/12 mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="my-2 md:my-0">
            <h1 className="text-lg font-black tracking-wide text-secondary-700">
              Contrl <span className="text-primary-500">CV</span>
            </h1>
            <p className="text-secondary-700 text-center text-xs">
              &copy; {new Date().getFullYear()} | All Rights Reserved
            </p>
            <ExternalLinkButton
              href="https://github.com/priyanshpsalian"
              title="Project"
              className="text-xs text-secondary-500 hover:underline"
            >
              @Priyansh Salian
            </ExternalLinkButton>
          </div>

          <ul className="my-2 md:my-0">
            <li>
              <Link href="/latest">
                <a className="text-sm text-secondary-600 tracking-wider">Latest</a>
              </Link>
            </li>
          </ul>
          <ul className="my-2 md:my-0 text-sm">
            {/* <li className="my-1">
              <ExternalLinkButton
                href="https://phurma.vercel.app"
                title="Phurma project"
                className="text-secondary-600"
              >
                phurma
              </ExternalLinkButton>
            </li>
            <li className="my-1">
              <ExternalLinkButton
                href="https://quaker.vercel.app"
                title="Quaker project"
                className="text-secondary-600"
              >
                quaker
              </ExternalLinkButton>
            </li>
            <li className="my-1">
              <ExternalLinkButton
                href="https://github.com/TheBoringDude/lcl-paste"
                title="Goto Github Repo"
                className="text-secondary-600"
              >
                github
              </ExternalLinkButton>
            </li> */}
          </ul>
        </div>
      </section>
    </footer>
  );
};

export { Footer };
