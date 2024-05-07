import { createContext, useContext, useState } from "react";

interface LoginContextType {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginContext = createContext<LoginContextType>({ isLogin: false, setIsLogin: () => {} });

export const LoginContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogin, setIsLogin] = useState(false);

  return <LoginContext.Provider value={{ isLogin, setIsLogin }}>{children}</LoginContext.Provider>;
};

export const UseLoginContext = () => useContext(LoginContext);
