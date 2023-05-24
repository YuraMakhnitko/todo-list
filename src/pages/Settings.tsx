import React, { useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import Button from "@mui/material/Button";

import { useDispatch, useSelector } from "react-redux";
import { setVolume, setLanguage } from "../redux/settings/slice";
import { RootState } from "../redux/store";
import { Language } from "../redux/types";

export const Settings: React.FC = (): JSX.Element => {
  const { soundsVolume, language } = useSelector(
    (state: RootState) => state.settings
  );
  const dispatch = useDispatch();
  const enLang = language === "en" ? { color: "#fff" } : { color: "#61dafb" };
  const uaLang = language !== "en" ? { color: "#fff" } : { color: "#61dafb" };

  const handleChangeVolume = (event: Event, newValue: number | number[]) => {
    const volumeValue = (newValue as number) / 100;
    dispatch(setVolume(volumeValue));
  };

  const handleChangeLanguage = (event: React.SyntheticEvent) => {
    console.log(event.currentTarget.id, "handleChangeLang");
    dispatch(setLanguage(event.currentTarget.id));
  };
  const isAuth: Boolean = false;

  return (
    <div className="todo-settings">
      {isAuth && (
        <p className="todo-settings__text">
          User Name: <span>Rikel</span>
        </p>
      )}
      <div className="todo-settings__devider"></div>
      {isAuth && (
        <p className="todo-settings__text">
          User Email: <span>Rikel@rik.rik</span>
        </p>
      )}
      <div className="todo-settings__devider"></div>

      <div className="todo-settings__language-box">
        <label htmlFor="" className="todo-settings__label">
          {language === Language.en ? "Language" : ""}
          {language === Language.ua ? "Мова:" : ""}
        </label>
        <div className="settings-toggle">
          <Button
            id="en"
            sx={enLang}
            onClick={handleChangeLanguage}
            className="settings-toggle__button"
          >
            EN
          </Button>
          <Button
            id="ua"
            sx={uaLang}
            onClick={handleChangeLanguage}
            className="settings-toggle__button"
          >
            UA
          </Button>
        </div>
      </div>
      <div className="todo-settings__devider"></div>

      <div className="todo-settings__sounds-box">
        <label htmlFor="" className="todo-settings__label">
          {language === Language.en ? "Sounds:" : ""}
          {language === Language.ua ? "Гучність:" : ""}
        </label>
        <Box sx={{ width: "100%" }}>
          <Stack
            spacing={2}
            direction="row"
            sx={{ mb: 1, marginBottom: 0 }}
            alignItems="center"
          >
            <VolumeDown sx={{ opacity: 0.7 }} />
            <Slider
              aria-label="Volume"
              value={soundsVolume * 100}
              onChange={handleChangeVolume}
              sx={{ color: "rgba(97, 218, 251, 1)" }}
            />
            <VolumeUp sx={{ opacity: 0.7 }} />
          </Stack>
        </Box>
      </div>
      <div className="todo-settings__devider"></div>

      {isAuth && <button className="todo__button-logout">Logout</button>}
    </div>
  );
};
