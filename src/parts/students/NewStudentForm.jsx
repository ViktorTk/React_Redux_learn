import { useState } from "react";
import { useDispatch } from "react-redux";
import { studentAdded } from "./studentsSlice";
import { nanoid } from "@reduxjs/toolkit";

export const NewStudentForm = () => {
  const [name, setName] = useState("");
  const [surn, setSurn] = useState("");
  const [age, setAge] = useState(18);
  const [spec, setSpec] = useState("");

  const onNameChanged = (e) => setName(e.target.value);
  const onSurnChanged = (e) => setSurn(e.target.value);
  const onAgeChanged = (e) => setAge(e.target.value);
  const onSpecChanged = (e) => setSpec(e.target.value);

  const dispatch = useDispatch();

  const onSaveStudentClick = () => {
    if (name && surn && age && spec) {
      dispatch(
        studentAdded({
          id: nanoid(),
          name,
          surn,
          age,
          spec,
        })
      );

      setName("");
      setSurn("");
      setAge(18);
      setSpec("");
    }
  };

  return (
    <div>
      <hr />
      <h2>Добавить студента:</h2>
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
