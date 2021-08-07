import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { supabase } from './supabase';

const store = (set) => ({
  categories: [],
  getAllCategories: async () => {
    let { data, error } = await supabase
      .from('categories_with_recipe_count')
      .select('*')
      .order('id', { ascending: false });
    if (error) console.log('error', error);
    set({ categories: data });
  },
});

const useStore = create(devtools(store));
export default useStore;
