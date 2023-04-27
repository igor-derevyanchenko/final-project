import styled from "styled-components";

export default ({ onClick, children, type }) => {
  return (
    <Button type={type ? type : null} onClick={onClick}>
      {children}
    </Button>
  );
};

const Button = styled.button`
  background-color: var(--gundam-yellow);
  color: var(--gundam-blue);
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  transition: filter 0.3s;

  &:hover {
    cursor: pointer;
    filter: brightness(120%) saturate(120%);
  }
`;
