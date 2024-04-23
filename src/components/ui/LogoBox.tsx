import { Link } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import Logo from "@/components/ui/Logo";

interface Props {
  parent: string;
  onClick: () => void;
}
const LogoBox = (t: Props) => {
  return (
    <div className={`${t.parent} inline-flex flex-none items-center`}>
      <button className="navBtn block w-10 h-10 mr-2 sm:hidden" onClick={t.onClick} aria-label="메뉴 버튼">
        <IoIosMenu className="w-8 h-8 m-auto text-black dark:text-white" />
      </button>
      <Link to="/" className="w-[7.5rem] text-[0]">
        <h1 className="logo">
          <Logo />
        </h1>
      </Link>
    </div>
  );
};

export default LogoBox;
