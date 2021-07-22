import { useState } from 'react';
import RecipesList from '../../../components/RecipesList';
import PageHeader from '../../../components/PageHeader';
import { Container } from '../../../components/Ui';
import CollectionForm from '../../../components/CollectionForm';
import { useCollections } from '../../../lib/useCollections';

export default function CollectionDetails() {
  const [isOpen, setIsOpen] = useState(false);
  const { collection, setCollection, collections, setCollections } =
    useCollections();

  return (
    <Container>
      <CollectionForm
        collection={collection}
        setCollection={setCollection}
        collections={collections}
        setCollections={setCollections}
        isEdit={true}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <PageHeader
        title={collection?.name}
        buttonText="Edit collection"
        handleClick={() => setIsOpen(true)}
      />
      <RecipesList recipes={collection?.recipes} />
    </Container>
  );
}
