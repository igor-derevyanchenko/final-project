import { useState, useEffect } from "react";
import styled from "styled-components";
import AnimeCard from "./AnimeCard";

export default () => {
  const MAL_CLIENT_ID = import.meta.env.VITE_MAL_CLIENT_ID;
  const [aniList, setAniList] = useState();

  useEffect(() => {
    fetch("/mal/anime/ranking?ranking_type=all&limit=8", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-MAL-CLIENT-ID": MAL_CLIENT_ID,
      },
    })
      .then((res) => res.json())
      .then((parsedRes) => {
        setAniList(parsedRes);
      });
  }, []);

  if (!aniList) {
    return <div>Loading...</div>;
  }

  return (
    <CardHolder>
      {aniList.data.map((item, index) => {
        return <AnimeCard key={`anime-${index}`} anime={item.node} />;
      })}
    </CardHolder>
  );
};

const CardHolder = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 400px);
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
`;
