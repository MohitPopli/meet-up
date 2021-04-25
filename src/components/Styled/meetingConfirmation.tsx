import styled from 'styled-components';

export const MeetupConfirmWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;

  & > * {
    &:nth-child(1) {
      font-size: 8rem;
      margin-bottom: 5rem;
    }

    &:nth-child(2) {
      font-size: 30px;
      font-weight: normal;
    }

    &:nth-child(3) {
      align-self: center;
      border: 1px solid #3399ff;
    }
  }
`;
