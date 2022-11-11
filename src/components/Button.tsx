import { FC, ReactNode } from "react";
import cls from "classnames";
import { Transition } from "@headlessui/react";
import classNames from "classnames";

const ButtonSpinner: FC<{ show: boolean }> = ({ show }) => (
  <div
    className="absolute inset-0 flex items-center justify-center"
    style={{
      perspective: 240,
    }}
  >
    <Transition
      show={show}
      enter="transition ease-out duration-300"
      enterFrom="opacity-0 rotate-x-45"
      enterTo="opacity-100 rotate-x-0"
    >
      <div className="w-[19px] h-[19px] border-t-gray-600 border-[2px] rounded-full animate-spin"></div>
    </Transition>
  </div>
);

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
  loading?: boolean;
} & ButtonType;

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  type,
  disabled = false,
  fullWidth = false,
  variant = "primary",
  loading = false,
  raised,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    // eslint-disable-next-line react/button-has-type
    type={type}
    className={cls(
      "font-semibold transition-colors duration-100 rounded px-5 py-2 leading-none",
      "focus:ring ring-slate-300 focus:outline-none ring-offset-2",
      "active:scale-[0.99] transition-transform duration-100 ease-in-out",
      "relative", // needed for absolute positioned spinner

      {
        "w-full": fullWidth,

        "bg-slate-900 text-white hover:bg-opacity-90": variant === "primary",
        "disabled:bg-slate-600": variant === "primary" && !loading,

        "shadow-lg": variant === "primary" && raised,

        "bg-white text-gray-900 hover:bg-slate-50 border shadow-sm":
          variant === "ghost",
        "disabled:bg-slate-100": variant === "ghost" && !loading,
      }
    )}
  >
    <span
      className={classNames(
        "block transition ease-out duration-300",
        loading ? "opacity-0 -rotate-x-45" : "opacity-100 rotate-x-0"
      )}
    >
      {children}
    </span>

    <ButtonSpinner show={loading} />
  </button>
);
