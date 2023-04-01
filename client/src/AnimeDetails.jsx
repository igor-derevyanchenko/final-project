import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default () => {
  const MAL_CLIENT_ID = import.meta.env.VITE_MAL_CLIENT_ID;
  const { animeId } = useParams();
  const [aniDetails, setAniDetails] = useState();
  const paramsString =
    "fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics";
  const searchParams = new URLSearchParams(paramsString);

  console.log(aniDetails);
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
  }, []);

  return <div>animedetails</div>;
};
