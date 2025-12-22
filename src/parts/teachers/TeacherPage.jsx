import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectTeacherById } from "./teachersSlice";
import { selectAllStudents } from "../students/studentsSlice";
import { Link } from "react-router-dom";

export const TeacherPage = () => {
  let params = useParams();
  const { teacherId } = params;

  const teacher = useSelector((state) => selectTeacherById(state, teacherId));

  const studentsOfTeacher = useSelector((state) => {
    const allStudents = selectAllStudents(state);
    return allStudents.filter((student) => student.teacher == teacherId);
  });

  const studentNames = studentsOfTeacher.map((student) => (
    <li key={student.id}>
      <Link to={`/students/${student.id}`}>{student.name}</Link>
    </li>
  ));

  return (
    <div>
      <h2>Преподаватель: {teacher.name}</h2>
      <ul>{studentNames}</ul>
    </div>
  );
};
