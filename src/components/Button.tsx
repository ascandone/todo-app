import { FC, ReactNode } from "react";
import cls from "classnames";

export type Variant = "primary" | "ghost";

export type ButtonType =
  | { type: "submit"; onClick?: VoidFunction }
  | { type: "button"; onClick: VoidFunction };

export type ButtonProps = {
  children: ReactNode;
  fullWidth?: boolean;
  variant?: Variant;
  disabled?: boolean;
  raised?: boolean;
} & ButtonType;

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  type,
  disabled = false,
  fullWidth = false,
  variant = "primary",
  raised,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    // eslint-disable-next-line react/button-has-type
    type={type}
    className={cls(
      "font-semibold transition-colors duration-100 rounded px-3 py-2 leading-none",
      "focus:ring ring-slate-300 focus:outline-none ring-offset-2",
      "active:scale-[0.99] transition-transform duration-100 ease-in-out",

      {
        "w-full": fullWidth,

        "bg-slate-900 text-white hover:bg-opacity-90 disabled:bg-slate-600":
          variant === "primary",

        "shadow-lg": variant === "primary" && raised,

        "bg-white text-gray-900 hover:bg-slate-50 border shadow-sm disabled:bg-slate-100":
          variant === "ghost",
      }
    )}
  >
    {children}
  </button>
);
