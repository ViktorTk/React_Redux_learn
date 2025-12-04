import { useSelector } from "react-redux";

export const StudentsList = () => {
  const students = useSelector((state) => state.students);

  const dispStudents = students.map((student) => (
    <div key={student.id}>
      <h3>{student.name}</h3>
      <p>{student.surn}</p>
      <p>{student.age}</p>
      <p>{student.spec}</p>
    </div>
  ));

  return (
    <div>
      <h2>Students</h2>
      {dispStudents}
    </div>
  );
};
