import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CenterForm } from "src/components/CenterForm";
import { Link } from "src/components/Link";
import {
  RegisterForm,
  RegisterFormProps,
  RegisterState,
} from "src/pages/register/Form";
import { useAuth } from "src/providers/Auth";
import { trpc } from "src/utils/trpc";

export const RegisterPageUi: FC<{
  registerState: RegisterState;
  onSubmit: RegisterFormProps["onSubmit"];
}> = ({ onSubmit, registerState }) => (
  <CenterForm
    header="Create account"
    bottom={
      <>
        Already have an account? <Link href="/login">Log in</Link>
      </>
    }
  >
    <RegisterForm registerState={registerState} onSubmit={onSubmit} />
  </CenterForm>
);

export const RegisterPage: FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.credentials !== undefined) {
      navigate("/");
    }
  }, [auth.credentials]);

  const registerUser = trpc.registerUser.useMutation({
    onSuccess(user) {
      if (user) {
        auth.login(user);
      }
    },
  });

  const registerState: RegisterState = (() => {
    if (registerUser.isLoading) {
      return { type: "submitting" };
    } else if (registerUser.isError) {
      return { type: "error" };
    } else {
      return { type: "idle" };
    }
  })();

  return (
    <RegisterPageUi
      registerState={registerState}
      onSubmit={(data) => {
        registerUser.mutate(data);
      }}
    />
  );
};
