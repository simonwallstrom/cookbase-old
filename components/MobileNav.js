import Link from 'next/link';
import { Grid, Hash, Search, Settings } from 'react-feather';

export default function MobileNav() {
  return (
    <div className="fixed bottom-0 text-gray-500 flex justify-between w-full px-6 py-3.5 text-sm font-medium bg-white border-t lg:hidden">
      <Link href="/">
        <div className="flex flex-col items-center space-y-1 text-black">
          <Grid size={16} />
          <a className="hover:opacity-70">Recipes</a>
        </div>
      </Link>
      <Link href="/">
        <div className="flex flex-col items-center space-y-1">
          <Hash size={16} />
          <a className="hover:opacity-70">Categories</a>
        </div>
      </Link>
      <Link href="/">
        <div className="flex flex-col items-center space-y-1">
          <Search size={16} />
          <a className="hover:opacity-70">Search</a>
        </div>
      </Link>
      <Link href="/">
        <div className="flex flex-col items-center space-y-1">
          <Settings size={16} />
          <a className="hover:opacity-70">Account</a>
        </div>
      </Link>
    </div>
  );
}
