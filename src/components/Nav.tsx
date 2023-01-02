import Link from 'next/link';
import { useState } from 'react';
import { LinkButton } from './shared/link';
import { UserNav } from './userNav';

const Navigation = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="py-4 w-11/12 mx-auto flex flex-col sm:flex-row items-center justify-between">
      <div className="w-full sm:w-auto flex items-center justify-between">
        <Link href="/">
          <a title="Return Home">
            <h1 className="text-2xl font-black tracking-wide text-secondary-700">
              Contrl<span className="text-primary-500">CV</span>
            </h1>
            <p className="text-sm text-secondary-400 tracking-wide">Ultimate text sharing app</p>
          </a>
        </Link>

        <button className="h-6 w-6 sm:hidden" onClick={() => setOpen(open ? false : true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      <ul className="hidden sm:inline-flex mt-2 sm:mt-0 items-center text-secondary-600">
        <li className="mx-4 md:mx-6">
          <LinkButton id="link-latest" href="/latest">
            Latest
          </LinkButton>
        </li>
        <UserNav />
      </ul>
      {open ? (
        <ul className="sm:hidden inline-flex flex-col mt-2 sm:mt-0 items-center text-secondary-600">
          <li className="my-2 sm:my-0">
            <LinkButton id="link-latest" href="/latest">
              Latest
            </LinkButton>
          </li>
          <UserNav />
        </ul>
      ) : null}
    </nav>
  );
};

export default Navigation;
