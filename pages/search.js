import { Container } from '../components/Ui';
import Button from '../components/Button';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import RecipesList from '../components/RecipesList';

export default function Search() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [emptyState, setEmptyState] = useState(true);

  const searchRecipe = async (e) => {
    setEmptyState(false);
    setLoading(true);
    e.preventDefault();
    const { data, error } = await supabase
      .from('recipes')
      .select('id, slug, name, image')
      .textSearch('name', search, {
        type: 'phrase',
        config: 'english',
      });
    if (error) console.log('error', error);
    setRecipes(data);
    setLoading(false);
  };

  return (
    <Container>
      <div className="py-6 md:py-8">
        <div className="flex items-center justify-between">
          <div className="flex">
            <h1 className="text-3xl font-black leading-normal">Search</h1>
          </div>
          <form onSubmit={searchRecipe}>
            <div className="flex space-x-4">
              <input
                className="w-72"
                placeholder="Lasagna..."
                value={search}
                autoFocus={true}
                type="text"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button className="btn btn--pink">Search</Button>
            </div>
          </form>
        </div>
      </div>
      {emptyState ? (
        <div className="flex items-center justify-center text-lg border border-black rounded-lg shadow-flat h-72">
          Time to cook your favorite recipe? Search above ☝️
        </div>
      ) : (
        <RecipesList loading={loading} recipes={recipes} />
      )}
    </Container>
  );
}
