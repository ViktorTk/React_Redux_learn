import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    name: "Stud1",
    surn: "SurnStud1",
    age: 20,
    spec: "IT",
    votes: { leader: 0, captain: 0 },
  },
  {
    id: 2,
    name: "Stud2",
    surn: "SurnStud2",
    age: 22,
    spec: "econom",
    votes: { leader: 0, captain: 0 },
  },
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
      prepare(name, surn, age, spec, teacherId) {
        return {
          payload: {
            id: nanoid(),
            name,
            surn,
            age,
            spec,
            teacher: teacherId,
            votes: { leader: 0, captain: 0 },
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
    voteClicked(state, action) {
      const { studentId, vote } = action.payload;
      const currentStudent = state.find((student) => student.id == studentId);
      if (currentStudent) {
        currentStudent.votes[vote]++;
      }
    },
  },
});

export const { studentAdded, studentUpdated, voteClicked } =
  studentsSlice.actions;
export default studentsSlice.reducer;
