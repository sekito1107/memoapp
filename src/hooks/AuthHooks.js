import { useState, createContext, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [isLogin, setIsLogin] = useState(false);
  const login = () => setIsLogin(true);
  const logout = () => setIsLogin(false);

  return (
    <AuthContext.Provider value={{ isLogin, login, logout }}> 
      { children }
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
