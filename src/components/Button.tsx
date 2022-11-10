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
} & ButtonType;

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  type,
  disabled = false,
  fullWidth = false,
  variant = "primary",
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    // eslint-disable-next-line react/button-has-type
    type={type}
    className={cls(
      "font-semibold transition-colors duration-100 rounded px-3 py-2 leading-none",
      "focus:ring-1 ring-sky-400 focus:outline-none ring-offset-2",
      "active:scale-[0.99] transition-transform duration-100 ease-in-out",

      {
        "w-full": fullWidth,

        "bg-zinc-800 text-white hover:bg-opacity-90 disabled:bg-zinc-600":
          variant === "primary",

        "bg-white text-gray-900 hover:bg-zinc-50 border shadow-sm disabled:bg-zinc-100":
          variant === "ghost",
      }
    )}
  >
    {children}
  </button>
);
