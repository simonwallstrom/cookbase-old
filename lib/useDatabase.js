import { useEffect, useState } from 'react';
import { supabase } from './supabase';

export const useDatabase = (props) => {
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (props?.slug) {
      getRecipe(props.slug, (recipe) => {
        setRecipe(recipe);
      });
      setLoading(false);
    }
  }, [props.slug]);
  return {
    loading,
    recipe,
  };
};

export const getRecipe = async (slug, setState) => {
  let { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('slug', slug)
    .single();
  setState(data);

  console.log('error', error);
};

export const addRecipe = async (data) => {
  let { body, error } = await supabase.from('recipes').insert([data]);
  if (error) return error;
  return body;
};
