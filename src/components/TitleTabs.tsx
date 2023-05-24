import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import HouseIcon from "@mui/icons-material/House";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import SettingsIcon from "@mui/icons-material/Settings";

import { RootState } from "../redux/store";
import { settingsContentText } from "../pages/languageSettings";

import { useScreenSize } from "../hooks/useScreenSize";
import { tabStyle, tabsStyle } from "./types";

export const TitleTabs = (): JSX.Element => {
  const pagePath = window.location.pathname;
  const navigate = useNavigate();

  const { isAuth } = useSelector((state: RootState) => state.auth);

  const { language } = useSelector((state: RootState) => state.settings);
  const [value, setValue] = React.useState(0);
  const [confirmPath, setConfirmPath] = useState("/");
  const [changedLanguage, setChangedLanguage] = useState(
    settingsContentText.en
  );

  useEffect(() => {
    if (pagePath !== confirmPath) {
      setValue(0);
    }
  }, [pagePath]);

  const screeSize = useScreenSize();

  const tabHomeIcon =
    screeSize.width > 767.98 ? "" : <HouseIcon fontSize="large" />;

  const tabLoginIcon =
    screeSize.width > 767.98 ? "" : <ExitToAppIcon fontSize="large" />;

  const tabRegIcon =
    screeSize.width > 767.98 ? "" : <AppRegistrationIcon fontSize="large" />;

  const tabSettingsIcon =
    screeSize.width > 767.98 ? "" : <SettingsIcon fontSize="large" />;

  const tabHomeLabel = screeSize.width > 767.98 ? changedLanguage.home : null;

  const tabLoginLabel = screeSize.width > 767.98 ? changedLanguage.login : null;

  const tabRegLabel =
    screeSize.width > 767.98 ? changedLanguage.register : null;

  const tabSettingsLabel =
    screeSize.width > 767.98 ? changedLanguage.settings : null;

  useEffect(() => {
    if (language === "en") {
      setChangedLanguage(settingsContentText.en);
    }
    if (language === "ua") {
      setChangedLanguage(settingsContentText.ua);
    }
  }, [language, value]);

  console.log(pagePath, "pagePath");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
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
          aria-label="styled tabs example"
          centered
          sx={tabsStyle}
        >
          <Tab id="/" icon={tabHomeIcon} label={tabHomeLabel} sx={tabStyle} />
          {!isAuth && (
            <Tab
              id="/login"
              icon={tabLoginIcon}
              label={tabLoginLabel}
              sx={tabStyle}
            />
          )}
          {!isAuth && (
            <Tab
              id="/register"
              icon={tabRegIcon}
              label={tabRegLabel}
              sx={tabStyle}
            />
          )}
          <Tab
            id="/settings"
            icon={tabSettingsIcon}
            label={tabSettingsLabel}
            sx={tabStyle}
          />
        </Tabs>
        <Box sx={{ p: 2 }} />
      </Box>
    </Box>
  );
};
