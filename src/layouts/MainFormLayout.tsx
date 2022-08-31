import FullHeightWrap from "../components/elements/FullHeightWrap";
import Carousel from "../components/elements/Carousel";

type Props = {
  background?: string;
  children: React.ReactNode;
};

const MainFormLayout = ({ background, children }: Props): JSX.Element => (
  <FullHeightWrap background={background ?? undefined} darkenValue={0.7}>
    <div className="auth-box">
      <Carousel
        slides={[
          "/img/slide1.png",
          "/img/slide2.png",
          "/img/slide3.png",
          "/img/slide4.png",
        ]}
      />
      <div className="auth-box__content">{children}</div>
    </div>
  </FullHeightWrap>
);

export default MainFormLayout;
