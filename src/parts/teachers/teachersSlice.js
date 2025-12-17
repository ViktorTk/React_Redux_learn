import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";

const initialState = [
  // {
  //   id: 1,
  //   name: "Афанасьев А.А.",
  //   academicSubject: "Введение в программирование",
  // },
  // {
  //   id: 2,
  //   name: "Борисов Б.Б.",
  //   academicSubject: "Основы Pythhon",
  // },
  // {
  //   id: 3,
  //   name: "Владимиров В.В.",
  //   academicSubject: "Web-разработка",
  // },
];

export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async () => {
    const response = await client.get("/fakeServer/teachers");
    return response.data;
  }
);

const teachersSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTeachers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default teachersSlice.reducer;
