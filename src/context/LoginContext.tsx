import { createContext, useContext, useEffect, useState } from "react";

interface LoginContextType {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginContext = createContext<LoginContextType>({
  isLogin: false,
  setIsLogin: () => {}
});

export const LoginContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogin, setIsLogin] = useState(false);

  const checkLogin = () => {
    const accessToken = localStorage.getItem(import.meta.env.VITE_ACCESS_TOKEN);
    if (accessToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    // 로그아웃 시 TOKEN 삭제
    return () => {
      if (isLogin) {
        // 새로고침 혹은 리렌더링시 isLogin의 상태는 false로 초기화 후 checkLogin함수 실행하여 상태 관리.
        // 그래서 unmount(isLogin의 상태가 조건에 맞게 설정 완료 후) 일 때 isLogin의 상태가 true이고
        // 로그아웃 버튼 클릭으로 isLogin의 상태를 false 바꾼다면 localStorage.ACCESS_TOKEN 삭제
        localStorage.removeItem(import.meta.env.VITE_ACCESS_TOKEN);
        localStorage.removeItem(import.meta.env.VITE_REFRESH_TOKEN);
      }
    };
  }, [isLogin]);

  return <LoginContext.Provider value={{ isLogin, setIsLogin }}>{children}</LoginContext.Provider>;
};

export const UseLoginContext = () => useContext(LoginContext);
