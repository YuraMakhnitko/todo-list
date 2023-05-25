import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";

import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../redux/settings/slice";
import { RootState } from "../redux/store";
import { Language } from "../redux/types";
import { setAuth } from "../redux/auth/slice";
import { VolumeSlider } from "../components/VolumeSlider";

export const Settings: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state: RootState) => state.auth);
  const { language } = useSelector((state: RootState) => state.settings);

  const enLang = language === "en" ? { color: "#fff" } : { color: "#61dafb" };
  const uaLang = language !== "en" ? { color: "#fff" } : { color: "#61dafb" };
  const userNameTitle = language === Language.ua ? "Ім'я:" : "Name:";
  const languageTitle = language === Language.ua ? "Мова:" : "Language";
  const logoutButtonTitle = language === Language.ua ? "Вийти" : "Logout";

  const handleChangeLanguage = (event: React.SyntheticEvent): void => {
    dispatch(setLanguage(event.currentTarget.id));
  };

  const onLogoutClick = (): void => {
    dispatch(setAuth(false));
    navigate("/");
  };

  return (
    <div className="todo-settings">
      {isAuth && (
        <p className="todo-settings__text">
          {userNameTitle} <span>Rikel</span>
        </p>
      )}
      <div className="todo-settings__devider"></div>
      {isAuth && (
        <p className="todo-settings__text">
          Email: <span>Rikel@rik.rik</span>
        </p>
      )}
      <div className="todo-settings__devider"></div>
      <div className="todo-settings__language-box">
        <label htmlFor="" className="todo-settings__label">
          {languageTitle}
        </label>
        <div className="settings-toggle">
          <Button id="en" sx={enLang} onClick={handleChangeLanguage}>
            EN
          </Button>
          <Button id="ua" sx={uaLang} onClick={handleChangeLanguage}>
            UA
          </Button>
        </div>
      </div>
      <div className="todo-settings__devider"></div>
      <VolumeSlider />
      <div className="todo-settings__devider"></div>
      {isAuth && (
        <button className="todo__button" onClick={onLogoutClick}>
          {logoutButtonTitle}
        </button>
      )}
    </div>
  );
};
