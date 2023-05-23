import { Routes, Route } from "react-router";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./css/App.css";

import { Home, Register, Login, Settings } from "./pages/index";

import { AnimatedTitle, TitleTabs } from "./compontets/index";

const App: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, []);

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
