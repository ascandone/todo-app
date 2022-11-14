import classNames from "classnames";
import { FC } from "react";

export type IconButtonProps = {
  ariaLabel: string;
  onClick: VoidFunction;
  icon: FC<{ className: string }>;
  dark?: boolean;
};

export const IconButton: FC<IconButtonProps> = ({
  ariaLabel,
  onClick,
  icon: Icon,
  dark = false,
}) => (
  <button
    type="button"
    aria-label={ariaLabel}
    onClick={onClick}
    className={classNames(
      "group-hover:block inline  rounded-md p-1 -m-1",
      dark ? "hover:bg-slate-900 hover:text-zinc-200" : "hover:bg-zinc-100"
    )}
  >
    <Icon className="h-5 w-5" />
  </button>
);
