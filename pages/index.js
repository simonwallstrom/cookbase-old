import Link from 'next/link';
import { ArrowRight } from 'react-feather';
import { useUser } from '../lib/useUser';

Home.Layout = 'site';

export default function Home() {
  const { user } = useUser();

  return (
    <>
      <div className="flex items-center justify-center space-x-2">
        <img className="w-48" src="/logo.svg" alt="Cookbase" />
      </div>
      <h2 className="mt-10 text-lg">
        Meet Cookbase – The opinionated way to collect and store your favourite
        recipes. Most recipe apps do too much – We try to keep the simplicity of
        the handwritten experience.
      </h2>
      <div className="flex justify-center mt-6">
        {user ? (
          <Link href="/recipes">
            <a className="flex items-center space-x-2 px-6 py-3.5 font-medium hover:bg-gray-800 focus:bg-black rounded-xl bg-black text-white">
              <span>Continue to the app</span>
              <ArrowRight size={16} />
            </a>
          </Link>
        ) : (
          <Link href="/signin">
            <a className="flex items-center space-x-2 px-6 py-3.5 font-medium hover:bg-gray-800 focus:bg-black rounded-xl bg-black text-white">
              <span>Sign in to get started</span>
              <ArrowRight size={16} />
            </a>
          </Link>
        )}
      </div>
      <div className="mt-6 text-sm opacity-70">
        We are currently in closed beta
      </div>
    </>
  );
}
