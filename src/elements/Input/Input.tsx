import { InputProps } from "./Input.types";

export const Input = ({ className, ...props }: InputProps): JSX.Element => {
  return <input className={className} {...props} />;
};
