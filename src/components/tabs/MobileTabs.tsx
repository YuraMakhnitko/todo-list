import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import useSound from "use-sound";
import { sounds } from "../../settings/sounds";
import { RootState, setTabIndex } from "../../redux";
import { tabStyle, tabsStyle } from ".././types";
import { AppDispatch } from "../../redux/store";
import {
  tabHomeIcon,
  tabLoginIcon,
  tabRegIcon,
  tabSettingsIcon,
} from "./index";

export const MobileTabs: React.FC = () => {
  const dispatch = useDispatch() as AppDispatch;
  const volume = useSelector((state: RootState) => state.settings.soundsVolume);

  const [changePageSound] = useSound(sounds.changePage, { volume });

  const navigate = useNavigate();

  const { isAuth } = useSelector((state: RootState) => state.auth);
  const { tabIndex } = useSelector((state: RootState) => state.tabs);

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
