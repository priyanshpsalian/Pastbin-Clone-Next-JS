import Head from 'next/head';
import { ReactNode } from 'react';
import { Footer } from './Footer';
import Navigation from './Nav';

type LayoutProps = {
  children: ReactNode;
  title: string;
};

export default function Layout({ children, title }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title} | Contrl CV</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <main className="antialiased">
        <Navigation />
        <hr />

        {children}

        <hr />
        <Footer />
      </main>
    </>
  );
}
