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
      className="hidden"
      aria-label={ariaLabel}
    />
    <button
      aria-label={ariaLabel}
      type="button"
      onClick={() => onToggle(!value)}
      className={classNames(
        "cursor-pointer border border-slate-300 rounded-md shadow-sm w-5 h-5 flex items-center justify-center ring-slate-300 ",
        "transition-all duration-150 ease-in-out",
        "active:scale-95 ",
        {
          "hover:bg-slate-300": !value,
          "bg-slate-800 border-slate-800 hover:bg-slate-700": value,
        }
      )}
    >
      {value ? <CheckIcon className="h-5 w-5 text-white stroke-2" /> : null}
    </button>
  </div>
);
