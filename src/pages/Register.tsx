import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

import { UserSubmitForm } from "../settings/types";
import { registerValidationSchema } from "../settings/validations";
import { registerContentText } from "./languageSettings";
import useSound from "use-sound";
import { sounds } from "../settings/sounds";

export const Register: React.FC = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(registerValidationSchema),
  });
  const { language } = useSelector((state: RootState) => state.settings);
  const volume = useSelector((state: RootState) => state.settings.soundsVolume);
  const [submitSound] = useSound(sounds.submitSound, { volume });

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
    submitSound();
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

        {errors?.name && <p className="form-errors">{errors.name.message}</p>}
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
        {errors?.email && <p className="form-errors">{errors.email.message}</p>}
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
        {errors?.password && (
          <p className="form-errors">{errors.password.message}</p>
        )}
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
        {errors?.confirmPassword && (
          <p className="form-errors">{errors.confirmPassword.message}</p>
        )}
      </div>
      <button
        // disabled={!isValid}
        type="submit"
        className="todo__button"
        title={"Sumbmit"}
      >
        {changedLanguage.submitButton}
      </button>
    </form>
  );
};
