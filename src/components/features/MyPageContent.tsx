const MyPageContent = () => {
  return (
    <div className="max-w-5xl m-auto px-4">
      <h2 className="pt-10 pb-6 text-3xl font-medium">마이페이지</h2>
      <div className="flex flex-col gap-6 p-10 border border-base-800 rounded-2xl">
        <div className="flex flex-col sm:flex-row">
          <p className="basis-8 flex-none text-base-100 sm:basis-32">이름</p>
          <p className="font-medium">홍길동</p>
        </div>
        <div className="flex flex-col sm:flex-row">
          <p className="basis-8 flex-none text-base-100 sm:basis-32">이메일</p>
          <p className="font-medium">hong-gildong@naver.com</p>
        </div>
      </div>
    </div>
  );
};

export default MyPageContent;
