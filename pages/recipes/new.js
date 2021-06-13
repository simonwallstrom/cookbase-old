import RecipeForm from '../../components/RecipeForm';
import { Container } from '../../components/Ui';
import PageHeader from '../../components/PageHeader';

export default function New() {
  return (
    <Container>
      <PageHeader title="New recipe" />
      <RecipeForm />
    </Container>
  );
}
