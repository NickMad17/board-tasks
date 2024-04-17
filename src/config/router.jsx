import {createBrowserRouter, createHashRouter} from "react-router-dom";
import {Home} from "@/pages/Home/HomeLazy.js";
import {TaskPage} from "@/pages/Task/TaskPageLazy.js";

export const router = createBrowserRouter([
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
  }
])