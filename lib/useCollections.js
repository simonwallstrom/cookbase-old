import { useRouter } from 'next/router';
import { useEffect, useState, createContext, useContext } from 'react';
import { useUser } from '../lib/useUser';
import { supabase } from './supabase';

export const CollectionsContext = createContext();

export const CollectionsContextProvider = (props) => {
  const { user } = useUser();
  const [collections, setCollections] = useState([]);
  const [collection, setCollection] = useState({});
  const router = useRouter();
  const { slug } = router.query;

  const fetchCollections = async () => {
    let { data: collections, error } = await supabase
      .from('collections')
      .select('*')
      .order('id', { ascending: false });
    if (error) console.log('error', error);
    setCollections(collections);
  };

  const fetchCollection = async () => {
    let { data, error } = await supabase
      .from('collections')
      .select(
        `
        name,
        description,
        slug,
        recipes(
          name,
          id,
          image,
          slug
        )
        `
      )
      .eq('slug', slug)
      .single();
    setCollection(data);
    if (error) console.log('error', error);
  };

  useEffect(() => {
    if (user) {
      fetchCollections();
    }
  }, [user, collection]);

  useEffect(() => {
    if (slug) {
      fetchCollection();
    }
  }, [slug]);

  const value = {
    collections,
    setCollections,
    collection,
    setCollection,
  };
  return <CollectionsContext.Provider value={value} {...props} />;
};

export const useCollections = () => {
  const context = useContext(CollectionsContext);
  if (context === undefined) {
    throw new Error(
      `useCollections must be used within a CollectionsContextProvider.`
    );
  }
  return context;
};
