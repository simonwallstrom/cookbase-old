import Link from 'next/link';
import { Grid, Hash, Search, Settings } from 'react-feather';
import { useRouter } from 'next/router';

function MobileNavLink({ children, href }) {
  const router = useRouter();
  const classNames = router.asPath === href ? 'bg-yellow-300' : '';

  return (
    <Link href={href}>
      <a
        className={`flex -mt-px flex-col py-3.5 items-center flex-1 space-y-1 ${classNames}`}
      >
        {children}
      </a>
    </Link>
  );
}

export default function MobileNav() {
  return (
    <div className="fixed bottom-0 z-50 flex w-full text-xs font-medium bg-white border-t backdrop-blur-md backdrop-filter bg-opacity-90 lg:hidden">
      <MobileNavLink href="/recipes">
        <Grid size={16} />
        <div>Recipes</div>
      </MobileNavLink>
      <MobileNavLink href="/categories">
        <Hash size={16} />
        <div>Categories</div>
      </MobileNavLink>
      <MobileNavLink href="/search">
        <Search size={16} />
        <div>Search</div>
      </MobileNavLink>
      <MobileNavLink href="/account">
        <Settings size={16} />
        <div>Account</div>
      </MobileNavLink>
    </div>
  );
}
