import styled from "styled-components";

export const GridDiv = styled.div`
  display: grid;
  grid-template-columns: 2fr 8fr;
`;

export const Main = styled.main`
margin: 1rem;
  padding: 1rem
  border-left: 1px solid black;
`;

export const H2 = styled.h2`
  border-bottom: 1px solid black;
`;

export const Title = styled.h1`
  margin: 0;
  border-bottom: 1px solid black;
  text-align: center;
`;

export const Synopsis = styled.p`
  white-space: pre-wrap;
`;

export const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const CommentForm = styled.form`
  margin-top: 1rem;

  & > * {
    margin-bottom: 1rem;
  }
`;

export const CommentBox = styled.textarea`
  box-sizing: border-box;
  display: block;
  width: 100%;
  resize: none;
`;

export const Sidebar = styled.aside`
  /* max-height: 100vh; */
  /* position: sticky; */
  /* top: 0; */
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  border: 1px solid var(--gundam-lightgray);
`;

export const Row = styled.tr`
  &:nth-child(odd) {
    background-color: var(--gundam-gray);
  }

  &:nth-child(even) {
    background-color: var(--gundam-lightgray);
  }
`;

export const Cell = styled.td`
  padding: 0.5rem;
`;

export const HeaderCell = styled.th`
  background-color: var(--gundam-blue);
  color: var(--gundam-yellow);
`;

export const ProfilePicture = styled.img`
  width: 100%;
  height: auto;
`;

export const StretchDiv = styled.div`
  & > * {
    width: 100%;
  }
`;

export const CardHolder = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fill, 400px);
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
`;

export const ButtonHolder = styled.div`
  margin: 1rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
`;
