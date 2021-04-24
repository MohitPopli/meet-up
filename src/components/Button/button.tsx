import * as React from 'react';
import { StyledButton } from '../Styled/button';

interface ButtonProps {
  id?: string;
  type?: 'button' | 'submit' | 'reset';
  title?: string;
  value?: string;
  text: string;
  callback: () => void;
  customStyles?: React.CSSProperties;
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  return (
    <StyledButton onClick={() => props.callback()} {...props} style={props.customStyles}>
      {props.text}
    </StyledButton>
  );
};

export default Button;
