import { useState } from "react";
import { BASE_URL } from "../constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(`${BASE_URL}/user/register`, {
      username,
      password,
    });

    const data = response.data;
    if (data.success) {
      toast.success("Registered successfully!");
      navigate("/login");
    }
  };

  return (
    <div className=" grid w-full min-h-[75vh] place-items-center">
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow w-8/12">
      <h1 className=" text-2xl font-bold tracking-tighter mb-8 text-center">
        Register
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
        Register
      </button>
      </form>
      </div>
  );
};

export default Register;
