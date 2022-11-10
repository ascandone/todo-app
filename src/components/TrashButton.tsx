import { FC } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";

export const TrashButton: FC<{
  ariaLabel: string;
  onClick: VoidFunction;
}> = ({ ariaLabel, onClick }) => (
  <button
    type="button"
    aria-label={ariaLabel}
    onClick={onClick}
    className="group-hover:block inline hover:bg-slate-900 hover:text-zinc-200 rounded-md p-1 -m-1"
  >
    <TrashIcon className="h-5 w-5" />
  </button>
);
