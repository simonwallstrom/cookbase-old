import Head from 'next/head';
import Layout from '../components/Layout';
import PwaAssets from '../components/PwaAssets';
import { UserContextProvider } from '../lib/useUser';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const layout = Component.Layout;

  return (
    <>
      <Head>
        <title>
          Cookbase · The simple way to collect and organize your favourite
          recipes.
        </title>
        <link rel="icon" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <PwaAssets />
      </Head>
      <UserContextProvider>
        <Layout type={layout}>
          <Component {...pageProps} />
        </Layout>
      </UserContextProvider>
    </>
  );
}

export default MyApp;
