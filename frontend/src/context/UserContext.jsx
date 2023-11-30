import { useState, useEffect, createContext } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");
    if (access && refresh) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  const setToken = (token1, token2) => {
    if (token1 !== null && token2 !== null) {
      localStorage.setItem("access", token1);
      localStorage.setItem("refresh", token2);
      setIsLoggedIn(true);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
  }
  return (
    <UserContext.Provider value={{ isLoggedIn, setToken, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
