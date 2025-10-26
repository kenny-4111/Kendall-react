import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "danger";
  className?: string;
};

export default function Button({
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
