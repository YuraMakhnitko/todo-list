import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { settingsContentText } from "../pages/languageSettings";

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .css-heg063-MuiTabs-flexContainer": {
    justifyContent: "space-between",
  },
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "#61dafb",
  },
  "& .css-1pbqk26-MuiButtonBase-root-MuiTab-root.Mui-selected": {
    transform: "scale(1.01)",
    transition: "0.1s  ease",
  },
});

interface StyledTabProps {
  label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  color: "#61dafb",
  "&.Mui-selected": {
    color: "#fff",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 95, 228, 0.32)",
  },
}));
export const TitleTabs = (): JSX.Element => {
  const { language } = useSelector((state: RootState) => state.settings);
  const [value, setValue] = React.useState(0);
  const [changedLanguage, setChangedLanguage] = React.useState(
    settingsContentText.en
  );

  React.useEffect(() => {
    // console.log(language, "language");
    if (language === "en") {
      setChangedLanguage(settingsContentText.en);
      // console.log(language, "language");
    }
    if (language === "ua") {
      setChangedLanguage(settingsContentText.ua);
      // console.log(language, "language");
    }
  }, [language, value]);

  // console.log(changedLanguage, "changedLanguage");

  const pages: string[] = ["/", "/login", "/register", "/settings"];

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
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
        >
          <StyledTab label={changedLanguage.home} />
          {!isAuth && <StyledTab label={changedLanguage.login} />}
          {!isAuth && <StyledTab label={changedLanguage.register} />}
          <StyledTab label={changedLanguage.settings} />
        </StyledTabs>
        <Box sx={{ p: 2 }} />
      </Box>
    </Box>
  );
};
