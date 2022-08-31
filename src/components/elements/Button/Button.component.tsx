import './Button.style.scss';

type Props = {
  text?: string;
  variant?: string;
  icon?: React.ReactNode;
  counter?: number;
  handler?: (...args: any[]) => void;
  [x:string]: any;
};

const Button = ({ text, variant = 'default', icon, counter, handler, ...otherProps }: Props): JSX.Element =>
  (
    <button
      className={`button ${variant ? `button--${variant}` : ''}`}
      onClick={handler ?? undefined}
      {...otherProps}
    >
      <div className="button__content">
        {icon ?? null}
        {text ? <span className="button__text">{text}</span> : null}
      </div>
      {counter!== undefined ? (
        <div className="button__counter">{counter}</div>
      ) : null}
    </button>
  );

export default Button;
