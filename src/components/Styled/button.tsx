import styled from 'styled-components';

export const StyledButton = styled.button`
  background: none;
  width: 100px;
  height: 40px;
  border-radius: 4px;
  margin: 1rem;
  cursor: pointer;
  border: none;

  &:disabled {
    pointer-events: none;
  }
`;
