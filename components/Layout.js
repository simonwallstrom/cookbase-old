import Nav from './Nav';
import MobileNav from './MobileNav';

const SiteLayout = ({ children }) => {
  return (
    <main className="flex items-center justify-center min-h-screen py-8 bg-gradient-radial from-yellow-200 to-yellow-300">
      <div className="w-full max-w-xl text-center">{children}</div>
    </main>
  );
};

const AppLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Nav />
      <MobileNav />
      <main className="flex flex-col flex-1">{children}</main>
    </div>
  );
};

export const Layout = ({ children, type = 'app' }) => {
  if (type == 'site') return <SiteLayout>{children}</SiteLayout>;

  return <AppLayout>{children}</AppLayout>;
};

export default Layout;
