import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { type RootState, setTabIndex } from "../../redux";
import { settingsContentText } from "../../pages/languageSettings";

import { tabStyle, tabsStyle, TabsProps } from "../types";
import useSound from "use-sound";
import { sounds } from "../../settings/sounds";
import { AppDispatch } from "../../redux/store";

export const DesctopTabs: React.FC = () => {
  const dispatch = useDispatch() as AppDispatch;
  const volume = useSelector((state: RootState) => state.settings.soundsVolume);
  const { isAuth } = useSelector((state: RootState) => state.auth);
  const { language } = useSelector((state: RootState) => state.settings);
  const { tabIndex } = useSelector((state: RootState) => state.tabs);

  const [changePageSound] = useSound(sounds.changePage, { volume });
  const navigate = useNavigate();

  const [changedLanguage, setChangedLanguage] = useState<TabsProps>(
    settingsContentText.en
  );
  const { home, login, register, settings } = changedLanguage;

  useEffect(() => {
    if (language === "en" || language === "ua") {
      setChangedLanguage(settingsContentText[language]);
    }
  }, [language, tabIndex]);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number
  ): void => {
    const path = event.currentTarget.id;

    navigate(path);
    dispatch(setTabIndex(newValue));
    changePageSound();
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ bgcolor: "transparent" }}>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          aria-label="tabs"
          centered
          sx={tabsStyle}
        >
          <Tab id="/" label={home} sx={tabStyle} />
          {!isAuth && <Tab id="/login" label={login} sx={tabStyle} />}
          {!isAuth && <Tab id="/register" label={register} sx={tabStyle} />}
          <Tab id="/settings" label={settings} sx={tabStyle} />
        </Tabs>
        <Box sx={{ p: 2 }} />
      </Box>
    </Box>
  );
};
