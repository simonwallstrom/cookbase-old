import { supabase } from '../../lib/supabase';

export default async function Recipes(req, res) {
  const session = supabase.auth.session();
  console.log(session);

  let { data: recipes, error } = await supabase
    .from('public_recipes')
    .select('id, slug, name, image')
    .order('name', { ascending: true });
  if (error) console.log('error', error);
  res.status(200).json(recipes);
}
