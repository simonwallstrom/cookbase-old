import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ArrowRight, Lock, Mail } from 'react-feather';
import Button from '../components/Button';
import { useUser } from '../lib/useUser';

Login.Layout = 'site';

export default function Login() {
  const { user, signIn } = useUser();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1500));
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
    else if (currentHour > 13 && currentHour < 20) return 'Time for dinner?';
    else return 'Welcome back!';
  };

  return (
    <div className="max-w-md mx-auto text-center">
      <Link href="/">
        <a className="flex items-center justify-center mt-10 space-x-2">
          <img className="w-48" src="/logo.svg" alt="Cookbase" />
        </a>
      </Link>
      <h2 className="mt-10 mb-6 text-lg">
        {greetingMessage()} Login to get started
      </h2>
      <form onSubmit={handleLogin}>
        <div className="space-y-4">
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
              className="pr-4 text-black bg-white focus:border-white border-white shadow pl-10 py-3.5"
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
              className="pr-4 text-black bg-white focus:border-white border-white shadow pl-10 py-3.5"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            className="btn btn--black shadow flex items-center space-x-2 justify-center w-full py-3.5"
            type="submit"
            loading={loading}
            disabled={!password.length || !email.length}
          >
            <span>Login</span>
            <ArrowRight size={16} />
          </Button>
        </div>
        <div className="flex items-end justify-center h-10 text-red-800">
          {errorMessage}
        </div>
      </form>
    </div>
  );
}
