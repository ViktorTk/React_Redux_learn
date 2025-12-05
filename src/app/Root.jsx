import { Outlet, NavLink } from "react-router-dom";

function Root() {
  return (
    <div id="main">
      <div id="menu">
        <nav>
          <NavLink to={"/students"}>Студенты</NavLink>
          <a>Преподаватели</a>
        </nav>
      </div>
      <div id="main-page">
        <h2>Тест-страница на Redux</h2>
        <hr />
        <Outlet />
      </div>
    </div>
  );
}

export default Root;
