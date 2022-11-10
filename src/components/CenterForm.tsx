import { FC, ReactNode } from "react";

export const CenterForm: FC<{
  header: string;
  children: ReactNode;
}> = ({ header, children }) => (
  <div className="mx-auto max-w-sm my-10 px-4 md:px-0">
    <h4 className="text-xl font-semibold text-center">{header}</h4>
    <div className="h-8"></div>
    {children}
  </div>
);
