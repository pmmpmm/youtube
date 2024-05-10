import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { HiPencilAlt } from "react-icons/hi";
import UserService from "@/service/UserService";
import { UseLoginContext } from "@/context/LoginContext";
import Loading from "@/components/features/Loading";
import Error from "@/components/features/Error";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";

type UserInfo = {
  id: number | null;
  name: string;
  email: string;
};

const MyPageContent = () => {
  const { isLogin, setIsLogin } = UseLoginContext();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    // 로그인이 아닌 상태일 때 url로 mypage 진입 시 로그인 페이지로 이동
    const accessToken = localStorage.getItem(import.meta.env.VITE_ACCESS_TOKEN);
    if (!accessToken) {
      navigate("/member/login");
    }
  }, []);

  const { isLoading, error, data } = useQuery({
    queryKey: ["UserService.getUser"],
    queryFn: UserService.getUser,
    enabled: isLogin,
    staleTime: 1000 * 60 * 60
  });

  useEffect(() => {
    if (isLogin && data) {
      setUserInfo({
        id: data.id,
        name: data.name,
        email: data.email
      });
    } else {
      setUserInfo({
        id: null,
        name: "",
        email: ""
      });
    }
  }, [isLogin, data]);

  const logOutHandle = () => {
    setIsLogin(false);
  };

  return (
    <>
      {isLoading && <Loading />}
      {error && <Error />}
      {data && userInfo !== null && (
        <div className="max-w-5xl m-auto px-4">
          <h2 className="pt-10 pb-6 text-3xl font-medium">마이페이지</h2>
          <div className=" p-10 border border-base-800 rounded-2xl">
            <div className="float-right">
              <Button text="정보 수정" variant="text" icon={<HiPencilAlt />} />
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row">
                <p className="basis-8 flex-none text-base-100 sm:basis-32">이름</p>
                <div className="w-full">
                  <p className="font-medium">{userInfo.name}</p>
                  {/* <TextField type="text" id="name" /> */}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row">
                <p className="basis-8 flex-none text-base-100 sm:basis-32">이메일</p>
                <div className="w-full">
                  <p className="font-medium">{userInfo.email}</p>
                  {/* <TextField type="text" id="email" /> */}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-2 justify-between items-center mt-8">
            <Button text="로그아웃" variant="contain" onClick={logOutHandle} />
            <Button text="회원 탈퇴" variant="outline" />
          </div>
        </div>
      )}
    </>
  );
};

export default MyPageContent;
