import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { supabase } from './supabase';

const store = (set) => ({
  collections: [],
  getAllCollections: async () => {
    // await new Promise((res) => setTimeout(res, 1000));
    let { data, error } = await supabase
      .from('collections_with_recipe_count4')
      .select('*')
      .order('id', { ascending: false });
    if (error) console.log('error', error);
    set({ collections: data });
  },
});

const useStore = create(devtools(store));
export default useStore;
