import { useContext, useEffect, useState } from "react";
import { Row, Cell, CommentBox } from "./reusableComponents";
import { UserContext } from "./UserContext";
import styled from "styled-components";
import Button from "./Button";
import { useParams } from "react-router-dom";

export default ({ comment, setCommentPosted }) => {
  const { animeId } = useParams();
  const { currentUser } = useContext(UserContext);
  const [editable, setEditable] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editComment, setEditComment] = useState(comment.comment);
  const [editTooShort, setEditTooShort] = useState(false);
  const [commenterHasSeen, setCommenterHasSeen] = useState();
  const [showCommenterHasSeen, setShowCommenterHasSeen] = useState(false);

  useEffect(() => {
    fetch(`/api/get-user/${comment.userId}`)
      .then((res) => res.json())
      .then((parsedRes) => {
        const status = parsedRes.data?.list?.find(
          (anime) => anime.animeId === animeId
        )?.status;

        if (status === "Finished") {
          setCommenterHasSeen("Has seen this show");
        } else {
          setCommenterHasSeen("Has not seen this show");
        }
      });
  }, []);

  const handleMouseOver = () => {
    setShowCommenterHasSeen(true);
    if (comment.userId === currentUser._id) {
      setEditable(true);
    }
  };

  const handleMouseLeave = () => {
    setShowCommenterHasSeen(false);
    setEditable(false);
  };

  const handleEdit = () => {
    if (editComment.length < 1) {
      setEditTooShort(true);
      return;
    } else {
      setEditTooShort(false);
    }
    setEditing(false);

    fetch(`/api/${animeId}/${comment._id}/edit-comment`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: currentUser._id,
        comment: editComment,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setCommentPosted((prevState) => prevState + 1);
      });
  };

  return (
    <Row onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
      <Cell>
        <FlexDiv>
          <h3>
            {comment.user} {showCommenterHasSeen && `(${commenterHasSeen}) `}
            said:
          </h3>
          {editable && !editing && (
            <EditButton
              onClick={() => {
                setEditing(true);
              }}
            >
              Edit
            </EditButton>
          )}
        </FlexDiv>
        {editing ? (
          <FlexDiv>
            <CommentBox
              onChange={(e) => setEditComment(e.target.value)}
              value={editComment}
            />
            <Button
              onClick={() => {
                setEditing(false);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleEdit}>Submit</Button>
          </FlexDiv>
        ) : (
          <p>{comment.comment}</p>
        )}
        {editTooShort && <RedP>Cannot delete comments!</RedP>}
      </Cell>
    </Row>
  );
};

const EditButton = styled.button`
  border: none;
  background: none;
  margin-left: auto;

  &:hover {
    cursor: pointer;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  gap: 1rem;
`;

const RedP = styled.p`
  color: var(--gundam-red);
`;
