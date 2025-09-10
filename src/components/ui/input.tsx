import * as React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input({ className = "", ...props }, ref) {
  return (
    <input ref={ref} className={`rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm outline-none ring-indigo-500 placeholder:text-white/50 focus:ring-2 ${className}`} {...props} />
  );
});
