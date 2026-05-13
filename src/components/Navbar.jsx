import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

import {
  FaHome,
  FaStore,
  FaRupeeSign,
  FaUsers,
  FaQuestionCircle,
  FaSeedling,
  FaMicroscope,
  FaPenFancy,
  FaCloudSun,
  FaUserTie,
  FaLeaf,
  FaMountain,
  FaBug,
  FaFlask,
  FaTint,
  FaRobot,
  FaSatelliteDish,
  FaPlane,
  FaChartLine,
  FaVrCardboard,
  FaWater,
  FaChartBar,
  FaInfoCircle,
  FaUserGraduate,
  FaShoppingBag,
  FaBullseye,
  FaCogs,
  FaPhoneAlt,
  FaMoon,
  FaSun,
  FaTimes,
  FaDoorOpen,
  FaUserCircle,
  FaCog,
} from "react-icons/fa";

import { GiFarmer } from "react-icons/gi";

const getSchemes = (t) => [
  t("scheme_pm_kisan"),
  t("scheme_pm_fby"),
  t("scheme_kcc"),
  t("scheme_drone_didi"),
  t("scheme_pmksy"),
  t("scheme_pkvy"),
  t("scheme_enam"),
  t("scheme_soil_health"),
];

// ── Dropdown menu data ──
const getMarketMenu = (t) => [
  {
    label: t("nav_marketplace"),
    path: "/marketplace",
    icon: FaStore,
    color: "#f97316",
    bg: "#fff7ed",
    desc: t("nav_marketplace_desc"),
  },
  {
    label: t("nav_mandi_prices"),
    path: "/mandi-prices",
    icon: FaRupeeSign,
    color: "#16a34a",
    bg: "#f0fdf4",
    desc: t("nav_mandi_prices_desc"),
  },
];

const getPostsMenu = (t) => [
  {
    label: t("nav_community_posts"),
    path: "/posts",
    icon: FaUsers,
    color: "#2563eb",
    bg: "#eff6ff",
    desc: t("nav_community_posts_desc"),
  },
  {
    label: t("nav_ask_crop"),
    path: "/post-problem",
    icon: FaQuestionCircle,
    color: "#9333ea",
    bg: "#faf5ff",
    desc: t("nav_ask_crop_desc"),
  },
  {
    label: t("nav_farmer_questions"),
    path: "/posts/questions",
    icon: FaSeedling,
    color: "#16a34a",
    bg: "#f0fdf4",
    desc: t("nav_farmer_questions_desc"),
  },
  {
    label: t("nav_expert_answers"),
    path: "/posts/expert-answers",
    icon: FaMicroscope,
    color: "#0891b2",
    bg: "#ecfeff",
    desc: t("nav_expert_answers_desc"),
  },
  {
    label: t("nav_my_posts"),
    path: "/posts/mine",
    icon: FaPenFancy,
    color: "#db2777",
    bg: "#fdf2f8",
    desc: t("nav_my_posts_desc"),
  },
];

const getServicesMenu = (t) => [
  {
    label: t("nav_weather_updates"),
    path: "/services/weather",
    icon: FaCloudSun,
    color: "#0ea5e9",
    bg: "#f0f9ff",
  },
  {
    label: t("nav_expert_connect"),
    path: "/services/expert-connect",
    icon: FaUserTie,
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
  {
    label: t("nav_crop_advisory"),
    path: "/services/crop-advisory",
    icon: FaLeaf,
    color: "#22c55e",
    bg: "#f0fdf4",
  },
  {
    label: t("nav_soil_health"),
    path: "/services/soil-health",
    icon: FaMountain,
    color: "#92400e",
    bg: "#fffbeb",
  },
  {
    label: t("nav_pest_disease"),
    path: "/services/pest-disease",
    icon: FaBug,
    color: "#dc2626",
    bg: "#fef2f2",
  },
  {
    label: t("nav_fertilizer"),
    path: "/services/fertilizer",
    icon: FaFlask,
    color: "#ca8a04",
    bg: "#fefce8",
  },
  {
    label: t("nav_irrigation"),
    path: "/services/irrigation",
    icon: FaTint,
    color: "#0284c7",
    bg: "#e0f2fe",
  },
];

const getSmartMenu = (t) => [
  {
    label: "AI Crop Doctor",
    path: "/ai-crop-doctor",
    icon: FaRobot,
    color: "#4f46e5",
    bg: "#eef2ff",
    desc: "Scan crop images and detect disease, pest or nutrient issues.",
  },
  {
    label: "Satellite Crop Monitoring",
    path: "/satellite-crop-monitoring",
    icon: FaSatelliteDish,
    color: "#0f766e",
    bg: "#ccfbf1",
    desc: "Monitor field health, vegetation and risk zones.",
  },
  {
    label: "Drone / Land Rover Monitor",
    path: "/drone-land-rover-monitor",
    icon: FaPlane,
    color: "#ea580c",
    bg: "#fff7ed",
    desc: "Inspect crop stress, pest risk and damaged field areas.",
  },
  {
    label: "ML Yield Prediction",
    path: "/ml-yield-prediction",
    icon: FaChartLine,
    color: "#16a34a",
    bg: "#f0fdf4",
    desc: "Predict expected crop yield using farm input data.",
  },
  {
    label: "AR/VR Farming Training",
    path: "/ar-vr-farming-training",
    icon: FaVrCardboard,
    color: "#9333ea",
    bg: "#faf5ff",
    desc: "Learn farming techniques with videos and virtual training.",
  },
  {
    label: "Smart Irrigation",
    path: "/smart-irrigation",
    icon: FaWater,
    color: "#0284c7",
    bg: "#e0f2fe",
    desc: "Get water-saving irrigation plans and techniques.",
  },
  {
    label: "Market Demand Prediction",
    path: "/market-demand-prediction",
    icon: FaChartBar,
    color: "#db2777",
    bg: "#fdf2f8",
    desc: "Predict demand, price movement and best selling time.",
  },
];

const getAboutMenu = (t) => [
  {
    label: t("nav_about_agriconnect"),
    path: "/about",
    icon: FaInfoCircle,
    color: "#2563eb",
    bg: "#eff6ff",
  },
  {
    label: t("nav_for_farmers"),
    path: "/about/farmers",
    icon: GiFarmer,
    color: "#16a34a",
    bg: "#f0fdf4",
  },
  {
    label: t("nav_for_agronomists"),
    path: "/about/agronomists",
    icon: FaUserGraduate,
    color: "#0891b2",
    bg: "#ecfeff",
  },
  {
    label: t("nav_for_buyers"),
    path: "/about/buyers",
    icon: FaShoppingBag,
    color: "#f97316",
    bg: "#fff7ed",
  },
  {
    label: t("nav_our_mission"),
    path: "/about/mission",
    icon: FaBullseye,
    color: "#dc2626",
    bg: "#fef2f2",
  },
  {
    label: t("nav_how_it_works"),
    path: "/about/how-it-works",
    icon: FaCogs,
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
];

const LANGUAGES = [
  { code: "en", label: "English", native: "English", flag: "🇬🇧" },
  { code: "hi", label: "Hindi", native: "हिन्दी", flag: "🇮🇳" },
  { code: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
];

// ────────────────────────────────────────────────────
// Colorful Icon Badge
// ────────────────────────────────────────────────────
const IconBadge = ({ icon: Icon, color, bg, size = 36, iconSize = 17 }) => {
  if (!Icon) return null;

  return (
    <span
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "10px",
        background: bg || "#f0fdf4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      <Icon
        style={{
          fontSize: `${iconSize}px`,
          color: color || "#16a34a",
        }}
      />
    </span>
  );
};

// ────────────────────────────────────────────────────
// Reusable Dropdown
// ────────────────────────────────────────────────────
const NavDropdown = ({
  label,
  items,
  isActive,
  openId,
  setOpenId,
  id,
  columns = 1,
  onItemClick,
}) => {
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
        <span
          style={{
            fontSize: "10px",
            transition: "transform 0.2s",
            transform: isOpen ? "rotate(180deg)" : "",
          }}
        >
          ▾
        </span>
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "100%",
            height: "8px",
          }}
        />
      )}

      <div
        style={{
          position: "absolute",
          left: 0,
          top: "100%",
          marginTop: "8px",
          width: columns === 2 ? "460px" : "270px",
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
              onClick={(e) => {
                if (onItemClick) {
                  const allowed = onItemClick(e, item);
                  if (allowed === false) return;
                }

                setOpenId(null);
              }}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                padding: "10px 12px",
                borderRadius: "12px",
                textDecoration: "none",
                transition: "all 0.15s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = item.bg || "#f0fdf4";
                e.currentTarget.style.transform = "translateX(2px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              <IconBadge
                icon={item.icon}
                color={item.color}
                bg={item.bg}
                size={36}
                iconSize={17}
              />

              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#1f2937",
                  }}
                >
                  {item.label}
                </div>

                {item.desc && (
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      marginTop: "2px",
                      lineHeight: 1.35,
                    }}
                  >
                    {item.desc}
                  </div>
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
const LanguageDropdown = ({ language, setLanguage, openId, setOpenId, t }) => {
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
    window.dispatchEvent(new Event("agriLangChange"));
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
        <span
          style={{
            fontSize: "10px",
            transition: "transform 0.2s",
            transform: isOpen ? "rotate(180deg)" : "",
          }}
        >
          ▾
        </span>
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
          {t("nav_choose_language")}
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
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>
                    {lang.native}
                  </div>
                </div>

                {active && (
                  <span style={{ color: "#16a34a", fontSize: "14px" }}>✓</span>
                )}
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
  const { lang, setLang, t } = useLanguage();
  const schemes = getSchemes(t);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showNotice, setShowNotice] = useState(true);
  const [openId, setOpenId] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState(null);
  const [showFarmerLoginPopup, setShowFarmerLoginPopup] = useState(false);

  const language = lang;
  const setLanguage = setLang;

  const [winW, setWinW] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );

  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isDesktop = winW >= 1100;

  const MARKET_MENU = getMarketMenu(t);
  const POSTS_MENU = getPostsMenu(t);
  const SERVICES_MENU = getServicesMenu(t);
  const SMART_MENU = getSmartMenu(t);
  const ABOUT_MENU = getAboutMenu(t);

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
    if (role === "farmer") return "👨‍🌾";
    if (role === "buyer") return "🛒";
    if (role === "agronomist") return "🔬";
    if (role === "vendor") return "🏪";
    return "👤";
  };

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "U");

  const pathStarts = (prefix) =>
    location.pathname === prefix || location.pathname.startsWith(prefix + "/");

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

  const handleProtectedMenuClick = (e, item) => {
    const isHomePage = location.pathname === "/";
    const isNotLoggedIn = !user;

    if (item?.path === "/post-problem" && isHomePage && isNotLoggedIn) {
      e.preventDefault();
      setOpenId(null);
      setMobileOpen(false);
      setMobileSub(null);
      setShowFarmerLoginPopup(true);
      return false;
    }

    return true;
  };

  const profileMenu = [
    {
      label: "Home",
      path: "/",
      icon: FaHome,
      color: "#16a34a",
      bg: "#f0fdf4",
    },
    {
      label: "AI Chat",
      path: "/ai",
      icon: FaRobot,
      color: "#4f46e5",
      bg: "#eef2ff",
    },
    {
      label: "Profile",
      path: "/profile",
      icon: FaUserCircle,
      color: "#2563eb",
      bg: "#eff6ff",
    },
    {
      label: "Settings",
      path: "/settings",
      icon: FaCog,
      color: "#9333ea",
      bg: "#faf5ff",
    },
  ];

  const mobileSections = [
    {
      id: "home",
      label: t("nav_profile_home"),
      path: "/",
    },
    {
      id: "market",
      label: t("nav_market"),
      items: MARKET_MENU,
    },
    {
      id: "posts",
      label: t("nav_posts"),
      items: POSTS_MENU,
    },
    {
      id: "smart",
      label: t("nav_smart_farming"),
      items: SMART_MENU,
    },
    {
      id: "services",
      label: t("nav_services"),
      items: SERVICES_MENU,
    },
    {
      id: "about",
      label: t("nav_about"),
      items: ABOUT_MENU,
    },
    {
      id: "contact",
      label: t("nav_contact"),
      path: "/contact",
    },
  ];

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          zIndex: 9999,
        }}
      >
        {/* ── GOVT SCHEMES TICKER ── */}
        {showNotice && (
          <div
            style={{
              background: "#f59e0b",
              color: "#451a03",
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
              height: "30px",
            }}
          >
            <div
              style={{
                flexShrink: 0,
                background: "#b45309",
                color: "#fff",
                fontSize: "12px",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                padding: "0 12px",
                height: "100%",
                display: "flex",
                alignItems: "center",
                zIndex: 10,
              }}
            >
              📢 Govt Schemes
            </div>

            <div style={{ flex: 1, overflow: "hidden" }}>
              <div
                style={{
                  whiteSpace: "nowrap",
                  fontSize: "12px",
                  fontWeight: 600,
                  display: "inline-block",
                  animation: "marquee 40s linear infinite",
                }}
              >
                {schemes.map((s, i) => (
                  <span key={i} style={{ margin: "0 32px" }}>
                    {s}
                  </span>
                ))}

                {schemes.map((s, i) => (
                  <span key={`d-${i}`} style={{ margin: "0 32px" }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowNotice(false)}
              style={{
                flexShrink: 0,
                padding: "0 12px",
                height: "100%",
                display: "flex",
                alignItems: "center",
                color: "#92400e",
                fontWeight: 700,
                fontSize: "14px",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <FaTimes />
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
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flexShrink: 0,
                textDecoration: "none",
              }}
            >
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
                <img
                  src="/logo.png"
                  alt="AgriConnect"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: 1,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 800,
                    fontSize: "18px",
                    color: "#111827",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Agri<span style={{ color: "#22c55e" }}>Connect</span>
                </span>

                {winW >= 640 && (
                  <span
                    style={{
                      fontSize: "9px",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      marginTop: "2px",
                      color: "#16a34a",
                    }}
                  >
                    Grow • Connect • Prosper
                  </span>
                )}
              </div>
            </Link>

            {/* ── Desktop Nav ── */}
            {isDesktop && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",
                  flex: 1,
                  justifyContent: "center",
                  minWidth: 0,
                }}
              >
                <Link to="/" style={linkStyle(location.pathname === "/")}>
                  {t("nav_profile_home")}
                </Link>

                <NavDropdown
                  id="market"
                  label={t("nav_market")}
                  items={MARKET_MENU}
                  isActive={
                    pathStarts("/marketplace") || pathStarts("/mandi-prices")
                  }
                  openId={openId}
                  setOpenId={setOpenId}
                />

                <NavDropdown
                  id="posts"
                  label={t("nav_posts")}
                  items={POSTS_MENU}
                  isActive={pathStarts("/posts") || pathStarts("/post-problem")}
                  openId={openId}
                  setOpenId={setOpenId}
                  onItemClick={handleProtectedMenuClick}
                />

                <NavDropdown
  id="smart"
  label={t("nav_smart_farming")}
  items={SMART_MENU}
  isActive={
    pathStarts("/ai-crop-doctor") ||
    pathStarts("/satellite-crop-monitoring") ||
    pathStarts("/drone-land-rover-monitor") ||
    pathStarts("/ml-yield-prediction") ||
    pathStarts("/ar-vr-farming-training") ||
    pathStarts("/smart-irrigation") ||
    pathStarts("/market-demand-prediction")
  }
  openId={openId}
  setOpenId={setOpenId}
  columns={2}
/>

                <NavDropdown
                  id="services"
                  label={t("nav_services")}
                  items={SERVICES_MENU}
                  isActive={pathStarts("/services") || pathStarts("/expert")}
                  openId={openId}
                  setOpenId={setOpenId}
                  columns={2}
                />

                <NavDropdown
                  id="about"
                  label={t("nav_about")}
                  items={ABOUT_MENU}
                  isActive={pathStarts("/about")}
                  openId={openId}
                  setOpenId={setOpenId}
                  columns={2}
                />

                <Link to="/contact" style={linkStyle(pathStarts("/contact"))}>
                  {t("nav_contact")}
                </Link>
              </div>
            )}

            {/* ── Right Side ── */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flexShrink: 0,
              }}
            >
              {isDesktop && (
                <LanguageDropdown
                  language={language}
                  setLanguage={setLanguage}
                  openId={openId}
                  setOpenId={setOpenId}
                  t={t}
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
                    background: darkMode ? "#fef3c7" : "#eef2ff",
                    color: darkMode ? "#ca8a04" : "#4f46e5",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                    transition: "all 0.2s",
                  }}
                  title={
                    darkMode ? t("nav_switch_light") : t("nav_switch_dark")
                  }
                >
                  {darkMode ? <FaSun /> : <FaMoon />}
                </button>
              )}

              {user ? (
                <div ref={dropdownRef} style={{ position: "relative" }}>
                  <button
                    onClick={() => setProfileOpen((p) => !p)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                    title={user.name}
                  >
                    <div style={{ position: "relative" }}>
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, #4ade80, #16a34a)",
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

                      <span
                        style={{
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                          width: "10px",
                          height: "10px",
                          background: "#4ade80",
                          borderRadius: "50%",
                          border: "2px solid #fff",
                        }}
                      ></span>
                    </div>

                    <span
                      style={{
                        fontSize: "12px",
                        color: "#6b7280",
                        transform: profileOpen ? "rotate(180deg)" : "",
                      }}
                    >
                      ▾
                    </span>
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
                      <div
                        style={{
                          padding: "16px",
                          background:
                            "linear-gradient(to right, #16a34a, #22c55e)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <div
                            style={{
                              width: "48px",
                              height: "48px",
                              borderRadius: "50%",
                              background: "rgba(255,255,255,0.2)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: 900,
                              color: "#fff",
                              fontSize: "20px",
                              border: "2px solid rgba(255,255,255,0.4)",
                              flexShrink: 0,
                            }}
                          >
                            {getInitial(user.name)}
                          </div>

                          <div style={{ overflow: "hidden" }}>
                            <div
                              style={{
                                color: "#fff",
                                fontWeight: 700,
                                fontSize: "14px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {user.name}
                            </div>

                            <div
                              style={{
                                color: "#dcfce7",
                                fontSize: "12px",
                                textTransform: "capitalize",
                                marginTop: "2px",
                              }}
                            >
                              {roleIcon(user.role)} {user.role}
                            </div>

                            <div
                              style={{
                                color: "rgba(255,255,255,0.7)",
                                fontSize: "12px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                marginTop: "2px",
                              }}
                            >
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          padding: "6px 0",
                          maxHeight: "256px",
                          overflowY: "auto",
                        }}
                      >
                        {profileMenu.map((item) => {
                          const isActive = location.pathname === item.path;

                          return (
                            <Link
                              key={item.path}
                              to={item.path}
                              onClick={() => setProfileOpen(false)}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                padding: "10px 16px",
                                fontSize: "14px",
                                textDecoration: "none",
                                background: isActive
                                  ? "#f0fdf4"
                                  : "transparent",
                                color: isActive ? "#15803d" : "#374151",
                                fontWeight: isActive ? 700 : 500,
                              }}
                            >
                              <IconBadge
                                icon={item.icon}
                                color={item.color}
                                bg={item.bg}
                                size={30}
                                iconSize={14}
                              />
                              <span>{item.label}</span>
                            </Link>
                          );
                        })}
                      </div>

                      <div
                        style={{
                          borderTop: "1px solid #f3f4f6",
                          padding: "6px 0",
                        }}
                      >
                        <button
                          onClick={logout}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            width: "100%",
                            padding: "10px 16px",
                            fontSize: "14px",
                            color: "#ef4444",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            textAlign: "left",
                          }}
                        >
                          <IconBadge
                            icon={FaDoorOpen}
                            color="#ef4444"
                            bg="#fef2f2"
                            size={32}
                            iconSize={15}
                          />

                          <div>
                            <div style={{ fontWeight: 700 }}>Log Out</div>
                            <div style={{ color: "#fca5a5", fontSize: "12px" }}>
                              See you soon!
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                winW >= 640 && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
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

              {/* ── Hamburger ── */}
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
                  <span
                    style={{
                      display: "block",
                      width: "20px",
                      height: "2px",
                      borderRadius: "2px",
                      background: "#15803d",
                      transition: "all 0.3s",
                      transform: mobileOpen
                        ? "rotate(45deg) translateY(7px)"
                        : "",
                    }}
                  ></span>

                  <span
                    style={{
                      display: "block",
                      width: "20px",
                      height: "2px",
                      borderRadius: "2px",
                      background: "#15803d",
                      transition: "all 0.3s",
                      opacity: mobileOpen ? 0 : 1,
                    }}
                  ></span>

                  <span
                    style={{
                      display: "block",
                      width: "20px",
                      height: "2px",
                      borderRadius: "2px",
                      background: "#15803d",
                      transition: "all 0.3s",
                      transform: mobileOpen
                        ? "rotate(-45deg) translateY(-7px)"
                        : "",
                    }}
                  ></span>
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
              <div
                style={{
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                {mobileSections.map((section) => {
                  if (section.path) {
                    const active =
                      section.path === "/"
                        ? location.pathname === "/"
                        : pathStarts(section.path);

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
                        {section.label}
                      </Link>
                    );
                  }

                  const expanded = mobileSub === section.id;
                  const sectionActive = section.items.some((i) =>
                    pathStarts(i.path)
                  );

                  return (
                    <div key={section.id}>
                      <button
                        onClick={() =>
                          setMobileSub(expanded ? null : section.id)
                        }
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
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          {section.label}
                        </span>

                        <span
                          style={{
                            fontSize: "12px",
                            transform: expanded ? "rotate(180deg)" : "",
                            transition: "transform 0.2s",
                          }}
                        >
                          ▾
                        </span>
                      </button>

                      <div
                        style={{
                          overflow: "hidden",
                          maxHeight: expanded ? "600px" : "0px",
                          transition: "max-height 0.3s",
                          marginTop: expanded ? "4px" : 0,
                        }}
                      >
                        <div
                          style={{
                            paddingLeft: "12px",
                            borderLeft: "2px solid #bbf7d0",
                            marginLeft: "20px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "2px",
                            padding: "4px 0 4px 12px",
                          }}
                        >
                          {section.items.map((item) => {
                            const active = location.pathname === item.path;

                            return (
                              <Link
                                key={item.path}
                                to={item.path}
                                onClick={(e) => {
                                  const allowed = handleProtectedMenuClick(e, item);

                                  if (allowed !== false) {
                                    setMobileOpen(false);
                                    setMobileSub(null);
                                  }
                                }}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "10px",
                                  padding: "8px 12px",
                                  borderRadius: "8px",
                                  fontSize: "14px",
                                  textDecoration: "none",
                                  background: active
                                    ? "#dcfce7"
                                    : "transparent",
                                  color: active ? "#15803d" : "#4b5563",
                                  fontWeight: active ? 700 : 500,
                                }}
                              >
                                <IconBadge
                                  icon={item.icon}
                                  color={item.color}
                                  bg={item.bg}
                                  size={28}
                                  iconSize={14}
                                />
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
                <div
                  style={{
                    paddingTop: "12px",
                    borderTop: "1px solid #f3f4f6",
                    marginTop: "12px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#6b7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      padding: "0 16px",
                      marginBottom: "8px",
                    }}
                  >
                    {t("nav_choose_language")}
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "8px",
                      padding: "0 8px",
                    }}
                  >
                    {LANGUAGES.map((lang) => {
                      const active = lang.code === language;

                      return (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            localStorage.setItem("agriLang", lang.code);
                            window.dispatchEvent(new Event("agriLangChange"));
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
                  <div
                    style={{
                      paddingTop: "12px",
                      borderTop: "1px solid #f3f4f6",
                      marginTop: "12px",
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "8px",
                      padding: "12px 8px 0",
                    }}
                  >
                    <Link
                      to="/login"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "10px 16px",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#374151",
                        background: "#f3f4f6",
                        borderRadius: "12px",
                        textDecoration: "none",
                      }}
                    >
                      {t("nav_login")}
                    </Link>

                    <Link
                      to="/login"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "10px 16px",
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#fff",
                        background: "#16a34a",
                        borderRadius: "12px",
                        boxShadow: "0 4px 12px rgba(22,163,74,0.3)",
                        textDecoration: "none",
                      }}
                    >
                      {t("nav_join_now")}
                    </Link>
                  </div>
                )}

                <div
                  style={{
                    paddingTop: "12px",
                    borderTop: "1px solid #f3f4f6",
                    marginTop: "12px",
                    padding: "12px 8px 0",
                  }}
                >
                  <button
                    onClick={() => setDarkMode && setDarkMode(!darkMode)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 16px",
                      borderRadius: "12px",
                      background: "#f9fafb",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#374151",
                      }}
                    >
                      <IconBadge
                        icon={darkMode ? FaSun : FaMoon}
                        color={darkMode ? "#ca8a04" : "#4f46e5"}
                        bg={darkMode ? "#fef3c7" : "#eef2ff"}
                        size={30}
                        iconSize={15}
                      />

                      {darkMode ? t("nav_light_mode") : t("nav_dark_mode")}
                    </span>

                    <div
                      style={{
                        width: "40px",
                        height: "20px",
                        borderRadius: "10px",
                        background: darkMode ? "#22c55e" : "#d1d5db",
                        position: "relative",
                        transition: "all 0.3s",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          background: "#fff",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
                          transform: darkMode
                            ? "translateX(20px)"
                            : "translateX(0)",
                          transition: "transform 0.3s",
                        }}
                      ></div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
      {showFarmerLoginPopup && (
        <div
          onClick={() => setShowFarmerLoginPopup(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(6px)",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "430px",
              background: "#fff",
              borderRadius: "28px",
              overflow: "hidden",
              boxShadow: "0 30px 80px rgba(0,0,0,0.3)",
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, #15803d, #16a34a)",
                padding: "28px",
                color: "#fff",
                position: "relative",
              }}
            >
              <button
                onClick={() => setShowFarmerLoginPopup(false)}
                style={{
                  position: "absolute",
                  top: "14px",
                  right: "14px",
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  border: "none",
                  background: "rgba(255,255,255,0.18)",
                  color: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-label="Close popup"
              >
                <FaTimes />
              </button>

              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "20px",
                  background: "rgba(255,255,255,0.16)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "34px",
                  marginBottom: "16px",
                }}
              >
                👨‍🌾
              </div>

              <h2
                style={{
                  margin: 0,
                  fontSize: "26px",
                  fontWeight: 900,
                  lineHeight: 1.2,
                }}
              >
                First login
              </h2>

              <p
                style={{
                  margin: "10px 0 0",
                  color: "#dcfce7",
                  fontSize: "14px",
                  lineHeight: 1.6,
                }}
              >
                First login to ask a crop problem. After login, you can post crop issues with photos and get community or expert help.
              </p>
            </div>

            <div style={{ padding: "24px" }}>
              <div
                style={{
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  borderRadius: "18px",
                  padding: "14px",
                  marginBottom: "18px",
                  color: "#166534",
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: 1.5,
                }}
              >
                This popup will appear only on Home page when user is not logged in.
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                <button
                  onClick={() => {
                    setShowFarmerLoginPopup(false);
                    navigate("/login");
                  }}
                  style={{
                    padding: "13px 16px",
                    borderRadius: "15px",
                    border: "none",
                    background: "#16a34a",
                    color: "#fff",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  Login
                </button>

                <button
                  onClick={() => {
                    setShowFarmerLoginPopup(false);
                    navigate("/login");
                  }}
                  style={{
                    padding: "13px 16px",
                    borderRadius: "15px",
                    border: "1px solid #bbf7d0",
                    background: "#f0fdf4",
                    color: "#166534",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      )}



      {/* Space fixer because navbar is fixed */}
      <div
        style={{
          height: showNotice ? "112px" : "82px",
        }}
      />
    </>
  );
};

export default Navbar;