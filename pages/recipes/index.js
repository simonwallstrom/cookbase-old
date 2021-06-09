import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import PageHeader from '../../components/PageHeader';
import RecipesList from '../../components/RecipesList';

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    let { data: recipes, error } = await supabase
      .from('recipes')
      .select('id, slug, name, image')
      .order('name', { ascending: true });
    if (error) console.log('error', error);
    setRecipes(recipes);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="w-full max-w-5xl p-6 py-8 mx-auto lg:px-12">
      <PageHeader title="Recipes" />
      <div className="flex h-8"></div>
      <RecipesList recipes={recipes} />
    </div>
  );
}
