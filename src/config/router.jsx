import {createBrowserRouter, createHashRouter} from "react-router-dom";
import {Home} from "@/pages/Home/Home.lazy.js";
import {TaskPage} from "@/pages/Task/TaskPage.lazy.js";
import ErrorPage from "@/pages/404/ErrorPage.jsx";
import {NewTask} from "@/pages/NewTask/NewTask.lazy.js";
import {Login} from "@/pages/Login/Login.lazy.js";
import {IdeasPage} from "@/pages/IdeasPage/Ideas.lazy.js";

export const router = createHashRouter([
  {
    path: "/login",
    element: (<Login/>)
  }
  , {
    path: "/",
    element: (<Home/>),
  },
  {
    path: "/new-task/:type",
    element: <NewTask/>,
  },
  {
    path: "/task/:id",
    element: <TaskPage/>
  },
  {
    path: '/ideas',
    element: <IdeasPage/>
  },
  {
    path: "*",
    element: <ErrorPage/>
  }
])