import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NewStudentForm } from "./NewStudentForm";
import { NavLink, Link } from "react-router-dom";
import { UserVotes } from "./UserVotes";
import { selectAllStudents, fetchStudents } from "./studentsSlice";

const StudentCard = ({ student }) => {
  return (
    <div key={student.id} className="student-excerpt">
      <p>{student.name}</p>
      <p>{student.spec}</p>
      <UserVotes student={student} />
      <Link to={`/students/${student.id}`} className="link-btn">
        подробнее
      </Link>
    </div>
  );
};

export const StudentsList = () => {
  const dispatch = useDispatch();

  const students = useSelector(selectAllStudents);
  const studentsStatus = useSelector((state) => state.students.status);

  const error = useSelector((state) => state.students.error);
  let content;

  const dataFetch = useRef(false);

  useEffect(() => {
    if (dataFetch.current) return;
    if (studentsStatus === "idle") {
      // (dataFetch.current = true)
      dataFetch.current = true;
      dispatch(fetchStudents());
    }
  }, [studentsStatus, dispatch]);

  if (studentsStatus === "in progress") {
    content = <p>Список студентов загружается...</p>;
  } else if (studentsStatus === "success") {
    content = students.map((student) => (
      <StudentCard key={student.id} student={student} />
    ));
  } else if (studentsStatus === "fail") {
    content = <div>{error}</div>;
  }
  return (
    <div>
      <NavLink to={"/"}>На главную</NavLink>
      <h2>Students</h2>
      {content}
      <NewStudentForm />
    </div>
  );
};
