import { useEffect, useState } from 'react';
import RecipesList from '../../../components/RecipesList';
import PageHeader from '../../../components/PageHeader';
import { Container } from '../../../components/Ui';
import CategoryForm from '../../../components/CategoryForm';
import { useRouter } from 'next/router';
import { supabase } from '../../../lib/supabase';

export default function CategoryDetails() {
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { slug } = router.query;

  const getCategory = async (slug) => {
    setLoading(true);
    let { data, error } = await supabase
      .from('categories')
      .select(
        `
        id,
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
    if (error) console.log('error', error);
    setCategory(data);
    setLoading(false);
  };

  useEffect(() => {
    if (slug) {
      getCategory(slug);
    }
  }, [slug]);

  return (
    <Container>
      <CategoryForm
        category={category}
        setCategory={setCategory}
        isEdit={true}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <PageHeader
        title={category?.name}
        buttonText="Edit category"
        handleClick={() => setIsOpen(true)}
      />
      <RecipesList loading={loading} recipes={category?.recipes} />
    </Container>
  );
}
