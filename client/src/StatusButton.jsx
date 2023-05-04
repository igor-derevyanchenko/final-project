import { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "./UserContext";

export default ({ anime, type }) => {
  const [editingStatus, setEditingStatus] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const handleStatus = (e) => {
    setEditingStatus(false);

    fetch(`/api/${currentUser._id}/${anime.animeId}/edit-${type}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        [type]: e.target.value,
      }),
    })
      .then((res) => res.json())
      .then((parsedRes) => {
        setCurrentUser({ ...currentUser, list: parsedRes.data });
      });
  };

  return (
    <div>
      {editingStatus ? (
        type === "status" ? (
          <select onChange={handleStatus}>
            <option>Select an option</option>
            <option>Plan to watch</option>
            <option>Watching</option>
            <option>Finished</option>
          </select>
        ) : type === "rating" ? (
          <select onChange={handleStatus}>
            <option>Choose a rating!</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
          </select>
        ) : (
          <div>Disaster has struck</div>
        )
      ) : (
        <StatusButton onClick={() => setEditingStatus(true)}>
          {type === "status"
            ? anime.status
            : type === "rating"
            ? anime.rating ?? "Rate this show!"
            : "Disaster has struck!"}
        </StatusButton>
      )}
    </div>
  );
};

const StatusButton = styled.button`
  border: none;
  background: none;
  font-size: 1.5rem;

  &:hover {
    cursor: pointer;
  }
`;
