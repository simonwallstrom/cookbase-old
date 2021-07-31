import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavLink({ children, href }) {
  const router = useRouter();
  const classNames =
    router.asPath === href
      ? 'bg-yellow-200 border-black text-black cursor-default'
      : 'border-transparent hover:bg-gray-200';

  return (
    <Link href={href}>
      <a
        className={`px-10 border-b transition-all border-t py-3 ${classNames}`}
      >
        {children}
      </a>
    </Link>
  );
}
