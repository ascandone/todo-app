import { FC, useEffect, useState } from "react";
import { CenterForm } from "src/components/CenterForm";
import { LoginForm, LoginFormProps, LoginState } from "src/pages/login/Form";
import { trpc } from "src/utils/trpc";
import { useNavigate } from "react-router-dom";
import { useAuth } from "src/providers/Auth";
import { Link } from "src/components/Link";
import type { LoginError } from "src/backend/service/auth";

export const LoginPageUi: FC<{
  loginState: LoginState;
  onSubmit: LoginFormProps["onSubmit"];
  error?: string;
}> = ({ onSubmit, loginState }) => (
  <CenterForm
    error={loginState.type === "error" ? loginState.message : undefined}
    header="Log in"
    bottom={
      <>
        Don&apos;t have an account? <Link href="/register">Sign up</Link>
      </>
    }
  >
    <LoginForm loginState={loginState} onSubmit={onSubmit} />
  </CenterForm>
);

const errorToMessage = (error: LoginError): string => {
  switch (error.type) {
    case "invalid_password":
      return "Invalid password";

    case "user_not_found":
      return "User does not exist";
  }
};

export const LoginPage: FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.credentials !== undefined) {
      navigate("/");
    }
  }, [auth.credentials]);

  const [error, setError] = useState<LoginError | undefined>(undefined);

  const loginUser = trpc.loginUser.useMutation({
    onMutate() {
      setError(undefined);
    },
    onSuccess(user) {
      switch (user.type) {
        case "ok":
          auth.login(user.value);
          break;

        case "error":
          setError(user.error);
          break;
      }
    },
  });

  const loginState: LoginState = (() => {
    if (loginUser.isLoading) {
      return { type: "submitting" };
    } else if (loginUser.isError) {
      return { type: "error", message: loginUser.error.message };
    } else if (error !== undefined) {
      return { type: "error", message: errorToMessage(error) };
    } else {
      return { type: "idle" };
    }
  })();

  return (
    <LoginPageUi
      loginState={loginState}
      onSubmit={(data) => {
        loginUser.mutate(data);
      }}
    />
  );
};
