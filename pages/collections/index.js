import PageHeader from '../../components/PageHeader';
import { Container } from '../../components/Ui';
import Link from 'next/link';
import { useCollections } from '../../lib/useCollections';
import { useState } from 'react';
import CollectionForm from '../../components/CollectionForm';
import { useIsMounted } from '../../lib/useIsMounted';

export default function Collections() {
  const { collections, setCollections } = useCollections();
  const [isOpen, setIsOpen] = useState(false);
  // const isMounted = useIsMounted();

  return (
    <Container>
      <CollectionForm
        collections={collections}
        setCollections={setCollections}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <PageHeader
        title="Collections"
        buttonText="New collection"
        handleClick={() => setIsOpen(true)}
      />
      <div className="grid grid-cols-2 gap-6 lg:gap-8 md:grid-cols-3">
        {collections?.map((collection) => (
          <Link key={collection.id} href={`/collections/${collection.slug}`}>
            <a className="flex flex-col items-center justify-center p-6 space-y-2 transition-colors border border-gray-300 border-dashed rounded-lg h-44 hover:bg-gray-100">
              <h2 className="font-medium">{collection.name}</h2>
              <div className="text-gray-600">
                {collection.count > 0 ? collection.count : 0} recipes
              </div>
            </a>
          </Link>
        ))}
      </div>
    </Container>
  );
}
