import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { RootState, setTabIndex, fetchLogin, AppDispatch } from "../redux";

import { UserSubmitForm } from "../settings/types";
import { LoginValidationSchema } from "../settings/validations";
import { registerContentText } from "./languageSettings";
import useSound from "use-sound";
import { sounds } from "../settings/sounds";
import { UserProps } from "../redux/auth/types";

export const Login: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch() as AppDispatch;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSubmitForm>({ resolver: yupResolver(LoginValidationSchema) });

  const volume = useSelector((state: RootState) => state.settings.soundsVolume);
  const [submitSound] = useSound(sounds.submitSound, { volume });

  const { language } = useSelector((state: RootState) => state.settings);

  const { user } = useSelector((state: RootState) => state.auth);

  console.log(user);
  const [changedLanguage, setChangedLanguage] = useState(
    registerContentText.en
  );

  useEffect(() => {
    if (language === "en" || language === "ua") {
      setChangedLanguage(registerContentText[language]);
    }
  }, [language]);

  const emailErrorMassage =
    language === "ua"
      ? "Невірний логін або пароль"
      : "Invalid password or email!";

  const onSubmit = async (values: FieldValues) => {
    const { email, password } = values as UserProps;
    const userData = { email, password };
    const data = await dispatch(fetchLogin(userData));
    if (!data.payload) {
      alert(emailErrorMassage);
      return;
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }

    navigate("/");
    submitSound();
    dispatch(setTabIndex(0));
  };

  return (
    <form action="#" className="todo-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="todo-register__input-box">
        <label htmlFor="email" className="todo-register__input-label">
          {changedLanguage.email}
        </label>
        <input
          id="email"
          className="todo-register__input"
          placeholder={changedLanguage.emailPlaceholder}
          {...register("email")}
        />
      </div>
      {errors?.email && <p className="form-errors">{errors.email.message}</p>}
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
      </div>
      {errors?.password && (
        <p className="form-errors">{errors.password.message}</p>
      )}

      <button type="submit" className="todo__button" title="Add to list">
        {changedLanguage.submitButton}
      </button>
    </form>
  );
};
