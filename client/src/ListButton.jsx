import Button from "./Button";
import { useContext } from "react";
import { UserContext } from "./UserContext";

export default ({ animeId, action, aniDetails }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  let text = "";

  switch (action) {
    case "add-to-list":
      text = "Add to Watchlist";
      break;
    case "remove-from-list":
      text = "Remove from Watchlist";
      break;
    default:
      text = "Something went terribly, terribly wrong.";
  }

  return (
    <Button
      onClick={() => {
        fetch(`/api/${currentUser._id}/${action}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            animeId,
            status: "Plan to watch",
            aniDetails,
          }),
        })
          .then((res) => res.json())
          .then((parsedRes) => {
            setCurrentUser({ ...currentUser, list: parsedRes.data });
          });
      }}
    >
      {text}
    </Button>
  );
};
