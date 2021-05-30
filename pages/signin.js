import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ArrowRight, Loader, Lock, Mail } from 'react-feather';
import { useUser } from '../lib/useUser';

Signin.Layout = 'site';

export default function Signin() {
  const { user, signIn } = useUser();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error, user } = await signIn({ email, password });
    if (!error && !user) alert('Check your email for the login link!');
    if (error) setErrorMessage(error.message);
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      router.replace('/recipes');
    }
  }, [user]);

  const greetingMessage = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 4 && currentHour < 10) return 'Time for breakfast?';
    else if (currentHour >= 10 && currentHour <= 13) return 'Time for lunch?';
    else if (currentHour > 13 || currentHour < 20) return 'Time for dinner?';
    else return 'Welcome back';
  };

  return (
    <div className="max-w-md mx-auto text-center">
      <Link href="/">
        <a className="flex items-center justify-center space-x-2">
          <img className="w-48" src="/logo.svg" alt="Cookbase" />
        </a>
      </Link>
      <h2 className="mt-10 mb-6 text-lg">
        {greetingMessage()} Sign in to get started
      </h2>
      <form onSubmit={handleSignIn}>
        <div className="rounded-lg shadow-sm">
          <label className="sr-only" htmlFor="email">
            Your email
          </label>
          <div className="relative mb-4 text-gray-400 focus-within:text-black">
            <div className="absolute inset-y-0 flex items-center pl-4">
              <Mail size={16} />
            </div>
            <input
              type="email"
              id="email"
              autoFocus={true}
              required={true}
              autoComplete="username"
              className="w-full pr-4 pl-10 py-3.5"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <label className="sr-only" htmlFor="password">
            Your password
          </label>
          <div className="relative text-gray-400 focus-within:text-black">
            <div className="absolute inset-y-0 flex items-center pl-4">
              <Lock size={16} />
            </div>
            <input
              type="password"
              id="password"
              required={true}
              autoComplete="current-password"
              className="w-full pr-4 pl-10 py-3.5"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button
          className={`flex items-center space-x-2 px-6 w-full justify-center mt-8 py-3.5 font-medium hover:bg-gray-800 focus:bg-black rounded-lg bg-black text-white ${
            !password.length || !email.length ? ' cursor-not-allowed' : ''
          }`}
          type="submit"
          disabled={!password.length || !email.length}
        >
          <span>Sign in</span>
          {loading ? (
            <Loader className="animate-spin" size={16} />
          ) : (
            <ArrowRight size={16} />
          )}
        </button>
        <div>{errorMessage}</div>
      </form>
      {/* <form onSubmit={handleSignIn}>
        <div className="rounded-lg shadow-sm">
          <label className="sr-only" htmlFor="email">
            Your email
          </label>
          <div className="relative text-gray-400 focus-within:text-black">
            <div className="absolute inset-y-0 flex items-center pl-4">
              <Mail size={16} />
            </div>
            <input
              type="email"
              id="email"
              autoFocus={true}
              required={true}
              autoComplete="username"
              className="w-full pr-4 pl-10 py-3.5 focus:outline-none mb-px border-none rounded-none rounded-t-lg"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <label className="sr-only" htmlFor="password">
            Your password
          </label>
          <div className="relative text-gray-400 focus-within:text-black">
            <div className="absolute inset-y-0 flex items-center pl-4">
              <Lock size={16} />
            </div>
            <input
              type="password"
              id="password"
              required={true}
              autoComplete="current-password"
              className="w-full pr-4 pl-10 py-3.5 focus:outline-none border-none rounded-none rounded-b-lg"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button
          className={`flex items-center space-x-2 px-6 w-full justify-center mt-8 py-3.5 font-medium hover:bg-gray-800 focus:bg-black rounded-lg bg-black text-white ${
            !password.length || !email.length ? ' cursor-not-allowed' : ''
          }`}
          type="submit"
          disabled={!password.length || !email.length}
        >
          <span>Sign in</span>
          {loading ? (
            <Loader className="animate-spin" size={16} />
          ) : (
            <ArrowRight size={16} />
          )}
        </button>
        <div>{errorMessage}</div>
      </form> */}
    </div>
  );
}
