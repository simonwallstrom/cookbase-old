import { useUser } from '../lib/useUser';
import PageHeader from '../components/PageHeader';
import { Container } from '../components/Ui';
import Button from '../components/Button';
import { useApp } from '../lib/useCollections';

export default function Account() {
  const { user, signOut } = useUser();

  const { appLoading } = useApp();

  console.log(appLoading);

  return (
    <Container>
      <PageHeader title="Mitt konto" buttonText="My account" />
      <div>Logged in as {user?.email}</div>
      <Button onClick={() => signOut()}>Logout</Button>
    </Container>
  );
}
