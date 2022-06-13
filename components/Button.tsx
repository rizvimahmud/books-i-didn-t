import React, { ButtonHTMLAttributes } from "react";
import cn from "clsx";
import { Spinner } from "./Spinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  style?: Record<string, string>;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  active?: Boolean;
  loading?: Boolean;
  variant?: "flat" | "ghost";
}

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    className = "",
    style = {},
    variant = "flat",
    active,
    loading = false,
    type = "button",
    disabled = false,
    ...rest
  } = props;

  const classes = cn(
    className,
    "inline-flex justify-center items-center px-4 py-3 text-sm tracking-wide rounded-md hover:outline-none hover:ring-0 focus:outline-none focus:ring-0ffset-2 focus:ring-gray-400 transition duration-100",
    { "border-2 border-gray-300": active },
    { "bg-black text-white hover:opacity-85": variant === "flat" },
    {
      "bg-transparent text-black py-2 border border-gray-400 hover:border-gray-600":
        variant === "ghost",
    },
    { "bg-opacity-80 cursor-not-allowed": loading },
    { "bg-opacity-80 cursor-not-allowed": disabled }
  );

  return (
    <button
      style={style}
      className={classes}
      disabled={disabled}
      type={type}
      {...rest}
    >
      {loading ? (
        <i className="ml-3">
          {" "}
          <Spinner stroke="#ffffff" width="18px" />
        </i>
      ) : (
        children
      )}
    </button>
  );
};
