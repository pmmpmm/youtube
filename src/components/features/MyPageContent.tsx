import { HiPencilAlt } from "react-icons/hi";
import { UseLoginContext } from "@/context/LoginContext";
import Button from "@/components/ui/Button";
import TextField from "../ui/TextField";
import { useNavigate } from "react-router-dom";

const MyPageContent = () => {
  const navigate = useNavigate();
  const { userInfo, setIsLogin } = UseLoginContext();

  const logOutHandle = () => {
    setIsLogin(false);
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");
    navigate("/");
  };

  return (
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
  );
};

export default MyPageContent;
