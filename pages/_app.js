import Head from 'next/head';
import Layout from '../components/Layout';
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
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.svg" />
        <link rel="mask-icon" href="/mask-icon.svg" color="#000000" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link
          rel="apple-touch-startup-image"
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
          href="/apple-launch-1125x2436.png"
        />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
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
