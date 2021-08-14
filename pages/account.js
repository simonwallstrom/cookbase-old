import { useUser } from '../lib/useUser';
import PageHeader from '../components/PageHeader';
import { Container } from '../components/Ui';
import Button from '../components/Button';

export default function Account() {
  const { user, signOut } = useUser();

  return (
    <Container>
      <PageHeader title="Mitt konto" buttonText="My account" />
      <div>Logged in as:</div>
      <div className="flex items-center px-6 py-4 mt-4 mb-6 space-x-4 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200">
        {user?.email}
      </div>
      <div>
        <Button className="btn" onClick={() => signOut()}>
          Logout
        </Button>
      </div>
    </Container>
  );
}
