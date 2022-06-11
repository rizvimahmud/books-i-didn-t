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
}

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    className = "",
    style = {},
    active,
    loading = false,
    type = "button",
    disabled = false,
    ...rest
  } = props;

  const classes = cn(
    className,
    "inline-flex justify-center px-4 py-4 text-base leading-tight text-center rounded-md bg-black text-white hover:opacity-80 hover:outline-none hover:ring-0 focus:outline-none focus:ring-0ffset-2 focus:ring-gray-400 transition duration-100",
    { "border-2 border-gray-300": active },
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
      {children}
      {loading && (
        <i className="ml-3">
          {" "}
          <Spinner stroke="#ffffff" />
        </i>
      )}
    </button>
  );
};
