import { FC, ReactNode } from "react";

export const CenterForm: FC<{
  header: string;
  children: ReactNode;
}> = ({ header, children }) => (
  <div className="mx-auto max-w-sm my-10">
    <h4 className="text-xl font-semibold text-center">{header}</h4>
    {children}
  </div>
);
