import { FC } from "react";
import { trpc } from "src/utils/trpc";

export const IndexPage: FC = () => {
  const hello = trpc.userById.useQuery({ id: 1 });

  if (hello.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5">
      <pre>{JSON.stringify(hello.data, null, 2)}</pre>
    </div>
  );
};
