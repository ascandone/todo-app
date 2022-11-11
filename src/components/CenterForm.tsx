import { FC, ReactNode } from "react";

export const CenterForm: FC<{
  header: string;
  children: ReactNode;
  bottom: ReactNode;
}> = ({ header, children, bottom }) => (
  <div className="mx-auto max-w-sm my-24 px-4 md:px-0">
    <h4 className="text-xl font-semibold text-center">{header}</h4>
    <div className="h-8"></div>
    {children}
    <div className="h-2"></div>
    <p className="mt-7 text-center text-slate-700 text-sm">{bottom}</p>
  </div>
);
