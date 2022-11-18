import { FC, FormEventHandler, useState } from "react";
import { Button } from "src/components/Button";
import { Input } from "src/components/Input";

export type LoginState =
  | { type: "idle" }
  | { type: "submitting" }
  | { type: "error"; message: string };

export type LoginFormProps = {
  loginState: LoginState;
  onSubmit: (data: { username: string; password: string }) => void;
};

const usernameValidationErr = (field: string): string | undefined => {
  if (field === "") {
    return "Required field";
  }

  if (field.length < 5) {
    return "At least 5 chars required";
  }
};

const passwordValidationErr = (field: string): string | undefined => {
  if (field === "") {
    return "Required field";
  }

  if (field.length < 5) {
    return "At least 5 chars required";
  }
};

export const LoginForm: FC<LoginFormProps> = ({ onSubmit, loginState }) => {
  const [username, setUsername] = useState("");
  const [showUsernameErr, setShowUsernameErr] = useState(false);
  const usernameErr = usernameValidationErr(username);

  const [password, setPassword] = useState("");
  const [showPasswordErr, setShowPasswordErr] = useState(false);
  const passwordErr = passwordValidationErr(password);

  const [clickedSubmit, setClickedSubmit] = useState(false);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    setClickedSubmit(true);

    if (usernameErr === undefined && passwordErr === undefined) {
      onSubmit({ username, password });
    }
  };

  const submitting = loginState.type === "submitting";

  return (
    <form onSubmit={handleSubmit}>
      <Input
        disabled={submitting}
        name="username"
        label="Username"
        placeholder="Enter your username"
        value={username}
        onInput={setUsername}
        error={clickedSubmit || showUsernameErr ? usernameErr : undefined}
        onBlur={() => {
          setShowUsernameErr(true);
        }}
      />
      <div className="h-6"></div>
      <Input
        disabled={submitting}
        name="password"
        label="Password"
        type="password"
        placeholder="••••••"
        value={password}
        onInput={setPassword}
        error={clickedSubmit || showPasswordErr ? passwordErr : undefined}
        onBlur={() => {
          setShowPasswordErr(true);
        }}
      />

      <div className="h-10" />
      <div className="flex justify-end">
        <Button
          disabled={submitting}
          loading={submitting}
          raised
          fullWidth
          type="submit"
        >
          Log in
        </Button>
      </div>
    </form>
  );
};
