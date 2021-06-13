import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import PageHeader from '../../components/PageHeader';
import RecipesList from '../../components/RecipesList';
import { Container } from '../../components/Ui';
import Link from 'next/link';

export default function Recipe() {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    let { data: recipes, error } = await supabase
      .from('recipes')
      .select('id, slug, name, image, created', { count: 'exact' })
      .limit(0);
    if (error) console.log('error', error);
    setRecipes(recipes);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <Container>
      <PageHeader title="Most recent" />
      <RecipesList recipes={recipes} />
      <div className="flex flex-col items-center justify-center px-8 py-10 border-2 border-dashed">
        <svg
          width="110"
          height="110"
          className="mb-4"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50.123 90C72.2144 90 90.123 72.0914 90.123 50C90.123 27.9086 72.2144 10 50.123 10C28.0317 10 10.123 27.9086 10.123 50C10.123 72.0914 28.0317 90 50.123 90Z"
            fill="#F3F3F3"
          />
          <path
            d="M50.7182 80.769C61.2558 80.769 69.7982 79.7831 69.7982 78.567C69.7982 77.3509 61.2558 76.365 50.7182 76.365C40.1806 76.365 31.6382 77.3509 31.6382 78.567C31.6382 79.7831 40.1806 80.769 50.7182 80.769Z"
            fill="white"
          />
          <path
            d="M50.7177 68.006C64.1101 68.006 74.9668 57.1493 74.9668 43.757C74.9668 30.3646 64.1101 19.508 50.7177 19.508C37.3254 19.508 26.4688 30.3646 26.4688 43.757C26.4688 57.1493 37.3254 68.006 50.7177 68.006Z"
            fill="white"
          />
          <path
            d="M50.7177 68.006C64.1101 68.006 74.9668 57.1493 74.9668 43.757C74.9668 30.3646 64.1101 19.508 50.7177 19.508C37.3254 19.508 26.4688 30.3646 26.4688 43.757C26.4688 57.1493 37.3254 68.006 50.7177 68.006Z"
            stroke="black"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M50.7181 56.52C57.7669 56.52 63.4811 50.8058 63.4811 43.757C63.4811 36.7082 57.7669 30.994 50.7181 30.994C43.6693 30.994 37.9551 36.7082 37.9551 43.757C37.9551 50.8058 43.6693 56.52 50.7181 56.52Z"
            fill="white"
          />
          <path
            d="M50.7181 56.52C57.7669 56.52 63.4811 50.8058 63.4811 43.757C63.4811 36.7082 57.7669 30.994 50.7181 30.994C43.6693 30.994 37.9551 36.7082 37.9551 43.757C37.9551 50.8058 43.6693 56.52 50.7181 56.52Z"
            stroke="black"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M87.9878 68.025C88.0326 68.5051 87.9767 68.9893 87.8237 69.4465C87.6707 69.9038 87.4239 70.3241 87.0992 70.6805C86.7745 71.037 86.3789 71.3218 85.9379 71.5166C85.4968 71.7114 85.0199 71.8121 84.5378 71.8121C84.0556 71.8121 83.5787 71.7114 83.1376 71.5166C82.6966 71.3218 82.301 71.037 81.9763 70.6805C81.6516 70.3241 81.4048 69.9038 81.2518 69.4465C81.0988 68.9893 81.0429 68.5051 81.0878 68.025L83.1318 47.579C83.1677 47.2318 83.3311 46.9102 83.5903 46.6765C83.8495 46.4427 84.1862 46.3133 84.5353 46.3133C84.8843 46.3133 85.221 46.4427 85.4802 46.6765C85.7394 46.9102 85.9028 47.2318 85.9388 47.579L87.9878 68.025Z"
            fill="white"
          />
          <path
            d="M87.9878 68.025C88.0326 68.5051 87.9767 68.9893 87.8237 69.4465C87.6707 69.9038 87.4239 70.3241 87.0992 70.6805C86.7745 71.037 86.3789 71.3218 85.9379 71.5166C85.4968 71.7114 85.0199 71.8121 84.5378 71.8121C84.0556 71.8121 83.5787 71.7114 83.1376 71.5166C82.6966 71.3218 82.301 71.037 81.9763 70.6805C81.6516 70.3241 81.4048 69.9038 81.2518 69.4465C81.0988 68.9893 81.0429 68.5051 81.0878 68.025L83.1318 47.579C83.1677 47.2318 83.3311 46.9102 83.5903 46.6765C83.8495 46.4427 84.1862 46.3133 84.5353 46.3133C84.8843 46.3133 85.221 46.4427 85.4802 46.6765C85.7394 46.9102 85.9028 47.2318 85.9388 47.579L87.9878 68.025Z"
            stroke="black"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M84.5399 46.309C83.5244 46.309 82.5505 45.9056 81.8324 45.1875C81.1144 44.4694 80.7109 43.4955 80.7109 42.48V25.889C80.7121 24.1244 81.3224 22.4144 82.4388 21.0479C83.5552 19.6813 85.1091 18.7421 86.8379 18.389C87.0234 18.3513 87.2149 18.3554 87.3986 18.4009C87.5823 18.4463 87.7536 18.5321 87.9 18.652C88.0465 18.7718 88.1644 18.9227 88.2454 19.0938C88.3263 19.2648 88.3682 19.4518 88.3679 19.641V42.48C88.3681 42.9828 88.2692 43.4807 88.0768 43.9452C87.8845 44.4098 87.6026 44.8319 87.2471 45.1875C86.8916 45.543 86.4696 45.8251 86.0051 46.0175C85.5406 46.21 85.0427 46.309 84.5399 46.309V46.309Z"
            fill="white"
          />
          <path
            d="M84.5399 46.309C83.5244 46.309 82.5505 45.9056 81.8324 45.1875C81.1144 44.4694 80.7109 43.4955 80.7109 42.48V25.889C80.7121 24.1244 81.3224 22.4144 82.4388 21.0479C83.5552 19.6813 85.1091 18.7421 86.8379 18.389C87.0234 18.3513 87.2149 18.3554 87.3986 18.4009C87.5823 18.4463 87.7536 18.5321 87.9 18.652C88.0465 18.7718 88.1644 18.9227 88.2454 19.0938C88.3263 19.2648 88.3682 19.4518 88.3679 19.641V42.48C88.3681 42.9828 88.2692 43.4807 88.0768 43.9452C87.8845 44.4098 87.6026 44.8319 87.2471 45.1875C86.8916 45.543 86.4696 45.8251 86.0051 46.0175C85.5406 46.21 85.0427 46.309 84.5399 46.309V46.309Z"
            stroke="black"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M19.7509 70.578C19.7958 71.0581 19.7399 71.5423 19.5869 71.9995C19.4339 72.4568 19.1871 72.8771 18.8624 73.2336C18.5377 73.59 18.1421 73.8748 17.7011 74.0696C17.26 74.2645 16.7831 74.3651 16.3009 74.3651C15.8188 74.3651 15.3419 74.2645 14.9008 74.0696C14.4597 73.8748 14.0642 73.59 13.7395 73.2336C13.4148 72.8771 13.168 72.4568 13.015 71.9995C12.862 71.5423 12.8061 71.0581 12.8509 70.578L14.8999 39.922C14.9359 39.5748 15.0992 39.2532 15.3585 39.0195C15.6177 38.7857 15.9544 38.6563 16.3034 38.6563C16.6525 38.6563 16.9892 38.7857 17.2484 39.0195C17.5076 39.2532 17.671 39.5748 17.7069 39.922L19.7509 70.578Z"
            fill="white"
          />
          <path
            d="M19.7509 70.578C19.7958 71.0581 19.7399 71.5423 19.5869 71.9995C19.4339 72.4568 19.1871 72.8771 18.8624 73.2336C18.5377 73.59 18.1421 73.8748 17.7011 74.0696C17.26 74.2645 16.7831 74.3651 16.3009 74.3651C15.8188 74.3651 15.3419 74.2645 14.9008 74.0696C14.4597 73.8748 14.0642 73.59 13.7395 73.2336C13.4148 72.8771 13.168 72.4568 13.015 71.9995C12.862 71.5423 12.8061 71.0581 12.8509 70.578L14.8999 39.922C14.9359 39.5748 15.0992 39.2532 15.3585 39.0195C15.6177 38.7857 15.9544 38.6563 16.3034 38.6563C16.6525 38.6563 16.9892 38.7857 17.2484 39.0195C17.5076 39.2532 17.671 39.5748 17.7069 39.922L19.7509 70.578Z"
            fill="white"
            stroke="black"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M22.64 19.507V33.546C22.64 36.367 20.64 38.652 18.173 38.652H14.344C11.881 38.652 9.87695 36.367 9.87695 33.546V19.507C9.88626 19.1747 10.0248 18.859 10.2632 18.6272C10.5016 18.3954 10.821 18.2657 11.1535 18.2657C11.4859 18.2657 11.8053 18.3954 12.0437 18.6272C12.2821 18.859 12.4207 19.1747 12.43 19.507V30.994C12.43 31.3324 12.5644 31.657 12.8037 31.8963C13.043 32.1356 13.3675 32.27 13.706 32.27C14.0444 32.27 14.3689 32.1356 14.6082 31.8963C14.8475 31.657 14.982 31.3324 14.982 30.994V19.507C14.9913 19.1747 15.1298 18.859 15.3682 18.6272C15.6066 18.3954 15.926 18.2657 16.2585 18.2657C16.5909 18.2657 16.9103 18.3954 17.1487 18.6272C17.3871 18.859 17.5256 19.1747 17.535 19.507V30.994C17.535 31.3324 17.6694 31.657 17.9087 31.8963C18.148 32.1356 18.4725 32.27 18.811 32.27C19.1494 32.27 19.4739 32.1356 19.7132 31.8963C19.9525 31.657 20.087 31.3324 20.087 30.994V19.507C20.0963 19.1747 20.2348 18.859 20.4732 18.6272C20.7116 18.3954 21.031 18.2657 21.3635 18.2657C21.6959 18.2657 22.0153 18.3954 22.2537 18.6272C22.4921 18.859 22.6306 19.1747 22.64 19.507Z"
            fill="white"
          />
          <path
            d="M22.64 19.507V33.546C22.64 36.367 20.64 38.652 18.173 38.652H14.344C11.881 38.652 9.87695 36.367 9.87695 33.546V19.507C9.88626 19.1747 10.0248 18.859 10.2632 18.6272C10.5016 18.3954 10.821 18.2657 11.1535 18.2657C11.4859 18.2657 11.8053 18.3954 12.0437 18.6272C12.2821 18.859 12.4207 19.1747 12.43 19.507V30.994C12.43 31.3324 12.5644 31.657 12.8037 31.8963C13.043 32.1356 13.3675 32.27 13.706 32.27C14.0444 32.27 14.3689 32.1356 14.6082 31.8963C14.8475 31.657 14.982 31.3324 14.982 30.994V19.507C14.9913 19.1747 15.1298 18.859 15.3682 18.6272C15.6066 18.3954 15.926 18.2657 16.2585 18.2657C16.5909 18.2657 16.9103 18.3954 17.1487 18.6272C17.3871 18.859 17.5256 19.1747 17.535 19.507V30.994C17.535 31.3324 17.6694 31.657 17.9087 31.8963C18.148 32.1356 18.4725 32.27 18.811 32.27C19.1494 32.27 19.4739 32.1356 19.7132 31.8963C19.9525 31.657 20.087 31.3324 20.087 30.994V19.507C20.0963 19.1747 20.2348 18.859 20.4732 18.6272C20.7116 18.3954 21.031 18.2657 21.3635 18.2657C21.6959 18.2657 22.0153 18.3954 22.2537 18.6272C22.4921 18.859 22.6306 19.1747 22.64 19.507Z"
            fill="white"
            stroke="black"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <h2 className="text-2xl font-bold">Start building your Cookbase</h2>
        <p className="mt-4 mb-6 text-lg text-gray-700">
          There's nothing here yet, so let's create a new recipe.
        </p>
        <Link href="/recipes/new">
          <a className="btn btn--primary">
            <span>New recipe</span>
          </a>
        </Link>
      </div>
    </Container>
  );
}
