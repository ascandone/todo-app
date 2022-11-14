import classNames from "classnames";
import { FC, ReactNode } from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";

export type AlertProps = {
  type?: "default" | "error";
  children: ReactNode;
};

export const Alert: FC<AlertProps> = ({ children, type = "default" }) => (
  <div
    className={classNames(
      "px-4 py-4 rounded max-w-md text-lg",
      "flex space-x-4 items-center border",
      {
        "bg-sky-50 text-sky-900 border-sky-300": type === "default",
        "bg-red-50 text-red-900  border-red-300": type === "error",
      }
    )}
  >
    {type === "error" ? (
      <span>
        <XCircleIcon className="h-6" />
      </span>
    ) : null}
    <span>{children}</span>
  </div>
);
