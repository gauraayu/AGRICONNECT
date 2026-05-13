import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MandiPrices from "./pages/MandiPrices";
import PostProblem from "./pages/PostProblem";
import Posts from "./pages/Posts";
import ExpertView from "./pages/ExpertView";
import Marketplace from "./pages/Marketplace";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import AIChat from "./pages/AIChat";

import WeatherUpdates from "./pages/services/WeatherUpdates";
import CropAdvisory from "./pages/services/CropAdvisory";
import PestDiseaseHelp from "./pages/services/PestDiseaseHelp";
import ExpertConnect from "./pages/services/ExpertConnect";
import SoilHealthGuide from "./pages/services/SoilHealthGuide";
import FertilizerGuidance from "./pages/services/FertilizerGuidance";
import IrrigationTips from "./pages/services/IrrigationTips";

import { LanguageProvider } from "./context/LanguageContext";

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
    <LanguageProvider>
      <div className={darkMode ? "dark" : "light"}>
        <Router>
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/post-problem" element={<PostProblem />} />
            <Route path="/mandi-prices" element={<MandiPrices />} />
            <Route path="/expert" element={<ExpertView darkMode={darkMode} />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/ai" element={<AIChat />} />

            {/* Services Pages */}
            <Route path="/services/weather" element={<WeatherUpdates />} />
            <Route path="/services/crop-advisory" element={<CropAdvisory />} />
            <Route path="/services/pest-disease" element={<PestDiseaseHelp />} />
            <Route path="/services/expert-connect" element={<ExpertConnect />} />
            <Route path="/services/soil-health" element={<SoilHealthGuide />} />
            <Route path="/services/fertilizer" element={<FertilizerGuidance />} />
            <Route path="/services/irrigation" element={<IrrigationTips />} />
          </Routes>
        </Router>
      </div>
    </LanguageProvider>
  );
}

export default App;