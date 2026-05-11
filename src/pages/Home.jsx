import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import WeatherWidget from "../components/WeatherWidget";
import axios from "axios";
import farmVideo from "../assets/farm-video.mp4";
import gogLogo from "../assets/gog-logo.png";
 import heroFarmerImg from "../assets/home/hero-farmer.jpg";
import farmerImg from "../assets/home/farmer.jpg";
import agronomistImg from "../assets/home/agronomist.jpg";
import buyerImg from "../assets/home/buyer.jpg";
import { marketplaceCrops } from "../data/marketplaceCrops";

// import wheatImg from "../assets/home/wheat.jpg";
// import riceImg from "../assets/home/rice.jpg";
// import tomatoImg from "../assets/home/tomato.jpg";

import arTrainingImg from "../assets/home/ar-training.jpg";
import aiDiagnoseImg from "../assets/home/ai-diagnostic.jpg";
// import satelliteImg from "../assets/home/satellite.jpg";
import droneImg from "../assets/home/drone.jpg";

import phoneMockImg from "../assets/home/phone-mockup.jpg";


import farmRain1 from "../assets/home/farm-rain-1.mp4";
import farmRain2 from "../assets/home/farm-rain-2.mp4";
import farmRain3 from "../assets/home/farm-rain-3.mp4";
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
import { mandiPrices } from "../data/mandiPrices";

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
  const [filtered, setFiltered] = useState(mandiPrices.slice(0, 8));

 const handleSearch = (e) => {
  const val = e.target.value.toLowerCase();
  setSearch(val);

  if (!val.trim()) {
    setFiltered(mandiPrices.slice(0, 8));
    return;
  }

  setFiltered(
    mandiPrices.filter(
      (m) =>
        m.crop.toLowerCase().includes(val) ||
        m.hindi.includes(val) ||
        m.market.toLowerCase().includes(val) ||
        m.state.toLowerCase().includes(val)
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
        <Link
  to="/mandi-prices"
  className="text-xs font-semibold text-green-600 hover:text-green-500 flex items-center gap-1"
>
  View More <ChevronRight className="w-3 h-3" />
</Link>
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
   <nav className={`fixed top-0 w-full z-30 transition-all duration-300 ${scrolled
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
const advisoryVideos = [
  farmRain1,
  farmRain2,
  farmRain3,
];
// ─────────────────────────────────────────
// DEFAULT HOME (Landing Page)
// ─────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════
// REPLACE your existing DefaultHome component (lines ~1066–1514) with
// this ENTIRE block.
//
// KEEP THESE UNTOUCHED ELSEWHERE IN Home.jsx:
//   • imports (lucide-react, axios, farmVideo, WeatherWidget...)
//   • MandiWidget, Footer, FarmerDashboard, AgronomistDashboard
//   • stats, testimonials, mandiPrices, advisoryImages
//   • the final `const Home = () => { ... }` switcher
// ═══════════════════════════════════════════════════════════════════


// ─── Images (Unsplash hot-link — works immediately, no API key) ───
// To use LOCAL images instead:
//   1. Put your images in:  src/assets/home/
//   2. Add at the top of Home.jsx (with other imports):
//        import heroFarmer    from "../assets/home/hero-farmer.png";
       
//        import buyerImg      from "../assets/home/buyer.jpg";
//        import mpWheat       from "../assets/home/wheat.jpg";
//        import mpRice        from "../assets/home/rice.jpg";
//        import mpTomato      from "../assets/home/tomato.jpg";
//        import techAR        from "../assets/home/ar-training.jpg";
//        import techAI        from "../assets/home/ai-diagnostic.jpg";
      //  import techSat       from "../assets/home/satellite.jpg";
//        import techBot       from "../assets/home/krishi-bot.png";
       import techDrone     from "../assets/home/drone.jpg";
//        import phoneMock     from "../assets/home/phone-mockup.png";
//        import ctaFarmer     from "../assets/home/farmer-cta.png";
//   3. Replace each IMG.xxx below with the imported variable.

const IMG = {
   heroFarmer: heroFarmerImg,
  farmer: farmerImg,
  agronomist: agronomistImg,
  buyer: buyerImg,
  wheat:       "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&auto=format&fit=crop",
  rice:        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop",
  tomato:      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop",
 
  arTraining: arTrainingImg,
  aiDiagnose:  "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop",
  satellite:   "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&auto=format&fit=crop",
  // drone:       "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&auto=format&fit=crop",
  drone: droneImg,

  phoneMock: phoneMockImg,
  ctaFarmer:   "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=700&auto=format&fit=crop",
};
const weatherSlides = [
  {
    title: "Rainy Weather",
    image:
      "https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=1600&auto=format&fit=crop",
  },
  {
    title: "Sunny Farm",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&auto=format&fit=crop",
  },
  {
    title: "Cloudy Field",
    image:
      "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=1600&auto=format&fit=crop",
  },
];

// ─── Data ───
const roleCardsKr = [
  {
    title: "For Farmers",
    image: IMG.farmer,
    color: "from-green-600 to-emerald-700",
    bullets: ["Direct Selling", "Pest Diagnosis", "Expert Assistance"],
    path: "/login",
    popupTitle: "How AgriConnect Helps Farmers",
    popupDesc:
      "Farmers can use AgriConnect to sell crops directly, check mandi prices, post crop problems, get expert advice, and receive weather-based farming guidance.",
    popupPoints: [
      "Post crop disease or pest problems with images",
      "Connect directly with agronomists for solutions",
      "Check daily mandi prices before selling crops",
      "Sell produce directly to buyers without middlemen",
      "Get weather alerts and smart farming suggestions",
    ],
    buttonText: "Join as Farmer",
  },
  {
    title: "For Agronomists",
    image: IMG.agronomist,
    color: "from-amber-600 to-orange-700",
    bullets: ["Case Management", "Analytics Dashboard", "Reputation Badges"],
    path: "/login",
    popupTitle: "How AgriConnect Helps Agronomists",
    popupDesc:
      "Agronomists can guide farmers, solve crop-related problems, manage cases, build trust, and provide expert farming recommendations through the platform.",
    popupPoints: [
      "View farmer crop problems in one dashboard",
      "Reply with expert solutions and treatment steps",
      "Help farmers with soil, pest, irrigation and fertilizer issues",
      "Build reputation through helpful expert responses",
      "Support smart agriculture with data-driven advice",
    ],
    buttonText: "Join as Agronomist",
  },
  {
    title: "For Buyers",
    image: IMG.buyer,
    color: "from-slate-700 to-slate-900",
    bullets: ["Bulk Orders", "Quality Checks", "Traceability"],
    path: "/marketplace",
    popupTitle: "How AgriConnect Helps Buyers",
    popupDesc:
      "Buyers can explore fresh crops, compare prices, contact farmers directly, check crop quality, and purchase produce without depending on middlemen.",
    popupPoints: [
      "Browse available crops from verified farmers",
      "Check price, quantity, quality and location",
      "Contact farmers directly for bulk orders",
      "Reduce middleman cost and improve transparency",
      "Build trusted supply chain from farm to market",
    ],
    buttonText: "Explore Marketplace",
  },
];

const ecosystemServices = [
  {
    icon: ShoppingCart,
    title: "Marketplace",
    desc: "Direct trade between farmers and bulk buyers with verified logistics support.",
    path: "/marketplace",
  },
  {
    icon: BarChart2,
    title: "Mandi Prices",
    desc: "Real-time daily updates from 2,000+ mandis across India for informed selling.",
    path: "/mandi-prices",
  },
  {
    icon: CloudSun,
    title: "Weather",
    desc: "Local and hyper-accurate forecasts with risk alerts for specific crop types.",
    path: "/services/weather",
  },
];

const journeySteps = [
  { num: "1", title: "Register",       desc: "Sign up with your phone number and verify your farm location details." },
  { num: "2", title: "List / Browse",  desc: "List your produce for sale or browse expert advice and market prices." },
  { num: "3", title: "Connect & Trade", desc: "Close deals directly with buyers or get immediate solutions from experts." },
];

const activeMarketplace = marketplaceCrops.slice(0, 8);

const partnerTabs = [
  {
    id: "agri",
    label: "Agri Input Brands",
    desc: "Our vision is to provide farmers with timely access to quality, affordable, and sustainable inputs. AgriConnect hosts over 25 digital communities, each with 2,000+ members, earning farmers' trust through reliable advisories.",
    items: [
      { icon: Sprout,    label: "Product Launch/Announcements" },
      { icon: Building2, label: "Market Development" },
      { icon: Microscope,label: "Expert Advisory-Driven Demand" },
      { icon: Activity,  label: "Demo / Trials" },
      { icon: Users,     label: "FGM / One-on-One Farm Meetings" },
      { icon: Lightbulb, label: "Advisory Integration" },
      { icon: Leaf,      label: "Ground Intelligence" },
      { icon: BookOpen,  label: "Farm Diary" },
    ],
  },
  
  {
    id: "farm",
    label: "Farm Services",
    desc: "We connect farmers with verified service providers for mechanization, soil testing, custom hiring, and end-to-end farm management — all booked through one app.",
    items: [
      { icon: Tractor,    label: "Custom Hiring Centers" },
      { icon: Leaf,       label: "Soil Testing & Analysis" },
      { icon: Droplets,   label: "Irrigation Setup" },
      { icon: ShieldCheck,label: "Crop Insurance Help" },
      { icon: Bot,        label: "Drone Spraying Services" },
      { icon: Wheat,      label: "Harvest Assistance" },
      { icon: ClipboardList, label: "Farm Planning" },
      { icon: Phone,      label: "Doorstep Support" },
    ],
  },
  {
    id: "market",
    label: "Market Linkages",
    desc: "Bridge the gap between farm gate and end buyers — FPOs, exporters, processors, and modern retail. Get fair prices with transparent trade and quality grading.",
    items: [
      { icon: ShoppingBag,label: "FPO Partnerships" },
      { icon: Globe,      label: "Export Linkages" },
      { icon: Building2,  label: "Processor Network" },
      { icon: BarChart2,  label: "Real-time Auctions" },
      { icon: Handshake,  label: "Contract Farming" },
      { icon: IndianRupee,label: "Quick Settlement" },
      { icon: ShieldCheck,label: "Quality Grading" },
      { icon: TrendingUp, label: "Price Discovery" },
    ],
  },
];


// ═══════════════════════════════════════════════════════════════════
// DEFAULT HOME — redesigned (Krishify-style)
// ═══════════════════════════════════════════════════════════════════
const DefaultHome = () => {
  const [activeTab, setActiveTab] = useState("agri");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedRole, setSelectedRole] = useState(null);
  const [weatherSlide, setWeatherSlide] = useState(0);

  const currentTab = partnerTabs.find((t) => t.id === activeTab);

  useEffect(() => {
  const timer = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, 2000);

  return () => clearInterval(timer);
}, []);
const heroSlides = [
  // Vegetable farm / farmer with vegetables
  "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&auto=format&fit=crop",

  // Tomato crop
  "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=1600&auto=format&fit=crop",

  // Green vegetable field
  "https://images.unsplash.com/photo-1518843875459-f738682238a6?w=1600&auto=format&fit=crop",

  // Carrot / fresh vegetables
  "https://images.unsplash.com/photo-1582515073490-39981397c445?w=1600&auto=format&fit=crop",

  // Cabbage / leafy vegetables
  "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=1600&auto=format&fit=crop",

  // Farm rows
  "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1600&auto=format&fit=crop",
];
  return (
    <div className="bg-white">

      {/* ════════════════════════════════════════════════════════ */}
      {/* HERO — illustration style with green tagline             */}
      {/* ════════════════════════════════════════════════════════ */}
      <section className="relative pt-24 pb-16 overflow-hidden min-h-screen flex items-center">
       {/* Hero Background Video */}
{/* Hero Background Image Slider */}
<div className="absolute inset-0">
  {heroSlides.map((slide, index) => (
    <img
      key={index}
      src={slide}
      alt={`Farm slide ${index + 1}`}
     className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
  index === currentSlide
    ? "opacity-100 scale-105"
    : "opacity-0 scale-100"
}`}
    />
  ))}

  {/* Overlay for text readability */}
  <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-green-50/85 to-green-900/45"></div>

  {/* Slider dots */}
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
    {heroSlides.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentSlide(index)}
        className={`h-2 rounded-full transition-all duration-300 ${
          index === currentSlide
            ? "w-8 bg-green-600"
            : "w-2 bg-white/70 hover:bg-white"
        }`}
        aria-label={`Go to slide ${index + 1}`}
      />
    ))}
  </div>
</div>

        {/* Subtle blob decorations */}
        <div className="absolute top-20 -left-20 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

        <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — Text */}
          <div className="animate-fadeUp">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-green-200 text-green-700 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
              <Sprout className="w-3.5 h-3.5" />
              The Future of Farming
            </div>

            <h1 className="font-bold text-4xl md:text-6xl text-gray-900 leading-tight mb-5">
              Connect Farmers,<br />
              <span className="text-green-600">Buyers & Experts</span>
            </h1>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              Real-time mandi prices, hyper-local weather alerts, and direct marketplace access — all in one place to empower your harvest.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/mandi-prices"
                className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-md transition-all hover:-translate-y-0.5"
              >
                <BarChart2 className="w-4 h-4" /> Check Mandi Prices
              </Link>
              <Link
                to="/login"
                className="flex items-center gap-2 px-6 py-3 bg-white text-green-700 font-semibold rounded-xl border border-green-200 hover:border-green-400 hover:bg-green-50 transition-all hover:-translate-y-0.5"
              >
                <Users className="w-4 h-4" /> Join now
              </Link>
            </div>
          </div>

       {/* RIGHT — Smart Dashboard Preview */}
<div className="relative animate-fadeUp delay-200 hidden lg:block">
  <div className="relative max-w-md mx-auto">

    {/* Main Glass Card */}
    <div className="relative rounded-[2rem] bg-white/85 backdrop-blur-xl border border-white/70 shadow-2xl p-6 overflow-hidden">
      
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-bold text-green-600 uppercase tracking-widest">
            AgriConnect Live
          </p>
          <h3 className="text-2xl font-black text-gray-900 mt-1">
            Smart Farm Dashboard
          </h3>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-green-600 flex items-center justify-center shadow-lg">
          <Leaf className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Weather + Mandi Row */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="rounded-2xl bg-green-50 border border-green-100 p-4">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-3 shadow-sm">
            <CloudSun className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-xs text-gray-500 font-semibold">Weather</p>
          <h4 className="text-xl font-black text-gray-900">29°C</h4>
          <p className="text-xs text-green-700 font-semibold mt-1">
            Good for irrigation
          </p>
        </div>

        <div className="rounded-2xl bg-amber-50 border border-amber-100 p-4">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-3 shadow-sm">
            <BarChart2 className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-xs text-gray-500 font-semibold">Mandi Price</p>
          <h4 className="text-xl font-black text-gray-900">₹2,300</h4>
          <p className="text-xs text-green-700 font-semibold mt-1">
            Wheat +4.2%
          </p>
        </div>
      </div>

      {/* AI Crop Doctor Card */}
      <div className="rounded-2xl bg-gradient-to-r from-green-600 to-emerald-700 p-5 text-white mb-4 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>

          <div className="flex-1">
            <h4 className="font-bold text-base">AI Crop Doctor</h4>
            <p className="text-green-100 text-xs mt-1">
              Detect crop disease using smart AI advisory
            </p>
          </div>

          <ArrowUpRight className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Crop Health Progress */}
      <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm mb-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-bold text-gray-900">Crop Health</p>
          <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
            Healthy
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
              <span>Wheat Field</span>
              <span>88%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-600 rounded-full" style={{ width: "88%" }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
              <span>Soil Moisture</span>
              <span>72%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: "72%" }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center rounded-xl bg-gray-50 p-3">
          <Users className="w-5 h-5 text-green-600 mx-auto mb-1" />
          <p className="text-sm font-black text-gray-900">50K+</p>
          <p className="text-[10px] text-gray-500 font-semibold">Farmers</p>
        </div>

        <div className="text-center rounded-xl bg-gray-50 p-3">
          <ShoppingCart className="w-5 h-5 text-green-600 mx-auto mb-1" />
          <p className="text-sm font-black text-gray-900">120+</p>
          <p className="text-[10px] text-gray-500 font-semibold">Crops</p>
        </div>

        <div className="text-center rounded-xl bg-gray-50 p-3">
          <MapPin className="w-5 h-5 text-green-600 mx-auto mb-1" />
          <p className="text-sm font-black text-gray-900">28</p>
          <p className="text-[10px] text-gray-500 font-semibold">States</p>
        </div>
      </div>
    </div>

    {/* Floating Badge 1 */}
    <div className="absolute -top-5 -left-6 bg-white rounded-2xl shadow-xl border border-green-100 px-4 py-3 flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center">
        <TrendingUp className="w-5 h-5 text-green-600" />
      </div>
      <div>
        <p className="text-xs font-bold text-gray-900">Price Alert</p>
        <p className="text-[11px] text-green-600 font-semibold">Soybean rising</p>
      </div>
    </div>

    {/* Floating Badge 2 */}
    <div className="absolute -bottom-5 -right-6 bg-white rounded-2xl shadow-xl border border-green-100 px-4 py-3 flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">
        <Check className="w-5 h-5 text-amber-600" />
      </div>
      <div>
        <p className="text-xs font-bold text-gray-900">Verified Buyers</p>
        <p className="text-[11px] text-gray-500 font-semibold">Direct crop deals</p>
      </div>
    </div>
  </div>
</div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════ */}
      {/* 3 ROLE CARDS                                             */}
      {/* ════════════════════════════════════════════════════════ */}
    {/* ════════════════════════════════════════════════════════ */}
{/* ACTIVE USERS — Farmers, Agronomists, Buyers              */}
{/* ════════════════════════════════════════════════════════ */}
{/* ACTIVE USERS — Farmers, Agronomists, Buyers              */}
{/* ════════════════════════════════════════════════════════ */}
<section className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-10">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-bold uppercase tracking-widest mb-4">
        <Users className="w-4 h-4" />
        Active Users
      </div>

      <h2 className="font-bold text-3xl md:text-4xl text-gray-900 mb-3">
        Connecting Every Important Role in Agriculture
      </h2>

      <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
        AgriConnect brings farmers, agronomists and buyers together on one smart platform.
      </p>

      <div className="w-16 h-1 bg-green-500 rounded-full mx-auto mt-5"></div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {roleCardsKr.map((card) => (
        <div
          key={card.title}
          className="group relative h-64 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer"
        >
          <img
            src={card.image}
            alt={card.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-90`}></div>

          <div className="relative h-full flex flex-col justify-between p-6">
            <div>
              <h3 className="font-bold text-2xl text-white mb-3">
                {card.title}
              </h3>

              <ul className="space-y-1.5">
                {card.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-center gap-2 text-white/95 text-sm"
                  >
                    <Check className="w-4 h-4 text-green-200 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setSelectedRole(card)}
              className="flex items-center gap-1 text-white text-sm font-semibold opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Learn more <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Learn More Popup */}
  {selectedRole && (
    <div className="fixed inset-0 z-[99999] flex items-start justify-center px-4 pt-[120px] pb-8">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setSelectedRole(null)}
      ></div>

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden animate-fadeUp">
        <button
          onClick={() => setSelectedRole(null)}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-red-50 text-gray-700 hover:text-red-500 flex items-center justify-center shadow-md transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative min-h-[260px]">
            <img
              src={selectedRole.image}
              alt={selectedRole.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${selectedRole.color} opacity-80`}></div>

            <div className="relative h-full p-8 flex flex-col justify-end">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-widest w-fit mb-4">
                <Users className="w-4 h-4" />
                {selectedRole.title}
              </div>

              <h3 className="text-3xl font-bold text-white leading-tight">
                {selectedRole.popupTitle}
              </h3>
            </div>
          </div>

          <div className="p-8">
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {selectedRole.popupDesc}
            </p>

            <div className="space-y-3 mb-7">
              {selectedRole.popupPoints.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-green-700" />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to={selectedRole.path}
                onClick={() => setSelectedRole(null)}
                className="flex-1 text-center px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm transition"
              >
                {selectedRole.buttonText}
              </Link>

              <button
                onClick={() => setSelectedRole(null)}
                className="flex-1 px-5 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-sm transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
</section>


      {/* ════════════════════════════════════════════════════════ */}
      {/* OUR ECOSYSTEM SERVICES                                   */}
      {/* ════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-10">
            <h2 className="font-bold text-3xl md:text-4xl text-gray-900 mb-2">
              Our Ecosystem Services
            </h2>
            <div className="w-16 h-1 bg-green-500 rounded-full mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ecosystemServices.map(({ icon: Icon, title, desc, path }) => (
              <Link
                key={title}
                to={path}
                className="group p-7 rounded-2xl bg-white border border-gray-100 hover:border-green-300 hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
                  <Icon className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                  {title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════ */}
      {/* YOUR JOURNEY TO GROWTH — 3 step                         */}
      {/* ════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-green-50/40">
        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-12">
            <h2 className="font-bold text-3xl md:text-4xl text-gray-900 mb-2">
              Your Journey to Growth
            </h2>
            <div className="w-16 h-1 bg-green-500 rounded-full mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector dotted line */}
            <div className="hidden md:block absolute top-7 left-[16.66%] right-[16.66%] border-t-2 border-dashed border-green-300 -z-0"></div>

            {journeySteps.map((s) => (
              <div key={s.num} className="text-center relative z-10">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-600 text-white font-bold text-xl flex items-center justify-center shadow-lg ring-4 ring-green-50">
                  {s.num}
                </div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">{s.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════ */}
      {/* ACTIVE MARKETPLACE                                       */}
      {/* ════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
      <div>
        <h2 className="font-bold text-3xl text-gray-900 mb-1">
          Active Marketplace
        </h2>
        <p className="text-gray-500 text-sm">
          Fresh crop listings from verified farmers across India
        </p>
      </div>

      <Link
        to="/marketplace"
        className="flex items-center gap-1 text-green-600 hover:text-green-700 font-semibold text-sm"
      >
        View More <ChevronRight className="w-4 h-4" />
      </Link>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {activeMarketplace.map((p) => (
        <div
          key={p.id}
          className="group rounded-2xl bg-white border border-gray-100 hover:border-green-300 hover:shadow-xl transition-all overflow-hidden cursor-pointer"
        >
          <div className="relative h-40 overflow-hidden">
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=700&auto=format&fit=crop";
              }}
            />

            <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 text-green-700 text-xs font-bold shadow">
              {p.quality}
            </span>
          </div>

          <div className="p-4">
            <h4 className="font-bold text-gray-900 text-base mb-1">
              {p.name}
            </h4>

            <div className="text-green-600 font-black text-lg mb-2">
              {p.price}
            </div>

            <div className="text-gray-500 text-xs flex items-center gap-1 mb-1">
              <MapPin className="w-3 h-3" />
              {p.region}
            </div>

            <div className="text-gray-500 text-xs mb-3">
              Qty:{" "}
              <span className="font-semibold text-gray-700">
                {p.quantity}
              </span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-500 truncate">
                Farmer:{" "}
                <span className="font-semibold text-gray-800">
                  {p.farmer}
                </span>
              </span>

              <button className="text-xs font-bold text-green-700 hover:text-green-800">
                Contact
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* ════════════════════════════════════════════════════════ */}
      {/* SMART FARMING TECHNOLOGY — 6 cards                       */}
      {/* ════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-10">
            <h2 className="font-bold text-3xl md:text-4xl text-gray-900 mb-2">
              Smart Farming Technology
            </h2>
            <p className="text-gray-500 text-sm mb-2">Cutting-edge solutions for the precision age</p>
            <div className="w-16 h-1 bg-green-500 rounded-full mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            {/* AR/VR Farm Training */}
            <div className="rounded-2xl bg-white border border-gray-100 hover:shadow-xl transition-all overflow-hidden">
              <div className="relative h-40">
                <img src={IMG.arTraining} alt="AR/VR" className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-green-600 text-white text-[10px] font-bold uppercase tracking-wider">
                  New Module
                </div>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-lg text-gray-900 mb-2">AR/VR Farm Training</h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Immersive training sessions to learn modern pest management and irrigation techniques from your home.
                </p>
                <Link to="/smart/arvr" className="inline-flex items-center gap-1 text-green-600 font-semibold text-sm">
                  Start Session <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* AI Diagnostics */}
            <div className="rounded-2xl bg-white border border-gray-100 hover:shadow-xl transition-all overflow-hidden">
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-blue-600" />
                    </div>
                    <h4 className="font-bold text-lg text-gray-900">AI Diagnostics</h4>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wide">
                    In Progress
                  </span>
                </div>

                {/* Mock progress card */}
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <div className="text-xs text-gray-600 mb-1">Target: Tomato Leaf</div>
                  <div className="text-xs text-gray-800 font-semibold mb-2">Late Blight Detected</div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: "78%" }}></div>
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1">78% confidence</div>
                </div>

                <Link
                  to="/smart/ai-doctor"
                  className="block w-full text-center py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-lg transition-colors"
                >
                  Run Full Scan
                </Link>
              </div>
            </div>

            {/* Satellite Insights */}
            <div className="rounded-2xl bg-white border border-gray-100 hover:shadow-xl transition-all overflow-hidden">
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-cyan-100 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-cyan-600" />
                    </div>
                    <h4 className="font-bold text-lg text-gray-900">Satellite Insights</h4>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-green-100 text-green-800 text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    Live
                  </span>
                </div>

                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-4 mb-3 h-28 flex items-end justify-between">
                  <div className="w-3 h-12 bg-cyan-300 rounded-sm"></div>
                  <div className="w-3 h-16 bg-cyan-400 rounded-sm"></div>
                  <div className="w-3 h-20 bg-cyan-500 rounded-sm"></div>
                  <div className="w-3 h-14 bg-cyan-400 rounded-sm"></div>
                  <div className="w-3 h-18 bg-cyan-500 rounded-sm" style={{ height: "70px" }}></div>
                  <div className="w-3 h-10 bg-cyan-300 rounded-sm"></div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div>
                    <div className="text-gray-500">Crop Health</div>
                    <div className="font-bold text-green-600">Good</div>
                  </div>
                  <div>
                    <div className="text-gray-500">NDVI Index</div>
                    <div className="font-bold text-gray-900">0.76</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Krishi Bot v2 */}
            <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 hover:shadow-xl transition-all overflow-hidden">
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-green-600 flex items-center justify-center">
                      <Sprout className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-bold text-lg text-gray-900">Krishi Bot v2</h4>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-green-600 text-white text-[10px] font-bold uppercase tracking-wide">
                    Active
                  </span>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  An autonomous bot solving 1,000+ farmer questions per minute in 5 languages.
                </p>

                <Link
                  to="/ai"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-green-700 font-semibold text-sm rounded-lg border border-green-200 hover:border-green-400 transition-colors"
                >
                  <Bot className="w-4 h-4" />
                  Chat Now
                </Link>
              </div>
            </div>

            {/* Drone Scouting */}
            <div className="rounded-2xl bg-white border border-gray-100 hover:shadow-xl transition-all overflow-hidden">
              <div className="relative h-40">
                <img src={IMG.drone} alt="Drone" className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-purple-600 text-white text-[10px] font-bold uppercase tracking-wider">
                  Preview
                </div>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-lg text-gray-900 mb-2">Drone Scouting</h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  High-resolution monitoring of large farms by drones to identify nutrient gaps and pest hotspots.
                </p>
                <Link to="/smart/drone" className="inline-flex items-center gap-1 text-purple-600 font-semibold text-sm">
                  View Sample Reports <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* More Coming Soon */}
            <div className="rounded-2xl bg-gradient-to-br from-green-700 to-emerald-800 hover:shadow-xl transition-all overflow-hidden">
              <div className="p-7 h-full flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-4 backdrop-blur">
                  <Sprout className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-bold text-xl text-white mb-2">More Coming Soon</h4>
                <p className="text-green-100 text-sm leading-relaxed mb-5">
                  Blockchain traceability and autonomous harvesting bots are in development.
                </p>
                <button className="px-5 py-2 bg-white text-green-700 font-semibold text-sm rounded-lg hover:bg-green-50 transition-colors">
                  Get Notified
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════ */}
     {/* ════════════════════════════════════════════════════════ */}
{/* WEATHER & CROP ADVISORY SECTION                         */}
{/* ════════════════════════════════════════════════════════ */}
<section
  id="weather"
  className="relative py-24 overflow-hidden"
>
  {/* Weather Background Slider */}
  <div className="absolute inset-0">
    {weatherSlides.map((slide, index) => (
      <img
        key={slide.title}
        src={slide.image}
        alt={slide.title}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2000ms] ease-in-out ${
          index === weatherSlide
            ? "opacity-100 scale-110 -translate-y-3"
            : "opacity-0 scale-100 translate-y-0"
        }`}
      />
    ))}
  </div>

  {/* Dark/blur overlay */}
  <div className="absolute inset-0 bg-white/35 backdrop-blur-[1px]"></div>
  <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/55 to-green-950/35"></div>

  {/* Slider dots */}
  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
    {weatherSlides.map((_, index) => (
      <button
        key={index}
        onClick={() => setWeatherSlide(index)}
        className={`h-2 rounded-full transition-all duration-300 ${
          index === weatherSlide
            ? "w-8 bg-green-600"
            : "w-2 bg-white/80 hover:bg-white"
        }`}
        aria-label={`Weather slide ${index + 1}`}
      />
    ))}
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-6">
    {/* Heading */}
    <div className="text-center mb-10">
      <h2 className="font-black text-4xl md:text-5xl text-gray-950 mb-4">
        Weather & Crop Advisory
      </h2>

      <p className="text-gray-700 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
        Field-ready weather intelligence and agronomy tips tailored for your crop cycle.
        Stay ahead of storms, heat, and irrigation windows with trusted guidance.
      </p>

      <div className="w-16 h-1 bg-green-600 rounded-full mx-auto mt-5"></div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
      {/* LEFT SIDE — Advisory */}
      <div className="space-y-5">
        {/* Top advisory cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-green-50/95 backdrop-blur p-5 shadow-lg border border-green-100">
            <p className="text-[11px] uppercase tracking-[0.35em] text-green-700 font-black mb-4">
              Crop Risk
            </p>
            <h3 className="text-xl font-black text-green-800">Low</h3>
          </div>

          <div className="rounded-2xl bg-amber-50/95 backdrop-blur p-5 shadow-lg border border-amber-100">
            <p className="text-[11px] uppercase tracking-[0.35em] text-amber-700 font-black mb-4">
              Harvest Window
            </p>
            <h3 className="text-xl font-black text-amber-800">3-4 days</h3>
          </div>

          <div className="rounded-2xl bg-sky-50/95 backdrop-blur p-5 shadow-lg border border-sky-100">
            <p className="text-[11px] uppercase tracking-[0.35em] text-sky-700 font-black mb-4">
              Irrigation Tip
            </p>
            <h3 className="text-xl font-black text-sky-800">Morning</h3>
          </div>
        </div>

        {/* Farm meaning card */}
        <div className="rounded-3xl bg-white/90 backdrop-blur-md p-6 md:p-7 shadow-xl border border-white/70">
          <h3 className="font-bold text-gray-950 text-lg mb-6">
            What this means for your farm
          </h3>

          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-black flex-shrink-0">
                1
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                Monitor soil moisture before applying fertilizers.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-black flex-shrink-0">
                2
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                Avoid spraying pesticides during high humidity or rain.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-xs font-black flex-shrink-0">
                3
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                Schedule harvesting when temperature is cool and dry.
              </p>
            </div>
          </div>
        </div>

        {/* Extra alert strip */}
        <div className="rounded-2xl bg-white/85 backdrop-blur p-4 border border-white/70 shadow-lg flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
            <CloudSun className="w-5 h-5 text-green-700" />
          </div>

          <div>
            <h4 className="font-bold text-gray-900 text-sm">
              Smart Advisory
            </h4>
            <p className="text-xs text-gray-600">
              Weather updates refresh based on your selected location.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE — Weather Widget */}
      <div className="rounded-3xl overflow-hidden shadow-2xl border border-green-900/10 bg-white">
        {/* Dark heading */}
        <div className="bg-green-950 px-6 md:px-8 py-7 text-white">
          <div className="flex items-center justify-between gap-4 mb-5">
            <p className="text-[11px] uppercase tracking-[0.35em] text-green-300 font-black">
              Current Local Snapshot
            </p>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-green-100 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Live
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-black mb-3">
            Crop-ready weather
          </h3>

          <p className="text-green-100 text-sm leading-relaxed max-w-xl">
            This widget updates automatically with your local weather and advises
            you on next steps for irrigation, spraying, and harvest planning.
          </p>
        </div>

        {/* Widget area */}
        <div className="bg-white p-5 md:p-6">
          <WeatherWidget />
        </div>
      </div>
    </div>
  </div>
</section>

      {/* ════════════════════════════════════════════════════════ */}
      {/* MANDI PRICES — kept                                      */}
      {/* ════════════════════════════════════════════════════════ */}
      <section id="mandi" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BarChart2 className="w-5 h-5 text-green-600" />
                <span className="text-green-600 text-sm font-bold uppercase tracking-wider">
                  Live Market Data
                </span>
              </div>
              <h2 className="font-bold text-3xl md:text-4xl text-gray-900">Today's Mandi Prices</h2>
              <p className="text-gray-500 mt-2">Real-time commodity rates from major mandis across India</p>
            </div>
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


      {/* ════════════════════════════════════════════════════════ */}
      {/* PARTNER WITH US — Tabbed section with phone mockup      */}
      {/* ════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-10">
            <h2 className="font-bold text-3xl md:text-4xl text-gray-900 mb-2">
              Partner with Us to Add Value to These Communities
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex justify-center border-b border-gray-200 mb-10">
            {partnerTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 md:px-10 py-3 text-sm md:text-base font-semibold transition-all relative ${
                  activeTab === tab.id
                    ? "text-green-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-600 rounded-t-full"></div>
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Left side — copy + items grid */}
            <div className="lg:col-span-3">
              <p className="text-gray-600 text-base leading-relaxed mb-8">
                {currentTab.desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentTab.items.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-100 hover:border-green-300 hover:shadow-md transition-all"
                  >
                    <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-8">
                <Link
                  to="/contact"
                  className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold text-sm rounded-lg transition-colors"
                >
                  Request a demo
                </Link>
                <Link
                  to="/about"
                  className="px-6 py-2.5 bg-white text-green-700 font-semibold text-sm rounded-lg border border-green-300 hover:bg-green-50 transition-colors"
                >
                  Explore more
                </Link>
              </div>
            </div>

            {/* Right side — phone mockup */}
            <div className="lg:col-span-2 flex items-center justify-center">
              <div className="relative w-64 h-[480px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                {/* Notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-gray-900 rounded-b-2xl z-10"></div>

                <div className="w-full h-full bg-white rounded-[2.4rem] overflow-hidden relative">

                  {/* Status bar */}
                  <div className="flex justify-between items-center px-5 pt-3 pb-2 text-[10px] font-semibold text-gray-700">
                    <span>12:30</span>
                    <span>📶 🔋</span>
                  </div>

                  {/* App header */}
                  <div className="px-4 pb-3 flex items-center justify-between border-b border-gray-100">
                    <button className="text-gray-500 text-lg">←</button>
                    <span className="text-xs font-semibold text-gray-700">Product Details</span>
                    <span className="text-gray-500">⋯</span>
                  </div>

                  {/* Product image */}
                  <div className="relative h-44 bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
                    <div className="w-32 h-36 bg-gradient-to-br from-green-500 to-emerald-700 rounded-xl shadow-xl flex flex-col items-center justify-center text-white p-3">
                      <div className="text-[8px] font-bold uppercase mb-1">Harvest+</div>
                      <div className="text-2xl font-black mb-1">DITTO</div>
                      <div className="text-lg font-black mb-2">50</div>
                      <Leaf className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Dots */}
                  <div className="flex justify-center gap-1 my-2">
                    <span className="w-5 h-1 rounded-full bg-green-500"></span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  </div>

                  {/* Brand info */}
                  <div className="px-4 py-2">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-md bg-green-600 flex items-center justify-center">
                        <Leaf className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-[10px] font-bold text-gray-700">Harvest Plus</span>
                    </div>
                    <h5 className="font-bold text-sm text-gray-900 mb-2">Ditto 50 Atrazine 50% WP</h5>

                    <div className="bg-gray-50 rounded-lg p-2 mb-3">
                      <div className="text-[9px] text-gray-500 mb-1">इस प्रोडक्ट के बारे में</div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-gray-700">वजन मात्रा</span>
                        <span className="font-semibold text-gray-900">1 किलोग्राम, 2 किलोग्राम</span>
                      </div>
                    </div>

                    <button className="w-full py-2 bg-green-600 text-white text-xs font-bold rounded-lg">
                      मुझे चाहिए
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════ */}
      {/* TESTIMONIALS — Voices of Success                         */}
      {/* ════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-green-50/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="font-bold text-3xl md:text-4xl text-gray-900 mb-2">Voices of Success</h2>
            <div className="w-16 h-1 bg-green-500 rounded-full mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, location, text }) => (
              <div
                key={name}
                className="p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="flex gap-0.5 mb-3 text-amber-400 text-base">
                  {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5 italic">"{text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-700">
                    {name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{name}</div>
                    <div className="text-gray-500 text-xs flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Farmer, {location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════ */}
      {/* CTA — Green banner with farmer image                     */}
      {/* ════════════════════════════════════════════════════════ */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-3xl bg-gradient-to-br from-green-600 to-emerald-700 overflow-hidden shadow-2xl">

            {/* Decorative pattern */}
            <div className="absolute top-0 right-0 opacity-10">
              <Leaf className="w-64 h-64 text-white -rotate-12" />
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 items-center p-8 md:p-12">

              {/* Farmer illustration */}
              <div className="hidden md:block">
                <div className="relative w-48 h-56 rounded-2xl overflow-hidden shadow-xl">
                  <img src={IMG.ctaFarmer} alt="Farmer" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Text */}
              <div className="md:col-span-1">
                <h2 className="font-bold text-2xl md:text-3xl text-white leading-tight mb-3">
                  Use AI, Satellite & Smart Farming Tools in One Platform
                </h2>
                <p className="text-green-100 text-sm md:text-base leading-relaxed">
                  Join the 50,000+ farmers already growing their businesses with AgriConnect. Get started for free today.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-3">
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-green-700 font-bold rounded-xl shadow-lg hover:bg-green-50 transition-all hover:-translate-y-0.5"
                >
                  <ShoppingBag className="w-4 h-4" /> Download App
                </Link>
                <Link
                  to="/expert"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-green-800 hover:bg-green-900 text-white font-bold rounded-xl border border-green-500/50 transition-all hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-4 h-4" /> Talk to an Expert
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <Footer />
    </div>
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