import { useUser } from '../lib/useUser';
import PageHeader from '../components/PageHeader';

export default function Account() {
  const { user, signOut } = useUser();

  return (
    <div className="px-24 py-8 ">
      <PageHeader title="Mitt konto" />
      <div>Logged in as {user?.email}</div>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}
