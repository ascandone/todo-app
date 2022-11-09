import { FC } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";

export const CheckBox: FC<{
  ariaLabel?: string;
  checked: boolean;
  onToggle: (value: boolean) => void;
}> = ({ ariaLabel, checked: value, onToggle }) => (
  <div className="inline-flex">
    <input
      type="checkbox"
      checked={value}
      onChange={() => onToggle(!value)}
      className="hidden"
      aria-label={ariaLabel}
    />
    <button
      type="button"
      onClick={() => onToggle(!value)}
      className="cursor-pointer border border-zinc-300 rounded-md w-5 h-5 flex items-center justify-center hover:border-sky-500 hover:ring-2 ring-sky-200 ring-offset-1"
    >
      {value ? <CheckIcon className="h-5 w-5 text-gray-800" /> : null}
    </button>
  </div>
);
