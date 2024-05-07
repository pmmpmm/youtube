import { createContext, useState } from "react";

interface LoginContextType {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}
export const LoginContext = createContext<LoginContextType | null>(null);

export const LoginContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogin, setIsLogin] = useState(false);

  return <LoginContext.Provider value={{ isLogin, setIsLogin }}>{children}</LoginContext.Provider>;
};
