import { FC, useState } from "react";
import { Button } from "src/components/Button";

export const Counter: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>Count: {count}</p>
      <Button type="button" onClick={() => setCount(count + 1)}>
        Increment
      </Button>
    </>
  );
};
