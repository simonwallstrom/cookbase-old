import Link from 'next/link';
import { Search } from 'react-feather';

const PageHeader = (props) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-baseline space-x-3">
        <h1 className="text-3xl font-extrabold">{props.title}</h1>
      </div>
      <div className="flex items-center space-x-8">
        <div className="relative hidden text-gray-400 lg:block focus-within:text-black">
          <div className="absolute inset-y-0 flex items-center pl-3">
            <Search size={16} />
          </div>
          <input
            type="text"
            id="search"
            className="pr-4 pl-9 focus:outline-none"
            placeholder="Search..."
          />
        </div>
        <div>
          <Link href="/recipes/new">
            <a className="btn btn--primary">
              <span>New recipe</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
