import PageNavigation from '../components/blocks/PageNavigation';
import PageFooter from '../components/blocks/PageFooter';

type Props = {
  children: React.ReactNode;
};

const DefaultLayout = ({ children }: Props): JSX.Element =>
  (
    <>
      <PageNavigation />
      <div className="page-content">
        {children}
      </div>
      <PageFooter />
    </>
  );

export default DefaultLayout;
