import '../styles/fonts.css';
import type { AppProps } from 'next/app';
import { SessionContextProvider } from '../contexts/SessionContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionContextProvider>
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}

export default MyApp;
