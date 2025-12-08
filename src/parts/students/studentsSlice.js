import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  { id: 1, name: "Stud1", surn: "SurnStud1", age: 20, spec: "IT" },
  { id: 2, name: "Stud2", surn: "SurnStud2", age: 22, spec: "econom" },
];

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    // studentAdded(state, action) {
    //   state.push(action.payload);
    // },

    studentAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(name, surn, age, spec) {
        return {
          payload: {
            id: nanoid(),
            name,
            surn,
            age,
            spec,
          },
        };
      },
    },

    studentUpdated(state, action) {
      const { id, name, surn, age, spec } = action.payload;
      const desiredStudent = state.find((student) => student.id == id);
      if (desiredStudent) {
        desiredStudent.name = name;
        desiredStudent.surn = surn;
        desiredStudent.age = age;
        desiredStudent.spec = spec;
      }
    },
  },
});

export const { studentAdded, studentUpdated } = studentsSlice.actions;
export default studentsSlice.reducer;
