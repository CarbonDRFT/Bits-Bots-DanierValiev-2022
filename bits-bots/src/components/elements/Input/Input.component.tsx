import './Input.style.scss';

type Props = {
  label?: string;
  [x:string]: any;
};

const Input = ({ label, ...otherProps }: Props): JSX.Element =>
  (
    <div className="input" >
      {label ? <label className="input__label">{label}</label> : null}
      <input type="text" {...otherProps} />
    </div>
  );

export default Input;
