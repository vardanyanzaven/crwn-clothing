import styled from "styled-components";

export const AuthContainer = styled.div`
  display: flex;
  width: 900px;
  justify-content: space-between;
  margin: 30px auto;

  @media screen and (max-width: 1000px) {
    width: 100%;
    flex-direction: column;
    row-gap: 100px;
    align-items: center;
  }
`;