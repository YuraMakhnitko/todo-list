import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

import { UserSubmitForm } from "../settings/types";
import { registerValidationSchema } from "../settings/validations";
import { registerContentText } from "./languageSettings";

export const Register: React.FC = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(registerValidationSchema),
  });
  const { language } = useSelector((state: RootState) => state.settings);

  const [changedLanguage, setChangedLanguage] = useState(
    registerContentText.en
  );

  useEffect(() => {
    if (language === "en" || language === "ua") {
      setChangedLanguage(registerContentText[language]);
    }
  }, [language]);

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
        <label className="todo-register__input-label">
          {changedLanguage.name}
        </label>
        <input
          className="todo-register__input"
          placeholder={changedLanguage.namePlaceholder}
          type="name"
          {...register("name")}
        />

        {errors?.name && <p>{errors.name.message}</p>}
      </div>
      <div className="todo-register__input-box">
        <label className="todo-register__input-label">
          {changedLanguage.email}
        </label>

        <input
          type="email"
          className="todo-register__input"
          placeholder={changedLanguage.emailPlaceholder}
          {...register("email")}
        />
        {errors?.email && <p>{errors.email.message}</p>}
      </div>
      <div className="todo-register__input-box">
        <label className="todo-register__input-label">
          {changedLanguage.password}
        </label>

        <input
          type="password"
          className="todo-register__input"
          placeholder={changedLanguage.passwordPlaceholder}
          {...register("password")}
        />
        {errors?.password && <p>{errors.password.message}</p>}
      </div>
      <div className="todo-register__input-box">
        <label className="todo-register__input-label">
          {changedLanguage.confirmPassword}
        </label>

        <input
          type="password"
          className="todo-register__input"
          placeholder={changedLanguage.passwordPlaceholder}
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
        {changedLanguage.submitButton}
      </button>
    </form>
  );
};
