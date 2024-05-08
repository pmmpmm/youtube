import UserService from "@/service/UserService";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";

type UserInfo = {
  id: number;
  name: string;
  email: string;
};
interface LoginContextType {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

const LoginContext = createContext<LoginContextType>({
  isLogin: false,
  setIsLogin: () => {},
  userInfo: {
    id: -1,
    name: "",
    email: ""
  },
  setUserInfo: () => {}
});

export const LoginContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id: -1,
    name: "",
    email: ""
  });

  const { data } = useQuery({
    queryKey: ["UserService.getUser"],
    queryFn: UserService.getUser,
    enabled: isLogin
  });

  const checkLogin = () => {
    if (localStorage.ACCESS_TOKEN) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if (isLogin && data) {
      setUserInfo({
        id: data.id,
        name: data.name,
        email: data.email
      });
    } else {
      setUserInfo({
        id: -1,
        name: "",
        email: ""
      });
    }
  }, [isLogin, data]);

  return (
    <LoginContext.Provider value={{ isLogin, setIsLogin, userInfo, setUserInfo }}>{children}</LoginContext.Provider>
  );
};

export const UseLoginContext = () => useContext(LoginContext);
