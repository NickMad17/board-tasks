import {createBrowserRouter, createHashRouter} from "react-router-dom";
import {Home} from "@/pages/Home/Home.lazy.js";
import {TaskPage} from "@/pages/Task/TaskPage.lazy.js";
import ErrorPage from "@/pages/404/ErrorPage.jsx";
import {NewTask} from "@/pages/NewTask/NewTask.lazy.js";
import {Login} from "@/pages/Login/Login.lazy.js";
import {IdeasPage} from "@/pages/IdeasPage/Ideas.lazy.js";
import ProtectedRoute from "@/components/ProtectedRoute.jsx";

export const router = createHashRouter([
  {
    path: "/login",
    element: (<Login/>)
  }
  , {
    path: "/",
    element: (
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
    ),
  },
  {
    path: "/new-task/:type",
    element: (
        <ProtectedRoute>
          <NewTask/>
        </ProtectedRoute>
    ),
  },
  {
    path: "/task/:id",
    element: (
        <ProtectedRoute>
          <TaskPage/>
        </ProtectedRoute>
    )
  },
  {
    path: '/ideas',
    element: (
        <ProtectedRoute>
          <IdeasPage/>
        </ProtectedRoute>
    )
  },
  {
    path: "*",
    element: <ErrorPage/>
  }
])