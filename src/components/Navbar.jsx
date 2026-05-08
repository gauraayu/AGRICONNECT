import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const schemes = [
  "🌾 PM-KISAN: ₹6,000/year direct to farmers — Apply at pmkisan.gov.in",
  "🛡️ PMFBY Crop Insurance: Pay only 2% premium for Kharif crops — Enroll before deadline",
  "💳 Kisan Credit Card: Farm loans at 4% effective interest up to ₹5 lakh — Apply at your bank",
  "🚁 Drone Didi Scheme: 80% subsidy (up to ₹8L) on agricultural drones for SHGs",
  "💧 PMKSY: Micro-irrigation subsidy — 'Per Drop More Crop' scheme open for registration",
  "🌱 PKVY: ₹50,000/hectare support for organic farming clusters — Apply now",
  "📊 e-NAM: Sell crops online across 1,400+ mandis — Register at enam.gov.in",
  "👴 PM-KMY: ₹3,000/month pension after 60 for small farmers — Govt matches contribution",
  "🌿 Soil Health Card: Free soil testing every 2 years — Visit your nearest KVK",
  "🏗️ PM Dhan-Dhaanya Krishi Yojana: New scheme approved for 6 years — Check eligibility",
];

// ── Clock Component ──
const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours  = time.getHours();
  const mins   = time.getMinutes().toString().padStart(2, "0");
  const secs   = time.getSeconds().toString().padStart(2, "0");
  const ampm   = hours >= 12 ? "PM" : "AM";
  const hour12 = (hours % 12 || 12).toString().padStart(2, "0");

  const days   = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const dayName = days[time.getDay()];
  const date    = time.getDate();
  const month   = months[time.getMonth()];
  const year    = time.getFullYear();

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm">
      <span className="text-green-400 text-sm">🕐</span>
      <span className="text-white font-mono font-bold text-sm tracking-wider">
        {hour12}:{mins}
        <span className="text-green-400">:{secs}</span>
      </span>
      <span className="text-white/50 text-xs font-bold">{ampm}</span>
      <div className="w-px h-4 bg-white/20 mx-0.5"></div>
      <span className="text-white/60 text-xs font-semibold hidden lg:block">
        {dayName}, {date} {month} {year}
      </span>
    </div>
  );
};

const Navbar = ({ darkMode, setDarkMode }) => {
  const location    = useLocation();
  const navigate    = useNavigate();
  const dropdownRef = useRef(null);

  const [scrolled,    setScrolled]    = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user,        setUser]        = useState(null);
  const [showNotice,  setShowNotice]  = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("agriUser");
    if (stored) setUser(JSON.parse(stored));
    else setUser(null);
  }, [location]);

  useEffect(() => {
    const handle = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const logout = () => {
    localStorage.removeItem("agriUser");
    setUser(null);
    setProfileOpen(false);
    navigate("/login");
  };

  const roleIcon = (role) => {
    if (role === "farmer")     return "👨‍🌾";
    if (role === "buyer")      return "🛒";
    if (role === "agronomist") return "🔬";
    if (role === "vendor")     return "🏪";
    return "👤";
  };

  const getInitial = (name) =>
    name ? name.charAt(0).toUpperCase() : "U";

  const getNavLinks = (role) => {
    if (role === "farmer") return [
      { label: "🏠 Home",        path: "/" },
      { label: "🚨 Posts",    path: "/posts" },
      { label: "🤖 AI Chat",     path: "/ai" },
      { label: "📞 Contact",     path: "/contact" },
      { label: "ℹ️ About",       path: "/about" },
      { label: "👤 Profile",     path: "/profile" },
      { label: "⚙️ Settings",    path: "/settings" },
    ];
    if (role === "agronomist") return [
      { label: "🏠 Home",        path: "/" },
      { label: "🔬 Expert View", path: "/expert" },
      { label: "🤖 AI Chat",     path: "/ai" },
      { label: "📞 Contact",     path: "/contact" },
      { label: "ℹ️ About",       path: "/about" },
      { label: "👤 Profile",     path: "/profile" },
      { label: "⚙️ Settings",    path: "/settings" },
    ];
    return [
      { label: "🏠 Home",        path: "/" },
      { label: "🤖 AI Chat",     path: "/ai" },
      { label: "🛒 Marketplace", path: "/marketplace" },
      { label: "📞 Contact",     path: "/contact" },
      { label: "ℹ️ About",       path: "/about" },
      { label: "👤 Profile",     path: "/profile" },
      { label: "⚙️ Settings",    path: "/settings" },
    ];
  };

  const navLinks = getNavLinks(user?.role);

  return (
    <div className="fixed top-0 w-full z-50">

      {/* ── GOVT SCHEMES TICKER ── */}
      {showNotice && (
        <div
          className="bg-amber-500 text-amber-950 flex items-center overflow-hidden"
          style={{ height: "30px" }}
        >
          <div className="flex-shrink-0 bg-amber-700 text-white text-xs font-black uppercase tracking-widest px-3 h-full flex items-center z-10">
            📢 Govt Schemes
          </div>
          <div className="flex-1 overflow-hidden">
            <div
              className="whitespace-nowrap text-xs font-semibold"
              style={{ display: "inline-block", animation: "marquee 40s linear infinite" }}
            >
              {schemes.map((s, i) => <span key={i} className="mx-8">{s}</span>)}
              {schemes.map((s, i) => <span key={`d-${i}`} className="mx-8">{s}</span>)}
            </div>
          </div>
          <button
            onClick={() => setShowNotice(false)}
            className="flex-shrink-0 px-3 h-full flex items-center text-amber-800 hover:text-amber-950 font-bold text-sm"
          >
            ✕
          </button>
        </div>
      )}

      {/* ── MAIN NAVBAR ── */}
      <nav
  className={`w-full transition-all duration-300 ${
    location.pathname === "/" && !scrolled
      ? "bg-transparent shadow-none border-transparent"
      : "bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200"
  }`}
>
        {/* relative so clock can be absolutely centered */}
       <div className="relative w-full px-6 py-4 flex items-center justify-between gap-8">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 z-10">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-600 to-green-500 flex items-center justify-center shadow-lg p-2">
  <img
    src="/logo.png"
    alt="AgriConnect"
    className="w-full h-full object-contain"
  />
</div>
          <span
  className={`font-display font-bold text-xl tracking-wide ${
    location.pathname === "/" && !scrolled ? "text-white" : "text-gray-900"
  }`}
>
  Agri<span className="text-green-500">Connect</span>
</span>
          </Link>

         <div className="hidden lg:flex items-center gap-2">

  {/* Dashboard */}
  <Link
    to="/"
    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
      location.pathname === "/"
        ? "bg-green-600 text-white shadow-md"
        : "text-gray-700 hover:bg-green-50 hover:text-green-700"
    }`}
  >
    Dashboard
  </Link>

  {/* Posts */}
  <Link
    to="/posts"
    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
      location.pathname === "/posts"
        ? "bg-green-600 text-white shadow-md"
        : "text-gray-700 hover:bg-green-50 hover:text-green-700"
    }`}
  >
    Posts
  </Link>

  {/* About */}
  <Link
    to="/about"
    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
      location.pathname === "/about"
        ? "bg-green-600 text-white shadow-md"
        : "text-gray-700 hover:bg-green-50 hover:text-green-700"
    }`}
  >
    About Us
  </Link>

  {/* Contact */}
  <Link
    to="/contact"
    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
      location.pathname === "/contact"
        ? "bg-green-600 text-white shadow-md"
        : "text-gray-700 hover:bg-green-50 hover:text-green-700"
    }`}
  >
    Contact Us
  </Link>

</div>
<div className="hidden lg:flex items-center gap-3 ml-10">
  <Link
    to="/"
    className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
      location.pathname === "/"
        ? "bg-green-600 text-white"
        : "text-gray-700 hover:bg-green-50 hover:text-green-700"
    }`}
  >
    Dashboard
  </Link>

  <Link
    to="/posts"
    className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
      location.pathname === "/posts"
        ? "bg-green-600 text-white"
        : "text-gray-700 hover:bg-green-50 hover:text-green-700"
    }`}
  >
    Posts
  </Link>

  <Link
    to="/about"
    className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
      location.pathname === "/about"
        ? "bg-green-600 text-white"
        : "text-gray-700 hover:bg-green-50 hover:text-green-700"
    }`}
  >
    About Us
  </Link>

  <Link
    to="/contact"
    className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
      location.pathname === "/contact"
        ? "bg-green-600 text-white"
        : "text-gray-700 hover:bg-green-50 hover:text-green-700"
    }`}
  >
    Contact Us
  </Link>
</div>

          {/* ── Clock — Perfectly Centered ── */}
         {/* ── Center Nav Links ── */}
<div className="flex items-center gap-2 flex-1 justify-center">
  <Link
    to="/"
    className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
      location.pathname === "/"
        ? "bg-green-600 text-white shadow-md"
        : "text-gray-700 hover:bg-green-50 hover:text-green-700"
    }`}
  >
    Dashboard
  </Link>

 <Link
  to="/posts"
  className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
    location.pathname === "/posts"
      ? "bg-green-600 text-white shadow-md"
      : "text-gray-700 hover:bg-green-50 hover:text-green-700"
  }`}
>
  Posts
</Link>

  <Link
    to="/about"
    className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
      location.pathname === "/about"
        ? "bg-green-600 text-white shadow-md"
        : "text-gray-700 hover:bg-green-50 hover:text-green-700"
    }`}
  >
    About Us
  </Link>

  <Link
    to="/contact"
    className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
      location.pathname === "/contact"
        ? "bg-green-600 text-white shadow-md"
        : "text-gray-700 hover:bg-green-50 hover:text-green-700"
    }`}
  >
    Contact Us
  </Link>
</div>

          {/* ── Right Side ── */}
          <div className="flex items-center gap-2 flex-shrink-0 z-10">

            {/* Dark / Light Toggle Button */}
            <button
              onClick={() => setDarkMode && setDarkMode(!darkMode)}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-all duration-200 text-base"
              title={darkMode ? "Switch to Light" : "Switch to Dark"}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            {user ? (
              // ── LOGGED IN ──
              <div className="relative" ref={dropdownRef}>

                {/* Profile Circle */}
                <button
                  onClick={() => setProfileOpen((p) => !p)}
                  className="flex items-center gap-1.5 group"
                  title={user.name}
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-leaf-300 to-leaf-600 flex items-center justify-center font-black text-white text-base shadow-lg ring-2 ring-leaf-400 ring-offset-1 ring-offset-earth-800 group-hover:ring-leaf-300 transition-all duration-200">
                      {getInitial(user.name)}
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-earth-800"></span>
                  </div>
                  <span className={`text-white/70 text-xs transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`}>
                    ▾
                  </span>
                </button>

                {/* ── Dropdown ── */}
                {profileOpen && (
                  <div className={`absolute right-0 mt-3 w-64 rounded-2xl border shadow-2xl overflow-hidden z-50 ${
                    darkMode
                      ? "bg-gray-900 border-gray-700"
                      : "bg-white border-gray-100"
                  }`}>

                    {/* User Header */}
                    <div className="px-4 py-4 bg-gradient-to-r from-leaf-600 to-leaf-800">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-black text-white text-xl border-2 border-white/40 flex-shrink-0">
                          {getInitial(user.name)}
                        </div>
                        <div className="overflow-hidden">
                          <div className="text-white font-bold text-sm truncate">{user.name}</div>
                          <div className="text-leaf-200 text-xs capitalize mt-0.5">
                            {roleIcon(user.role)} {user.role}
                          </div>
                          <div className="text-white/50 text-xs truncate mt-0.5">{user.email}</div>
                        </div>
                      </div>
                    </div>

                    {/* Theme Toggle in Dropdown */}
                    <div className={`px-4 py-3 border-b ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
                      <button
                        onClick={() => setDarkMode && setDarkMode(!darkMode)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                          darkMode
                            ? "bg-gray-800 hover:bg-gray-700"
                            : "bg-gray-50 hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{darkMode ? "☀️" : "🌙"}</span>
                          <div className="text-left">
                            <div className={`text-sm font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
                              {darkMode ? "Light Mode" : "Dark Mode"}
                            </div>
                            <div className="text-xs text-gray-400">
                              {darkMode ? "Switch to light" : "Switch to dark"}
                            </div>
                          </div>
                        </div>
                        {/* Toggle switch visual */}
                        <div className={`w-10 h-5 rounded-full transition-all duration-300 relative ${
                          darkMode ? "bg-leaf-500" : "bg-gray-300"
                        }`}>
                          <div className={`absolute top-0 w-5 h-5 rounded-full bg-white shadow-md transform transition-all duration-300 ${
                            darkMode ? "translate-x-5" : "translate-x-0"
                          }`}></div>
                        </div>
                      </button>
                    </div>

                    {/* Nav Links */}
                    <div className="py-1.5 max-h-64 overflow-y-auto">
                      {navLinks.map(({ label, path }) => {
                        const isActive = location.pathname === path;
                        return (
                          <Link
                            key={path}
                            to={path}
                            onClick={() => setProfileOpen(false)}
                            className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                              isActive
                                ? darkMode
                                  ? "bg-leaf-900/40 text-leaf-400 font-bold"
                                  : "bg-leaf-50 text-leaf-700 font-bold"
                                : darkMode
                                  ? "text-gray-300 hover:bg-gray-800 font-medium"
                                  : "text-gray-700 hover:bg-gray-50 font-medium"
                            }`}
                          >
                            <span className="text-base w-6 text-center">
                              {label.split(" ")[0]}
                            </span>
                            <span>{label.split(" ").slice(1).join(" ")}</span>
                            {isActive && (
                              <span className="ml-auto w-2 h-2 rounded-full bg-leaf-500"></span>
                            )}
                          </Link>
                        );
                      })}
                    </div>

                    {/* Logout */}
                    <div className={`border-t py-1.5 ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
                      <button
                        onClick={logout}
                        className={`flex items-center gap-3 w-full px-4 py-2.5 text-red-500 text-sm transition-colors group ${
                          darkMode ? "hover:bg-red-900/20" : "hover:bg-red-50"
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                          darkMode
                            ? "bg-red-900/30 group-hover:bg-red-900/50"
                            : "bg-red-50 group-hover:bg-red-100"
                        }`}>
                          🚪
                        </div>
                        <div>
                          <div className="font-bold text-sm">Log Out</div>
                          <div className="text-red-300 text-xs">See you soon!</div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // ── NOT LOGGED IN ──
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3 py-1.5 text-xs font-semibold text-white border border-white/30 rounded-full hover:bg-white/10 transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/login"
                  className="px-3 py-1.5 text-xs font-semibold bg-leaf-500 text-white rounded-full hover:bg-leaf-400 shadow-md transition-all"
                >
                  Join Now
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;