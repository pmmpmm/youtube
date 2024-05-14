import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { HiPencilAlt } from "react-icons/hi";
import UserService from "@/service/UserService";
import { UseLoginContext } from "@/context/LoginContext";
import Loading from "@/components/features/Loading";
import Error from "@/components/features/Error";
import Button from "@/components/ui/Button";

type UserInfo = {
  name: string;
  email: string;
};

const MyPageContent = () => {
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = UseLoginContext();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    email: ""
  });

  // 회원정보 수정 페이지에서 전달받은 수정된 name을 querykey로 설정하여 name이 변경될 때 data 받아오기
  const { state: name } = useLocation();
  const { isLoading, error, data } = useQuery({
    queryKey: ["UserData", name],
    queryFn: UserService.getUser,
    enabled: isLogin,
    staleTime: 1000 * 60 * 60
  });

  useEffect(() => {
    if (isLogin && data) {
      setUserInfo({
        name: data.name,
        email: data.email
      });
    } else {
      setUserInfo({
        name: "",
        email: ""
      });
    }
  }, [isLogin, data]);

  const handleLogout = () => {
    setIsLogin(false);
    navigate("/");
  };

  const handleDeleteUser = async () => {
    if (confirm("회원 탈퇴를 하시겠습니까?")) {
      await UserService.deleteUser();
      setIsLogin(false);
      alert("회원 탈퇴가 처리되었습니다.");
      navigate("/");
    } else {
      alert("회원 탈퇴가 취소되었습니다.");
    }
  };

  return (
    <>
      {/* //화면 진입 시 깜빡임 */}
      {isLoading && <Loading />}
      {error && <Error />}
      <div className="max-w-5xl m-auto px-4">
        <h2 className="pt-10 pb-6 text-3xl font-medium">마이페이지</h2>
        <div className=" p-6 border border-base-800 rounded-2xl sm:p-10">
          <div className="float-right">
            <Button
              text="정보 수정"
              variant="text"
              icon={<HiPencilAlt />}
              onClick={() => navigate("/mypage/modify", { state: userInfo })}
            />
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center">
              <p className="basis-8 flex-none text-base-100 sm:basis-32">이름</p>
              <div className="w-full">{userInfo && <p className="font-semibold">{userInfo.name}</p>}</div>
            </div>
            <div className="flex flex-col sm:flex-row">
              <p className="basis-8 flex-none text-base-100 sm:basis-32">이메일</p>
              <div className="w-full">{userInfo && <p className="font-semibold">{userInfo.email}</p>}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2 justify-between items-center mt-8">
          <Button text="회원 탈퇴" variant="outline" onClick={handleDeleteUser} />
          <Button text="로그아웃" variant="contain" onClick={handleLogout} />
        </div>
      </div>
    </>
  );
};

export default MyPageContent;
