import type { FC, ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";

export type LinkProps = {
  href: string;
  children: ReactNode;
};

export const Link: FC<LinkProps> = ({ href, children }) => (
  <RouterLink
    className="text-slate-900 font-semibold underline underline-offset-2"
    to={href}
  >
    {children}
  </RouterLink>
);
