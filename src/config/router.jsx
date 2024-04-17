import {createBrowserRouter, createHashRouter} from "react-router-dom";
import {Home} from "@/pages/Home/HomeLazy.js";
import {TaskPage} from "@/pages/Task/TaskPageLazy.js";
import ErrorPage from "@/pages/404/ErrorPage.jsx";

export const router = createHashRouter([
  {
    path: "/",
    element: (<Home/>),
  },
  {
    path: "/new-task",
    element: (<p>NewTask</p>),
  },
  {
    path: "/task/:id",
    element: <TaskPage/>
  },
  {
    path: "*",
    element: <ErrorPage/>
  }
])