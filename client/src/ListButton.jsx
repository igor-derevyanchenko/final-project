import Button from "./Button";
import { useContext } from "react";
import { UserContext } from "./UserContext";

export default ({ animeId, action, aniDetails }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  let text = "";

  switch (action) {
    case "add-to-list":
      text = "Add to List";
      break;
    case "remove-from-list":
      text = "Remove from List";
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
