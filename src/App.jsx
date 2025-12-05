import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./app/Root";
import { StudentsList } from "./parts/students/StudentsList";
import { StudentPage } from "./parts/students/StudentPage";
import { EditStudentForm } from "./parts/students/EditStudentForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/students",
        element: <StudentsList />,
      },
      {
        path: "/students/:studentId",
        element: <StudentPage />,
      },
      {
        path: "/editStudent/:studentId",
        element: <EditStudentForm />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
