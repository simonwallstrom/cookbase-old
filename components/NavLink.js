import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavLink({ children, href }) {
  const router = useRouter();
  const classNames =
    router.asPath === href
      ? 'bg-yellow-300 text-black cursor-default'
      : 'hover:bg-gray-200';

  return (
    <Link href={href}>
      <a className={`px-10 transition-all py-3.5 ${classNames}`}>{children}</a>
    </Link>
  );
}
