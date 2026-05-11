import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import MandiPrices from "./pages/MandiPrices";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PostProblem from "./pages/PostProblem";
import Posts from "./pages/Posts";
import ExpertView from "./pages/ExpertView";
import Marketplace from "./pages/Marketplace";
import CropAdvisory from "./pages/CropAdvisory";

import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import AIChat from "./pages/AIChat";
import WeatherUpdates from "./pages/WeatherUpdates";

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
          <Route path="/mandi-prices" element={<MandiPrices />} />
          <Route path="/expert" element={<ExpertView darkMode={darkMode} />} />
          <Route path="/services/weather" element={<WeatherUpdates />} />
          <Route path="/weather" element={<WeatherUpdates />} />
          <Route path="/marketplace" element={<Marketplace />} />
         <Route path="/services/crop-advisory" element={<CropAdvisory />} />
          
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