import TextField from "@/components/ui/TextField";
import Logo from "@/components/ui/Logo";

const SignupContent = () => {
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
            <Logo width="200px" />
            <h1>회원 가입</h1>
          </div>
          <div className="basis-1/2">
            <form action="" className="flex flex-col gap-y-4">
              <TextField type="text" label="이름" id="name" />
              <TextField type="email" label="이메일" id="email" />
              <TextField type="text" label="아이디" id="id" />
              <TextField type="password" label="비밀번호" id="password" />
            </form>
          </div>
        </div>
        <button>회원 가입 하기</button>
      </div>
    </div>
  );
};

export default SignupContent;
