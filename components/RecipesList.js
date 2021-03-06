import Link from 'next/link';
import Image from 'next/image';
import { Loader } from 'react-feather';

const RecipesList = ({ loading, recipes }) => {
  console.log(recipes);
  if (loading) {
    return (
      <div className="flex items-center justify-center rounded-lg h-44">
        <Loader className="animate-spin" size={24} />
      </div>
    );
  }
  if (recipes?.length === 0) {
    return (
      <div className="flex items-center justify-center px-6 py-12 text-center border-2 border-gray-200 border-dashed rounded-lg md:py-24">
        No recipes to show
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8 md:grid-cols-3">
      {recipes?.map((recipe) => (
        <Link key={recipe.id} href={`/recipes/${recipe.slug}`}>
          <a className="transition-opacity hover:opacity-70">
            {recipe.image ? (
              <div className="overflow-hidden bg-yellow-200 rounded-lg">
                <Image
                  src={recipe.image}
                  alt={recipe.name}
                  width={800}
                  height={500}
                  layout="responsive"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-2 transition-colors border border-black bg-gray-50 rounded-xl h-44 hover:bg-gray-100">
                Image
              </div>
            )}

            <div className="mt-2">
              <h2 className="font-medium leading-tight line-clamp-1">
                {recipe.name}
              </h2>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default RecipesList;
