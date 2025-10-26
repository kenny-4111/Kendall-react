import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export default function Input({ className = "", ...props }: InputProps) {
  const base = "";
  return <input className={`${base} ${className}`} {...props} />;
  return <input className={className} {...props} />;
}
