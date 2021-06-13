import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  Book,
  Bookmark,
  Search,
  CornerDownRight,
  Settings,
  Star,
  PlusCircle,
} from 'react-feather';
import { supabase } from '../lib/supabase';
import NavLink from './navLink';

export default function Nav() {
  const [collections, setCollections] = useState([]);

  const fetchCollections = async () => {
    let { data: collections, error } = await supabase
      .from('collections_with_recipe_count')
      .select('*')
      .limit(3);
    if (error) console.log('error', error);
    setCollections(collections);
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <nav className="sticky top-0 flex-col hidden h-screen bg-gray-100 lg:flex w-72">
      <div className="flex items-center justify-between p-10">
        <Link href="/recipes">
          <a>
            <img className="w-36" src="/logo.svg" alt="Cookbase" />
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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Search size={20} />
              <span>Search</span>
            </div>
            <div>
              <span className="flex items-center justify-center h-5 px-1 font-mono text-xs font-medium text-gray-500 bg-gray-200 rounded-md">
                ⌘F
              </span>
            </div>
          </div>
        </NavLink>
      </div>
      <div className="px-10 mt-10 mb-2 font-mono text-sm tracking-wide uppercase">
        Collections
      </div>
      <div className="flex flex-col overflow-y-scroll">
        {collections.map((collection) => (
          <NavLink key={collection.id} href={`/collections/${collection.slug}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bookmark size={16} />
                <span>{collection.name}</span>
              </div>
              <div>
                <span className="flex items-center justify-center h-5 px-1 font-mono text-xs font-medium bg-gray-200 rounded-md">
                  {collection.count}
                </span>
              </div>
            </div>
          </NavLink>
        ))}
        <NavLink href="/collections">
          <div className="flex items-center space-x-2">
            <CornerDownRight size={16} />
            <span>View all</span>
          </div>
        </NavLink>
      </div>
      <div className="flex items-end flex-1">
        <div className="flex flex-col w-full bg-gray-100 border-t">
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
