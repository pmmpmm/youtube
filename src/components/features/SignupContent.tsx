import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "@/service/UserService";
import ContentsLayoutBlock from "@/components/features/common/layouts/ContentsLayoutBlock";
import LogoIcon from "@/components/ui/LogoIcon";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";

type InputsType = {
  [key: string]: string;
  name: string;
  email: string;
  password: string;
};

const SignupContent = () => {
  const navigate = useNavigate();

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
      navigate("/member/login", {
        state: { prevPath: "/member/signup" }
      });
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
    <ContentsLayoutBlock>
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
              <Button text="회원가입" variant="contain" size="large" width="full" onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </ContentsLayoutBlock>
  );
};

export default SignupContent;
