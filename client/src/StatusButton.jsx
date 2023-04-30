import { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "./UserContext";

export default ({ anime }) => {
  const [editingStatus, setEditingStatus] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const handleStatus = (e) => {
    setEditingStatus(false);

    fetch(`/api/${currentUser._id}/${anime.animeId}/edit-status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: e.target.value,
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
        <select onChange={handleStatus}>
          <option>Select an option</option>
          <option>Plan to watch</option>
          <option>Watching</option>
          <option>Finished</option>
        </select>
      ) : (
        <StatusButton onClick={() => setEditingStatus(true)}>
          {anime.status}
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
