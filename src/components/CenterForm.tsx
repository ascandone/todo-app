import { FC, ReactNode, useEffect, useState } from "react";
import { Alert } from "src/components/Alert";

export const CenterForm: FC<{
  header: string;
  info?: ReactNode;
  children: ReactNode;
  bottom: ReactNode;
  error?: string;
}> = ({ header, children, bottom, error, info = null }) => {
  const [showError, setShowError] = useState(error !== undefined);

  useEffect(() => {
    if (error !== undefined) {
      setShowError(true);
    }
  }, [error]);

  return (
    <div className="mx-auto max-w-sm my-24 px-4 md:px-0">
      <h4 className="text-xl font-semibold text-center">{header}</h4>
      <div className="h-8"></div>
      {error === undefined || !showError ? null : (
        <div className="mb-10">
          <Alert type="error" onDelete={() => setShowError(false)}>
            {error}
          </Alert>
        </div>
      )}
      {info}
      {children}
      <div className="h-2"></div>
      <p className="mt-7 text-center text-slate-700 text-sm">{bottom}</p>
    </div>
  );
};
