import PageHeader from '../../components/PageHeader';
import { Container } from '../../components/Ui';
import { PlusCircle } from 'react-feather';
import Link from 'next/link';

export default function Collections({ collections, isOpen, setIsOpen }) {
  return (
    <Container>
      <PageHeader
        title="Collections"
        buttonText="New collection"
        buttonURL="/collections/new"
      />
      <div className="grid grid-cols-2 gap-6 lg:gap-8 md:grid-cols-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col items-center justify-center p-6 space-y-2 border border-gray-300 border-dashed rounded-lg h-44 hover:bg-gray-100"
        >
          <PlusCircle />
          <h2 className="font-medium">Add new collection</h2>
        </button>
        {collections?.map((collection) => (
          <Link key={collection.id} href={`/collections/${collection.slug}`}>
            <a className="flex flex-col items-center justify-center p-6 space-y-2 bg-gray-100 rounded-lg h-44 hover:bg-gray-200">
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
