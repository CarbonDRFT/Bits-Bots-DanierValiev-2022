import DefaultLayout from '../layouts/DefaultLayout';
import ContentWrapper from '../components/elements/ContentWrapper';

const NotFoundPage = (): JSX.Element =>
  (
    <DefaultLayout>
      <ContentWrapper>
        <h1>Error 404</h1>
        <p>Page not found.</p>
      </ContentWrapper>
    </DefaultLayout>
  );

export default NotFoundPage;
