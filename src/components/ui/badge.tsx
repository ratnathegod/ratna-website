import * as React from "react";

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "secondary" | "outline";
};

export function Badge({ className = "", variant = "default", children, ...props }: BadgeProps) {
  const base = "inline-flex items-center rounded-full px-2.5 py-1 text-xs";
  const variants = variant === "outline" ? "border border-white/20" : variant === "secondary" ? "bg-white/10 text-white" : "bg-indigo-600";
  return (
    <span className={`${base} ${variants} ${className}`} {...props}>
      {children}
    </span>
  );
}
