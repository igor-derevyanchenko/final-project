import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CardHolder, ButtonHolder } from "./reusableComponents";
import Button from "./Button";
import AnimeCard from "./AnimeCard";

const MAL_CLIENT_ID = import.meta.env.VITE_MAL_CLIENT_ID;

export default () => {
  const { query } = useParams();
  const [aniList, setAniList] = useState();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetch(`/mal/anime?q=${query}&limit=20&offset=${offset}`, {
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
  }, [offset, query]);

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
  );
};
