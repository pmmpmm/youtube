import { ReactElement, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { screens } from "tailwindcss/defaultTheme";
import { IoIosMenu } from "react-icons/io";
import Header from "@/components/features/Header";
import Nav from "@/components/features/Nav";

export type LayoutAProps = {
  children: string | ReactElement | ReactElement[];
};

const LayoutA = ({ children }: LayoutAProps) => {
  const screenX = window.matchMedia(`(max-width: ${screens.sm})`);
  const [mobileScreenX, setMobileScreenX] = useState(screenX.matches);
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [navMenu, setNavMenu] = useState("/");
  const { pathname = "" } = useLocation();

  useEffect(() => {
    // 페이지 렌더링 스크롤 0
    window.scrollTo(0, 0);

    // 화면 가로사이즈 resize
    screenX.addEventListener("change", () => {
      if (mobileScreenX) setIsNavOpen(false);
      setMobileScreenX(screenX.matches);
    });
  }, []);

  useEffect(() => {
    const pathArray = pathname.split("/").slice(1);
    if (pathArray.includes("page") || pathArray.length === 1) {
      let path = pathArray.slice(-1)[0];
      path = path ? path : "home";
      setNavMenu(path);
    }
  }, [pathname]);

  return (
    <>
      <div className="w-full flex flex-row items-center justify-between px-2 h-header-height bg-base-950 fixed top-0 left-0 z-50 sm:h-header-height-sm sm:px-4">
        {/* nav menu btn */}
        <button
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="block flex-none w-10 h-10 mr-2 sm:hidden"
          aria-label="메뉴 열림, 닫힘 버튼"
        >
          <IoIosMenu className="w-8 h-8 m-auto text-base-300" />
        </button>
        <Header />
      </div>

      <Nav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} mobileScreenX={mobileScreenX} navMenu={navMenu} />

      {/* contents */}
      <div className="flex pt-container-top pb-8 sm:pt-container-top-sm">
        <div className="flex-initial w-full pl-0 sm:pl-20 xl:pl-60">
          <div className="px-4 py-0 sm:px-4">{children}</div>
        </div>
      </div>
    </>
  );
};

export default LayoutA;
