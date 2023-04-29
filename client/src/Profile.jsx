import { useAuth0 } from "@auth0/auth0-react";
import {
  GridDiv,
  Sidebar,
  Main,
  ProfilePicture,
  Title,
  Table,
  Row,
  Cell,
  HeaderCell,
} from "./reusableComponents";
import ListButton from "./ListButton";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const { currentUser } = useContext(UserContext);

  if (isLoading || !currentUser) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <GridDiv>
        <Sidebar>
          <ProfilePicture src={currentUser.picture} />
          <h1>{currentUser.username ?? user.name}'s profile</h1>
        </Sidebar>
        <Main>
          <Title>Your List</Title>
          <Table>
            <thead>
              <Row>
                <HeaderCell>Picture</HeaderCell>
                <HeaderCell>Title</HeaderCell>
                <HeaderCell>Remove</HeaderCell>
              </Row>
            </thead>
            <TableBody>
              {currentUser.list.map((anime, index) => {
                return (
                  <Row key={`row-${index}`}>
                    <Cell>
                      <img
                        src={anime.aniDetails.main_picture.medium}
                        alt="Anime picture"
                      />
                    </Cell>
                    <Cell>
                      <AniLink to={`/anime/${anime.animeId}`}>
                        {anime.aniDetails.title}
                      </AniLink>
                    </Cell>
                    <Cell>
                      <ListButton
                        animeId={anime.animeId}
                        action="remove-from-list"
                      />
                    </Cell>
                  </Row>
                );
              })}
            </TableBody>
          </Table>
        </Main>
      </GridDiv>
    )
  );
};

const TableBody = styled.tbody`
  text-align: center;
`;

const AniLink = styled(Link)`
  text-decoration: none;
  font-size: 2rem;
  color: black;
`;
