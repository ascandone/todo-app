import { FC, useId } from "react";

export type InputProps = {
  value: string;
  onInput: (value: string) => void;
  placeholder?: string;
  autofocus?: boolean;
  name?: string;
  label?: string;
};

export const Input: FC<InputProps> = ({
  value,
  onInput,
  placeholder,
  autofocus,
  name,
  label,
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
        id={id}
        value={value}
        onChange={(e) => onInput(e.target.value)}
        type="text"
        placeholder={placeholder}
        autoFocus={autofocus}
        name={name}
        autoComplete="off"
        className="border w-full rounded shadow-sm focus:ring ring-sky-200 focus:border-sky-600 focus:ring-opacity-50 focus:outline-none py-2 px-3"
      />
    </div>
  );
};
