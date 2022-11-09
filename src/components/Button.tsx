import { FC, ReactNode } from "react";

export type ButtonType =
  | { type: "submit"; onClick?: VoidFunction }
  | { type: "button"; onClick: VoidFunction };

export type ButtonProps = {
  children: ReactNode;
} & ButtonType;

export const Button: FC<ButtonProps> = ({ children, onClick, type }) => (
  <button
    onClick={onClick}
    // eslint-disable-next-line react/button-has-type
    type={type}
    className="bg-zinc-800 text-white font-semibold hover:bg-opacity-90 rounded px-3 py-2 leading-none focus:ring-1 ring-sky-400 focus:outline-none ring-offset-2"
  >
    {children}
  </button>
);
