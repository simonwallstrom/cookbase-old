import Nav from './Nav';
import MobileNav from './MobileNav';

const SiteLayout = ({ children }) => {
  return (
    <main className="flex items-center justify-center min-h-screen py-8">
      <div className="w-full max-w-xl text-center">{children}</div>
    </main>
  );
};

const AppLayout = ({ children, collections }) => {
  const simon = 'simon';
  return (
    <div className="flex min-h-screen">
      <Nav collections={collections} />
      <MobileNav />
      <main className="flex flex-col flex-1">{children}</main>
    </div>
  );
};

export const Layout = ({ children, type = 'app', collections }) => {
  if (type == 'site') return <SiteLayout>{children}</SiteLayout>;

  return <AppLayout collections={collections}>{children}</AppLayout>;
};

export default Layout;
