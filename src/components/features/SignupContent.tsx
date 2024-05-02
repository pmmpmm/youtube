import { useState } from "react";
import UserService from "@/service/UserService";
import LogoIcon from "../ui/LogoIcon";
import TextField from "@/components/ui/TextField";

type InputsType = {
  [index: string]: string;
  name: string;
  email: string;
  password: string;
};

const SignupContent = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: ""
  } as InputsType);

  const { name, email, password } = inputs;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    for (const key in inputs) {
      const value = inputs[key];
      if (value === "") {
        alert("회원가입 폼을 모두 작성해 주세요.");
        return;
      }
    }

    const response = await UserService.createUser(name, email, password);
    if (response) {
      alert("회원가입 성공");
    } else {
      alert("회원가입 실패");
    }

    setInputs({
      name: "",
      email: "",
      password: ""
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="flex justify-center items-start w-full m-auto min-h-[calc(100vh-var(--header-height)-var(--container-bottom))] sm:min-h-[calc(100vh-var(--header-height-sm)-var(--container-bottom))] sm:items-center sm:bg-gradient-to-t sm:from-base-950 sm:from-10% sm:via-slate-100 sm:via-60% sm:to-base-950 sm:to-90% dark:via-base-950">
      <div className="w-full px-4 py-8 bg-base-950 sm:w-[480px] sm:px-11 sm:py-11 sm:rounded-3xl sm:shadow-block lg:w-[940px] dark:sm:bg-base-900">
        <div className="flex flex-col w-full lg:flex-row">
          <div className="basis-1/2 pb-8 lg:pb-0">
            <div className="hidden mb-4 sm:block">
              <LogoIcon width="auto" height="2.75rem" />
            </div>
            <h1 className="text-3xl font-medium">회원 가입</h1>
          </div>
          <div className="basis-1/2">
            <div>
              <div className="flex flex-col gap-y-4">
                <TextField
                  type="text"
                  label="이름"
                  id="name"
                  value={name}
                  onChange={onChange}
                  onKeyDown={handleKeyDown}
                />
                <TextField
                  type="email"
                  label="이메일"
                  id="email"
                  value={email}
                  onChange={onChange}
                  onKeyDown={handleKeyDown}
                />
                <TextField
                  type="password"
                  label="비밀번호"
                  id="password"
                  value={password}
                  onChange={onChange}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full px-4 py-4 text-base-950 bg-main-950 rounded-md"
                >
                  회원 가입 하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupContent;
