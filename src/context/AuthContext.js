import { createContext, useContext, useEffect, useState } from "react";
import { userObserver } from "../auth/firebase";

export const LoginContext = createContext();

//! Custom Hook ile
export const useAuthContext = () => {
  return useContext(LoginContext);
};

const AuthContext = ({ children }) => {
  const [userContext, setUserContext] = useState(false);

  useEffect(() => {
    userObserver(setUserContext);
  }, []);

  return (
    <LoginContext.Provider value={{ userContext }}>
      {children}
    </LoginContext.Provider>
  );
};

export default AuthContext;
