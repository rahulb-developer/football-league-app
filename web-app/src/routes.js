import { createBrowserRouter, Navigate } from "react-router";
import { Dashboard } from "./Components/Dashboard";
import ErrorPage from "./Components/ErrorPage";
import { TeamHome } from "./Components/TeamHome";

// const Login = () => <h1>Login page</h1>;

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/dashboard" replace /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/teamhome", element: <TeamHome /> },
  { path: "*", element: <ErrorPage /> },
]);
