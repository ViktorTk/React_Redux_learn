import { useSelector } from "react-redux";

export const TeacherForStudent = ({ teacherId }) => {
  const teacher = useSelector((state) =>
    state.teachers.find((teacher) => teacher.id == teacherId)
  );

  return <span>от {teacher ? teacher.name : "anonym"}</span>;
};
