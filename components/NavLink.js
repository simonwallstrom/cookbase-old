import { useRouter } from 'next/router';

export default function NavLink({ children, href, ...restProps }) {
  const router = useRouter();
  console.log(router);
  const classNames =
    router.asPath === href
      ? 'bg-gray-200 text-black cursor-default'
      : 'hover:text-black hover:bg-gray-50 text-gray-600';

  console.log('pathname', router.pathname);
  console.log('href', href);

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href).then(() => window.scrollTo(0, 0));
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`px-10 py-2.5 ${classNames}`}
      {...restProps}
    >
      {children}
    </a>
  );
}
