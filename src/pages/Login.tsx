import { FC, useEffect } from "react";
import { CenterForm } from "src/components/CenterForm";
import { LoginForm, LoginFormProps, LoginState } from "src/pages/login/Form";
import { trpc } from "src/utils/trpc";
import { useNavigate } from "react-router-dom";
import { useAuth } from "src/providers/Auth";
import { Link } from "src/components/Link";

export const LoginPageUi: FC<{
  loginState: LoginState;
  onSubmit: LoginFormProps["onSubmit"];
}> = ({ onSubmit, loginState }) => (
  <CenterForm
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

export const LoginPage: FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.credentials !== undefined) {
      navigate("/");
    }
  }, [auth.credentials]);

  const loginUser = trpc.loginUser.useMutation({
    onSuccess(user) {
      if (user !== null) {
        auth.login(user);
      }
    },
  });

  const loginState: LoginState = (() => {
    if (loginUser.isLoading) {
      return { type: "submitting" };
    } else if (loginUser.isError) {
      return { type: "error", message: loginUser.error.message };
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
