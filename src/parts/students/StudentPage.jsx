import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { TeacherForStudent } from "./TeacherForStudent";
import { UserVotes } from "./UserVotes";
import { selectStudentById } from "./studentsSlice";

export const StudentPage = () => {
  const params = useParams();
  const { studentId } = params;

  const student = useSelector((state) => selectStudentById(state, studentId));

  if (!student) {
    return <p>Не студента с таким id(((</p>;
  }

  return (
    <div>
      <h2>{student.name}</h2>
      <p>{student.surn}</p>
      <p>{student.age}</p>
      <p>{student.spec}</p>
      <UserVotes student={student} />
      <TeacherForStudent teacherId={student.teacher} />
      <Link to={`/editStudent/${student.id}`} className="link-btn">
        Редактировать
      </Link>
    </div>
  );
};
