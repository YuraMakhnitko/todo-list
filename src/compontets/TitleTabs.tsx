import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import HouseIcon from "@mui/icons-material/House";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import SettingsIcon from "@mui/icons-material/Settings";

import { settingsContentText } from "../pages/languageSettings";

import { useScreenSize } from "../hooks/useScreenSize";

const tabStyle = {
  minWidth: "70px",
  color: "#61dafb",
  "&.Mui-selected": {
    color: "#fff",
  },
};

const tabsStyle = {
  "& .css-heg063-MuiTabs-flexContainer": {
    justifyContent: "space-between",
  },
  "& .css-1aquho2-MuiTabs-indicator": {
    backgroundColor: "#61dafb",
    height: "1px",
  },
};
const pages: string[] = ["/", "/login", "/register", "/settings"];

export const TitleTabs = (): JSX.Element => {
  const { language } = useSelector((state: RootState) => state.settings);
  const [value, setValue] = React.useState(0);
  const [changedLanguage, setChangedLanguage] = useState(
    settingsContentText.en
  );

  const screeSize = useScreenSize();

  const tabHomeIcon =
    screeSize.width > 767.98 ? "" : <HouseIcon fontSize="medium" />;
  const tabLoginIcon =
    screeSize.width > 767.98 ? "" : <ExitToAppIcon fontSize="medium" />;
  const tabRegIcon =
    screeSize.width > 767.98 ? "" : <AppRegistrationIcon fontSize="medium" />;
  const tabSettingsIcon =
    screeSize.width > 767.98 ? "" : <SettingsIcon fontSize="medium" />;
  const tabHomeLabel = screeSize.width > 767.98 ? changedLanguage.home : null;
  const tabRegLabel = screeSize.width > 767.98 ? changedLanguage.login : null;
  const tabLoginLabel =
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

  const navigate = useNavigate();

  const isAuth: Boolean = false;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    navigate(pages[newValue]);
    setValue(newValue);
    console.log(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ bgcolor: "transparent" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
          centered
          // variant="scrollable"
          // scrollButtons="auto"
          sx={tabsStyle}
        >
          <Tab icon={tabHomeIcon} label={tabHomeLabel} sx={tabStyle} />
          {!isAuth && (
            <Tab icon={tabLoginIcon} label={tabLoginLabel} sx={tabStyle} />
          )}
          {!isAuth && (
            <Tab icon={tabRegIcon} label={tabRegLabel} sx={tabStyle} />
          )}
          <Tab icon={tabSettingsIcon} label={tabSettingsLabel} sx={tabStyle} />
        </Tabs>
        <Box sx={{ p: 2 }} />
      </Box>
    </Box>
  );
};
