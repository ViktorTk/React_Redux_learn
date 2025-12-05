import { useSelector } from "react-redux";
import { NewStudentForm } from "./NewStudentForm";
import { NavLink, Link } from "react-router-dom";

export const StudentsList = () => {
  const students = useSelector((state) => state.students);

  const dispStudents = students.map((student) => (
    <div key={student.id} className="student-excerpt">
      <p>{student.name}</p>
      <p>{student.spec}</p>
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
