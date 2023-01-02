// import Head from 'next/head';
import { NextSeo } from 'next-seo';
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
      {/* <Head>
        <title>{title} | Cntrl CV</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="icon"
          type="image/x-icon"
          href="logo.png"
        ></link>
      </Head> */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-W2ZMR9QH33" />
      <script dangerouslySetInnerHTML={{ __html:
        `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-W2ZMR9QH33');`}}
        
      />
      <NextSeo
        title="Paste It | Paste Code"
        description="Ultimate text sharing app.Paste It and share text over the internet by using a custom URL.The fastest way to paste text and share with other people.Just like a online clipboard.Paste code now"
        additionalLinkTags={[
          {
            rel: 'icon',
            href: 'logo.png'
          }
        ]}
        additionalMetaTags={[
          {
            property: 'author',
            content: 'Priyansh Salian'
          },
          {
            name: 'Paste It | Paste Code',
            content:
              'Ultimate text sharing app.Paste It and share text over the internet by using a custom URL.The fastest way to paste text and share with other people.Just like a online clipboard.Paste code now'
          }
        ]}
        twitter={{
          handle: '@PriyanshSalian',
          site: 'https://pasteitnow.vercel.app/',
          cardType: 'summary_large_image'
        }}
        openGraph={{
          url: 'https://pasteitnow.vercel.app/',
          title: 'Paste It | Paste Code',
          description:
            'Ultimate text sharing app.Paste It and share text over the internet by using a custom URL.The fastest way to paste text and share with other people.Just like a online clipboard.Paste code now',
          images: [
            {
              url: 'https://pasteitnow.vercel.app/logo.png',
              width: 800,
              height: 600,
              alt: 'logo',
              type: 'image/jpeg'
            },

            { url: 'https://pasteitnow.vercel.app/' },
            
          ],
          siteName: 'Paste It | Paste Code'
        }}
      />

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
