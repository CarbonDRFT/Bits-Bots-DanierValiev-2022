import './Collection.style.scss';

type Props = {
  columnSize?: string;
  children: React.ReactNode;
};

const Collection = ({ columnSize, children }: Props): JSX.Element =>
  (
    <div
      className="collection"
      style={columnSize ? {
        gridTemplateColumns: `repeat(auto-fill, minmax(${columnSize}, 1fr))`,
      } : undefined}
    >
      {children}
    </div>
  );

export default Collection;
