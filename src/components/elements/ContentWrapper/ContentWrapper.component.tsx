import './ContentWrapper.style.scss';

type Props = {
  maxWidth?: string;
  children: React.ReactNode;
};

const ContentWrapper = ({ maxWidth, children }: Props): JSX.Element =>
  (
    <div className="content-wrapper" style={maxWidth ? {
      maxWidth,
    } : undefined}>
      {children}
    </div>  
  );

export default ContentWrapper;
