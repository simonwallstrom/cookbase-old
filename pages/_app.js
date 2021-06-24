import Head from 'next/head';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { UserContextProvider } from '../lib/useUser';
import '../styles/globals.css';
import { supabase } from '../lib/supabase';
import CollectionForm from '../components/CollectionForm';
import { AppContextProvider } from '../lib/useCollections';

function MyApp({ Component, pageProps }) {
  const layout = Component.Layout;
  const [collections, setCollections] = useState([]);
  let [isOpen, setIsOpen] = useState(false);

  const fetchCollections = async () => {
    let { data: collections, error } = await supabase
      .from('collections')
      .select('*')
      .order('name', { ascending: true });
    if (error) console.log('error', error);
    setCollections(collections);
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <>
      <Head>
        <title>Cookbase · The opionated recipe manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppContextProvider>
        <UserContextProvider>
          <CollectionForm
            collections={collections}
            setCollections={setCollections}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          <Layout collections={collections} type={layout}>
            <Component
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              collections={collections}
              {...pageProps}
            />
          </Layout>
        </UserContextProvider>
      </AppContextProvider>
    </>
  );
}

export default MyApp;
