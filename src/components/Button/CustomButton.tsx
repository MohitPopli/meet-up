import * as React from 'react';
import { StyledButton } from '../Styled/button';

interface ButtonProps {
  id: string;
  type?: 'button' | 'submit' | 'reset';
  title?: string;
  value?: string;
  text: string;
  callback: () => void;
  customStyles?: React.CSSProperties;
  disabled?: boolean;
}

const CustomButton = (props: ButtonProps) => {
  return (
    <StyledButton
      onClick={() => props.callback()}
      title={props.title}
      value={props.value}
      disabled={props.disabled}
      {...props}
      style={props.customStyles}
      data-testid={`${props.id}-custom-button`}
    >
      {props.text}
    </StyledButton>
  );
};

export default CustomButton;
