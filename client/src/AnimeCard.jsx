import styled from "styled-components";
import NakedLink from "./NakedLink";

export default ({ anime }) => {
  return (
    <HoverLink to={`/anime/${anime.id}`}>
      <Image src={anime.main_picture.large} />
      <HoverDiv>{anime.title}</HoverDiv>
    </HoverLink>
  );
};

const Image = styled.img`
  height: 600px;
  width: 400px;
`;

const HoverLink = styled(NakedLink)`
  font-size: 0;
  position: relative;
`;

const HoverDiv = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  opacity: 0;
  transition: 0.3s;
  font-size: 2rem;
  color: var(--gundam-yellow);

  &:hover {
    background-color: rgba(0, 0, 0, 0.75);
    opacity: 1;
  }
`;
