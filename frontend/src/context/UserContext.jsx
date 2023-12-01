import { useState, useEffect, createContext } from "react";

import { toast } from "react-toastify";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const access = localStorage.getItem("accessToken");
    if (access) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  const setToken = (accessToken) => {
    if (accessToken !== null) {
      localStorage.setItem("accessToken", accessToken);
      setIsLoggedIn(true);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    toast.success("Logged out!!");
    // navigate("/login");
    location.href = "/login";
  };
  return (
    <UserContext.Provider value={{ isLoggedIn, setToken, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
