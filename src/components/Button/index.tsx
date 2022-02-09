import { ButtonHTMLAttributes } from 'react';
import { ButtonContainer } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export function Button({ isOutlined = false, ...props }: ButtonProps) {
  return (
    <ButtonContainer
      className={`button ${isOutlined ? 'outlined' : ''}`}
      {...props}
    />
  );
}
