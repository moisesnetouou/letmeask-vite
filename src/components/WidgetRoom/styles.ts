import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  background: #f4f8ff;
  width: 100%;
  border-radius: 8px;
  justify-content: space-between;
  padding: 2rem;
  color: #29292e;
  margin: 0.5rem 0rem;
  border: 1px solid #835afd;
  height: 1rem;
  align-items: center;

  > span {
    font-size: 2rem;
  }

  div {
    background: red;
  }
`;
