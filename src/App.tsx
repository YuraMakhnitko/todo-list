import { Routes, Route } from "react-router";

import "./App.css";

import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Settings } from "./pages/Settings";

import { AnimatedTitle } from "./compontets/animations/AnimatedTitle";
import { TitleTabs } from "./compontets/TitleTabs";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="todo">
        <AnimatedTitle />
        <TitleTabs />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
