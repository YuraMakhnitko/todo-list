import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { UserSubmitForm } from "../settings/types";
import { LoginValidationSchema } from "../settings/validations";

export const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserSubmitForm>({ resolver: yupResolver(LoginValidationSchema) });

  console.log(errors);

  const onSubmit = (values: FieldValues): void => {
    console.log(values);
    console.log("hi");
  };

  return (
    <form action="#" className="todo-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="todo-register__input-box">
        <label className="todo-register__input-label">Email</label>
        <input
          className="todo-register__input"
          placeholder="Enter email..."
          {...register("email")}
        />
      </div>
      {errors?.email && <p>{errors.email.message}</p>}
      <div className="todo-register__input-box">
        <label className="todo-register__input-label">Password</label>
        <input
          className="todo-register__input"
          placeholder="Enter password..."
          {...register("password")}
        />
      </div>
      {errors?.password && <p>{errors.password.message}</p>}
      <button
        // disabled={!inputValue}
        type="submit"
        className="todo__button-submit"
        title={"Add to list"}
      >
        Submit
      </button>
    </form>
  );
};
