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
        Meet Cookbase – The simple way to collect and organize your favourite
        recipes. Most recipe apps do too much – We aim to keep the simplicity of
        the handwritten experience.
      </h2>
      <div className="flex justify-center mt-8">
        {user ? (
          <Link href="/recipes">
            <a className="btn btn--black flex items-center space-x-2 justify-center px-7 py-3.5">
              <span>Continue to the app</span>
              <ArrowRight size={16} />
            </a>
          </Link>
        ) : (
          <Link href="/login">
            <a className="btn btn--black flex items-center space-x-2 justify-center px-7 py-3.5">
              <span>Login to get started</span>
              <ArrowRight size={16} />
            </a>
          </Link>
        )}
      </div>
      {!user ? (
        <div className="mt-6 text-sm">
          <span className="opacity-70">Don't have an account yet?</span>{' '}
          <Link href="/signup">
            <a className="border-b border-black border-dashed opacity-100 hover:border-solid">
              Sign up
            </a>
          </Link>
        </div>
      ) : null}
    </>
  );
}
