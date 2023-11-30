import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    toast.success("Logged out!!");
    logout();
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
      <span className="text-xl font-bold">Task Management</span>
      <div>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-md"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to={"/register"} className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-md mr-2">
              Register
            </Link>
            <Link to={"/login"} className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-md">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
