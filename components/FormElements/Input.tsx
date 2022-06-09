import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { useFormContext, FieldErrors } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  className = "",
  label = "",
  type = "text",
  name = "",
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="my-6">
      <label htmlFor={name} className="inline-block mb-3 text-sm text-gray-6">
        {label}
      </label>
      <input
        {...register(name)}
        id={name}
        type={type}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        className="px-4 py-3 w-full text-sm text-gray-7 rounded-lg bg-white border border-gray-2 hover:border-gray-5 focus:border-gray-3 focus:outline-none focus:ring-2 ring-gray-1 "
        {...props}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <p className="text-sm text-red-500 mt-1">
            {message}
            <sup>*</sup>
          </p>
        )}
      />
    </div>
  );
};
