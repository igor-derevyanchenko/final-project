import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ListButton from "./ListButton";
import Button from "./Button";
import {
  Main,
  H2,
  Title,
  Synopsis,
  ImageBox,
  CommentForm,
  CommentBox,
  Sidebar,
  Table,
  StretchDiv,
} from "./reusableComponents";
import { UserContext } from "./UserContext";
import Comment from "./Comment";

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
  const { isAuthenticated } = useAuth0();
  const { currentUser } = useContext(UserContext);
  const aniInList =
    currentUser?.list?.some((anime) => anime.animeId === animeId) ?? false;

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

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
        parsedRes.start_season.season = capitalizeFirstLetter(
          parsedRes.start_season.season
        );

        switch (parsedRes.media_type) {
          case "movie":
            parsedRes.media_type = "Movie";
            break;
          case "tv":
            parsedRes.media_type = "TV";
            break;
          case "ova":
            parsedRes.media_type = "OVA";
            break;
          case "special":
            parsedRes.media_type = "Special";
            break;
          default:
            console.log(parsedRes.media_type);
            parsedRes.media_type = "This case is not handled!";
        }

        switch (parsedRes.status) {
          case "finished_airing":
            parsedRes.status = "Finished Airing";
            break;
          case "currently_airing":
            parsedRes.status = "Currently Airing";
            break;
          case "not_yet_aired":
            parsedRes.status = "Not Airing Yet";
            break;
          default:
            console.log(parsedRes.status);
            parsedRes.status = "This case is not handled!";
        }

        if (parsedRes.broadcast) {
          parsedRes.broadcast.day_of_the_week = capitalizeFirstLetter(
            parsedRes.broadcast.day_of_the_week
          );
        }

        const startDate = new Date(parsedRes.start_date);
        parsedRes.start_date = startDate.toLocaleString("en-Us", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        });

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
        <img
          src={aniDetails.main_picture.medium}
          alt="Main picture"
          style={{ width: "100%" }}
        />
        <StretchDiv>
          {
            <ListButton
              animeId={animeId}
              action={aniInList ? "remove-from-list" : "add-to-list"}
              aniDetails={aniDetails}
            />
          }
        </StretchDiv>
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
          <b>Started airing on:</b> {aniDetails.start_date.toString()}
        </p>
        <p>
          <b>Priemered:</b> {aniDetails.start_season.season}{" "}
          {aniDetails.start_season.year}
        </p>
        <p>
          <b>Broadcast:</b>{" "}
          {aniDetails.broadcast
            ? `${aniDetails.broadcast.day_of_the_week}s at ${aniDetails.broadcast.start_time} (JST)`
            : "Broadcast dates not available"}
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
            <tbody>
              {comments.map((comment, index) => {
                return (
                  <Comment
                    key={`comment-${index}`}
                    comment={comment}
                    setCommentPosted={setCommentPosted}
                  />
                );
              })}
            </tbody>
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
                  userId: currentUser._id,
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
              placeholder="Write a comment!"
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
  grid-template-columns: 2fr 8fr;
`;
