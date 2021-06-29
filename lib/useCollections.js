import { useEffect, useState, createContext, useContext } from 'react';
import { useUser } from '../lib/useUser';
import { supabase } from './supabase';

export const CollectionsContext = createContext();

export const CollectionsContextProvider = (props) => {
  const { user } = useUser();
  const [collections, setCollections] = useState([]);

  const fetchCollections = async () => {
    let { data: collections, error } = await supabase
      .from('collections')
      .select('*')
      .order('id', { ascending: false });
    if (error) console.log('error', error);
    setCollections(collections);
  };

  useEffect(() => {
    if (user) {
      fetchCollections();
    }
  }, [user]);

  const value = {
    collections,
    setCollections,
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
