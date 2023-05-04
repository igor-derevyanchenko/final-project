import { useState, useEffect } from "react";
import { CardHolder, ButtonHolder } from "./reusableComponents";
import styled from "styled-components";
import AnimeCard from "./AnimeCard";
import Button from "./Button";

const FILTERS = ["All", "Airing", "Upcoming", "TV", "OVA", "Movie", "Special"];
const MAL_CLIENT_ID = import.meta.env.VITE_MAL_CLIENT_ID;
const NUM_PER_PAGE = 20;

export default () => {
  const [aniList, setAniList] = useState();
  const [ranking, setRanking] = useState("all");
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetch(
      `/mal/anime/ranking?ranking_type=${ranking}&limit=${NUM_PER_PAGE}&offset=${
        offset * NUM_PER_PAGE
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-MAL-CLIENT-ID": MAL_CLIENT_ID,
        },
      }
    )
      .then((res) => res.json())
      .then((parsedRes) => {
        setAniList(parsedRes);
      });
  }, [offset, ranking]);

  if (!aniList) {
    return <div>Loading...</div>;
  }

  const handlePage = (sign) => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });

    setOffset((prevState) => {
      switch (sign) {
        case "-":
          return prevState - 1;
        case "+":
          return prevState + 1;
        default:
          console.log("Disaster has struck");
      }
    });
  };

  return (
    <GridDiv>
      <Sidebar>
        <h1 style={{ color: "var(--gundam-blue)" }}>Filter by:</h1>
        {FILTERS.map((filter, index) => {
          return (
            <FilterButton
              key={`filter-${index}`}
              $active={filter.toLowerCase() === ranking}
              onClick={() => setRanking(filter.toLowerCase())}
            >
              {filter}
            </FilterButton>
          );
        })}
      </Sidebar>
      <main>
        <CardHolder>
          {aniList.data.map((item, index) => {
            return <AnimeCard key={`anime-${index}`} anime={item.node} />;
          })}
        </CardHolder>
        <ButtonHolder>
          {offset > 0 && (
            <Button onClick={() => handlePage("-")}>Previous</Button>
          )}
          <Button onClick={() => handlePage("+")}>Next</Button>
        </ButtonHolder>
      </main>
    </GridDiv>
  );
};

const Sidebar = styled.aside`
  background-color: var(--gundam-yellow);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FilterButton = styled.button`
  filter: ${(props) => (props.$active ? "hue-rotate(270deg)" : "")};
  width: 90%;
  margin: 0.2rem;
  border: none;
  padding: 0.5rem 0;
  font-size: 1.5rem;
  background-color: var(--gundam-red);
  color: var(--gundam-lightgray);
`;

const GridDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 9fr;
`;
