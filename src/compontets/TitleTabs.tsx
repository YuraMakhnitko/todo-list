import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

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
    justifyContent: "center",
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
    // fontSize: 16,
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

export function TitleTabs() {
  const navigate = useNavigate();

  const [value, setValue] = React.useState(0);

  const isAuth: Boolean = true;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    const page = event.currentTarget.innerHTML.toLowerCase();
    setValue(newValue);
    if (page === "home") {
      navigate("/");
      return;
    }
    navigate(page);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ bgcolor: "transparent" }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
        >
          <StyledTab label="Home" />
          {!isAuth ? (
            <StyledTab label="Login" />
          ) : (
            <StyledTab label="Settings" />
          )}
          {/* <StyledTab label="Login" /> */}
          {!isAuth && <StyledTab label="Register" />}
          {/* <StyledTab label="Register" /> */}
        </StyledTabs>
        <Box sx={{ p: 2 }} />
      </Box>
    </Box>
  );
}
