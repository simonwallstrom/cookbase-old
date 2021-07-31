import PageHeader from '../../components/PageHeader';
import { Container } from '../../components/Ui';
import Link from 'next/link';
import { useState } from 'react';
import CollectionForm from '../../components/CollectionForm';
import useStore from '../../lib/store';

export default function Collections() {
  const [isOpen, setIsOpen] = useState(false);
  const collections = useStore((state) => state.collections);

  return (
    <Container>
      <CollectionForm isOpen={isOpen} setIsOpen={setIsOpen} />
      <PageHeader
        title="Collections"
        buttonText="New collection"
        handleClick={() => setIsOpen(true)}
      />
      <div className="grid grid-cols-2 gap-6 lg:gap-8 md:grid-cols-3">
        {collections?.map((collection) => (
          <Link key={collection.id} href={`/collections/${collection.slug}`}>
            <a className="flex flex-col items-center justify-center p-6 space-y-2 transition-colors border border-black bg-gray-50 shadow-flat rounded-xl h-44 hover:bg-gray-100">
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
