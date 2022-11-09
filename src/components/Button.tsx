import { FC, ReactNode } from "react";

export interface ButtonProps {
  onClick: VoidFunction;
  children: ReactNode;
}

export const Button: FC<ButtonProps> = ({ children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`
      bg-gray-900 text-white font-semibold px-4 py-2 rounded leading-none
      focus:outline-none focus:ring ring-slate-300  ring-offset-1
    `}
  >
    {children}
  </button>
);
