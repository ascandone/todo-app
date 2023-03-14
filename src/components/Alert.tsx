import classNames from "classnames";
import { FC, ReactNode } from "react";
import { XCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";

export type AlertProps = {
  type?: "default" | "error";
  onDelete?: VoidFunction;
  children: ReactNode;
};

export const Alert: FC<AlertProps> = ({
  children,
  type = "default",
  onDelete,
}) => (
  <div
    className={classNames(
      "px-4 py-4 rounded max-w-md text-lg",
      "flex space-x-4 items-center border",
      {
        "bg-sky-50 text-sky-900 border-sky-200": type === "default",
        "bg-red-50 text-red-900  border-red-200": type === "error",
      }
    )}
  >
    {type === "error" ? (
      <span>
        <XCircleIcon className="h-6" />
      </span>
    ) : null}
    <span>{children}</span>
    <div className="w-full flex-1"></div>
    {onDelete !== undefined ? (
      <button type="button" onClick={onDelete}>
        <XMarkIcon
          className={classNames("h-7 rounded-md p-1", {
            "bg-sky-100 hover:bg-sky-200": type === "default",
            "bg-red-100 hover:bg-red-200": type === "error",
          })}
        />
      </button>
    ) : null}
  </div>
);
