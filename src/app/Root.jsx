import { StudentsList } from "../parts/students/StudentsList";
import { NewStudentForm } from "../parts/students/NewStudentForm";

function Root() {
  return (
    <div id="main">
      <div id="menu">
        <nav>
          <a>Студенты</a>
          <a>Преподаватели</a>
        </nav>
      </div>
      <div id="main_page">
        <h2>Тест-страница на Redux</h2>
        <hr />
        <StudentsList />
        <NewStudentForm />
      </div>
    </div>
  );
}

export default Root;
