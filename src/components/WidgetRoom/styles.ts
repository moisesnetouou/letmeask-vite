import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  background: #fefefe;
  width: 100%;
  border-radius: 8px;
  justify-content: space-between;
  padding: 2rem;
  color: #29292e;
  margin: 0.5rem 0rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);

  height: 5rem;
  align-items: center;

  > span {
    font-size: 1rem;
  }

  div {
    display: flex;
    flex-direction: column;

    button {
      display: flex;
      background: #835afd;
      color: #fff;
      padding: 5px;
      border: 0;
      border-radius: 0.5rem;
      cursor: pointer;
      text-align: center;
    }

    a {
      display: flex;
      margin-top: 0.5rem;
      background: #835afd;
      padding: 5px;
      border-radius: 0.5rem;
      cursor: pointer;

      svg {
        color: #fff;
      }
    }
  }
`;
