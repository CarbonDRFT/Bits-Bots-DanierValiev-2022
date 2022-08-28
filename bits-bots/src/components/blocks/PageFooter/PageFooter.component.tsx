import ContentWrapper from '../../elements/ContentWrapper';

import './PageFooter.style.scss';

const PageFooter = (): JSX.Element =>
  (
    <footer className="page-footer">
      <ContentWrapper>
        <p className="page-footer__page-name">Bits&Bots</p>
        <p className="page-footer__page-author">Made by Your Name</p>
      </ContentWrapper>
    </footer>
  );

export default PageFooter;
