import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PostProblem from "./pages/PostProblem";
import Posts from "./pages/Posts";
import ExpertView from "./pages/ExpertView";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import AIChat from "./pages/AIChat";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "true") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode);
  }, [darkMode]);

  return (
    <div className={darkMode ? "dark" : "light"}>
      <Router>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Public routes */}
          <Route path="/posts" element={<Posts />} />
          <Route path="/post-problem" element={<PostProblem />} />

          <Route path="/expert" element={<ExpertView darkMode={darkMode} />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/ai" element={<AIChat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;