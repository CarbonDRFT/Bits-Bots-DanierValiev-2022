import FullHeightWrap from '../components/elements/FullHeightWrap';
import Carousel from '../components/elements/Carousel';

type Props = {
  background?: string;
  children: React.ReactNode;
};

const MainFormLayout = ({ background, children }: Props): JSX.Element =>
  (
    <FullHeightWrap
      background={background ?? undefined}
      darkenValue={0.7}
    >
      <div className="auth-box">
        <Carousel
          slides={[
            '/img/slide-example-1.jpg',
            '/img/slide-example-2.jpg',
            '/img/slide-example-3.jpg',
            '/img/slide-example-1.jpg',
            '/img/slide-example-2.jpg',
          ]}
        />
        <div className="auth-box__content">
          {children}
        </div>
      </div>
    </FullHeightWrap>
  );

export default MainFormLayout;
