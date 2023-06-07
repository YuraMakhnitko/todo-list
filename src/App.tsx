import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router";
import { useNavigate } from "react-router-dom";

import "./css/App.css";

import { Home, Register, Login, Settings } from "./pages";

import { AnimatedTitle, TitleTabs } from "./components";
import { AppDispatch, fetcAuthMe } from "./redux";

const App: React.FC = (): JSX.Element => {
  const dispatch = useDispatch() as AppDispatch;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetcAuthMe());
    navigate("/");
  }, []);

  return (
    <div className="App">
      <div className="todo">
        <AnimatedTitle />
        <TitleTabs />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
