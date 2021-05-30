import { useRouter } from 'next/router';

export default function NavLink({ children, href, ...restProps }) {
  const router = useRouter();
  const classNames =
    router.pathname === href
      ? 'bg-gray-200 text-black cursor-default'
      : 'hover:text-black hover:bg-gray-50 text-gray-700';

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href).then(() => window.scrollTo(0, 0));
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`px-10 py-2.5 font-medium ${classNames}`}
      {...restProps}
    >
      {children}
    </a>
  );
}
