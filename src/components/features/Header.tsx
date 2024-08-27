import { useEffect, useRef, useState, KeyboardEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { screens } from "tailwindcss/defaultTheme";
import { IoIosSearch, IoIosArrowRoundBack, IoIosClose } from "react-icons/io";
// import { BsFillPersonFill } from "react-icons/bs";
// import { UseLoginContext } from "@/context/LoginContext";
import Logo from "@/components/ui/Logo";
import ThemeModeCtrl from "@/components/ui/ThemeModeCtrl";

const Header = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("searchQuery");
  const [text, setText] = useState(keyword ?? "");
  const [focus, setFocus] = useState(false);
  const searchInp = useRef<HTMLInputElement>(null);
  // const { isLogin } = UseLoginContext();
  const screenX = window.matchMedia(`(max-width: ${screens.sm})`);

  const handleSubmit = () => {
    if (text.trim().length > 0) navigate(`/videos/results?searchQuery=${text.trim()}`);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") handleSubmit();
  };

  useEffect(() => {
    !keyword ? setText("") : setText(keyword);
  }, [keyword]);

  const [isMobileForm, setIsMobileForm] = useState(screenX.matches);

  useEffect(() => {
    screenX.matches && setIsMobileForm(screenX.matches);
  }, [screenX.matches]);

  return (
    <>
      <Link to="/" className="flex-none w-[7.5rem] text-[0]">
        <h1>
          <Logo width="100%" />
        </h1>
      </Link>
      <div className="flex flex-initial basis-[62%] justify-end sm:justify-center md:basis-6/12 lg:basis-5/12">
        <div
          className={`items-center w-full h-full px-4 bg-base-950 absolute top-0 left-0 -z-10 
            sm:flex sm:p-0 sm:relative sm:z-10
            ${!isMobileForm ? "hidden" : focus || !!text ? "flex z-50" : "hidden"}
            `}
        >
          {/* 모바일 화면 시 검색폼 hidden 버튼 */}
          <button
            onClick={() => {
              setFocus(false);
              setIsMobileForm(false);
            }}
            className="flex-none block w-10 h-10 sm:hidden"
            aria-label="모바일 화면 검색 폼 숨김 버튼"
          >
            <IoIosArrowRoundBack className="inline-block w-7 h-7 text-base-300" />
          </button>

          {/* 검색폼 */}
          <div
            className={`flex w-full h-10 border border-solid border-base-700 rounded-full 
              ${focus ? "border-transparent shadow-form-focus dark:border-base-300" : ""}`}
          >
            <input
              type="text"
              placeholder="검색"
              ref={searchInp}
              value={text}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              onChange={(e) => setText(e.target.value)}
              className="flex-initial w-full h-10 px-6 font-normal text-base-100 bg-transparent border-0 border-transparent rounded-full placeholder:text-base-600 dark:font-light focus:outline-none"
              onKeyDown={handleKeyDown}
            />
            {text && (
              <button
                className="flex-none w-[26px] opacity-50"
                aria-label="검색어 삭제 버튼"
                type="button"
                onClick={() => {
                  setText("");
                  searchInp.current && searchInp.current.focus();
                }}
              >
                <IoIosClose className="inline-block w-7 h-7 text-base-300" />
              </button>
            )}
            <button type="button" onClick={handleSubmit} aria-label="검색 버튼" className="flex-none w-16">
              <IoIosSearch className="inline-block w-7 h-7 text-base-300" />
            </button>
          </div>
        </div>

        {/* 모바일 화면 시 검색폼 show 버튼 */}
        <button
          onClick={() => {
            setFocus(true);
            setIsMobileForm(true);
          }}
          className="flex-none block mx-1 relative z-[1] w-10 h-10 sm:hidden"
          aria-label="검색 폼 노출 버튼"
        >
          <IoIosSearch className="inline-block w-7 h-7 text-base-300" />
        </button>
      </div>

      {/* 계정 관련 버튼 */}
      <div className="flex gap-3 items-center sm:gap-4">
        {/* {isLogin ? (
          <Link to="/mypage">
            <BsFillPersonFill className="block w-[28px] h-[28px] text-base-300 md:hidden" />
            <p className=" h-10 px-4 pt-[8px] text-[15px] text-base-300 border border-base-700 rounded-full hidden md:flex">
              마이페이지
            </p>
          </Link>
        ) : (
          <Link to="/member/login">
            <BsFillPersonFill className="block w-[28px] h-[28px] text-base-300 md:hidden" />
            <p className=" h-10 px-4 pt-[8px] text-[15px] text-base-300 border border-base-700 rounded-full hidden md:flex">
              로그인
            </p>
          </Link>
        )} */}
        <ThemeModeCtrl />
      </div>
    </>
  );
};

export default Header;
