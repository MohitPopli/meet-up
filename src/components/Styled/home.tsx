import styled from 'styled-components';

export const HomeWrapper = styled.main`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;

  h1 {
    padding: 1rem;
    font-style: normal;
    line-height: 1rem;
  }

  .calendar {
    width: 500px;
    background: white;
    border: none;
    box-shadow: 0px 2px 20px 10px rgba(184,180,180,1);
    padding: 1rem;
  }
`;
