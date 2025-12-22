import { setupWorker } from "msw/browser";
import { factory, oneOf, manyOf, primaryKey } from "@mswjs/data";
import { nanoid } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";
import { http, HttpResponse, delay } from "msw";

export const db = factory({
  student: {
    id: primaryKey(nanoid),
    name: String,
    surn: String,
    age: Number,
    spec: String,
    teacher: oneOf("teacher"),
    votes: oneOf("vote"),
  },
  teacher: {
    id: primaryKey(nanoid),
    name: String,
    academicSubject: String,
  },
  vote: {
    id: primaryKey(nanoid),
    leader: Number,
    captain: Number,
    student: manyOf("student"),
  },
});

const teacherNames = ["Афанасьев А.А.", "Борисов Б.Б.", "Владимиров В.В."];
const academicSubjectNames = [
  "Введение в программирование",
  "Основы Pythhon",
  "Web-разработка",
];

const studentNamesCount = 9;

const ARTIFICIAL_DELAY_MS = 2000;

function getRandInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Данные преподавателя
const createTeacherData = (num) => {
  const name = teacherNames[num];
  const academicSubject = academicSubjectNames[num];

  return {
    name: `${name}`,
    academicSubject: `${academicSubject}`,
  };
};

// Данные студента
const createStudentData = (teacher) => {
  const newVote = db.vote.create({
    leader: getRandInt(1, 5),
    captain: getRandInt(1, 5),
  });

  return {
    name: `Student${getRandInt(0, 100)}`,
    surn: faker.lorem.sentences({ min: 5, max: 10 }),
    age: getRandInt(18, 32),
    spec: faker.lorem.sentence({ min: 3, max: 7 }),
    teacher,
    votes: newVote,
  };
};

// заполнение данных
for (let i = 0; i < teacherNames.length; i++) {
  const newTeacher = db.teacher.create(createTeacherData(i));

  for (let j = 0; j < studentNamesCount; j++) {
    const newStudent = createStudentData(newTeacher);
    db.student.create(newStudent);
  }
}

const serializeStudent = (student) => ({
  ...student,
  teacher: student.teacher.id,
  votes: student.votes.id,
});

// запрос к фейк-бд
export const handlers = [
  http.get("fakeServer/students", async () => {
    const students = db.student.getAll().map(serializeStudent);
    await delay(ARTIFICIAL_DELAY_MS);
    return HttpResponse.json(students);
  }),
  http.get("/fakeServer/teachers", async () => {
    await delay(ARTIFICIAL_DELAY_MS);
    return HttpResponse.json(db.teacher.getAll());
  }),
  http.post("/fakeServer/students", async ({ request }) => {
    const data = await request.json();

    if (data.content === "error") {
      await delay(ARTIFICIAL_DELAY_MS);

      return new HttpResponse("ошибка при сохранении данных на сервер", {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const newVote = db.vote.create({
      leader: 0,
      captain: 0,
    });

    const teacher = db.teacher.findFirst({
      where: { id: { equals: data.teacher } },
    });

    if (!teacher) {
      await delay(ARTIFICIAL_DELAY_MS);
      return new HttpResponse("Преподаватель не найден", {
        status: 404,
      });
    }

    const student = db.student.create({
      id: nanoid(),
      name: data.name,
      surn: data.surn,
      age: Number(data.age),
      spec: data.spec,
      teacher: teacher,
      votes: newVote,
    });

    await delay(ARTIFICIAL_DELAY_MS);
    return new HttpResponse(JSON.stringify(serializeStudent(student)), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
];

export const worker = setupWorker(...handlers);

worker.listHandlers().forEach((handler) => {
  console.log(handler.info.header);
});
