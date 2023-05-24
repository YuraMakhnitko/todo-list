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
export const tabStyle = {
  minWidth: "70px",
  color: "#61dafb",
  "&.Mui-selected": {
    color: "#fff",
  },
};

export const tabsStyle = {
  ".css-1aquho2-MuiTabs-indicator": {
    backgroundColor: "#61dafb",
    height: "1px",
  },
};
export const pages: string[] = ["/", "/login", "/register", "/settings"];
