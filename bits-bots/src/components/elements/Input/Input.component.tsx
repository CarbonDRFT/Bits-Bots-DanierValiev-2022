import './Input.style.scss';

type Props = {
  icon?: JSX.Element;
  label?: string;
  contentStyles?: React.CSSProperties;
  [x:string]: any;
};

const Input = ({ icon, label, contentStyles, ...otherProps }: Props): JSX.Element =>
  (
    <div className="input" >
      {label ? <label className="input__label">{label}</label> : null}
      <div className="input__content" style={contentStyles ?? undefined}>
        {icon ?? null}
        <input type="text" {...otherProps} />
      </div>
    </div>
  );

export default Input;
