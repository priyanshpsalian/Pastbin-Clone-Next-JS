import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';

import '../styles/tailwind.css';
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <NextNProgress height={4} color="#f59e0b" />
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
