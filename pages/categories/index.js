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
      <div className="space-y-4">
        {categories?.map((category) => (
          <Link key={category.id} href={`/categories/${category.slug}`}>
            <a className="flex items-center px-6 py-5 space-x-4 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200">
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
