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

import { RootState } from "../../redux/store";

import { tabStyle, tabsStyle } from ".././types";

export const MobileTabs: React.FC = () => {
  const tabHomeIcon = <HouseIcon fontSize="large" />;
  const tabLoginIcon = <ExitToAppIcon fontSize="large" />;
  const tabRegIcon = <AppRegistrationIcon fontSize="large" />;
  const tabSettingsIcon = <SettingsIcon fontSize="large" />;

  const pagePath = window.location.pathname;
  const navigate = useNavigate();

  const { isAuth } = useSelector((state: RootState) => state.auth);

  const [value, setValue] = React.useState<number>(0);
  const [confirmPath, setConfirmPath] = useState<string>("/");

  useEffect(() => {
    if (pagePath !== confirmPath) {
      setValue(0);
    }
  }, [pagePath]);

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
          <Tab id="/" icon={tabHomeIcon} sx={tabStyle} />
          {!isAuth && <Tab id="/login" icon={tabLoginIcon} sx={tabStyle} />}
          {!isAuth && <Tab id="/register" icon={tabRegIcon} sx={tabStyle} />}
          <Tab id="/settings" icon={tabSettingsIcon} sx={tabStyle} />
        </Tabs>
        <Box sx={{ p: 2 }} />
      </Box>
    </Box>
  );
};
