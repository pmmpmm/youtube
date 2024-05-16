import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import UserService from "@/service/UserService";
import { useQuery } from "@tanstack/react-query";

const ModifyInfoContent = () => {
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["UserData"],
    queryFn: UserService.getUser
  });

  const [name, setName] = useState((data && data.name) || "");
  useEffect(() => {
    data ? setName(data.name) : setName("");
  }, [data]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(value);
  };

  const completeModify = async () => {
    const response = await UserService.updateUser(name);
    if (response) {
      alert("회원 정보 수정 성공");
      navigate("/mypage", { state: name });
    } else {
      alert("회원 정보 수정 실패");
    }
  };

  return (
    <>
      <div className="max-w-5xl m-auto px-4">
        <h2 className="pt-10 pb-6 text-3xl font-medium">회원 정보 수정</h2>
        <div className=" p-6 border border-base-800 rounded-2xl sm:p-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center">
              <p className="basis-8 flex-none text-base-100 sm:basis-32">이름</p>
              <div className="w-full">
                {data && <TextField type="text" id="name" value={name} onChange={onChange} />}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row">
              <p className="basis-8 flex-none text-base-100 sm:basis-32">이메일</p>
              <div className="w-full">{data && <p className="font-semibold">{data && data.email}</p>}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2 justify-end items-center mt-8">
          <Button text="수정 완료" variant="contain" onClick={completeModify} />
        </div>
      </div>
    </>
  );
};

export default ModifyInfoContent;
