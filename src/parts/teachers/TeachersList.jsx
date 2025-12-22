import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllTeachers } from "./teachersSlice";

export const TeachersList = () => {
  const teachers = useSelector(selectAllTeachers);
  const teachersToRender = teachers.map((teacher) => (
    <li key={teacher.id}>
      <Link to={`teacher/${teacher.id}`}>{teacher.name}</Link>
      <span>({teacher.academicSubject})</span>
    </li>
  ));

  return (
    <div>
      <h2>Учителя:</h2>
      <ul>{teachersToRender}</ul>
    </div>
  );
};
