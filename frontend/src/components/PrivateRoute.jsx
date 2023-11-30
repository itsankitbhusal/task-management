import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useContext(UserContext);
  if (isLoggedIn !== null) {
    return isLoggedIn ? children : <Navigate to="/login" />;
  }
};

export default PrivateRoute;
