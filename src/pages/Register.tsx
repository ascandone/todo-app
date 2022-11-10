import { FC } from "react";
import { CenterForm } from "src/components/CenterForm";
import { RegisterForm, RegisterFormProps } from "src/pages/register/Form";
import { trpc } from "src/utils/trpc";

export const RegisterPageUi: FC<{
  onSubmit: RegisterFormProps["onSubmit"];
}> = ({ onSubmit }) => (
  <CenterForm header="Create account">
    <div className="h-5"></div>
    <RegisterForm onSubmit={onSubmit} />
  </CenterForm>
);

export const RegisterPage: FC = () => {
  const registerUser = trpc.registerUser.useMutation();

  return (
    <RegisterPageUi
      onSubmit={(data) => {
        registerUser.mutate(data);
      }}
    />
  );
};
