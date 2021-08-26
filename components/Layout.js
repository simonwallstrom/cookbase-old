import Nav from './Nav';
import MobileNav from './MobileNav';
import { useUser } from '../lib/useUser';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SiteLayout = ({ children }) => {
  return (
    <main className="flex items-center justify-center flex-1 p-6 bg-yellow-300">
      <img className="absolute top-0 left-0 w-1/4 max-w-[250px]" src="/fish-bg.svg" alt="" />
      <img className="absolute bottom-0 right-0 w-1/3 max-w-[350px]" src="/pizza-bg.svg" alt="" />
      <div className="w-full max-w-xl text-center">{children}</div>
    </main>
  );
};

const AppLayout = ({ children }) => {
  const { userLoading, loggedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!userLoading && !loggedIn) {
      router.replace('/login');
    }
  }, [userLoading, loggedIn]);

  return (
    <div className="flex">
      <Nav />
      <MobileNav />
      <main className="flex flex-col flex-1 pb-[69px] lg:pb-0">{children}</main>
    </div>
  );
};

export const Layout = ({ children, type = 'app' }) => {
  if (type == 'site') return <SiteLayout>{children}</SiteLayout>;

  return <AppLayout>{children}</AppLayout>;
};

export default Layout;
