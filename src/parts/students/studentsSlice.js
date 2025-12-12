import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  students: [],
  status: "idle",
  error: null,
};

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    // studentAdded(state, action) {
    //   state.push(action.payload);
    // },

    studentAdded: {
      reducer(state, action) {
        state.students.push(action.payload);
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
      const desiredStudent = state.students.find((student) => student.id == id);
      if (desiredStudent) {
        desiredStudent.name = name;
        desiredStudent.surn = surn;
        desiredStudent.age = age;
        desiredStudent.spec = spec;
      }
    },
    voteClicked(state, action) {
      const { studentId, vote } = action.payload;
      const currentStudent = state.students.find(
        (student) => student.id == studentId
      );
      if (currentStudent) {
        currentStudent.votes[vote]++;
      }
    },
  },
});

export const { studentAdded, studentUpdated, voteClicked } =
  studentsSlice.actions;
export default studentsSlice.reducer;

export const selectAllStudents = (state) => state.students.students;
export const selectStudentById = (state, studentId) =>
  state.students.students.find((student) => student.id == studentId);
