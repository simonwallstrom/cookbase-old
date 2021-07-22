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
      {/* <h1 className="text-5xl font-black mt-14">
        Collect and store your{' '}
        <span
          style={{ textShadow: '1px 1px black' }}
          className="text-pink-400 text-stroke"
        >
          favourite recipes
        </span>
      </h1> */}
      <h2 className="mt-10 text-lg">
        Meet Cookbase – The simple way to collect and organize your favourite
        recipes. Most recipe apps do too much – We aim to keep the simplicity of
        the handwritten experience.
      </h2>
      <div className="flex justify-center mt-8">
        {user ? (
          <Link href="/recipes">
            <a className="flex items-center space-x-2 px-6 py-3.5 font-medium hover:bg-gray-800 focus:bg-black rounded-xl bg-black text-white">
              <span>Continue to the app</span>
              <ArrowRight size={16} />
            </a>
          </Link>
        ) : (
          <Link href="/signin">
            <a className="flex items-center py-3.5 space-x-2 hover:translate-x-[1px] transition-all hover:translate-y-[1px] hover:shadow-none font-medium bg-pink-300 hover:bg-pink-400 border border-black pl-7 pr-6 rounded-lg shadow-flat">
              <span>Login to get started</span>
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
