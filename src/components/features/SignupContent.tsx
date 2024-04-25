// import TextField from "@/components/ui/TextField";
import Logo from "@/components/ui/Logo";
import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
import UserService from "@/service/UserService";

const SignupContent = () => {
  // const { data } = useQuery({
  //   queryKey: ["UserService.getUser", 1],
  //   queryFn: UserService.getUser
  // });
  // console.log("data", data);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    requestSubmit();
  };

  const requestSubmit = async () => {
    const response = await UserService.createUser(name, email, password);
    if (response) {
      console.log("동기 성공");
    } else {
      console.log("동기 실패");
    }
  };

  return (
    <div
      className="flex justify-center items-center w-full m-auto min-h-[calc(100vh-var(--header-height)-var(--container-bottom))] 
    sm:min-h-[calc(100vh-var(--header-height-sm)-var(--container-bottom))]"
    >
      <div
        className=" w-full min-h-[384px] p-11 rounded-3xl shadow-2xl 
        sm:w-[480px] lg:w-[940px] lg:min-h-[384px]"
      >
        <div className="flex flex-col w-full lg:flex-row">
          <div className="basis-1/2">
            <Logo width="150px" />
            <h1>회원 가입</h1>
          </div>
          <div className="basis-1/2">
            <form action="" onSubmit={onSubmit} className="flex flex-col gap-y-4">
              <div className="flex flex-col w-full">
                <label htmlFor="name" className="pb-1 text-sm text-neutral-700">
                  이름
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  id="name"
                  name="name"
                  className="h-11 px-4 text-sm border border-solid border-neutral-300 rounded-md"
                />
              </div>

              <div className="flex flex-col w-full">
                <label htmlFor="email" className="pb-1 text-sm text-neutral-700">
                  이메일
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  name="email"
                  className="h-11 px-4 text-sm border border-solid border-neutral-300 rounded-md"
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="password" className="pb-1 text-sm text-neutral-700">
                  비밀번호
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                  name="password"
                  className="h-11 px-4 text-sm border border-solid border-neutral-300 rounded-md"
                />
              </div>
              <button type="submit">회원 가입 하기</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupContent;
