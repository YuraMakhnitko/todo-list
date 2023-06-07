export enum TabsLanguage {
  homeEn = "Home",
  homeUa = "Головна",
  loginEn = "Login",
  loginUa = "Увійти",
  registerEn = "Register",
  registerUa = "Зареєстуватись",
  settingsEn = "Settings",
  settingsUa = "Налаштування",
}

export type TabsProps = {
  home: string;
  login: string;
  register: string;
  settings: string;
};
export const tabStyle = {
  minWidth: "70px",
  color: "#61dafb",
  "&.Mui-selected": {
    color: "#fff",
  },
};
// export const tabStyleHidden = {
//   maxWidth: "0px",
//   opacity: 0,
//   padding: "0px",
//   margin: "0px",
//   border: "unset",
// };

export const tabsStyle = {
  "& .css-1aquho2-MuiTabs-indicator": {
    backgroundColor: "#61dafb",
    height: "1px",
  },
};
export const pages: string[] = ["/", "/login", "/register", "/settings"];
