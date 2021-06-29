import Head from 'next/head';
import Layout from '../components/Layout';
import { UserContextProvider } from '../lib/useUser';
import '../styles/globals.css';
import { CollectionsContextProvider } from '../lib/useCollections';

function MyApp({ Component, pageProps }) {
  const layout = Component.Layout;

  return (
    <>
      <Head>
        <title>Cookbase · The opionated recipe manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserContextProvider>
        <CollectionsContextProvider>
          <Layout type={layout}>
            <Component {...pageProps} />
          </Layout>
        </CollectionsContextProvider>
      </UserContextProvider>
    </>
  );
}

export default MyApp;
