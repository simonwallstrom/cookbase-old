import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import RecipeForm from '../../../components/RecipeForm';
import PageHeader from '../../../components/PageHeader';
import { supabase } from '../../../lib/supabase';
import { Container } from '../../../components/Ui';

export default function EditRecipe() {
  const router = useRouter();
  const { slug } = router.query;
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(false);

  const getRecipe = async (slug) => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1500));
    let { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('slug', slug)
      .single();
    setRecipe(data);
    setLoading(false);
    if (error) console.log('error', error);
  };

  useEffect(() => {
    if (slug) {
      getRecipe(slug);
    }
  }, [slug]);

  return (
    <Container className="mb-24">
      <PageHeader title="Edit recipe" />
      <RecipeForm isEdit={true} loadingRecipe={loading} editRecipe={recipe} />
    </Container>
  );
}
