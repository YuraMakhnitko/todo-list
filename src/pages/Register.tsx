import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { UserSubmitForm } from "../settings/types";
import { registerValidationSchema } from "../settings/validations";

export const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(registerValidationSchema),
  });

  console.log(errors);

  const onSubmit = (values: FieldValues): void => {
    console.log(values);
    console.log("hi");
  };
  return (
    <form
      // action="#"
      className="todo-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="todo-register__input-box">
        <label className="todo-register__input-label">Name</label>
        <input
          className="todo-register__input"
          placeholder="Name..."
          type="name"
          {...register("name")}
        />

        {errors?.name && <p>{errors.name.message}</p>}
      </div>
      <div className="todo-register__input-box">
        <label className="todo-register__input-label">Email</label>

        <input
          type="email"
          className="todo-register__input"
          placeholder="Email..."
          {...register("email")}
        />
        {errors?.email && <p>{errors.email.message}</p>}
      </div>
      <div className="todo-register__input-box">
        <label className="todo-register__input-label">Password</label>

        <input
          type="password"
          className="todo-register__input"
          placeholder="Password..."
          {...register("password")}
        />
        {errors?.password && <p>{errors.password.message}</p>}
      </div>
      <div className="todo-register__input-box">
        <label className="todo-register__input-label">Confirm password</label>

        <input
          type="password"
          className="todo-register__input"
          placeholder="Confirm password..."
          {...register("confirmPassword")}
        />
        {errors?.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>
      <button
        // disabled={!isValid}
        type="submit"
        className="todo__button-submit"
        title={"Sumbmit"}
      >
        Submit
      </button>
    </form>
  );
};
