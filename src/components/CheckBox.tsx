import { FC } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";

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
      className="sr-only"
      aria-label={ariaLabel}
    />
    <button
      type="button"
      onClick={() => onToggle(!value)}
      className={classNames(
        "cursor-pointer border border-slate-300 rounded-md shadow-sm w-5 h-5 flex items-center justify-center hover:ring-2 ring-slate-300 ",
        "transition-colors duration-150 ease-in-out",
        {
          "bg-slate-800 border-slate-800": value,
        }
      )}
    >
      {value ? <CheckIcon className="h-5 w-5 text-white stroke-2" /> : null}
    </button>
  </div>
);
