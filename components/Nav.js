import Link from 'next/link';
import { Book, Bookmark, Search, Settings, Star } from 'react-feather';
import NavLink from './NavLink';
import useStore from '../lib/store';
import { useEffect } from 'react';

export default function Nav() {
  const collections = useStore((state) => state.collections);
  const getAllCollections = useStore((state) => state.getAllCollections);

  useEffect(() => {
    getAllCollections();
  }, []);

  return (
    <nav className="sticky top-0 flex-col hidden h-screen bg-gray-100 border-r border-black lg:flex w-72">
      <div className="flex items-center justify-between p-10 pb-9">
        <Link href="/recipes">
          <a>
            <img className="w-40" src="/logo.svg" alt="Cookbase" />
          </a>
        </Link>
      </div>
      <div className="flex flex-col">
        <NavLink href="/recipes">
          <div className="flex items-center space-x-2">
            <Book size={20} />
            <span>Recipes</span>
          </div>
        </NavLink>
        <NavLink href="/recipes/starred">
          <div className="flex items-center space-x-2">
            <Star size={20} />
            <span>Starred</span>
          </div>
        </NavLink>
        <NavLink href="/search">
          <div className="flex items-center space-x-2">
            <Search size={20} />
            <span>Search</span>
          </div>
        </NavLink>
      </div>
      <div className="flex items-center justify-between px-10 mt-10 mb-3 font-mono text-sm uppercase">
        <div>Collections</div>
        <Link href="/collections">
          <a className="text-xs hover:underline">View all →</a>
        </Link>
      </div>
      <div className="flex flex-col pb-px overflow-y-scroll">
        {collections?.map((collection) => (
          <NavLink key={collection.id} href={`/collections/${collection.slug}`}>
            <div className="flex items-center space-x-2">
              <Bookmark size={16} />
              <div className="line-clamp-1">{collection.name}</div>
            </div>
          </NavLink>
        ))}
      </div>
      <div className="flex items-end flex-1">
        <div className="flex flex-col w-full">
          <NavLink href="/account">
            <div className="flex items-center py-3 space-x-2">
              <Settings size={16} />
              <span>My account</span>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
