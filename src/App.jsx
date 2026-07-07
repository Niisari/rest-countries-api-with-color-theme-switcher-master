import React, { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Dashboard from "./features/dashboard/Dashboard.jsx";

import "./styles/Global.css";

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="app__container">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <Dashboard />
    </div>
  );
}

export default App;
