import './Input.style.scss';

type Props = {
  icon?: JSX.Element;
  label?: string;
  error?: string;
  contentStyles?: React.CSSProperties;
  innerRef?: any;
  [x:string]: any;
};

const Input = ({ icon, label, error, contentStyles, innerRef, ...otherProps }: Props): JSX.Element =>
  (
    <div className="input" >
      {label ? <label className="input__label">{label}</label> : null}
      {error ? <label className="input__error">{error}</label> : null}
      <div className="input__content" style={contentStyles ?? undefined}>
        {icon ?? null}
        <input type="text" {...otherProps} ref={innerRef} />
      </div>
    </div>
  );

export default Input;
