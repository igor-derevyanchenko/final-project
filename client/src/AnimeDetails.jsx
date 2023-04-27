import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import Button from "./Button";

export default () => {
  const MAL_CLIENT_ID = import.meta.env.VITE_MAL_CLIENT_ID;
  const { animeId } = useParams();
  const [aniDetails, setAniDetails] = useState();
  const paramsString =
    "fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics";
  const searchParams = new URLSearchParams(paramsString);
  const [comments, setComments] = useState();
  const [comment, setComment] = useState();
  const [commentPosted, setCommentPosted] = useState(0);
  const { user, isAuthenticated } = useAuth0();

  // console.log(aniDetails);
  useEffect(() => {
    fetch(`/mal/anime/${animeId}?${searchParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-MAL-CLIENT-ID": MAL_CLIENT_ID,
      },
    })
      .then((res) => res.json())
      .then((parsedRes) => {
        setAniDetails(parsedRes);
      });

    fetch(`/api/${animeId}/get-comments`)
      .then((res) => res.json())
      .then((parsedRes) => {
        if (parsedRes.status === 200) {
          setComments(parsedRes.data);
        }
      });
  }, [commentPosted]);

  if (!aniDetails) {
    return <div>Loading...</div>;
  }

  return (
    <GridDiv>
      <Sidebar>
        <img src={aniDetails.main_picture.medium} alt="Main picture" />
        <h1>Information</h1>
        <p>
          <b>Type:</b> {aniDetails.media_type}
        </p>
        <p>
          <b>Episodes:</b> {aniDetails.num_episodes}
        </p>
        <p>
          <b>Status:</b> {aniDetails.status}
        </p>
        <p>
          <b>Started airing on:</b> {aniDetails.start_date}
        </p>
        <p>
          <b>Priemered:</b> {aniDetails.start_season.season}{" "}
          {aniDetails.start_season.year}
        </p>
        <p>
          <b>Broadcast:</b> {aniDetails.broadcast.day_of_the_week}{" "}
          {aniDetails.broadcast.start_time} (JST)
        </p>
        <p>
          <b>Studios:</b>{" "}
          {aniDetails.studios.map((studio, index) => {
            const trailing_comma = index !== aniDetails.studios.length - 1;
            return (
              <span key={`studio-${index}`}>
                {studio.name}
                {trailing_comma ? ", " : ""}
              </span>
            );
          })}
        </p>
        <p>
          <b>Genres:</b>{" "}
          {aniDetails.genres.map((genre, index) => {
            const trailing_comma = index !== aniDetails.genres.length - 1;
            return (
              <span key={`genre-${index}`}>
                {genre.name}
                {trailing_comma ? ", " : ""}
              </span>
            );
          })}
        </p>
      </Sidebar>
      <Main>
        <Title>{aniDetails.title}</Title>
        <H2>Synopsis</H2>
        <Synopsis>{aniDetails.synopsis}</Synopsis>
        <H2>Pictures</H2>
        <ImageBox>
          {aniDetails.pictures.map((picture, index) => {
            return (
              <img
                key={`picture-${index}`}
                src={picture.medium}
                alt="Gallery image"
              />
            );
          })}
        </ImageBox>
        <H2>Comments</H2>
        {comments ? (
          <Table>
            {comments.map((comment, index) => {
              return (
                <Row key={`comment-${index}`}>
                  <Cell>
                    <h3>{comment.user} said:</h3>
                    <p>{comment.comment}</p>
                  </Cell>
                </Row>
              );
            })}
          </Table>
        ) : (
          <div>Leave a comment!</div>
        )}
        {isAuthenticated && (
          <CommentForm
            onSubmit={(e) => {
              e.preventDefault();
              e.target.reset();
              fetch(`/api/${animeId}/post-comment`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: user.email,
                  comment: comment,
                }),
              })
                .then((res) => res.json())
                .then((parsedRes) => {
                  if (parsedRes.status === 200) {
                    setCommentPosted((prevState) => prevState + 1);
                  }
                });
            }}
          >
            <CommentBox
              rows="4"
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <Button type="submit">Submit</Button>
          </CommentForm>
        )}
      </Main>
    </GridDiv>
  );
};

const GridDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 9fr;
`;

const Main = styled.main`
margin: 1rem;
  padding: 1rem
  border-left: 1px solid black;
`;

const H2 = styled.h2`
  border-bottom: 1px solid black;
`;

const Title = styled.h1`
  margin: 0;
  border-bottom: 1px solid black;
  text-align: center;
`;

const Synopsis = styled.p`
  white-space: pre-wrap;
`;

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const CommentForm = styled.form`
  margin-top: 1rem;

  & > * {
    margin-bottom: 1rem;
  }
`;

const CommentBox = styled.textarea`
  box-sizing: border-box;
  display: block;
  width: 100%;
  resize: none;
`;

const Sidebar = styled.aside`
  /* max-height: 100vh; */
  /* position: sticky; */
  /* top: 0; */
`;

const Table = styled.table`
  width: 100%;
  border: 1px solid var(--gundam-lightgray);
`;

const Row = styled.tr`
  &:nth-child(odd) {
    background-color: var(--gundam-gray);
  }

  &:nth-child(even) {
    background-color: var(--gundam-lightgray);
  }
`;

const Cell = styled.td`
  padding: 0.5rem;
`;
