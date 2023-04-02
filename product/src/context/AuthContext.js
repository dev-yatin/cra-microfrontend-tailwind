/**
  This file is used to validate routing based on userDetail data
*/

import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  const history = useHistory();

  useEffect(() => {
    const userInfo = localStorage.getItem("access_token");
    setUser(userInfo);
    if (!userInfo) {
      history.push("/login");
    }
  }, [history]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export const AuthState = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
