import Login from "../components/Login";
import NotFound from "../components/NotFound";
import AddTask from "../components/AddTask";
import PrivateRoute from "../components/PrivateRoute";
import Home from "../components/Home";
import Register from "../components/Register";

const routes = [
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <AddTask />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
