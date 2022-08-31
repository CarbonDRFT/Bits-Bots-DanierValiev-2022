import './FullHeightWrap.style.scss';

type Props = {
  background?: string;
  darkenValue?: number;
  children: React.ReactNode;
};

const FullHeightWrap = ({ background, darkenValue = 0, children }: Props): JSX.Element =>
  (
    <div
      className="full-height-wrap"
      style={background ? {
        background,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } : undefined} 
    >
      {darkenValue ? (
        <div
          className="full-height-wrap__dark-overlay"
          style={{
            opacity: darkenValue,
          }}  
        />
      ) : null}
      {children}
    </div>
  );

export default FullHeightWrap;
