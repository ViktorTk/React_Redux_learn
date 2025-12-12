import { useSelector } from "react-redux";
import { NewStudentForm } from "./NewStudentForm";
import { NavLink, Link } from "react-router-dom";
import { UserVotes } from "./UserVotes";
import { selectAllStudents } from "./studentsSlice";

export const StudentsList = () => {
  const students = useSelector(selectAllStudents);

  const dispStudents = students.map((student) => (
    <div key={student.id} className="student-excerpt">
      <p>{student.name}</p>
      <p>{student.spec}</p>
      <UserVotes student={student} />
      <Link to={`/students/${student.id}`} className="link-btn">
        подробнее
      </Link>
    </div>
  ));

  return (
    <div>
      <NavLink to={"/"}>На главную</NavLink>
      <h2>Students</h2>
      {dispStudents}
      <NewStudentForm />
    </div>
  );
};
