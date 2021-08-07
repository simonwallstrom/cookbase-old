import PageHeader from '../../components/PageHeader';
import { Container } from '../../components/Ui';
import Link from 'next/link';
import { useState } from 'react';
import CategoryForm from '../../components/CategoryForm';
import useStore from '../../lib/store';

export default function Categories() {
  const [isOpen, setIsOpen] = useState(false);
  const categories = useStore((state) => state.categories);

  return (
    <Container>
      <CategoryForm isOpen={isOpen} setIsOpen={setIsOpen} />
      <PageHeader
        title="Categories"
        buttonText="New category"
        handleClick={() => setIsOpen(true)}
      />
      <div className="grid grid-cols-2 gap-6 lg:gap-8 md:grid-cols-3">
        {categories?.map((category) => (
          <Link key={category.id} href={`/categories/${category.slug}`}>
            <a className="flex flex-col items-center justify-center p-6 space-y-2 transition-colors border border-black bg-gray-50 shadow-flat rounded-xl h-44 hover:bg-gray-100">
              <h2 className="font-medium">{category.name}</h2>
              <div className="text-gray-600">
                {category.count > 0 ? category.count : 0} recipes
              </div>
            </a>
          </Link>
        ))}
      </div>
    </Container>
  );
}
