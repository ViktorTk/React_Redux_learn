import { useDispatch } from "react-redux";
import { voteClicked } from "./studentsSlice";

const votesObj = {
  leader: "GL",
  captain: "TC",
};

export const UserVotes = ({ student }) => {
  const dispatch = useDispatch();

  const studentVotes = Object.entries(votesObj).map(([key, value]) => {
    return (
      <button
        key={key}
        className="vote-button"
        onClick={() =>
          dispatch(voteClicked({ studentId: student.id, vote: key }))
        }
      >
        {value}: {student.votes[key]}
      </button>
    );
  });

  return <div>{studentVotes}</div>;
};
