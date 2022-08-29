import ContentWrapper from "../../elements/ContentWrapper";
import { ReactComponent as Logo } from "../../../images/logo-icon.svg";

import "./PageFooter.style.scss";

const PageFooter = (): JSX.Element => (
  <footer className="page-footer">
    <ContentWrapper>
      <div className="page-footer__branding">
        <Logo className="page-footer__logo" />
        <p className="page-footer__page-name">Bits&Bots</p>
      </div>
      <p className="page-footer__page-author">Made by Danier Valiev</p>
    </ContentWrapper>
  </footer>
);

export default PageFooter;
