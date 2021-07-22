import RecipeForm from '../../components/RecipeForm';
import { Container } from '../../components/Ui';
import PageHeader from '../../components/PageHeader';

export default function New() {
  return (
    <Container className="mb-24">
      <PageHeader title="New recipe" />
      <RecipeForm />
    </Container>
  );
}
