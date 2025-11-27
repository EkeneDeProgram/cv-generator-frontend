import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className,
  children,
  type = "button",
  ...props
}) => {
  const base = "px-4 py-2 rounded-lg font-medium focus:outline-none transition";

  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    outline: "border border-gray-300 hover:bg-gray-50",
  };

  return (
    <button
      type={type}
      className={clsx(base, styles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};
