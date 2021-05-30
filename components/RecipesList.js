import Link from 'next/link';
import { Image } from 'react-feather';

const RecipesList = ({ recipes }) => {
  return (
    <div className="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-2 xl:grid-cols-3">
      {recipes?.map((recipe) => (
        <Link key={recipe.id} href={`/recipes/${recipe.slug}`}>
          <a className="hover:opacity-70">
            {recipe.image ? (
              <img
                src={recipe.image}
                alt={recipe.name}
                className="object-cover w-full h-40 rounded-lg"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-40 bg-gray-100 rounded-lg">
                <Image className="text-gray-400" />
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
