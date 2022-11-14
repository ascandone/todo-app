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
  error?: string;
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
  error,
}) => {
  const id = useId();

  return (
    <div className="max-w-md">
      {label === undefined ? null : (
        <label
          className={classNames(
            "mb-1 block",
            error === undefined ? "text-slate-700" : "text-red-700"
          )}
          htmlFor={id}
        >
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
          "border py-2 px-3 w-full rounded shadow-sm",
          "transition-color duration-150",
          "hover:ring focus:ring disabled:ring-0 active:ring-0 outline-none",
          error === undefined
            ? "ring-slate-300 hover:border-slate-300 focus:border-slate-400"
            : "ring-red-200 border-red-300 hover:border-red-400 "
        )}
      />
      {error === undefined ? (
        error
      ) : (
        <p className="text-sm mt-1 text-red-600">{error}</p>
      )}
    </div>
  );
};
