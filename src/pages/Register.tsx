import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateUserError } from "src/backend/service/auth";
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
    error={registerState.type === "error" ? registerState.message : undefined}
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

const errorToMessage = (error: CreateUserError): string => {
  switch (error) {
    case "user_already_exists":
      return "User already exists";
  }
};

export const RegisterPage: FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.credentials !== undefined) {
      navigate("/");
    }
  }, [auth.credentials]);

  const [error, setError] = useState<CreateUserError | undefined>(undefined);

  const registerUser = trpc.registerUser.useMutation({
    onMutate() {
      setError(undefined);
    },
    onSuccess(userResult) {
      switch (userResult.type) {
        case "ok":
          auth.login(userResult.value);
          break;

        case "error":
          setError(userResult.error);
          break;
      }
    },
  });

  const registerState: RegisterState = (() => {
    if (registerUser.isLoading) {
      return { type: "submitting" };
    } else if (registerUser.isError) {
      return { type: "error", message: "Error during signup" };
    } else if (error !== undefined) {
      return { type: "error", message: errorToMessage(error) };
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
