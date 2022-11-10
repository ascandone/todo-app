import { FC, FormEventHandler, useState } from "react";
import { Button } from "src/components/Button";
import { Input } from "src/components/Input";

export type RegisterFormProps = {
  onSubmit: (data: { username: string; password: string }) => void;
};

export const RegisterForm: FC<RegisterFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    // TODO proper validation logic
    if (username !== "" && password !== "") {
      onSubmit({ username, password });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Username"
        placeholder="username"
        value={username}
        onInput={setUsername}
      />
      <div className="h-6"></div>
      <Input
        label="Password"
        type="password"
        placeholder="••••••"
        value={password}
        onInput={setPassword}
      />

      <div className="h-10"></div>
      <div className="flex justify-end">
        <Button fullWidth type="submit">
          Register
        </Button>
      </div>
    </form>
  );
};
