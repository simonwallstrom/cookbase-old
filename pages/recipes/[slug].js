import { useRouter } from 'next/router';
import Link from 'next/link';
import { ArrowLeft, Hash, MoreHorizontal } from 'react-feather';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

const ListItem = ({ val }) => {
  if (val.endsWith(':') || val.trimEnd().endsWith(':')) {
    return (
      <li className="-ml-5 list-none">
        <h3 className="mt-4 mb-2 text-lg font-semibold text-black">{val}</h3>
      </li>
    );
  } else {
    return (
      <li className="leading-snug">
        <span>{val}</span>
      </li>
    );
  }
};

const RecipeDetails = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(false);

  const getRecipe = async (slug) => {
    setLoading(true);
    // await new Promise((res) => setTimeout(res, 1500));
    let { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('slug', slug)
      .single();
    setRecipe(data);
    setLoading(false);
    if (error) console.log('error', error);
  };

  useEffect(() => {
    if (slug) {
      getRecipe(slug);
    }
  }, [slug]);

  return (
    <>
      <div className="relative">
        <img
          src="https://images.pexels.com/photos/4676441/pexels-photo-4676441.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          className="absolute object-cover w-full h-full"
        />
        {/* <div className="w-full max-w-5xl px-12 pt-8 pb-16 mx-auto"></div> */}
        <div className="relative flex flex-col justify-between pt-8 pb-10 bg-black bg-opacity-60 h-96">
          <div className="w-full max-w-5xl px-12 mx-auto">
            <div className="flex items-center justify-between">
              <Link href="/recipes">
                <a className="flex items-center p-3 leading-snug bg-white rounded-full hover:bg-gray-200">
                  <ArrowLeft size={20} />
                </a>
              </Link>
              <div className="flex space-x-4">
                <button className="flex items-center p-3 leading-snug bg-white rounded-full hover:bg-gray-200">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>
          </div>
          <div className="w-full max-w-5xl px-12 mx-auto">
            <div className="max-w-3xl">
              <div className="flex items-center space-x-1.5 text-sm font-medium text-white">
                <Hash size={16} />
                <span>Varmrätt</span>
              </div>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <h1 className="my-2 text-4xl font-extrabold leading-tight text-white line-clamp-2">
                  {recipe?.name}
                </h1>
              )}
              {recipe?.description ? (
                <div>
                  <p className="font-medium text-white line-clamp-3">
                    {recipe?.description}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 w-full max-w-5xl gap-12 px-12 mx-auto md:flex-row">
        <div className="pt-10 md:border-r md:pr-12 md:w-1/3 pb-44">
          <div className="flex flex-wrap items-baseline mb-4 lg:justify-between">
            <h2 className="mr-2 text-2xl font-bold">Ingredients</h2>
            <div className="text-sm font-medium text-gray-500">
              {recipe?.servings} servings
            </div>
          </div>
          {!loading ? (
            <div>
              <ul className="pl-5 space-y-2 text-gray-700 list-disc">
                {recipe?.ingredients?.map((ingredient, index) => (
                  <ListItem key={index} val={ingredient} />
                ))}
              </ul>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="pt-10 md:w-2/3 pb-44">
          <h2 className="mb-4 text-2xl font-bold">Instructions</h2>
          {!loading ? (
            <div>
              <ol className="pl-5 space-y-3.5 text-gray-700 custom-instruction-list">
                {recipe?.instructions?.map((instruction, index) => (
                  <ListItem key={index} val={instruction} />
                ))}
              </ol>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </>
  );
};

export default RecipeDetails;
