import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import RecipesList from '../../../components/RecipesList';
import PageHeader from '../../../components/PageHeader';
import { Container } from '../../../components/Ui';
import { supabase } from '../../../lib/supabase';

export default function CollectionDetails() {
  const router = useRouter();
  const { slug } = router.query;
  const [collection, setCollection] = useState({});
  const [loading, setLoading] = useState(false);

  const getCollection = async (slug) => {
    setLoading(true);
    // await new Promise((res) => setTimeout(res, 1500));
    let { data, error } = await supabase
      .from('collections')
      .select(
        `
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
    setCollection(data);
    setLoading(false);
    if (error) console.log('error', error);
  };

  useEffect(() => {
    if (slug) {
      getCollection(slug);
    }
  }, [slug]);

  return (
    <Container>
      <PageHeader
        title={collection?.name}
        buttonText="Edit collection"
        buttonURL="Edit"
      />
      <RecipesList recipes={collection?.recipes} />
    </Container>
  );
}
