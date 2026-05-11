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

// ── Dropdown menu data ──
const MARKET_MENU = [
  {
    label: "Marketplace",
    path: "/marketplace",
    icon: "🛒",
    desc: "Buy and sell crops directly",
  },
  {
    label: "Mandi Prices",
    path: "/mandi-prices",
    icon: "📊",
    desc: "Check latest mandi crop rates",
  },
];
const POSTS_MENU = [
  { label: "Community Posts",  path: "/posts",                icon: "🌐", desc: "See what farmers share" },
  { label: "Ask Crop Problem", path: "/post-problem",         icon: "❓", desc: "Get help with your crop" },
  { label: "Farmer Questions", path: "/posts/questions",      icon: "🌾", desc: "Browse farmer queries" },
  { label: "Expert Answers",   path: "/posts/expert-answers", icon: "🔬", desc: "Verified expert replies" },
  { label: "My Posts",         path: "/posts/mine",           icon: "📝", desc: "Manage your posts" },
];

const SERVICES_MENU = [
  { label: "Weather Updates",     path: "/services/weather",     icon: "⛅" },
  { label: "Expert Connect",      path: "/expert",               icon: "🧑‍🌾" },
  { label: "Crop Advisory", path: "/services/crop-advisory", icon: "🌱" },
  { label: "Soil Health Guide",   path: "/services/soil",        icon: "🪱" },
  { label: "Pest & Disease Help", path: "/services/pest",        icon: "🐛" },
  { label: "Fertilizer Guidance", path: "/services/fertilizer",  icon: "🧪" },
  { label: "Irrigation Tips",     path: "/services/irrigation",  icon: "💧" },
];

const SMART_MENU = [
  { label: "AI Crop Doctor",             path: "/smart/ai-doctor",       icon: "🤖" },
  { label: "Satellite Crop Monitoring",  path: "/smart/satellite",       icon: "🛰️" },
  { label: "Drone / Land Rover Monitor", path: "/smart/drone",           icon: "🚁" },
  { label: "ML Yield Prediction",        path: "/smart/yield",           icon: "📈" },
  { label: "AR/VR Farming Training",     path: "/smart/arvr",            icon: "🥽" },
  { label: "Smart Irrigation",           path: "/smart/irrigation",      icon: "💦" },
  { label: "Market Demand Prediction",   path: "/smart/market-demand",   icon: "📊" },
];

const ABOUT_MENU = [
  { label: "About AgriConnect", path: "/about",              icon: "🌿" },
  { label: "For Farmers",       path: "/about/farmers",      icon: "👨‍🌾" },
  { label: "For Agronomists",   path: "/about/agronomists",  icon: "🔬" },
  { label: "For Buyers",        path: "/about/buyers",       icon: "🛒" },
  { label: "Our Mission",       path: "/about/mission",      icon: "🎯" },
  { label: "How It Works",      path: "/about/how-it-works", icon: "⚙️" },
];

const LANGUAGES = [
  { code: "en",  label: "English",  native: "English",  flag: "🇬🇧" },
  { code: "hi",  label: "Hindi",    native: "हिन्दी",     flag: "🇮🇳" },
  { code: "hin", label: "Hinglish", native: "Hinglish", flag: "🇮🇳" },
  { code: "mr",  label: "Marathi",  native: "मराठी",     flag: "🇮🇳" },
  { code: "pa",  label: "Punjabi",  native: "ਪੰਜਾਬੀ",      flag: "🇮🇳" },
];

// ────────────────────────────────────────────────────
// Reusable Dropdown
// ────────────────────────────────────────────────────
const NavDropdown = ({ label, items, isActive, openId, setOpenId, id, columns = 1 }) => {
  const isOpen = openId === id;
  const ref = useRef(null);

  useEffect(() => {
    const handle = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        if (openId === id) setOpenId(null);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [openId, id, setOpenId]);

  return (
    <div
      ref={ref}
      style={{ position: "relative" }}
      onMouseEnter={() => setOpenId(id)}
      onMouseLeave={() => setOpenId(null)}
    >
      <button
        onClick={() => setOpenId(isOpen ? null : id)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          padding: "8px 10px",
          borderRadius: "12px",
          fontSize: "14px",
          fontWeight: 600,
          whiteSpace: "nowrap",
          background: isActive || isOpen ? "#16a34a" : "transparent",
          color: isActive || isOpen ? "#fff" : "#374151",
          border: "none",
          cursor: "pointer",
          transition: "all 0.2s",
        }}
        onMouseOver={(e) => {
          if (!(isActive || isOpen)) {
            e.currentTarget.style.background = "#f0fdf4";
            e.currentTarget.style.color = "#15803d";
          }
        }}
        onMouseOut={(e) => {
          if (!(isActive || isOpen)) {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#374151";
          }
        }}
      >
        {label}
        <span style={{ fontSize: "10px", transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "" }}>
          ▾
        </span>
      </button>

      {isOpen && <div style={{ position: "absolute", left: 0, right: 0, top: "100%", height: "8px" }}></div>}

      <div
        style={{
          position: "absolute",
          left: 0,
          top: "100%",
          marginTop: "8px",
          width: columns === 2 ? "460px" : "256px",
          background: "#fff",
          borderRadius: "16px",
          border: "1px solid #f3f4f6",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
          overflow: "hidden",
          zIndex: 50,
          transition: "all 0.2s",
          transformOrigin: "top",
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "scale(1)" : "scale(0.95)",
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        <div
          style={{
            padding: "8px",
            display: columns === 2 ? "grid" : "block",
            gridTemplateColumns: columns === 2 ? "1fr 1fr" : undefined,
            gap: columns === 2 ? "4px" : undefined,
          }}
        >
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpenId(null)}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                padding: "10px 12px",
                borderRadius: "12px",
                textDecoration: "none",
                transition: "background 0.15s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = "#f0fdf4")}
              onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <span style={{ fontSize: "20px", flexShrink: 0, marginTop: "2px" }}>{item.icon}</span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "#1f2937" }}>{item.label}</div>
                {item.desc && (
                  <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "2px" }}>{item.desc}</div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// ────────────────────────────────────────────────────
// Language Dropdown
// ────────────────────────────────────────────────────
const LanguageDropdown = ({ language, setLanguage, openId, setOpenId }) => {
  const id = "lang";
  const isOpen = openId === id;
  const ref = useRef(null);
  const current = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  useEffect(() => {
    const handle = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        if (openId === id) setOpenId(null);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [openId, setOpenId]);

  const pick = (code) => {
    setLanguage(code);
    localStorage.setItem("agriLang", code);
    setOpenId(null);
  };

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpenId(isOpen ? null : id)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "8px 10px",
          borderRadius: "12px",
          fontSize: "14px",
          fontWeight: 600,
          whiteSpace: "nowrap",
          background: isOpen ? "#16a34a" : "transparent",
          color: isOpen ? "#fff" : "#374151",
          border: isOpen ? "1px solid transparent" : "1px solid #e5e7eb",
          cursor: "pointer",
          transition: "all 0.2s",
        }}
      >
        <span style={{ fontSize: "16px" }}>🌐</span>
        <span>{current.label}</span>
        <span style={{ fontSize: "10px", transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "" }}>▾</span>
      </button>

      <div
        style={{
          position: "absolute",
          right: 0,
          top: "100%",
          marginTop: "8px",
          width: "208px",
          background: "#fff",
          borderRadius: "16px",
          border: "1px solid #f3f4f6",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
          overflow: "hidden",
          zIndex: 50,
          transition: "all 0.2s",
          transformOrigin: "top right",
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "scale(1)" : "scale(0.95)",
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        <div
          style={{
            padding: "10px 16px",
            background: "linear-gradient(to right, #16a34a, #22c55e)",
            color: "#fff",
            fontSize: "12px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Choose Language
        </div>
        <div style={{ padding: "6px 0" }}>
          {LANGUAGES.map((lang) => {
            const active = lang.code === language;
            return (
              <button
                key={lang.code}
                onClick={() => pick(lang.code)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px 16px",
                  textAlign: "left",
                  background: active ? "#f0fdf4" : "transparent",
                  color: active ? "#15803d" : "#374151",
                  fontWeight: active ? 700 : 500,
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => {
                  if (!active) e.currentTarget.style.background = "#f9fafb";
                }}
                onMouseOut={(e) => {
                  if (!active) e.currentTarget.style.background = "transparent";
                }}
              >
                <span style={{ fontSize: "18px" }}>{lang.flag}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "14px" }}>{lang.label}</div>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>{lang.native}</div>
                </div>
                {active && <span style={{ color: "#16a34a", fontSize: "14px" }}>✓</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ────────────────────────────────────────────────────
// MAIN NAVBAR
// ────────────────────────────────────────────────────
const Navbar = ({ darkMode, setDarkMode }) => {
  const location    = useLocation();
  const navigate    = useNavigate();
  const dropdownRef = useRef(null);

  const [profileOpen, setProfileOpen] = useState(false);
  const [user,        setUser]        = useState(null);
  const [showNotice,  setShowNotice]  = useState(true);
  const [openId,      setOpenId]      = useState(null);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [mobileSub,   setMobileSub]   = useState(null);
  const [language,    setLanguage]    = useState(
    () => localStorage.getItem("agriLang") || "en"
  );

  // ── JS-based responsive (no Tailwind breakpoint dependency) ──
  const [winW, setWinW] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const isDesktop = winW >= 1100;

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

  useEffect(() => {
    setMobileOpen(false);
    setMobileSub(null);
  }, [location.pathname]);

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

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "U");

  const pathStarts = (prefix) =>
    location.pathname === prefix || location.pathname.startsWith(prefix + "/");

  // ── Reusable link button style ──
  const linkStyle = (active) => ({
    padding: "8px 10px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: 600,
    whiteSpace: "nowrap",
    textDecoration: "none",
    background: active ? "#16a34a" : "transparent",
    color: active ? "#fff" : "#374151",
    transition: "all 0.2s",
    display: "inline-block",
  });

  const mobileSections = [
    { id: "home",        label: "Home",          path: "/",             icon: "🏠" },
    { id: "market",      label: "Market",        icon: "🛒", items: MARKET_MENU },
    { id: "posts",       label: "Posts",         icon: "📝", items: POSTS_MENU },
    { id: "smart",       label: "Smart Farming", icon: "🚜", items: SMART_MENU },
    { id: "services",    label: "Services",      icon: "🛠️", items: SERVICES_MENU },
    { id: "about",       label: "About Us",      icon: "ℹ️", items: ABOUT_MENU },
    { id: "contact",     label: "Contact Us",    path: "/contact",      icon: "📞" },
  ];

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, width: "100%", zIndex: 9999 }}>

      {/* ── GOVT SCHEMES TICKER ── */}
      {showNotice && (
        <div style={{ background: "#f59e0b", color: "#451a03", display: "flex", alignItems: "center", overflow: "hidden", height: "30px" }}>
          <div style={{ flexShrink: 0, background: "#b45309", color: "#fff", fontSize: "12px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.15em", padding: "0 12px", height: "100%", display: "flex", alignItems: "center", zIndex: 10 }}>
            📢 Govt Schemes
          </div>
          <div style={{ flex: 1, overflow: "hidden" }}>
            <div style={{ whiteSpace: "nowrap", fontSize: "12px", fontWeight: 600, display: "inline-block", animation: "marquee 40s linear infinite" }}>
              {schemes.map((s, i) => <span key={i} style={{ margin: "0 32px" }}>{s}</span>)}
              {schemes.map((s, i) => <span key={`d-${i}`} style={{ margin: "0 32px" }}>{s}</span>)}
            </div>
          </div>
          <button onClick={() => setShowNotice(false)} style={{ flexShrink: 0, padding: "0 12px", height: "100%", display: "flex", alignItems: "center", color: "#92400e", fontWeight: 700, fontSize: "14px", background: "none", border: "none", cursor: "pointer" }}>
            ✕
          </button>
        </div>
      )}

      {/* ── MAIN NAVBAR ── */}
      <nav
        style={{
          width: "100%",
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <div
          style={{
            width: "100%",
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >

          {/* ── Logo ── */}
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0, textDecoration: "none" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #16a34a, #22c55e)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(22,163,74,0.3)",
                padding: "6px",
              }}
            >
              <img src="/logo.png" alt="AgriConnect" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "18px", color: "#111827", letterSpacing: "-0.01em" }}>
                Agri<span style={{ color: "#22c55e" }}>Connect</span>
              </span>
              {winW >= 640 && (
                <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginTop: "2px", color: "#16a34a" }}>
                  Grow • Connect • Prosper
                </span>
              )}
            </div>
          </Link>

          {/* ── Desktop Nav (window >= 1100px) ── */}
          {isDesktop && (
            <div style={{ display: "flex", alignItems: "center", gap: "2px", flex: 1, justifyContent: "center", minWidth: 0 }}>
              <Link to="/" style={linkStyle(location.pathname === "/")}>Home</Link>
              <NavDropdown
  id="market"
  label="Market"
  items={MARKET_MENU}
  isActive={pathStarts("/marketplace") || pathStarts("/mandi-prices")}
  openId={openId}
  setOpenId={setOpenId}
/>
              <NavDropdown
                id="posts"
                label="Posts"
                items={POSTS_MENU}
                isActive={pathStarts("/posts") || pathStarts("/post-problem")}
                openId={openId}
                setOpenId={setOpenId}
              />
              <NavDropdown
                id="smart"
                label="Smart Farming"
                items={SMART_MENU}
                isActive={pathStarts("/smart")}
                openId={openId}
                setOpenId={setOpenId}
                columns={2}
              />
              <NavDropdown
                id="services"
                label="Services"
                items={SERVICES_MENU}
                isActive={pathStarts("/services") || pathStarts("/expert")}
                openId={openId}
                setOpenId={setOpenId}
                columns={2}
              />
              <NavDropdown
                id="about"
                label="About"
                items={ABOUT_MENU}
                isActive={pathStarts("/about")}
                openId={openId}
                setOpenId={setOpenId}
                columns={2}
              />

              <Link to="/contact" style={linkStyle(pathStarts("/contact"))}>Contact</Link>
            </div>
          )}

          {/* ── Right Side ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>

            {isDesktop && (
              <LanguageDropdown
                language={language}
                setLanguage={setLanguage}
                openId={openId}
                setOpenId={setOpenId}
              />
            )}

            {/* Dark/Light Toggle */}
            {winW >= 640 && (
              <button
                onClick={() => setDarkMode && setDarkMode(!darkMode)}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#f3f4f6",
                  color: "#374151",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                  transition: "all 0.2s",
                }}
                title={darkMode ? "Switch to Light" : "Switch to Dark"}
              >
                {darkMode ? "☀️" : "🌙"}
              </button>
            )}

            {user ? (
              <div ref={dropdownRef} style={{ position: "relative" }}>
                <button
                  onClick={() => setProfileOpen((p) => !p)}
                  style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", cursor: "pointer" }}
                  title={user.name}
                >
                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #4ade80, #16a34a)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 900,
                        color: "#fff",
                        fontSize: "14px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        border: "2px solid #4ade80",
                      }}
                    >
                      {getInitial(user.name)}
                    </div>
                    <span style={{ position: "absolute", bottom: 0, right: 0, width: "10px", height: "10px", background: "#4ade80", borderRadius: "50%", border: "2px solid #fff" }}></span>
                  </div>
                  <span style={{ fontSize: "12px", color: "#6b7280", transform: profileOpen ? "rotate(180deg)" : "" }}>▾</span>
                </button>

                {profileOpen && (
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      marginTop: "12px",
                      width: "256px",
                      borderRadius: "16px",
                      border: "1px solid #f3f4f6",
                      boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                      overflow: "hidden",
                      zIndex: 50,
                      background: "#fff",
                    }}
                  >
                    <div style={{ padding: "16px", background: "linear-gradient(to right, #16a34a, #22c55e)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: "20px", border: "2px solid rgba(255,255,255,0.4)", flexShrink: 0 }}>
                          {getInitial(user.name)}
                        </div>
                        <div style={{ overflow: "hidden" }}>
                          <div style={{ color: "#fff", fontWeight: 700, fontSize: "14px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.name}</div>
                          <div style={{ color: "#dcfce7", fontSize: "12px", textTransform: "capitalize", marginTop: "2px" }}>
                            {roleIcon(user.role)} {user.role}
                          </div>
                          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginTop: "2px" }}>{user.email}</div>
                        </div>
                      </div>
                    </div>

                    <div style={{ padding: "6px 0", maxHeight: "256px", overflowY: "auto" }}>
                      {[
                        { label: "🏠 Home",     path: "/" },
                        { label: "🤖 AI Chat",  path: "/ai" },
                        { label: "👤 Profile",  path: "/profile" },
                        { label: "⚙️ Settings", path: "/settings" },
                      ].map(({ label, path }) => {
                        const isActive = location.pathname === path;
                        return (
                          <Link
                            key={path}
                            to={path}
                            onClick={() => setProfileOpen(false)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                              padding: "10px 16px",
                              fontSize: "14px",
                              textDecoration: "none",
                              background: isActive ? "#f0fdf4" : "transparent",
                              color: isActive ? "#15803d" : "#374151",
                              fontWeight: isActive ? 700 : 500,
                            }}
                          >
                            <span style={{ fontSize: "16px", width: "24px", textAlign: "center" }}>{label.split(" ")[0]}</span>
                            <span>{label.split(" ").slice(1).join(" ")}</span>
                          </Link>
                        );
                      })}
                    </div>

                    <div style={{ borderTop: "1px solid #f3f4f6", padding: "6px 0" }}>
                      <button
                        onClick={logout}
                        style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%", padding: "10px 16px", fontSize: "14px", color: "#ef4444", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                      >
                        <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          🚪
                        </div>
                        <div>
                          <div style={{ fontWeight: 700 }}>Log Out</div>
                          <div style={{ color: "#fca5a5", fontSize: "12px" }}>See you soon!</div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              winW >= 640 && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Link
                    to="/login"
                    style={{
                      padding: "8px 12px",
                      fontSize: "14px",
                      fontWeight: 600,
                      borderRadius: "12px",
                      color: "#374151",
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Login
                  </Link>
                  <Link
                    to="/login"
                    style={{
                      padding: "8px 12px",
                      fontSize: "14px",
                      fontWeight: 700,
                      background: "#16a34a",
                      color: "#fff",
                      borderRadius: "12px",
                      boxShadow: "0 4px 12px rgba(22,163,74,0.3)",
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Join Now
                  </Link>
                </div>
              )
            )}

            {/* ── Hamburger (when not desktop) ── */}
            {!isDesktop && (
              <button
                onClick={() => setMobileOpen((o) => !o)}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "5px",
                  background: "#f0fdf4",
                  border: "none",
                  cursor: "pointer",
                }}
                aria-label="Toggle menu"
              >
                <span style={{ display: "block", width: "20px", height: "2px", borderRadius: "2px", background: "#15803d", transition: "all 0.3s", transform: mobileOpen ? "rotate(45deg) translateY(7px)" : "" }}></span>
                <span style={{ display: "block", width: "20px", height: "2px", borderRadius: "2px", background: "#15803d", transition: "all 0.3s", opacity: mobileOpen ? 0 : 1 }}></span>
                <span style={{ display: "block", width: "20px", height: "2px", borderRadius: "2px", background: "#15803d", transition: "all 0.3s", transform: mobileOpen ? "rotate(-45deg) translateY(-7px)" : "" }}></span>
              </button>
            )}
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        {!isDesktop && (
          <div
            style={{
              overflow: "hidden",
              transition: "max-height 0.3s ease-in-out",
              background: "#fff",
              borderTop: "1px solid #f3f4f6",
              maxHeight: mobileOpen ? "80vh" : "0px",
              overflowY: mobileOpen ? "auto" : "hidden",
            }}
          >
            <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "4px" }}>

              {mobileSections.map((section) => {
                if (section.path) {
                  const active = section.path === "/" ? location.pathname === "/" : pathStarts(section.path);
                  return (
                    <Link
                      key={section.id}
                      to={section.path}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "12px 16px",
                        borderRadius: "12px",
                        fontSize: "14px",
                        fontWeight: 600,
                        textDecoration: "none",
                        background: active ? "#16a34a" : "transparent",
                        color: active ? "#fff" : "#374151",
                      }}
                    >
                      <span style={{ fontSize: "18px" }}>{section.icon}</span>
                      {section.label}
                    </Link>
                  );
                }

                const expanded = mobileSub === section.id;
                const sectionActive = section.items.some((i) => pathStarts(i.path));
                return (
                  <div key={section.id}>
                    <button
                      onClick={() => setMobileSub(expanded ? null : section.id)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "12px",
                        padding: "12px 16px",
                        borderRadius: "12px",
                        fontSize: "14px",
                        fontWeight: 600,
                        background: sectionActive ? "#f0fdf4" : "transparent",
                        color: sectionActive ? "#15803d" : "#374151",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{ fontSize: "18px" }}>{section.icon}</span>
                        {section.label}
                      </span>
                      <span style={{ fontSize: "12px", transform: expanded ? "rotate(180deg)" : "", transition: "transform 0.2s" }}>▾</span>
                    </button>

                    <div style={{ overflow: "hidden", maxHeight: expanded ? "600px" : "0px", transition: "max-height 0.3s", marginTop: expanded ? "4px" : 0 }}>
                      <div style={{ paddingLeft: "12px", borderLeft: "2px solid #bbf7d0", marginLeft: "20px", display: "flex", flexDirection: "column", gap: "2px", padding: "4px 0 4px 12px" }}>
                        {section.items.map((item) => {
                          const active = location.pathname === item.path;
                          return (
                            <Link
                              key={item.path}
                              to={item.path}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                padding: "8px 12px",
                                borderRadius: "8px",
                                fontSize: "14px",
                                textDecoration: "none",
                                background: active ? "#dcfce7" : "transparent",
                                color: active ? "#15803d" : "#4b5563",
                                fontWeight: active ? 700 : 500,
                              }}
                            >
                              <span style={{ fontSize: "16px" }}>{item.icon}</span>
                              {item.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Mobile language */}
              <div style={{ paddingTop: "12px", borderTop: "1px solid #f3f4f6", marginTop: "12px" }}>
                <div style={{ fontSize: "12px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", padding: "0 16px", marginBottom: "8px" }}>
                  🌐 Language
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", padding: "0 8px" }}>
                  {LANGUAGES.map((lang) => {
                    const active = lang.code === language;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          localStorage.setItem("agriLang", lang.code);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          fontSize: "14px",
                          background: active ? "#16a34a" : "#f9fafb",
                          color: active ? "#fff" : "#374151",
                          fontWeight: active ? 700 : 500,
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        <span>{lang.flag}</span>
                        <span style={{ fontSize: "12px" }}>{lang.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {!user && (
                <div style={{ paddingTop: "12px", borderTop: "1px solid #f3f4f6", marginTop: "12px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", padding: "12px 8px 0" }}>
                  <Link
                    to="/login"
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "10px 16px", fontSize: "14px", fontWeight: 600, color: "#374151", background: "#f3f4f6", borderRadius: "12px", textDecoration: "none" }}
                  >
                    Login
                  </Link>
                  <Link
                    to="/login"
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "10px 16px", fontSize: "14px", fontWeight: 700, color: "#fff", background: "#16a34a", borderRadius: "12px", boxShadow: "0 4px 12px rgba(22,163,74,0.3)", textDecoration: "none" }}
                  >
                    Join Now
                  </Link>
                </div>
              )}

              <div style={{ paddingTop: "12px", borderTop: "1px solid #f3f4f6", marginTop: "12px", padding: "12px 8px 0" }}>
                <button
                  onClick={() => setDarkMode && setDarkMode(!darkMode)}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderRadius: "12px", background: "#f9fafb", border: "none", cursor: "pointer" }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: 600, color: "#374151" }}>
                    <span style={{ fontSize: "18px" }}>{darkMode ? "☀️" : "🌙"}</span>
                    {darkMode ? "Light Mode" : "Dark Mode"}
                  </span>
                  <div style={{ width: "40px", height: "20px", borderRadius: "10px", background: darkMode ? "#22c55e" : "#d1d5db", position: "relative", transition: "all 0.3s" }}>
                    <div style={{ position: "absolute", top: 0, width: "20px", height: "20px", borderRadius: "50%", background: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,0.15)", transform: darkMode ? "translateX(20px)" : "translateX(0)", transition: "transform 0.3s" }}></div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;