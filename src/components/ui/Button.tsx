import { Link } from "react-router-dom";

interface ButtonProps {
  text: string;
  variant?: "contain" | "outline" | "text";
  size?: "small" | "medium" | "large";
  width?: "full";
  href?: string;
  icon?: React.ReactElement;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ text, variant, size, width, href, icon, onClick }: ButtonProps) => {
  let style = "leading-none px-4 py-[10px] ";

  if (size === "small") {
    style = "leading-none px-3 py-[8px] ";
  } else if (size === "medium") {
    style = "leading-none px-4 py-[12px] ";
  } else if (size === "large") {
    style = "leading-none px-6 py-[18px] ";
  }

  if (variant === "contain") {
    style += "text-base-800 bg-main-950 border border-solid border-main-800 rounded-md ";
  } else if (variant === "outline") {
    style += "font-medium border border-solid border-main-700 box-border rounded-md ";
  } else if (variant === "text") {
    style = "flex items-center gap-1 leading-none px-0 py-1 ";
  }

  if (width === "full") {
    style += "w-full";
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
      {icon && icon}
      {text}
    </button>
  );
};

export default Button;
