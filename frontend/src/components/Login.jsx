import request from "../api/axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setToken } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await request.post(`/user/login`, {
        username,
        password,
      });
      const data = response.data;
      if (data.success) {
        setToken(data?.data?.accessToken);
        setUsername("");
        setPassword("");
        toast.success("Logged in successfully!!");
        navigate("/");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error(error);
      console.error(error);
    }
  };

  return (
    <div className=" grid w-full min-h-[75vh] place-items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow w-8/12 "
      >
        <h1 className=" text-2xl font-bold tracking-tighter mb-8 text-center">
          Login
        </h1>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-medium">
            Username
          </label>
          <input
            type="text"
            className="border p-2 w-full rounded mt-1"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium">
            Password
          </label>
          <input
            type="password"
            className="border p-2 w-full rounded mt-1"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
