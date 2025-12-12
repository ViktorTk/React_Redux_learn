import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { studentUpdated } from "./studentsSlice";
import { selectStudentById } from "./studentsSlice";

export const EditStudentForm = () => {
  const params = useParams();
  const { studentId } = params;

  const student = useSelector((state) => selectStudentById(state, studentId));

  const [name, setName] = useState(student.name);
  const [surn, setSurn] = useState(student.surn);
  const [age, setAge] = useState(student.age);
  const [spec, setSpec] = useState(student.spec);

  const onNameChanged = (e) => setName(e.target.value);
  const onSurnChanged = (e) => setSurn(e.target.value);
  const onAgeChanged = (e) => setAge(e.target.value);
  const onSpecChanged = (e) => setSpec(e.target.value);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSaveStudentClick = () => {
    if (name && surn && age && spec) {
      dispatch(
        studentUpdated({
          id: studentId,
          name,
          surn,
          age,
          spec,
        })
      );

      navigate(`/students/${studentId}`);
    }
  };

  return (
    <div>
      <hr />
      <h2>Редактирование данных студента:</h2>
      <form>
        <p>
          <label htmlFor="studentName">Name:</label>
          <input
            id="studentName"
            name="studentName"
            value={name}
            onChange={onNameChanged}
          />
        </p>
        <p>
          <label htmlFor="studentSurn">SurName:</label>
          <input
            id="studentSurn"
            name="studentSurn"
            value={surn}
            onChange={onSurnChanged}
          />
        </p>
        <p>
          <label htmlFor="studentAge">Age:</label>
          <input
            id="studentAge"
            name="studentAge"
            value={age}
            onChange={onAgeChanged}
          />
        </p>
        <p>
          <label htmlFor="studentSpec">Spec:</label>
          <textarea
            id="studentSpec"
            name="studentSpec"
            value={spec}
            onChange={onSpecChanged}
          ></textarea>
        </p>
        <button type="button" onClick={onSaveStudentClick}>
          save
        </button>
      </form>
    </div>
  );
};
