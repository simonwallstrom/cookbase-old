import PageHeader from '../../components/PageHeader';
import { Container } from '../../components/Ui';

export default function Categories() {
  return (
    <Container>
      <PageHeader
        title="Collections"
        buttonText="New collection"
        buttonURL="/collections/new"
      />
    </Container>
  );
}
