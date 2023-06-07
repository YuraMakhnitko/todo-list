import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserSubmitForm } from "../settings/types";
import { registerValidationSchema } from "../settings/validations";
import { registerContentText } from "./languageSettings";
import useSound from "use-sound";
import { sounds } from "../settings/sounds";
import { RootState, fetchRegister, setTabIndex, AppDispatch } from "../redux";
import { UserProps } from "../redux/auth/types";

export const Register: React.FC = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(registerValidationSchema),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch() as AppDispatch;
  const { language } = useSelector((state: RootState) => state.settings);

  const emailErrorMassage =
    language === "ua" ? "Такий логін вже існує" : "Email is already exist!";

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

  const onSubmit = async (values: FieldValues) => {
    if (values) {
      const { name, email, password } = values as UserProps;
      const userData = {
        name,
        email,
        password,
      };
      const data = await dispatch(fetchRegister(userData));

      if (!data.payload) {
        alert(emailErrorMassage);
        return;
      }
      if ("token" in data.payload) {
        window.localStorage.setItem("token", data.payload.token);
      }

      dispatch(setTabIndex(0));
      submitSound();
      navigate("/");
    }
  };
  return (
    <form action="#" className="todo-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="todo-register__input-box">
        <label htmlFor="name" className="todo-register__input-label">
          {changedLanguage.name}
        </label>
        <input
          id="name"
          className="todo-register__input"
          placeholder={changedLanguage.namePlaceholder}
          type="name"
          {...register("name")}
        />

        {errors?.name && <p className="form-errors">{errors.name.message}</p>}
      </div>
      <div className="todo-register__input-box">
        <label htmlFor="email" className="todo-register__input-label">
          {changedLanguage.email}
        </label>
        <input
          id="email"
          type="email"
          className="todo-register__input"
          placeholder={changedLanguage.emailPlaceholder}
          {...register("email")}
        />
        {errors?.email && <p className="form-errors">{errors.email.message}</p>}
      </div>
      <div className="todo-register__input-box">
        <label htmlFor="password" className="todo-register__input-label">
          {changedLanguage.password}
        </label>

        <input
          id="password"
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
        <label htmlFor="confirmpassword" className="todo-register__input-label">
          {changedLanguage.confirmPassword}
        </label>

        <input
          id="confirmpassword"
          type="password"
          className="todo-register__input"
          placeholder={changedLanguage.passwordPlaceholder}
          {...register("confirmPassword")}
        />
        {errors?.confirmPassword && (
          <p className="form-errors">{errors.confirmPassword.message}</p>
        )}
      </div>
      <button type="submit" className="todo__button" title={"Sumbmit"}>
        {changedLanguage.submitButton}
      </button>
    </form>
  );
};
