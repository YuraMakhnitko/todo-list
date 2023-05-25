import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { RootState } from "../../redux/store";
import { settingsContentText } from "../../pages/languageSettings";

import { tabStyle, tabsStyle, TabsProps } from "../types";

export const DesctopTabs: React.FC = () => {
  const pagePath = window.location.pathname;
  const navigate = useNavigate();

  const { isAuth } = useSelector((state: RootState) => state.auth);

  const { language } = useSelector((state: RootState) => state.settings);
  const [value, setValue] = useState<number>(0);
  const [confirmPath, setConfirmPath] = useState<string>("/");
  const [changedLanguage, setChangedLanguage] = useState<TabsProps>(
    settingsContentText.en
  );

  const { home, login, register, settings } = changedLanguage;

  useEffect(() => {
    if (pagePath !== confirmPath) {
      setValue(0);
    }
  }, [pagePath]);

  useEffect(() => {
    if (language === "en" || language === "ua") {
      setChangedLanguage(settingsContentText[language]);
    }
  }, [language, value]);

  console.log(pagePath, "pagePath");

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number
  ): void => {
    const path = event.currentTarget.id;
    setConfirmPath(path);
    navigate(path);
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ bgcolor: "transparent" }}>
        <Tabs
          value={value}
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
