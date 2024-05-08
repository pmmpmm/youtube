import { Link } from "react-router-dom";

interface ButtonProps {
  text: string;
  variant?: "contain" | "outline";
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ text, variant, href, onClick }: ButtonProps) => {
  let style;
  if (variant === "contain") {
    style = "w-full px-4 py-[13px] text-base-800 bg-main-950 border border-solid border-main-800 rounded-md";
  } else if (variant === "outline") {
    style = "w-full px-4 py-[13px] font-medium border border-solid border-main-700 box-border rounded-md";
  }

  if (href) {
    return (
      <Link to={href}>
        <button type="button" className={style} onClick={onClick}>
          {text}
        </button>
      </Link>
    );
  }

  return (
    <button type="button" className={style} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
