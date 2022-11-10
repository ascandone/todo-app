import classNames from "classnames";
import { FC, useId } from "react";

export type Type = "text" | "password" | "email";

export type InputProps = {
  value: string;
  onInput: (value: string) => void;
  type?: Type;
  placeholder?: string;
  autofocus?: boolean;
  name?: string;
  label?: string;
  disabled?: boolean;
};

export const Input: FC<InputProps> = ({
  value,
  onInput,
  placeholder,
  autofocus,
  name,
  label,
  disabled = false,
  type = "text",
}) => {
  const id = useId();

  return (
    <div className="max-w-md">
      {label === undefined ? null : (
        <label className="text-gray-600 mb-1 block text-sm" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        disabled={disabled}
        id={id}
        value={value}
        onChange={(e) => onInput(e.target.value)}
        type={type}
        placeholder={placeholder}
        autoFocus={autofocus}
        name={name}
        autoComplete="off"
        className={classNames(
          "border py-2 px-3 w-full rounded shadow-sm hover:border-sky-300",
          "transition-color duration-150",
          "hover:ring focus:ring active:ring-0 ring-sky-200 focus:border-sky-400 outline-none"
        )}
      />
    </div>
  );
};
