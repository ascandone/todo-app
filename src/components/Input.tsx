import { FC } from "react";

export type InputProps = {
  value: string;
  onInput: (value: string) => void;
  placeholder?: string;
  autofocus?: boolean;
  name?: string;
};

export const Input: FC<InputProps> = ({
  value,
  onInput,
  placeholder,
  autofocus,
  name,
}) => (
  <input
    value={value}
    onChange={(e) => onInput(e.target.value)}
    type="text"
    placeholder={placeholder}
    autoFocus={autofocus}
    name={name}
    autoComplete="off"
    className="border rounded shadow-sm focus:ring ring-sky-200 focus:border-sky-600 focus:ring-opacity-50 focus:outline-none py-2 px-3 flex-1"
  />
);
