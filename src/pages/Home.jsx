import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import WeatherWidget from "../components/WeatherWidget";
import axios from "axios";
import farmVideo from "../assets/farm-video.mp4";
import gogLogo from "../assets/gog-logo.png";
import {
  ShoppingCart, CloudSun, BarChart2, Handshake,
  AlertTriangle, Phone, Bot, ClipboardList,
  Microscope, Users, Leaf, TrendingUp, TrendingDown,
  LogOut, RefreshCw, ChevronRight, Search,
  MapPin, Globe, Mail, PhoneCall, ArrowUpRight,
  ArrowDownRight, Minus, ShoppingBag, Wheat,
  Building2, Bell, BookOpen, Menu, X, IndianRupee,
  Tractor, ShieldCheck, MessageCircle, Sprout, Activity,
  Sun, Cloud, CloudRain, Droplets, Plus, Check, ArrowUp, ArrowDown, Lightbulb
} from "lucide-react";

const API = "http://localhost:5000";

// ── Mandi Price Data (static — replace with API later) ──
const mandiPrices = [
  { crop: "Wheat", hindi: "गेहूं", price: 2180, change: +45, unit: "₹/quintal", market: "Bhopal" },
  { crop: "Soybean", hindi: "सोयाबीन", price: 4350, change: -120, unit: "₹/quintal", market: "Indore" },
  { crop: "Rice", hindi: "चावल", price: 3200, change: +80, unit: "₹/quintal", market: "Raipur" },
  { crop: "Maize", hindi: "मक्का", price: 1950, change: +25, unit: "₹/quintal", market: "Jabalpur" },
  { crop: "Cotton", hindi: "कपास", price: 7200, change: -200, unit: "₹/quintal", market: "Nagpur" },
  { crop: "Mustard", hindi: "सरसों", price: 5100, change: +150, unit: "₹/quintal", market: "Jaipur" },
];

const features = [
  { icon: ShoppingCart, title: "Farmer Marketplace", desc: "Buy and sell crops directly. No middlemen, better prices for farmers and buyers alike.", color: "bg-green-50 text-green-700" },
  { icon: CloudSun, title: "Weather Advisory", desc: "Real-time weather updates and crop-specific advisories to protect your harvest.", color: "bg-sky-50 text-sky-700" },
  { icon: BarChart2, title: "Live Mandi Prices", desc: "Track daily mandi rates from 1000+ markets across India. Make smarter selling decisions.", color: "bg-amber-50 text-amber-700" },
  { icon: Handshake, title: "Expert Connect", desc: "Get guidance from agricultural experts and connect with fellow farmers nationwide.", color: "bg-emerald-50 text-emerald-700" },
];

const stats = [
  { value: "50K+", label: "Farmers Connected", icon: Users },
  { value: "120+", label: "Crop Varieties", icon: Leaf },
  { value: "28", label: "States Covered", icon: MapPin },
  { value: "₹2Cr+", label: "Trade Volume", icon: TrendingUp },
];

const testimonials = [
  { name: "Ramesh Patel", location: "Gujarat", text: "AgriConnect helped me sell my wheat directly to buyers at 30% better price than the mandi." },
  { name: "Sunita Devi", location: "Punjab", text: "The weather advisory saved my mustard crop last season. I got timely alerts and took action." },
  { name: "Mohan Singh", location: "Rajasthan", text: "The farm dashboard makes it so easy to track everything. I feel in control of my farm now." },
];

// ─────────────────────────────────────────
// MANDI PRICE WIDGET
// ─────────────────────────────────────────
const MandiWidget = () => {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(mandiPrices);

  const handleSearch = (e) => {
    const val = e.target.value.toLowerCase();
    setSearch(val);
    setFiltered(
      mandiPrices.filter(
        (m) =>
          m.crop.toLowerCase().includes(val) ||
          m.hindi.includes(val) ||
          m.market.toLowerCase().includes(val)
      )
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-white font-bold text-lg">Live Mandi Rates</h3>
            <p className="text-green-200 text-xs">Updated: Today, {new Date().toLocaleTimeString()}</p>
          </div>
          <div className="flex items-center gap-1.5 bg-green-600/50 px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 rounded-full bg-green-300 animate-pulse"></div>
            <span className="text-green-200 text-xs font-semibold">LIVE</span>
          </div>
        </div>
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-300" />
          <input
            value={search}
            onChange={handleSearch}
            placeholder="Search crop or mandi... (e.g. wheat, Bhopal)"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-green-300 text-sm focus:outline-none focus:bg-white/20 transition-all"
          />
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-4 px-4 py-2 bg-gray-50 border-b border-gray-100">
        <span className="text-xs font-bold text-gray-500 uppercase">Crop</span>
        <span className="text-xs font-bold text-gray-500 uppercase text-right">Price</span>
        <span className="text-xs font-bold text-gray-500 uppercase text-center">Change</span>
        <span className="text-xs font-bold text-gray-500 uppercase text-right">Market</span>
      </div>

      {/* Rows */}
      <div className="divide-y divide-gray-50">
        {filtered.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-sm">
            No results found for "{search}"
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.crop}
              className="grid grid-cols-4 px-4 py-3 hover:bg-gray-50 transition-colors items-center"
            >
              <div>
                <div className="font-semibold text-gray-800 text-sm">{item.crop}</div>
                <div className="text-gray-400 text-xs">{item.hindi}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900 text-sm">{item.price.toLocaleString()}</div>
                <div className="text-gray-400 text-xs">{item.unit}</div>
              </div>
              <div className="flex items-center justify-center gap-1">
                {item.change > 0 ? (
                  <div className="flex items-center gap-0.5 text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                    <ArrowUpRight className="w-3 h-3" />
                    <span className="text-xs font-bold">+{item.change}</span>
                  </div>
                ) : item.change < 0 ? (
                  <div className="flex items-center gap-0.5 text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                    <ArrowDownRight className="w-3 h-3" />
                    <span className="text-xs font-bold">{item.change}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-0.5 text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                    <Minus className="w-3 h-3" />
                    <span className="text-xs font-bold">0</span>
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="text-xs font-semibold text-gray-600 flex items-center justify-end gap-1">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  {item.market}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs text-gray-400">Source: Agmarknet India</span>
        <a
          href="https://agmarknet.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-green-600 hover:text-green-500 flex items-center gap-1"
        >
          View All <ChevronRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────
// LANDING PAGE NAVBAR
// ─────────────────────────────────────────
const LandingNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState("EN");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: lang === "EN" ? "Home" : "होम", path: "/" },
    { label: lang === "EN" ? "Mandi Prices" : "मंडी भाव", path: "#mandi" },
    { label: lang === "EN" ? "Weather" : "मौसम", path: "#weather" },
    { label: lang === "EN" ? "Advisory" : "सलाह", path: "#advisory" },
    { label: lang === "EN" ? "Marketplace" : "बाजार", path: "#marketplace" },
    { label: lang === "EN" ? "About Us" : "हमारे बारे में", path: "/about" },
    { label: lang === "EN" ? "Contact" : "संपर्क", path: "/contact" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
        ? "bg-white/95 backdrop-blur-md shadow-md"
        : "bg-white/90 backdrop-blur-sm shadow-sm"
      }`}>
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-9 h-9 rounded-lg bg-green-600 flex items-center justify-center shadow-md">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-bold text-lg text-gray-900 leading-none">
              Agri<span className="text-green-600">Connect</span>
            </span>
            <div className="text-xs text-gray-400 leading-none">by Geeks of Gurukul</div>
          </div>
        </Link>
{/* Desktop Nav */}
<div className="hidden lg:flex items-center gap-1">
  {navLinks.map(({ label, path }) => (
    path.startsWith("#") ? (
      <a
        key={label}
        href={path}
        className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:text-green-700 hover:bg-green-50 transition-all"
      >
        {label}
      </a>
    ) : (
      <Link
        key={label}
        to={path}
        className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:text-green-700 hover:bg-green-50 transition-all"
      >
        {label}
      </Link>
    )
  ))}
</div>

      {/* Right Side */}
      <div className="hidden lg:flex items-center gap-3">
        {/* Language Toggle */}
        <button
          onClick={() => setLang(lang === "EN" ? "HI" : "EN")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:border-green-400 hover:text-green-700 transition-all"
        >
          <Globe className="w-4 h-4" />
          {lang === "EN" ? "हिंदी" : "English"}
        </button>

        <Link
          to="/login"
          className="px-4 py-2 text-sm font-semibold text-green-700 border border-green-300 rounded-lg hover:bg-green-50 transition-all"
        >
          Login
        </Link>
        <Link
          to="/login"
          className="px-4 py-2 text-sm font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md transition-all"
        >
          Sign Up Free
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="lg:hidden text-gray-700"
      >
        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </div>

      {/* Mobile Menu */ }
  {
    menuOpen && (
      <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-2">
        {navLinks.map(({ label, path }) => (
          path.startsWith("#") ? (
            <a key={label} href={path} onClick={() => setMenuOpen(false)}
              className="block py-2 text-sm font-medium text-gray-600 hover:text-green-700">
              {label}
            </a>
          ) : (
            <Link key={label} to={path} onClick={() => setMenuOpen(false)}
              className="block py-2 text-sm font-medium text-gray-600 hover:text-green-700">
              {label}
            </Link>
          )
        ))}
        <div className="flex gap-3 pt-3">
          <Link to="/login" className="flex-1 text-center py-2.5 text-sm font-bold text-green-700 border border-green-300 rounded-lg">Login</Link>
          <Link to="/login" className="flex-1 text-center py-2.5 text-sm font-bold bg-green-600 text-white rounded-lg">Sign Up</Link>
        </div>
      </div>
    )
  }
    </nav >
  );
};

// ─────────────────────────────────────────
// PROFESSIONAL FOOTER
// ─────────────────────────────────────────
const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-10 mb-12">

          {/* Brand */}
          <div className="lg:w-1/4 space-y-5">
            <div className="flex items-center gap-3">
              <img
                src={gogLogo}
                alt="Geeks of Gurukul"
                className="w-12 h-12 rounded-xl object-contain bg-white p-1"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <div>
                <div className="text-white font-bold text-base leading-tight">Geeks of Gurukul</div>
                <div className="text-green-500 text-xs font-semibold">AgriConnect Platform</div>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Empowering farmers with smart agri tools, market insights, and trusted expert support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:w-3/4">
            <div>
              <h4 className="text-green-500 font-bold text-xs uppercase tracking-widest mb-5">
                Connect
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "Contact Us", path: "/contact" },
                  { label: "About Us", path: "/about" },
                  { label: "Marketplace", path: "/marketplace" },
                  { label: "AI Assistant", path: "/ai" },
                  { label: "Post Problem", path: "/post-problem" },
                ].map(({ label, path }) => (
                  <li key={label}>
                    <Link
                      to={path}
                      className="text-sm text-gray-500 hover:text-green-400 transition-colors flex items-center gap-1.5"
                    >
                      <ChevronRight className="w-3 h-3 text-gray-700 group-hover:text-green-500 transition-colors" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-green-500 font-bold text-xs uppercase tracking-widest mb-5">
                Resources
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "FAQ", href: "#" },
                  { label: "Privacy & Policy", href: "#" },
                  { label: "Terms & Conditions", href: "#" },
                  { label: "Mandi Rates", href: "https://agmarknet.gov.in" },
                  { label: "Weather Updates", href: "#weather" },
                  { label: "Crop Advisory", href: "#advisory" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-gray-500 hover:text-green-400 transition-colors flex items-center gap-1.5"
                    >
                      <ChevronRight className="w-3 h-3 text-gray-700 group-hover:text-green-500 transition-colors" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-green-500 font-bold text-xs uppercase tracking-widest mb-5">
                Get In Touch
              </h4>
              <div className="space-y-4">
                <a
                  href="tel:+919109976089"
                  className="flex items-center gap-3 text-sm text-gray-500 hover:text-green-400 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center">
                    <PhoneCall className="w-4 h-4 text-gray-400" />
                  </div>
                  +91 9109976089
                </a>
                <a
                  href="mailto:admin@geeksofgurukul.com"
                  className="flex items-center gap-3 text-sm text-gray-500 hover:text-green-400 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-gray-400" />
                  </div>
                  admin@geeksofgurukul.com
                </a>
                <div className="flex items-start gap-3 text-sm text-gray-500">
                  <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center mt-0.5">
                    <MapPin className="w-4 h-4 text-gray-400" />
                  </div>
                  Bhopal, Madhya Pradesh, India
                </div>
              </div>
              <div className="mt-6">
                <p className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wider">
                  Stay Updated
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 px-3 py-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-300 text-sm placeholder-gray-600 focus:outline-none focus:border-green-500 transition-all"
                  />
                  <button className="px-3 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-all">
                    <Bell className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 mt-10 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Geeks of Gurukul — All Rights Reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span>AgriConnect — Built with care by Aayushi Gaur</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ─────────────────────────────────────────
// FARMER DASHBOARD
// ─────────────────────────────────────────
// ─────────────────────────────────────────
// FARMER DASHBOARD
// ─────────────────────────────────────────
const FarmerDashboard = ({ user }) => {
  const navigate = useNavigate();
  const [myProblems, setMyProblems] = useState([]);
  const [allPosts,   setAllPosts]   = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [tasks, setTasks] = useState([
    { id: 1, label: "Check soil moisture (South Plot)",     done: true  },
    { id: 2, label: "Verify PM-KISAN installment status",   done: true  },
    { id: 3, label: "Apply bio-fertilizer to Tomato crop",  done: false },
    { id: 4, label: "Schedule drone survey for Rice field", done: false },
    { id: 5, label: "Inspect irrigation pipes",             done: false },
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${API}/problems`);
      setMyProblems(data.filter((p) => p.farmerId === user?.id || p.farmerId === user?._id));
      setAllPosts(data);
    } catch {
      setMyProblems([]);
      setAllPosts([]);
    }
    setLoading(false);
  };

  const toggleTask = (id) => {
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, done: !t.done } : t));
  };

  const timeAgoShort = (iso) => {
    const diff = Math.floor((Date.now() - new Date(iso)) / 1000);
    if (diff < 60)    return `${diff}s ago`;
    if (diff < 3600)  return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hour ago`;
    return `${Math.floor(diff / 86400)} day ago`;
  };

  // ── Stats ──
  const activeCount   = myProblems.filter((p) => p.status === "open").length;
  const resolvedCount = myProblems.filter((p) => p.status === "resolved").length;
  const totalReplies  = myProblems.reduce((a, p) => a + (p.replies?.length || 0), 0);
  const resolvedRate  = myProblems.length ? Math.round((resolvedCount / myProblems.length) * 100) : 89;

  // ── Today's date ──
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric"
  });

  // ── 5-day forecast ──
  const forecast = [
    { day: "Mon", icon: CloudRain, high: 24, low: 20 },
    { day: "Tue", icon: Cloud,     high: 26, low: 21 },
    { day: "Wed", icon: Sun,       high: 30, low: 23 },
    { day: "Thu", icon: CloudSun,  high: 28, low: 22 },
    { day: "Fri", icon: Sun,       high: 31, low: 24 },
  ];

  const cropHealth = [
    { name: "Potato", icon: Sprout, status: "HEALTHY", color: "bg-green-100 text-green-600" },
    { name: "Tomato", icon: Sprout, status: "ALERT",   color: "bg-red-100 text-red-500" },
    { name: "Wheat",  icon: Wheat,  status: "HEALTHY", color: "bg-green-100 text-green-600" },
    { name: "Rice",   icon: Leaf,   status: "HEALTHY", color: "bg-green-100 text-green-600" },
  ];

  const mandiPricesLive = [
    { crop: "Potato", price: "₹1,850", market: "Local Market",  time: "1h ago",   change: "+2.4%", trend: "up"   },
    { crop: "Tomato", price: "₹2,400", market: "Central Mandi", time: "30m ago",  change: "-1.8%", trend: "down" },
    { crop: "Wheat",  price: "₹2,125", market: "Global Hub",    time: "2h ago",   change: "+0.5%", trend: "up"   },
  ];

  const completedTasks = tasks.filter((t) => t.done).length;

  return (
    <>
      <div className="min-h-screen bg-[#f0f4f8] pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">

          {/* ── HERO HEADER ── */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-emerald-800 p-8 mb-6 shadow-xl">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10">
              <Leaf className="absolute right-10 top-10 w-32 h-32 text-white" strokeWidth={1} />
              <Sprout className="absolute right-32 top-20 w-20 h-20 text-white" strokeWidth={1} />
              <Leaf className="absolute right-20 bottom-10 w-24 h-24 text-white rotate-45" strokeWidth={1} />
            </div>

            <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div className="text-white">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={14} className="text-green-200" />
                  <span className="text-sm text-green-100">{user?.location || "Kerala, India"}</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-2">
                  Welcome back, {user?.name || "Farmer"}
                </h1>
                <p className="text-green-100 text-sm md:text-base">
                  Your farm health is optimized for today's forecast.
                </p>
              </div>

              <div className="bg-white/15 backdrop-blur rounded-2xl px-6 py-4 border border-white/20 self-start md:self-auto">
                <p className="text-[10px] uppercase font-bold tracking-widest text-green-200">
                  Today's Date
                </p>
                <p className="text-lg font-bold text-white mt-1">{formattedDate}</p>
              </div>
            </div>
          </div>

          {/* ── STATS CARDS ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Active Problems */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </div>
                <span className="text-xs font-bold text-red-500 flex items-center gap-0.5">
                  +12% <TrendingUp size={11} />
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                {loading ? "..." : (activeCount || 24)}
              </h2>
              <p className="text-sm text-gray-500 mt-1">Active Problems</p>
            </div>

            {/* Expert Responses */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                  +5 <ArrowUp size={11} />
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                {loading ? "..." : (totalReplies || 156)}
              </h2>
              <p className="text-sm text-gray-500 mt-1">Expert Responses</p>
            </div>

            {/* Resolved Cases */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-xs font-semibold text-gray-500">{resolvedRate}% rate</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                {loading ? "..." : (resolvedCount || "1,240")}
              </h2>
              <p className="text-sm text-gray-500 mt-1">Resolved Cases</p>
            </div>

            {/* Total Posts */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-xs font-semibold text-gray-500">Global Reach</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                {loading ? "..." : (myProblems.length || "3.2k")}
              </h2>
              <p className="text-sm text-gray-500 mt-1">Total Posts</p>
            </div>
          </div>

          {/* ── MAIN GRID ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* LEFT COLUMN */}
            <div className="lg:col-span-2 space-y-6">

              {/* WEATHER CARD */}
              <div className="rounded-3xl bg-gradient-to-br from-green-900 to-emerald-900 p-6 text-white shadow-lg">
                <div className="flex items-start justify-between gap-6 flex-wrap">
                  <div className="flex-1 min-w-[200px]">
                    <div className="flex items-center gap-4 mb-4">
                      <Sun className="w-12 h-12 text-yellow-300" />
                      <div>
                        <h2 className="text-5xl font-bold">29°C</h2>
                        <p className="text-sm text-green-100 mt-1">
                          Partly Cloudy · Kerala Coastal
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                      <div>
                        <p className="text-[10px] uppercase font-semibold text-green-200 mb-1">Humidity</p>
                        <p className="text-lg font-bold">78%</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-semibold text-green-200 mb-1">Wind</p>
                        <p className="text-lg font-bold">12 km/h</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-semibold text-green-200 mb-1">Disease Risk</p>
                        <p className="text-lg font-bold">LOW</p>
                      </div>
                    </div>
                  </div>

                  {/* 5-DAY FORECAST */}
                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur w-56 flex-shrink-0">
                    <p className="text-[10px] uppercase font-bold text-green-200 mb-3 tracking-wide">
                      5-Day Forecast
                    </p>
                    <div className="space-y-2">
                      {forecast.map((f) => {
                        const Icon = f.icon;
                        return (
                          <div key={f.day} className="flex items-center justify-between text-sm">
                            <span className="text-green-100 w-10">{f.day}</span>
                            <Icon className="w-4 h-4 text-green-200" />
                            <span className="font-semibold">{f.high}° / {f.low}°</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* RECENT COMMUNITY ACTIVITY */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Recent Community Activity</h2>
                  <Link
                    to="/posts"
                    className="text-sm font-semibold text-green-700 hover:text-green-800 flex items-center gap-1"
                  >
                    View All <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="space-y-3">
                  {loading ? (
                    <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm">
                      <RefreshCw className="w-6 h-6 text-gray-300 animate-spin mx-auto mb-2" />
                      <p className="text-sm text-gray-400">Loading...</p>
                    </div>
                  ) : allPosts.length > 0 ? (
                    allPosts.slice(0, 2).map((post) => {
                      const photo = Array.isArray(post.photo) ? post.photo[0] : post.photo;
                      return (
                        <div key={post._id || post.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition">
                          <div className="flex gap-4">
                            <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center">
                              {photo ? (
                                <img src={photo} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <Sprout className="w-6 h-6 text-green-700" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h3 className="font-bold text-gray-900 text-sm leading-tight">{post.title}</h3>
                                <span className="text-xs text-gray-400 flex-shrink-0 px-2 py-0.5 rounded-full bg-gray-100">
                                  {post.postedAt ? timeAgoShort(post.postedAt) : "Just now"}
                                </span>
                              </div>
                              <p className="text-xs text-gray-600 leading-relaxed line-clamp-1 mb-2">{post.description}</p>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <MessageCircle size={11} /> {post.replies?.length || 0} Replies
                                </span>
                                <span className="flex items-center gap-1">
                                  👍 {post.upvotes || 0} Likes
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                      <div className="flex gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center">
                          <Sprout className="w-6 h-6 text-green-700" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-sm">Potential blight on Tomato stems?</h3>
                          <p className="text-xs text-gray-600 line-clamp-1 mt-1">
                            I noticed these dark spots on the stems after last night's heavy rain. Any organic solutions?
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                            <span className="flex items-center gap-1"><MessageCircle size={11} /> 12 Replies</span>
                            <span>👍 45 Likes</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* CROP HEALTH OVERVIEW */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Crop Health Overview</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {cropHealth.map(({ name, icon: Icon, status, color }) => (
                    <div key={name} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition text-center">
                      <div className={`w-14 h-14 rounded-full ${color} flex items-center justify-center mx-auto mb-3`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-base">{name}</h3>
                      <p className={`text-[10px] font-bold tracking-widest mt-1 ${
                        status === "ALERT" ? "text-red-500" : "text-green-600"
                      }`}>
                        {status}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-5">

              {/* QUICK STATUS */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-3">
                  Quick Status
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                    <ShieldCheck size={12} /> Good Health
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                    <Droplets size={12} /> Auto-Irrigation ON
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                    <TrendingUp size={12} /> Prices Rising
                  </span>
                </div>
              </div>

              {/* POST BUTTON */}
              <button
  onClick={() => navigate("/posts")}
  className="w-full py-4 rounded-2xl bg-gradient-to-br from-green-900 to-emerald-900 hover:from-green-800 hover:to-emerald-800 text-white font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition"
>
  <Plus size={20} /> Post
</button>

              {/* ASK AI ADVISOR */}
              <button
                onClick={() => navigate("/ai")}
                className="w-full py-3.5 rounded-2xl bg-white border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 text-gray-800 font-semibold flex items-center justify-center gap-2 transition shadow-sm"
              >
                <Bot size={18} /> Ask AI Advisor
              </button>

              {/* MARKET PRICES & CONTACT EXPERT */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => navigate("/")}
                  className="py-4 rounded-2xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-semibold flex flex-col items-center justify-center gap-1.5 transition"
                >
                  <ShoppingBag size={20} />
                  <span className="text-sm">Market Prices</span>
                </button>
                <button
                  onClick={() => navigate("/contact")}
                  className="py-4 rounded-2xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-semibold flex flex-col items-center justify-center gap-1.5 transition"
                >
                  <Phone size={20} />
                  <span className="text-sm">Contact Expert</span>
                </button>
              </div>

              {/* MANDI LIVE PRICES */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-4">
                  Mandi Live Prices (Per Qtl)
                </p>
                <div className="space-y-4">
                  {mandiPricesLive.map((m) => (
                    <div key={m.crop} className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-gray-900">{m.crop}</p>
                        <p className="text-xs text-gray-500">{m.market} · {m.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{m.price}</p>
                        <p className={`text-xs font-bold flex items-center justify-end gap-0.5 ${
                          m.trend === "up" ? "text-green-600" : "text-red-500"
                        }`}>
                          {m.trend === "up" ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
                          {m.change}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FIELD TASKS */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500">
                    Field Tasks
                  </p>
                  <span className="text-xs font-bold text-gray-400">
                    {completedTasks}/{tasks.length} Done
                  </span>
                </div>
                <div className="space-y-2.5">
                  {tasks.map((task) => (
                    <button
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition text-left"
                    >
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition ${
                        task.done
                          ? "bg-green-700 border-green-700"
                          : "border-gray-300 hover:border-green-500"
                      }`}>
                        {task.done && <Check size={14} className="text-white" strokeWidth={3} />}
                      </div>
                      <span className={`text-sm transition ${
                        task.done ? "text-gray-400 line-through" : "text-gray-700"
                      }`}>
                        {task.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* LOGOUT (kept from your old code) */}
              <button
                onClick={() => {
                  localStorage.removeItem("agriUser");
                  navigate("/login");
                }}
                className="w-full py-3 rounded-2xl bg-white border-2 border-red-200 hover:bg-red-50 text-red-600 font-semibold flex items-center justify-center gap-2 transition"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

// ─────────────────────────────────────────
// AGRONOMIST DASHBOARD
// ─────────────────────────────────────────
const AgronomistDashboard = ({ user }) => {
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${API}/problems`);
        setProblems(data.reverse());
      } catch { setProblems([]); }
      setLoading(false);
    };
    fetchData();
  }, []);

  const logout = () => { localStorage.removeItem("agriUser"); navigate("/login"); };

  const timeAgo = (iso) => {
    const diff = Math.floor((Date.now() - new Date(iso)) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const quickActions = [
    { icon: Microscope, title: "Expert View", desc: "See & reply to problems", path: "/expert", color: "bg-blue-50 text-blue-600" },
    { icon: Bot, title: "AI Chat", desc: "Ask farming questions", path: "/ai", color: "bg-purple-50 text-purple-600" },
    { icon: Phone, title: "Contact", desc: "Reach support team", path: "/contact", color: "bg-green-50 text-green-600" },
    { icon: Users, title: "My Profile", desc: "View your profile", path: "/profile", color: "bg-amber-50 text-amber-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="rounded-2xl shadow-sm p-8 mb-8 text-white" style={{ background: "linear-gradient(135deg, #14532d, #1e3a5f)" }}>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-white/15 flex items-center justify-center">
                <Microscope className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-2xl">Welcome, {user.name}!</h1>
                <p className="text-white/60 text-sm">Expert Agronomist Dashboard</p>
              </div>
            </div>
            <button onClick={logout} className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-red-500 text-white font-semibold rounded-xl transition-all border border-white/20">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: loading ? "..." : problems.length, label: "Total Problems", color: "bg-white/15" },
              { value: loading ? "..." : problems.filter(p => p.status === "open").length, label: "Open Cases", color: "bg-orange-500/40" },
              { value: loading ? "..." : problems.filter(p => p.status === "resolved").length, label: "Resolved", color: "bg-green-500/40" },
              { value: loading ? "..." : problems.filter(p => p.urgency === "critical" && p.status === "open").length, label: "Critical", color: "bg-red-500/40" },
            ].map(({ value, label, color }) => (
              <div key={label} className={`text-center p-4 rounded-xl ${color}`}>
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="text-white/70 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Quick Actions</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickActions.map(({ icon: Icon, title, desc, path, color }) => (
            <Link key={title} to={path} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all p-5 block">
              <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1 text-sm">{title}</h3>
              <p className="text-gray-400 text-xs">{desc}</p>
            </Link>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-xl text-gray-900">Recent Farmer Problems</h2>
            <Link to="/expert" className="flex items-center gap-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-all">
              View All & Reply <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          {loading ? (
            <div className="text-center py-10">
              <RefreshCw className="w-8 h-8 text-gray-300 animate-spin mx-auto mb-3" />
            </div>
          ) : problems.length === 0 ? (
            <div className="text-center py-12">
              <Leaf className="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-500">No problems posted yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {problems.slice(0, 6).map((problem) => (
                <div key={problem.id} className={`flex items-start gap-4 p-4 rounded-xl border transition-all hover:shadow-sm ${problem.urgency === "critical" && problem.status === "open"
                    ? "border-red-100 bg-red-50/30"
                    : "border-gray-100 hover:bg-gray-50"
                  }`}>
                  {problem.photo ? (
                    <img src={problem.photo} alt="problem" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <h3 className="font-semibold text-gray-800 text-sm">{problem.title}</h3>
                      <div className="flex gap-1.5">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${problem.urgency === "critical" ? "bg-red-100 text-red-700" :
                            problem.urgency === "high" ? "bg-orange-100 text-orange-700" :
                              problem.urgency === "medium" ? "bg-yellow-100 text-yellow-700" :
                                "bg-green-100 text-green-700"
                          }`}>{problem.urgency}</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${problem.status === "open"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-green-100 text-green-700"
                          }`}>{problem.status === "open" ? "Open" : "Resolved"}</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-0.5">{problem.farmerName}{problem.location && ` • ${problem.location}`}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                      <span>{timeAgo(problem.postedAt)}</span>
                      <span>{problem.replies?.length || 0} replies</span>
                      {problem.replies?.length === 0 && problem.status === "open" && (
                        <span className="text-orange-500 font-semibold ml-auto">Needs Reply</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
const advisoryImages = [
  "/images/farm-rain-1.png",
  "/images/farm-rain-2.png",
  "/images/farm-sun.png",
];
// ─────────────────────────────────────────
// DEFAULT HOME (Landing Page)
// ─────────────────────────────────────────
const DefaultHome = () => {
  const [currentVideo, setCurrentVideo] = useState(0);

  const videos = [
    '/videos/123091-726838254.mp4',
    '/videos/203923-922675870.mp4'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 3500); // Change every 3.5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white">

      {/* Landing Navbar removed to avoid duplicate top nav bar */}

      {/* ── HERO ── */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16">

        {/* Video — no overlay */}
        <video
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={farmVideo}
        />

        {/* Minimal dark gradient — just for text readability */}
        <div className="absolute inset-0 z-10" style={{
          background: "linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)"
        }} />

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-400/30 text-green-300 text-xs font-semibold tracking-widest uppercase mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
              India's #1 Farming Platform
            </div>
            <h1 className="font-bold text-5xl md:text-6xl text-white leading-tight mb-6">
              Connect Farmers,<br />
              Buyers &<br />
              <span className="text-green-400">Experts</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl">
              Real-time mandi prices, weather alerts, expert agronomist advice,
              and direct marketplace — all built for Indian farmers.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/login"
                className="flex items-center gap-2 px-6 py-3.5 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl shadow-lg transition-all hover:-translate-y-0.5"
              >
                <BarChart2 className="w-5 h-5" /> Check Mandi Prices
              </Link>
              <Link
                to="/login"
                className="flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur text-white font-semibold rounded-xl border border-white/20 transition-all hover:-translate-y-0.5"
              >
                <Users className="w-5 h-5" /> Join as Farmer / Buyer
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-6 mt-10">
              {stats.map(({ value, label, icon: Icon }) => (
                <div key={label} className="text-center">
                  <div className="text-white font-bold text-xl">{value}</div>
                  <div className="text-gray-400 text-xs">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MANDI PRICES ── */}
    <section id="mandi" className="py-20 bg-gray-50">
  <div className="max-w-6xl mx-auto px-6">
    <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
      
      <div>
        <div className="flex items-center gap-2 mb-2">
          <BarChart2 className="w-5 h-5 text-green-600" />
          <span className="text-green-600 text-sm font-bold uppercase tracking-wider">
            Live Market Data
          </span>
        </div>
        <h2 className="font-bold text-3xl md:text-4xl text-gray-900">
          Today's Mandi Prices
        </h2>
        <p className="text-gray-500 mt-2">
          Real-time commodity rates from major mandis across India
        </p>
      </div>

      {/* FIXED LINK */}
      <a
        href="https://agmarknet.gov.in"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2.5 border border-green-200 text-green-700 rounded-lg text-sm font-semibold hover:bg-green-50 transition-all"
      >
        <Building2 className="w-4 h-4" />
        View on Agmarknet
      </a>

    </div>

    <MandiWidget />
  </div>
</section>

  
  {/* ── WEATHER ── */}
<section className="relative py-24 overflow-hidden">
  {/* Background Image Slider */}
  <div className="absolute inset-0">
    {advisoryImages.map((img, index) => (
      <img
        key={index}
        src={img}
        alt="Weather advisory"
        className="absolute inset-0 w-full h-full object-cover opacity-0 animate-weatherSlide"
        style={{ animationDelay: `${index * 5}s` }}
      />
    ))}
    <div className="absolute inset-0 bg-white/5"></div>
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-6">
    <div className="text-center mb-10">
      <h2 className="text-4xl md:text-5xl font-bold text-earth-900">
        Weather & Crop Advisory
      </h2>
      <p className="text-earth-600 mt-4 max-w-2xl mx-auto">
        Field-ready weather intelligence and agronomy tips tailored for your crop cycle.
        Stay ahead of storms, heat, and irrigation windows with trusted guidance.
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Left Content */}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
            <p className="text-xs font-bold tracking-[0.3em] text-green-700 uppercase">
              Crop Risk
            </p>
            <h3 className="text-xl font-bold text-green-800 mt-3">Low</h3>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
            <p className="text-xs font-bold tracking-[0.3em] text-amber-700 uppercase">
              Harvest Window
            </p>
            <h3 className="text-xl font-bold text-amber-800 mt-3">3-4 days</h3>
          </div>

          <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5">
            <p className="text-xs font-bold tracking-[0.3em] text-sky-700 uppercase">
              Irrigation Tip
            </p>
            <h3 className="text-xl font-bold text-sky-800 mt-3">Morning</h3>
          </div>
        </div>

        <div className="bg-white/90 rounded-3xl border border-earth-100 shadow-lg p-6">
          <h3 className="font-bold text-earth-900 mb-5">
            What this means for your farm
          </h3>

          <div className="space-y-4">
            <div className="flex gap-3">
              <span className="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-bold">
                1
              </span>
              <p className="text-earth-600 text-sm">
                Monitor soil moisture before applying fertilizers.
              </p>
            </div>

            <div className="flex gap-3">
              <span className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-bold">
                2
              </span>
              <p className="text-earth-600 text-sm">
                Avoid spraying pesticides during high humidity or rain.
              </p>
            </div>

            <div className="flex gap-3">
              <span className="w-7 h-7 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-sm font-bold">
                3
              </span>
              <p className="text-earth-600 text-sm">
                Schedule harvesting when temperature is cool and dry.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Weather Widget */}
      <div className="bg-white/95 rounded-3xl shadow-2xl border border-earth-100 overflow-hidden">
        <div className="bg-[#082f2d] p-7 text-white">
          <div className="flex justify-between items-center">
            <p className="text-xs font-bold tracking-[0.35em] uppercase text-green-300">
              Current Local Snapshot
            </p>
            <span className="bg-white/15 px-3 py-1 rounded-full text-xs font-bold">
              Live
            </span>
          </div>

          <h3 className="text-3xl font-bold mt-4">
            Crop-ready weather
          </h3>

          <p className="text-green-100 text-sm mt-4 leading-relaxed">
            This widget updates automatically with your local weather and advises
            you on next steps for irrigation, spraying, and harvest planning.
          </p>
        </div>

        <div className="p-6">
          <WeatherWidget />
        </div>
      </div>
    </div>
  </div>
</section>

  {/* ── FEATURES ── */ }
  < section id = "advisory" className = "py-20 bg-gray-50" >
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-14">
        <span className="text-green-600 text-sm font-bold uppercase tracking-wider">What We Offer</span>
        <h2 className="font-bold text-3xl md:text-4xl text-gray-900 mt-2">Everything a Farmer Needs</h2>
        <p className="text-gray-500 mt-3 max-w-xl mx-auto">From mandi prices to expert advice — we cover every aspect of modern farming</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map(({ icon: Icon, title, desc, color }) => (
          <div key={title} className="flex gap-5 p-7 rounded-2xl border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all bg-white group">
            <div className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
      </section >

  {/* ── HOW IT WORKS ── */ }
  < section className = "py-20 bg-white" >
    <div className="max-w-5xl mx-auto px-6">
      <div className="text-center mb-14">
        <span className="text-green-600 text-sm font-bold uppercase tracking-wider">Simple Steps</span>
        <h2 className="font-bold text-3xl md:text-4xl text-gray-900 mt-2">How AgriConnect Works</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { step: "01", icon: Users, title: "Register", desc: "Sign up as a farmer, buyer, or agronomist in minutes." },
          { step: "02", icon: BookOpen, title: "List or Browse", desc: "Post your crops or browse the marketplace for fresh produce." },
          { step: "03", icon: TrendingUp, title: "Connect & Trade", desc: "Connect directly with buyers and get paid fairly." },
        ].map(({ step, icon: Icon, title, desc }) => (
          <div key={step} className="relative text-center p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-all">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-green-600 text-white text-xs font-bold flex items-center justify-center">
              {step}
            </div>
            <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center mx-auto mb-4 mt-2">
              <Icon className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* ── OUR WORKFLOW ── */}
      {/* ── OUR WORKFLOW ── */}
<div className="mt-16 relative -mx-6 px-6 py-16 rounded-3xl overflow-hidden">
  {/* Animated gradient background */}
  <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"></div>
  
  {/* Decorative pattern overlay */}
  <div 
    className="absolute inset-0 opacity-40"
    style={{
      backgroundImage: `radial-gradient(circle at 1px 1px, rgba(34, 197, 94, 0.15) 1px, transparent 0)`,
      backgroundSize: '24px 24px'
    }}
  ></div>

  {/* Decorative floating circles */}
  <div className="absolute top-10 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
  <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
  <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>

  {/* Decorative leaf icons in background */}
  <div className="absolute top-8 right-1/4 opacity-10">
    <Leaf className="w-32 h-32 text-green-700 rotate-45" />
  </div>
  <div className="absolute bottom-8 left-1/4 opacity-10">
    <Leaf className="w-24 h-24 text-emerald-700 -rotate-12" />
  </div>

  {/* Content */}
  <div className="relative z-10">
    <div className="text-center mb-12">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-green-200 text-green-700 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
        How We Work
      </div>
      <h3 className="font-bold text-3xl md:text-4xl text-gray-900 mb-4">
        Our <span className="text-green-600">Workflow</span>
      </h3>
      <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
        Discover how AgriConnect connects farmers, agronomists, and buyers in a seamless ecosystem for better farming and trading.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      {/* Farmers Card */}
      <div className="group relative text-center p-8 rounded-2xl bg-white/80 backdrop-blur-md border border-green-100 hover:border-green-300 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md">
          Step 01
        </div>
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-5 mt-2 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
          <Users className="w-10 h-10 text-white" />
        </div>
        <h4 className="font-bold text-xl text-gray-900 mb-3">For Farmers</h4>
        <p className="text-gray-600 text-sm leading-relaxed">
          Login to your account, post farming problems with photos, and get expert solutions from certified agronomists.
        </p>
        <div className="mt-5 inline-flex items-center gap-1.5 text-green-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
          Learn more <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* Agronomists Card */}
      <div className="group relative text-center p-8 rounded-2xl bg-white/80 backdrop-blur-md border border-blue-100 hover:border-blue-300 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md">
          Step 02
        </div>
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mx-auto mb-5 mt-2 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
          <Microscope className="w-10 h-10 text-white" />
        </div>
        <h4 className="font-bold text-xl text-gray-900 mb-3">For Agronomists</h4>
        <p className="text-gray-600 text-sm leading-relaxed">
          Review farmer problems, provide tailored solutions, and help optimize crop yields with your expertise.
        </p>
        <div className="mt-5 inline-flex items-center gap-1.5 text-blue-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
          Learn more <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* Buyers Card */}
      <div className="group relative text-center p-8 rounded-2xl bg-white/80 backdrop-blur-md border border-amber-100 hover:border-amber-300 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md">
          Step 03
        </div>
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mx-auto mb-5 mt-2 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
          <ShoppingBag className="w-10 h-10 text-white" />
        </div>
        <h4 className="font-bold text-xl text-gray-900 mb-3">For Buyers</h4>
        <p className="text-gray-600 text-sm leading-relaxed">
          Browse and review fresh produce from verified farmers, ensure quality, and make informed purchases.
        </p>
        <div className="mt-5 inline-flex items-center gap-1.5 text-amber-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
          Learn more <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  </section>

  < section className = "py-20 bg-gray-50" >
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-14">
        <span className="text-green-600 text-sm font-bold uppercase tracking-wider">Farmer Stories</span>
        <h2 className="font-bold text-3xl md:text-4xl text-gray-900 mt-2">Real Voices, Real Results</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map(({ name, location, text }) => (
          <div key={name} className="p-7 rounded-2xl bg-white border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-4 h-4 rounded-sm bg-green-500 opacity-80"></div>
              ))}
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">"{text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="font-bold text-gray-900 text-sm">{name}</div>
                <div className="text-green-600 text-xs font-semibold flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {location}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
      </section >

  {/* ── CTA with VIDEO ── */ }
  < section id = "marketplace" className = "py-28 relative overflow-hidden" >
        <video autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={farmVideo}
        />
        <div className="absolute inset-0 z-10 bg-green-900/80" />
        <div className="relative z-20 max-w-3xl mx-auto text-center px-6">
          <Leaf className="w-12 h-12 text-green-400 mx-auto mb-6" />
          <h2 className="font-bold text-4xl md:text-5xl text-white mb-5">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-green-200 text-lg mb-10 max-w-xl mx-auto">
            Join 50,000+ farmers already growing smarter with AgriConnect.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/login" className="flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-bold text-lg rounded-xl shadow-xl transition-all hover:-translate-y-1">
              <ShoppingBag className="w-5 h-5" /> Start for Free
            </Link>
            <Link to="/about" className="flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur text-white font-bold text-lg rounded-xl border border-white/20 transition-all hover:-translate-y-1">
              <BookOpen className="w-5 h-5" /> Learn More
            </Link>
          </div>
        </div>
      </section >

  {/* Footer */ }
  < Footer />
    </div >
  );
};


// ─────────────────────────────────────────
// MAIN HOME
// ─────────────────────────────────────────
const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("agriUser");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  if (user && user.role === "farmer") return <FarmerDashboard user={user} />;
  if (user && user.role === "agronomist") return <AgronomistDashboard user={user} />;
  return <DefaultHome />;
};

export default Home;