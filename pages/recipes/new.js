import RecipeForm from '../../components/RecipeForm';

export default function New() {
  return (
    <div className="w-full max-w-5xl px-12 pt-8 pb-16 mx-auto">
      <h1 className="mt-1 text-3xl font-extrabold">New recipe</h1>
      <RecipeForm />
    </div>
  );
}
