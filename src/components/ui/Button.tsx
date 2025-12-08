import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  fullWidth?: boolean; // allow button to stretch on small screens
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className,
  children,
  type = "button",
  fullWidth = false,
  ...props
}) => {
  const base =
    "rounded-lg font-medium focus:outline-none transition " +
    "px-4 py-2 text-sm " + // mobile
    "sm:px-5 sm:py-2.5 sm:text-base " + // tablets
    "md:px-6 md:py-3"; // desktops

  const styles = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 md:hover:scale-[1.02]",
    secondary:
      "bg-gray-100 text-gray-800 hover:bg-gray-200 md:hover:scale-[1.02]",
    outline:
      "border border-gray-300 hover:bg-gray-50 md:hover:scale-[1.02]",
  };

  return (
    <button
      type={type}
      className={clsx(
        base,
        styles[variant],
        fullWidth && "w-full", // optional mobile full width
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
