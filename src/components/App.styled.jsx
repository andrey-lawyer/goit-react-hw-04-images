import styled from 'styled-components';

export const AppUser = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;

export const SpinnerUser = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #2b00ff;
`;
export const Message = styled.p`
  font-size: 24px;
  color: #ff0000a7;
  text-align: center;
`;
