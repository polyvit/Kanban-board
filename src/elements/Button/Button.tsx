import { ButtonProps } from "./Button.types";

export const Button = ({
  clickHandler,
  children,
  className,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button onClick={clickHandler} className={className} {...props}>
      {children}
    </button>
  );
};
