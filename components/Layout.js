import Nav from './Nav';
import MobileNav from './MobileNav';

const SiteLayout = ({ children }) => {
  return (
    <main className="flex items-center justify-center flex-1 p-6 bg-yellow-300">
      <div className="w-full max-w-xl text-center">{children}</div>
    </main>
  );
};

const AppLayout = ({ children }) => {
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
