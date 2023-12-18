import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/Home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/errors/TestError";
import NotFound from "../../features/errors/NotFound";
import LoginForm from "../../features/users/LoginForm";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "activities", element: <ActivityDashboard /> },
      { path: "activities/:id", element: <ActivityDetails /> },
      { path: "createActivity", element: <ActivityForm key="create" /> },
      { path: "edit/:id", element: <ActivityForm key="edit" /> },
      { path: "login", element: <LoginForm /> },
      { path: "errors", element: <TestErrors /> },
      { path: "not-found", element: <NotFound /> },
      { path: "*", element: <Navigate replace to="not-found" /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
