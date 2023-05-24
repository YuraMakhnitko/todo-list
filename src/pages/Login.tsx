import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { RootState } from "../redux/store";
import { setAuth } from "../redux/auth/slice";

import { UserSubmitForm } from "../settings/types";
import { LoginValidationSchema } from "../settings/validations";
import { registerContentText } from "./languageSettings";

export const Login: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserSubmitForm>({ resolver: yupResolver(LoginValidationSchema) });

  const { language } = useSelector((state: RootState) => state.settings);

  const [changedLanguage, setChangedLanguage] = useState(
    registerContentText.en
  );

  useEffect(() => {
    if (language === "en") {
      setChangedLanguage(registerContentText.en);
    }
    if (language === "ua") {
      setChangedLanguage(registerContentText.ua);
    }
  }, [language]);

  const onSubmit = (values: FieldValues): void => {
    dispatch(setAuth(true));
    navigate("/");
    console.log(values);
    console.log("hi");
  };

  return (
    <form action="#" className="todo-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="todo-register__input-box">
        <label className="todo-register__input-label">
          {changedLanguage.email}
        </label>
        <input
          className="todo-register__input"
          placeholder={changedLanguage.emailPlaceholder}
          {...register("email")}
        />
      </div>
      {errors?.email && <p>{errors.email.message}</p>}
      <div className="todo-register__input-box">
        <label className="todo-register__input-label">
          {changedLanguage.password}
        </label>
        <input
          className="todo-register__input"
          placeholder={changedLanguage.passwordPlaceholder}
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
        {changedLanguage.submitButton}
      </button>
    </form>
  );
};
