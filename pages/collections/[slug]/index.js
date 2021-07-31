import { useEffect, useState } from 'react';
import RecipesList from '../../../components/RecipesList';
import PageHeader from '../../../components/PageHeader';
import { Container } from '../../../components/Ui';
import CollectionForm from '../../../components/CollectionForm';
import { useRouter } from 'next/router';
import { supabase } from '../../../lib/supabase';

export default function CollectionDetails() {
  const [collection, setCollection] = useState({});
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { slug } = router.query;

  const getCollection = async (slug) => {
    setLoading(true);
    let { data, error } = await supabase
      .from('collections')
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
    setCollection(data);
    setLoading(false);
  };

  useEffect(() => {
    if (slug) {
      getCollection(slug);
    }
  }, [slug]);

  return (
    <Container>
      <CollectionForm
        collection={collection}
        setCollection={setCollection}
        isEdit={true}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <PageHeader
        title={collection?.name}
        buttonText="Edit collection"
        handleClick={() => setIsOpen(true)}
      />
      <RecipesList loading={loading} recipes={collection?.recipes} />
    </Container>
  );
}
