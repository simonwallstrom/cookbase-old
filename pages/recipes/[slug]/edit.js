import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import RecipeForm from '../../../components/RecipeForm';
import { supabase } from '../../../lib/supabase';

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
    <div className="w-full max-w-5xl px-12 pt-8 pb-16 mx-auto">
      <h1 className="mt-1 text-3xl font-extrabold">Edit recipe</h1>
      <RecipeForm isEdit={true} loadingRecipe={loading} editRecipe={recipe} />
    </div>
  );
}
