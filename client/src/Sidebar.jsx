import styled from "styled-components";

export default () => {
  return (
    <Sidebar>
      <p>Hello, world!aaaaaaaaaaaaaaa</p>
    </Sidebar>
  );
};

const Sidebar = styled.aside`
  grid-area: sidebar;
  background-color: var(--gundam-gray);
`;
