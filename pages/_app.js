import Head from 'next/head';
import Layout from '../components/Layout';
import { UserContextProvider } from '../lib/useUser';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const layout = Component.Layout;

  return (
    <>
      <Head>
        <title>Cookbase · The opionated recipe manager</title>
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
