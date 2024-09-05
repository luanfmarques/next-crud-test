import * as React from "react";
import { cn } from "@/utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error &&
              "border-red-500 focus:border-red-500 focus:ring-red-500/70",
            className
          )}
          ref={ref}
          {...props}
        />

        {error && <p className="text-xs text-red-500 ml-3.5">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
