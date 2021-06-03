import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useUser } from '../lib/useUser';
import Button from './Button';

export default function RecipeForm({ isEdit, loadingRecipe, editRecipe }) {
  const router = useRouter();
  const { user } = useUser();

  const [recipeName, setRecipeName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [servings, setServings] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setRecipeName(editRecipe?.name || '');
    setDescription(editRecipe?.description || '');
    setCategory(editRecipe?.category || '');
    setServings(editRecipe?.servings || '');
    setIngredients(arrayToText(editRecipe?.ingredients || ''));
    setInstructions(arrayToText(editRecipe?.instructions || ''));
  }, [editRecipe]);

  const fetchCategories = async () => {
    let { data: categories, error } = await supabase
      .from('categories')
      .select('id, name')
      .order('name', { ascending: true });
    if (error) console.log('error', error);
    setCategories(categories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  function textToArray(str) {
    let text = str?.split(/\r?\n/).filter((item) => item.length);
    return text;
  }

  function arrayToText(arr) {
    if (arr && arr.length > 0) {
      let text = arr.join('\n');
      return text;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1500));

    const recipeData = {
      name: recipeName,
      description: description,
      category: 2,
      servings: Number(servings),
      ingredients: textToArray(ingredients),
      instructions: textToArray(instructions),
      user_id: user.id,
    };

    if (isEdit) {
      const { data, error } = await supabase
        .from('recipes')
        .update(recipeData)
        .eq('slug', editRecipe.slug);
      if (error) setErrorMessage(error.message);
      if (data) {
        router.replace('/recipes/' + data[0].slug);
      }
    } else {
      const { data, error } = await supabase.from('recipes').insert(recipeData);
      if (error) setErrorMessage(error.message);
      if (data) {
        router.replace('/recipes/' + data[0].slug);
      }
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6 mt-8 md:gap-12 md:flex-row">
        <div className="flex-1">
          <div className="">
            <label htmlFor="recipeName">Recipe name</label>
            <input
              type="text"
              id="recipeName"
              placeholder="Smash burger..."
              value={recipeName}
              disabled={loadingRecipe}
              autoFocus
              onChange={(e) => setRecipeName(e.target.value)}
            />
          </div>
          <div className="mt-6">
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              id="description"
              placeholder="The best way to make a mean burger..."
              value={description}
              disabled={loadingRecipe}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="flex flex-col gap-6 mt-6 md:flex-row">
            <div className="md:w-2/3">
              <label htmlFor="category">Category</label>
              <select
                className="leading-normal"
                type="text"
                id="category"
                value={category}
                disabled={loadingRecipe}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="choose">Choose category...</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:w-1/3">
              <label htmlFor="servings">Servings</label>
              <input
                type="number"
                id="servings"
                placeholder="4"
                value={servings}
                disabled={loadingRecipe}
                onChange={(e) => setServings(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 order-first md:order-none">
          <div>Cover photo</div>
          <div className="flex items-center justify-center flex-1 px-6 py-16 mt-1 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto text-gray-400 w-14 h-14"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <div className="flex text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative font-medium text-black underline cursor-pointer hover:text-gray-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-black"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 mt-6 md:gap-12 md:flex-row">
        <div className="flex-1">
          <label htmlFor="ingredients">Ingredients</label>
          <textarea
            rows="6"
            id="ingredients"
            placeholder="Brisket..."
            value={ingredients}
            disabled={loadingRecipe}
            onChange={(e) => setIngredients(e.target.value)}
          ></textarea>
          <p className="mt-2 text-sm text-gray-500">
            One ingredient per row. Add headings with a colon.
          </p>
        </div>
        <div className="flex-1">
          <label htmlFor="instructions">Instructions</label>
          <textarea
            rows="6"
            id="instructions"
            placeholder="Bring out the meat grinder..."
            value={instructions}
            disabled={loadingRecipe}
            onChange={(e) => setInstructions(e.target.value)}
          ></textarea>
          <p className="mt-2 text-sm text-gray-500">
            One step per row. Add headings with a colon.
          </p>
        </div>
      </div>
      {errorMessage ? (
        <div className="px-5 py-3 mt-8 font-medium text-red-700 bg-red-100 rounded-md">
          {errorMessage}
        </div>
      ) : null}
      <div className="flex mt-10 space-x-6">
        <Button className="btn btn--primary" loading={loading} type="submit">
          Save recipe
        </Button>
        <Link href="/recipes">
          <a className="btn">Cancel</a>
        </Link>
      </div>
    </form>
  );
}
