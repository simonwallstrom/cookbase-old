import Link from 'next/link';
import { Clock, Grid, Hash, Settings, Star } from 'react-feather';
import NavLink from './navLink';

export default function Nav() {
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
            <Grid size={20} />
            <span>All recipes</span>
          </div>
        </NavLink>
        <NavLink href="/recipes/recent">
          <div className="flex items-center space-x-2">
            <Clock size={20} />
            <span>Most recent</span>
          </div>
        </NavLink>
        <NavLink href="/">
          <div className="flex items-center space-x-2">
            <Star size={20} />
            <span>Starred</span>
          </div>
        </NavLink>
      </div>
      <div className="px-10 mt-10 mb-2 font-mono text-xs tracking-wider uppercase">
        Categories
      </div>
      <div className="flex flex-col overflow-y-scroll">
        {categories.map((category) => (
          <NavLink key={category.id} href={category.href}>
            <div className="flex items-center space-x-2">
              <Hash className="text-gray-500" size={16} />
              <span>{category.name}</span>
            </div>
          </NavLink>
        ))}
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

const categories = [
  {
    id: 1,
    icon: '🍔',
    name: 'Varmrätt',
    href: '/',
  },
  {
    id: 2,
    icon: '🎂',
    name: 'Efterrätt',
    href: '/',
  },
  {
    id: 3,
    icon: '🥐',
    name: 'Bakning',
    href: '/',
  },
  {
    id: 4,
    icon: '🥑',
    name: 'Brunch',
    href: '/',
  },
  {
    id: 5,
    icon: '🍺',
    name: 'Dryck',
    href: '/',
  },
];
