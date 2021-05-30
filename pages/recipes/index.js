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
    <div className="px-24 py-8">
      <PageHeader title="All recipes" />
      <RecipesList recipes={recipes} />
    </div>
  );
}
