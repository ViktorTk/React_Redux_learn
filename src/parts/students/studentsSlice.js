import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";

const initialState = {
  students: [],
  status: "idle",
  error: null,
};

// export const fetchStudents = createAsyncThunk(
//   "students/fetchStudents",
//   async () => {
//     const response = await client.get("./fakeServer/students");
//     return response.data;
//   }
// );

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await client.get("./fakeServer/students");
    // Нормализуем данные votes
    const normalizedData = response.data.map((student) => ({
      ...student,
      votes:
        typeof student.votes === "string"
          ? { id: student.votes, leader: 0, captain: 0 } // Если votes это строка (ID)
          : student.votes, // Если уже объект
    }));
    return normalizedData;
  }
);

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
            votes: {
              id: nanoid(), // добавляем ID для голосов
              leader: 0,
              captain: 0,
            },
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
        // currentStudent.votes[vote]++;

        if (
          typeof currentStudent.votes === "object" &&
          currentStudent.votes !== null
        ) {
          currentStudent.votes[vote]++;
        } else {
          currentStudent.votes = {
            id: currentStudent.votes,
            leader: vote === "leader" ? 1 : 0,
            captain: vote === "captain" ? 1 : 0,
          };
        }
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = "in progress";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "success";
        // state.students = state.students.concat(action.payload);
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      });
  },
});

export const { studentAdded, studentUpdated, voteClicked } =
  studentsSlice.actions;
export default studentsSlice.reducer;

export const selectAllStudents = (state) => state.students.students;
export const selectStudentById = (state, studentId) =>
  state.students.students.find((student) => student.id == studentId);
