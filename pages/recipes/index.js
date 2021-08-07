import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import PageHeader from '../../components/PageHeader';
import RecipesList from '../../components/RecipesList';
import { Container } from '../../components/Ui';

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async () => {
    setLoading(true);
    let { data: recipes, error } = await supabase
      .from('recipes')
      .select('id, slug, name, image')
      .is('deleted', null)
      .order('name', { ascending: true });
    if (error) console.log('error', error);
    setRecipes(recipes);
    setLoading(false);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <Container>
      <PageHeader
        title="Recipes"
        buttonText="New recipe"
        buttonURL="/recipes/new"
      />

      <RecipesList loading={loading} recipes={recipes} />
    </Container>
  );
}
