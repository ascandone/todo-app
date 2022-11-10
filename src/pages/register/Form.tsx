import { FC, FormEventHandler, useState } from "react";
import { Button } from "src/components/Button";
import { Input } from "src/components/Input";

export type RegisterState =
  | { type: "idle" }
  | { type: "submitting" }
  | { type: "error" };

export type RegisterFormProps = {
  registerState: RegisterState;
  onSubmit: (data: { username: string; password: string }) => void;
};

export const RegisterForm: FC<RegisterFormProps> = ({
  registerState,
  onSubmit,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    // TODO proper validation logic
    if (username !== "" && password !== "") {
      onSubmit({ username, password });
    }
  };

  const disabled = { disabled: registerState.type === "submitting" } as const;

  return (
    <form onSubmit={handleSubmit}>
      <Input
        {...disabled}
        label="Username"
        placeholder="username"
        value={username}
        onInput={setUsername}
      />
      <div className="h-6"></div>
      <Input
        {...disabled}
        label="Password"
        type="password"
        placeholder="••••••"
        value={password}
        onInput={setPassword}
      />

      <div className="h-10"></div>
      <div className="flex justify-end">
        <Button {...disabled} raised fullWidth type="submit">
          Register
        </Button>
      </div>
    </form>
  );
};
