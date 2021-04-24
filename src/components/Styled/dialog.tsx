import styled from 'styled-components';

export const ErrorContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  justify-content: space-around;
  height: 100%;
  span {
    font-size: 1rem;
    font-style: normal;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  justify-content: space-around;
  height: 100%;

  textarea {
    resize: none;
  }
`;

export const DialogButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
