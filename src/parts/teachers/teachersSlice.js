import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    name: "Афанасьев А.А.",
    academicSubject: "Введение в программирование",
  },
  {
    id: 2,
    name: "Борисов Б.Б.",
    academicSubject: "Основы Pythhon",
  },
  {
    id: 3,
    name: "Владимиров В.В.",
    academicSubject: "Web-разработка",
  },
];

const teachersReducer = createSlice({
  name: "teachers",
  initialState,
  reducers: {},
});

export default teachersReducer.reducer;
