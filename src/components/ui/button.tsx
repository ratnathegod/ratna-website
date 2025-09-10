import * as React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md";
  asChild?: boolean;
};

export function Button({ variant = "solid", size = "md", className = "", asChild, children, ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 rounded-xl transition focus:outline-none focus:ring-2 focus:ring-indigo-500";
  const sizes = size === "sm" ? "px-3 py-1.5 text-sm" : "px-4 py-2";
  const variants = variant === "outline" ? "border border-white/20 bg-transparent hover:bg-white/10"
    : variant === "ghost" ? "bg-transparent hover:bg-white/10" : "bg-indigo-600 hover:bg-indigo-500";

  if (asChild) {
    return (
      <span
        className={`${base} ${sizes} ${variants} ${className}`}
        {...(props as unknown as React.HTMLAttributes<HTMLSpanElement>)}
      >
        {children}
      </span>
    );
  }
  return (
    <button className={`${base} ${sizes} ${variants} ${className}`} {...props}>
      {children}
    </button>
  );
}
