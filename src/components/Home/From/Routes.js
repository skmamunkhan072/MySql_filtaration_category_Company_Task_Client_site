import { createBrowserRouter } from "react-router-dom";
import MainLayoutes from "../../MainLayoutes/MainLayoutes";
import JobDetails from "../JobDetails/JobDetails";
import From from "./From";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayoutes />,
    children: [
      { path: "/", element: <From /> },
      { path: "/Job-details", element: <JobDetails /> },
    ],
  },
]);
