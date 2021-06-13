import { useUser } from '../lib/useUser';
import PageHeader from '../components/PageHeader';
import { Container } from '../components/Ui';
import Button from '../components/Button';

export default function Account() {
  const { user, signOut } = useUser();

  return (
    <Container>
      <PageHeader
        title="Mitt konto"
        buttonText="My account"
        buttonURL="simon"
      />
      <div>Logged in as {user?.email}</div>
      <Button onClick={() => signOut()}>Logout</Button>
    </Container>
  );
}
