import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";

const initialState = {
  students: [],
  status: "idle",
  error: null,
};

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await client.get("./fakeServer/students");
    const normalizedData = response.data.map((student) => ({
      ...student,
      votes:
        typeof student.votes === "string"
          ? { id: student.votes, leader: 0, captain: 0 }
          : student.votes,
    }));
    return normalizedData;
  }
);

export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (newStudent) => {
    const response = await client.post("/fakeServer/students", newStudent);

    // Нормализуем votes, если приходит как строка
    const normalizedData = {
      ...response.data,
      votes:
        typeof response.data.votes === "string"
          ? { id: response.data.votes, leader: 0, captain: 0 }
          : response.data.votes,
    };

    return normalizedData;
  }
);

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
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
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        const student = {
          ...action.payload,
          votes:
            typeof action.payload.votes === "string"
              ? { id: action.payload.votes, leader: 0, captain: 0 }
              : action.payload.votes,
        };
        state.students.push(student);
      });
  },
});

export const { studentUpdated, voteClicked } = studentsSlice.actions;
export default studentsSlice.reducer;

export const selectAllStudents = (state) => state.students.students;
export const selectStudentById = (state, studentId) =>
  state.students.students.find((student) => student.id == studentId);
