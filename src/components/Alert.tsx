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
      "flex space-x-4 items-center",
      {
        "bg-red-50 text-red-900": type === "error",
      }
    )}
  >
    <span>
      <XCircleIcon className="h-6" />
    </span>
    <span>{children}</span>
  </div>
);
