import styled from "styled-components";

export default ({ children }) => {
  return <Main>{children}</Main>;
};

const Main = styled.main`
  grid-area: main;
  background-color: var(--gundam-white);
`;
