import { ReactElement, useEffect } from "react";
import Header from "@/components/features/Header";

export type LayoutAProps = {
  children: string | ReactElement | ReactElement[];
};

const LayoutB = ({ children }: LayoutAProps) => {
  useEffect(() => {
    // 페이지 렌더링 스크롤 0
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="w-full flex flex-row items-center justify-between px-2 h-header-height bg-white fixed top-0 left-0 z-50 dark:bg-[#171717] sm:h-header-height-sm sm:px-4">
        <Header />
      </div>

      {/* contents */}
      <div className="pt-container-top px-container-rl pb-container-bottom sm:pt-container-top-sm">{children}</div>
    </>
  );
};

export default LayoutB;
