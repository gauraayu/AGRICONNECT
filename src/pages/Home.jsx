import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import WeatherWidget from "../components/WeatherWidget";
import { createPortal } from "react-dom";
import FarmerDashboard from "./FarmerDashboard";
import phoneMockVideo from "../assets/home/phonemock.mp4";
import axios from "axios";
import farmVideo from "../assets/farm-video.mp4";
import gogLogo from "../assets/gog-logo.png";
import heroFarmerImg from "../assets/home/hero-farmer.jpg";
import farmerImg from "../assets/home/farmer.jpg";
import agronomistImg from "../assets/home/agronomist.jpg";
import buyerImg from "../assets/home/buyer.jpg";
import { marketplaceCrops } from "../data/marketplaceCrops";

import arTrainingImg from "../assets/home/ar-training.jpg";
import aiDiagnoseImg from "../assets/home/ai-diagnostic.jpg";
import satelliteImg from "../assets/home/satellite.jpg";
import droneImg from "../assets/home/drone.jpg";

// import phoneMockImg from "../assets/home/phone-mockup.jpg";
import smartIrrigationImg from "../assets/home/smart-irrigation.jpg";
import marketDemandImg from "../assets/home/market-demand.jpg";

import farmRain1 from "../assets/home/farm-rain-1.mp4";
import farmRain2 from "../assets/home/farm-rain-2.mp4";
import farmRain3 from "../assets/home/farm-rain-3.mp4";

// ── LANGUAGE CONTEXT ──
import { useLanguage } from "../context/LanguageContext";

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

import { mandiPrices } from "../data/mandiPrices";

const stats = [
  { value: "50K+", labelKey: "farmers", icon: Users },
  { value: "120+", labelKey: "crops", icon: Leaf },
  { value: "28", labelKey: "states", icon: MapPin },
];

const testimonials = [
  { name: "Ramesh Patel", location: "Gujarat", text: "AgriConnect helped me sell my wheat directly to buyers at 30% better price than the mandi." },
  { name: "Sunita Devi", location: "Punjab", text: "The weather advisory saved my mustard crop last season. I got timely alerts and took action." },
  { name: "Mohan Singh", location: "Rajasthan", text: "The farm dashboard makes it so easy to track everything. I feel in control of my farm now." },
];
const mandiCropImages = {
  Wheat:
    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=120&auto=format&fit=crop",
  Soybean:
    "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=120&auto=format&fit=crop",
  Rice:
    "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=120&auto=format&fit=crop",
  Maize:
    "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=120&auto=format&fit=crop",
  Cotton:
    "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=120&auto=format&fit=crop",
  Mustard:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=120&auto=format&fit=crop",
  Tomato:
    "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=120&auto=format&fit=crop",
  Potato:
    "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=120&auto=format&fit=crop",
  Onion:
    "https://images.unsplash.com/photo-1508747703725-719777637510?w=120&auto=format&fit=crop",
  Gram:
    "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?w=120&auto=format&fit=crop",
  Sugarcane:
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=120&auto=format&fit=crop",
  Banana:
    "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=120&auto=format&fit=crop",
  Apple:
    "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=120&auto=format&fit=crop",
  Mango:
    "https://images.unsplash.com/photo-1553279768-865429fa0078?w=120&auto=format&fit=crop",
  Grapes:
    "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=120&auto=format&fit=crop",
  Carrot:
    "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=120&auto=format&fit=crop",
  Chilli:
    "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=120&auto=format&fit=crop",
  Turmeric:
    "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=120&auto=format&fit=crop",
  Coconut:
    "https://images.unsplash.com/photo-1580984969071-a8da5656c2fb?w=120&auto=format&fit=crop",
};

const getMandiCropImage = (cropName = "") => {
  const crop = cropName.toLowerCase();

  const matchedKey = Object.keys(mandiCropImages).find((key) =>
    crop.includes(key.toLowerCase())
  );

  return (
    mandiCropImages[matchedKey] ||
    "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=120&auto=format&fit=crop"
  );
};
// ─────────────────────────────────────────
// MANDI PRICE WIDGET (kept as-is)
// ─────────────────────────────────────────
const MandiWidget = () => {
  const { t } = useLanguage();
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
      <div className="bg-gradient-to-r from-green-700 to-green-900 px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-white font-bold text-lg">
              {t("mandiLiveRates")}
            </h3>

            <p className="text-green-200 text-xs">
              {t("mandiUpdated")}: {new Date().toLocaleTimeString()}
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-green-600/50 px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 rounded-full bg-red-300 animate-pulse"></div>
            <span className="text-green-200 text-xs font-semibold">
              {t("live").toUpperCase()}
            </span>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-300" />

          <input
            value={search}
            onChange={handleSearch}
            placeholder={t("mandiCrop") + " / " + t("mandiMarket") + "..."}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-green-300 text-sm focus:outline-none focus:bg-white/20 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-4 px-4 py-2 bg-gray-50 border-b border-gray-100">
        <span className="text-xs font-bold text-gray-500 uppercase">
          {t("mandiCrop")}
        </span>

        <span className="text-xs font-bold text-gray-500 uppercase text-right">
          {t("mandiPriceCol")}
        </span>

        <span className="text-xs font-bold text-gray-500 uppercase text-center">
          {t("mandiChange")}
        </span>

        <span className="text-xs font-bold text-gray-500 uppercase text-right">
          {t("mandiMarket")}
        </span>
      </div>

      <div className="divide-y divide-gray-50">
        {filtered.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-sm">
            {t("mandiNoResults")} "{search}"
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.crop}
              className="grid grid-cols-4 px-4 py-3 hover:bg-green-50/50 transition-colors items-center"
            >
              {/* Crop with small image */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-xl overflow-hidden bg-green-50 border border-green-100 shadow-sm flex-shrink-0">
                  <img
                    src={getMandiCropImage(item.crop)}
                    alt={item.crop}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=120&auto=format&fit=crop";
                    }}
                  />
                </div>

                <div className="min-w-0">
                  <div className="font-semibold text-gray-800 text-sm truncate">
                    {item.crop}
                  </div>

                  <div className="text-gray-400 text-xs truncate">
                    {item.hindi}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold text-gray-900 text-sm">
                  {item.price.toLocaleString()}
                </div>

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

      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs text-gray-400">
          {t("mandiSourceAgmarknet")}
        </span>

        <Link
          to="/mandi-prices"
          className="text-xs font-semibold text-green-600 hover:text-green-500 flex items-center gap-1"
        >
          {t("viewMore")} <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────
// FOOTER (kept as-is — abbreviated for space, will be unchanged in your file)
// ─────────────────────────────────────────
const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-10 mb-12">
          <div className="lg:w-1/4 space-y-5">
            <div className="flex items-center gap-3">
              <img src={gogLogo} alt="Geeks of Gurukul" className="w-12 h-12 rounded-xl object-contain bg-white p-1" onError={(e) => { e.target.style.display = "none"; }} />
              <div>
                <div className="text-white font-bold text-base leading-tight">Geeks of Gurukul</div>
                <div className="text-green-500 text-xs font-semibold">AgriConnect Platform</div>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">{t("footerEmpowering")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:w-3/4">
            <div>
              <h4 className="text-green-500 font-bold text-xs uppercase tracking-widest mb-5">{t("footerConnect")}</h4>
              <ul className="space-y-3">
                {[
                  { label: t("footerContactUs"),    path: "/contact" },
                  { label: t("footerAboutUs"),      path: "/about" },
                  { label: t("marketplace"),        path: "/marketplace" },
                  { label: t("footerAIAssistant"),  path: "/ai" },
                  { label: t("footerPostProblem"),  path: "/post-problem" },
                ].map(({ label, path }) => (
                  <li key={label}><Link to={path} className="text-sm text-gray-500 hover:text-green-400 transition-colors flex items-center gap-1.5"><ChevronRight className="w-3 h-3 text-gray-700" />{label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-green-500 font-bold text-xs uppercase tracking-widest mb-5">{t("footerResources")}</h4>
              <ul className="space-y-3">
                {[
                  { label: t("footerFAQ"),          href: "#" },
                  { label: t("footerPrivacy"),      href: "#" },
                  { label: t("footerTerms"),        href: "#" },
                  { label: t("footerMandiRates"),   href: "https://agmarknet.gov.in" },
                  { label: t("nav_weather_updates"), href: "#weather" },
                  { label: t("footerCropAdvisory"), href: "#advisory" },
                ].map(({ label, href }) => (
                  <li key={label}><a href={href} className="text-sm text-gray-500 hover:text-green-400 transition-colors flex items-center gap-1.5"><ChevronRight className="w-3 h-3 text-gray-700" />{label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-green-500 font-bold text-xs uppercase tracking-widest mb-5">{t("footerGetInTouch")}</h4>
              <div className="space-y-4">
                <a href="tel:+919109976089" className="flex items-center gap-3 text-sm text-gray-500 hover:text-green-400"><div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center"><PhoneCall className="w-4 h-4 text-gray-400" /></div>+91 9109976089</a>
                <a href="mailto:admin@geeksofgurukul.com" className="flex items-center gap-3 text-sm text-gray-500 hover:text-green-400"><div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center"><Mail className="w-4 h-4 text-gray-400" /></div>admin@geeksofgurukul.com</a>
                <div className="flex items-start gap-3 text-sm text-gray-500"><div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center mt-0.5"><MapPin className="w-4 h-4 text-gray-400" /></div>Bhopal, Madhya Pradesh, India</div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 mt-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} Geeks of Gurukul — {t("footerAllRights")}.</p>
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
// FARMER & AGRONOMIST DASHBOARDS
// (kept identical to your file — copy your existing versions here.
//  Omitted in this drop-in to avoid bloat. Paste your originals back in
//  between this comment and the `const advisoryVideos = [...]` line.)
// ─────────────────────────────────────────
// PLACEHOLDER — keep your existing FarmerDashboard and AgronomistDashboard.
// They are not affected by this update.

// ─────────────────────────────────────────
// SCROLL REVEAL — Re-triggers BOTH WAYS
// Animation plays when entering view AND when re-entering after scrolling up
// ─────────────────────────────────────────
const ScrollReveal = ({ children, from = "up", delay = 0, className = "", duration = 800 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // ⭐ Re-trigger animation both ways: set visible based on isIntersecting
          // (no .unobserve() — keeps observing forever)
          setVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const hiddenTransform = {
    left: "translate3d(-60px, 0, 0)",
    right: "translate3d(60px, 0, 0)",
    up: "translate3d(0, 50px, 0)",
    down: "translate3d(0, -50px, 0)",
    zoom: "scale(0.92)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate3d(0, 0, 0) scale(1)" : hiddenTransform[from],
        transition: `opacity ${duration}ms ease-out, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        transitionDelay: visible ? `${delay}ms` : "0ms",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
};
  
const ProfessionalSection = ({
  id,
  children,
  variant = "white",
  maxWidth = "max-w-5xl",
  className = "",
}) => {
  const bg =
    variant === "green"
      ? "bg-gradient-to-br from-green-50 via-white to-emerald-100"
      : variant === "dark"
      ? "bg-gradient-to-br from-green-950 via-emerald-950 to-slate-950"
      : variant === "mint"
      ? "bg-gradient-to-br from-white via-green-50 to-emerald-50"
      : variant === "gray"
      ? "bg-gradient-to-br from-slate-50 via-white to-green-50"
      : "bg-gradient-to-br from-white via-slate-50 to-green-50";

  return (
    <section
      id={id}
      className={`relative min-h-screen flex items-center overflow-hidden py-14 ${bg} ${className}`}
    >
      {/* soft background blobs */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-green-300/25 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-lime-200/20 rounded-full blur-3xl"></div>

      {/* dotted/grid professional pattern */}
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #14532d 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      ></div>

      <div className={`relative z-10 ${maxWidth} mx-auto px-6 w-full`}>
        {children}
      </div>
    </section>
  );
};

// ─────────────────────────────────────────
// IMAGES
// ─────────────────────────────────────────
const IMG = {
  heroFarmer: heroFarmerImg,
  farmer: farmerImg,
  agronomist: agronomistImg,
  buyer: buyerImg,
  wheat: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&auto=format&fit=crop",
  rice: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop",
  tomato: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop",
  arTraining: arTrainingImg,
  aiDiagnose: aiDiagnoseImg,
  satellite: satelliteImg,
  drone: droneImg,
  smartIrrigation: smartIrrigationImg,
  marketDemand: marketDemandImg,
  // phoneMock: phoneMockImg,
  ctaFarmer: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=700&auto=format&fit=crop",
};

const weatherSlides = [
  { title: "Rainy Farm", image: "/images/farm-rain-1.png" },
  { title: "Rainy Crop Field", image: "/images/farm-rain-2.png" },
  { title: "Sunny Farm", image: "/images/farm-sun.png" },
];

const heroSlides = [
  "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518843875459-f738682238a6?w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582515073490-39981397c445?w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=1600&auto=format&fit=crop",
];

// ─────────────────────────────────────────────────────────────────
// Translation helpers for marketplaceCrops data
// Maps the English values in /data/marketplaceCrops.js → translation keys.
// If the value isn't in the map, returns the original (so unknown data
// from your file still shows up, just untranslated).
// ─────────────────────────────────────────────────────────────────
const CROP_NAME_MAP = {
  "Wheat Sona":      "cropWheatSona",
  "Basmati Rice":    "cropBasmatiRice",
  "Hybrid Tomato":   "cropHybridTomato",
  "Potato Kufri":    "cropPotatoKufri",
  "Red Onion":       "cropRedOnion",
  "Yellow Soybean":  "cropYellowSoybean",
  "Maize":           "cropMaize",
  "Cotton":          "cropCotton",
};

const REGION_MAP = {
  "Punjab — Amritsar":          "regionPunjabAmritsar",
  "Haryana — Karnal":           "regionHaryanaKarnal",
  "Maharashtra — Nashik":       "regionMaharashtraNashik",
  "Uttar Pradesh — Agra":       "regionUPAgra",
  "Maharashtra — Lasalgaon":    "regionMaharashtraLasalgaon",
  "Madhya Pradesh — Indore":    "regionMPIndore",
  "Madhya Pradesh — Jabalpur":  "regionMPJabalpur",
  "Maharashtra — Nagpur":       "regionMaharashtraNagpur",
};

const QUALITY_MAP = {
  "Export Quality": "qualityExport",
  "Premium":        "qualityPremium",
  "Organic":        "qualityOrganic",
  "Good":           "qualityGood",
  "Fresh":          "qualityFresh",
  "Grade A":        "qualityGradeA",
};

const translateCrop = (englishName, t) => {
  const key = CROP_NAME_MAP[englishName];
  return key ? t(key) : englishName;
};

const translateRegion = (englishRegion, t) => {
  const key = REGION_MAP[englishRegion];
  return key ? t(key) : englishRegion;
};

const translateQuality = (englishQuality, t) => {
  const key = QUALITY_MAP[englishQuality];
  return key ? t(key) : englishQuality;
};

// Handles "120 quintal" / "90 quintal" — translates the unit only
const translateQuantity = (quantityStr, t) => {
  if (!quantityStr) return quantityStr;
  // Match number + "quintal" with any spacing
  return String(quantityStr).replace(/quintal/i, t("unitQuintal"));
};
const PhoneMockVideo = () => {
  return (
    <div className="relative flex justify-center lg:justify-end items-center">
      {/* soft glow */}
      <div className="absolute w-[360px] h-[360px] bg-green-300/35 blur-3xl rounded-full"></div>

      {/* clean video card - no extra phone frame */}
      <div className="relative w-[280px] sm:w-[330px] lg:w-[360px] rounded-[2.2rem] bg-white p-3 shadow-[0_30px_90px_rgba(15,23,42,0.18)] border border-green-100">
        <div className="relative rounded-[1.8rem] overflow-hidden bg-slate-100 aspect-[9/16]">
          <video
            key={phoneMockVideo}
            src={phoneMockVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />

          {/* soft shine */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20"></div>
        </div>
      </div>
    </div>
  );
};
// ═══════════════════════════════════════════════════════════════════
// DEFAULT HOME — with i18n
// ═══════════════════════════════════════════════════════════════════
const DefaultHome = () => {
  const { t } = useLanguage();           // ← translation function
  const [activeTab, setActiveTab] = useState("agri");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedRole, setSelectedRole] = useState(null);
  useEffect(() => {
  if (selectedRole) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  return () => {
    document.body.style.overflow = "";
  };
}, [selectedRole]);
  const [weatherSlide, setWeatherSlide] = useState(0);
  const [weatherVisible, setWeatherVisible] = useState(false);
  const weatherSectionRef = useRef(null);

  // ── DATA — recomputed every render so translations update live ──
  const roleCardsKr = [
    {
      key: "farmer",
      title: t("forFarmers"),
      image: IMG.farmer,
      // color: "from-green-600 to-emerald-700",
      bullets: [t("directSelling"), t("pestDiagnosis"), t("expertAssistance")],
      path: "/login",
      popupTitle: t("howHelpsFarmers"),
      popupDesc: t("farmerDesc"),
      popupPoints: [t("farmerPoint1"), t("farmerPoint2"), t("farmerPoint3"), t("farmerPoint4"), t("farmerPoint5")],
      buttonText: t("joinFarmer"),
    },
    {
      key: "agronomist",
      title: t("forAgronomists"),
      image: IMG.agronomist,
      // color: "from-amber-600 to-orange-700",
      bullets: [t("caseManagement"), t("analyticsDashboard"), t("reputationBadges")],
      path: "/login",
      popupTitle: t("howHelpsAgronomists"),
      popupDesc: t("agronomistDesc"),
      popupPoints: [t("agronomistPoint1"), t("agronomistPoint2"), t("agronomistPoint3"), t("agronomistPoint4"), t("agronomistPoint5")],
      buttonText: t("joinAgronomist"),
    },
    {
      key: "buyer",
      title: t("forBuyers"),
      image: IMG.buyer,
      // color: "from-slate-700 to-slate-900",
      bullets: [t("bulkOrders"), t("qualityChecks"), t("traceability")],
      path: "/marketplace",
      popupTitle: t("howHelpsBuyers"),
      popupDesc: t("buyerDesc"),
      popupPoints: [t("buyerPoint1"), t("buyerPoint2"), t("buyerPoint3"), t("buyerPoint4"), t("buyerPoint5")],
      buttonText: t("exploreMarketplace"),
    },
  ];

  const ecosystemServices = [
    { icon: ShoppingCart, title: t("marketplace"), desc: t("marketplaceShortDesc"), path: "/marketplace" },
    { icon: BarChart2, title: t("mandiPrices"), desc: t("mandiShortDesc"), path: "/mandi-prices" },
    { icon: CloudSun, title: t("weather"), desc: t("weatherShortDesc"), path: "/services/weather" },
  ];

  const journeySteps = [
    { num: "1", title: t("step1Title"), desc: t("step1Desc") },
    { num: "2", title: t("step2Title"), desc: t("step2Desc") },
    { num: "3", title: t("step3Title"), desc: t("step3Desc") },
  ];

  const smartTechCards = [
    { title: t("arvrTitle"), image: IMG.arTraining, badge: "AR / VR", desc: t("arvrDesc"), path: "/smart/arvr", icon: Activity },
    { title: t("aiDiagTitle"), image: IMG.aiDiagnose, badge: "AI", desc: t("aiDiagDesc"), path: "/smart/ai-doctor", icon: Bot },
    { title: t("satelliteTitle"), image: IMG.satellite, badge: "Satellite", desc: t("satelliteDesc"), path: "/smart/satellite", icon: Globe },
    { title: t("droneTitle"), image: IMG.drone, badge: "Drone", desc: t("droneDesc"), path: "/smart/drone", icon: Tractor },
    { title: t("irrigationTitle"), image: IMG.smartIrrigation, badge: "Auto", desc: t("irrigationDesc"), path: "/smart/irrigation", icon: Droplets },
    { title: t("marketDemandTitle"), image: IMG.marketDemand, badge: "ML", desc: t("marketDemandDesc"), path: "/smart/market-demand", icon: TrendingUp },
  ];

  const partnerTabs = [
    {
      id: "agri", label: t("agriInputBrands"), desc: t("agriInputDesc"),
      items: [
        { icon: Sprout, label: "Product Launch/Announcements" }, { icon: Building2, label: "Market Development" },
        { icon: Microscope, label: "Expert Advisory-Driven Demand" }, { icon: Activity, label: "Demo / Trials" },
        { icon: Users, label: "FGM / One-on-One Farm Meetings" }, { icon: Lightbulb, label: "Advisory Integration" },
        { icon: Leaf, label: "Ground Intelligence" }, { icon: BookOpen, label: "Farm Diary" },
      ],
    },
    {
      id: "farm", label: t("farmServices"), desc: t("farmServicesDesc"),
      items: [
        { icon: Tractor, label: "Custom Hiring Centers" }, { icon: Leaf, label: "Soil Testing & Analysis" },
        { icon: Droplets, label: "Irrigation Setup" }, { icon: ShieldCheck, label: "Crop Insurance Help" },
        { icon: Bot, label: "Drone Spraying Services" }, { icon: Wheat, label: "Harvest Assistance" },
        { icon: ClipboardList, label: "Farm Planning" }, { icon: Phone, label: "Doorstep Support" },
      ],
    },
    {
      id: "market", label: t("marketLinkages"), desc: t("marketLinkagesDesc"),
      items: [
        { icon: ShoppingBag, label: "FPO Partnerships" }, { icon: Globe, label: "Export Linkages" },
        { icon: Building2, label: "Processor Network" }, { icon: BarChart2, label: "Real-time Auctions" },
        { icon: Handshake, label: "Contract Farming" }, { icon: IndianRupee, label: "Quick Settlement" },
        { icon: ShieldCheck, label: "Quality Grading" }, { icon: TrendingUp, label: "Price Discovery" },
      ],
    },
  ];

  // ── Effects ──
  useEffect(() => {
    const currentSection = weatherSectionRef.current;
    if (!currentSection) return;
    const observer = new IntersectionObserver(
      ([entry]) => setWeatherVisible(entry.isIntersecting), // ← also re-triggers
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(currentSection);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setWeatherSlide((p) => (p + 1) % weatherSlides.length), 2500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((p) => (p + 1) % heroSlides.length), 3500);
    return () => clearInterval(timer);
  }, []);

  const currentTab = partnerTabs.find((t) => t.id === activeTab);
  const activeMarketplace = marketplaceCrops.slice(0, 8);

return (
  <div className="bg-slate-50">

      {/* ════════════ HERO ════════════ */}
      {/* ════════════ HERO ════════════ */}
<section className="relative pt-24 pb-16 overflow-hidden min-h-screen flex items-center">
  <div className="absolute inset-0">
    {heroSlides.map((slide, index) => (
      <img
        key={index}
        src={slide}
        alt=""
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
          index === currentSlide ? "opacity-100 scale-105" : "opacity-0 scale-100"
        }`}
      />
    ))}

    {/* Only text readability overlay - photo same rahegi */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10"></div>

    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
      {heroSlides.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentSlide(index)}
          className={`h-2 rounded-full transition-all duration-300 ${
            index === currentSlide
              ? "w-8 bg-green-500"
              : "w-2 bg-white/70 hover:bg-white"
          }`}
        />
      ))}
    </div>
  </div>

  <div className="absolute top-20 -left-20 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
  <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

  <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    <ScrollReveal from="left" className="max-w-2xl">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 border border-green-300 text-green-800 text-xs font-black uppercase tracking-widest mb-6 shadow-lg">
        <Sprout className="w-3.5 h-3.5" />
        {t("heroBadge")}
      </div>

      <h1
        className="font-black text-4xl md:text-6xl text-white leading-tight mb-5 tracking-tight"
        style={{
          textShadow: "0 5px 18px rgba(0,0,0,0.85)",
        }}
      >
        {t("heroTitle1")}
        <br />
        <span
          className="text-green-300 font-black"
          style={{
            textShadow: "0 5px 18px rgba(0,0,0,0.9)",
          }}
        >
          {t("heroTitle2")}
        </span>
      </h1>

      <p
        className="text-white text-base md:text-lg leading-relaxed mb-8 max-w-xl font-bold"
        style={{
          textShadow: "0 3px 12px rgba(0,0,0,0.9)",
        }}
      >
        {t("heroDesc")}
      </p>

      <div className="flex flex-wrap gap-3">
        <Link
          to="/mandi-prices"
          className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-black rounded-xl shadow-xl transition-all hover:-translate-y-0.5"
        >
          <BarChart2 className="w-4 h-4" />
          {t("btnCheckMandi")}
        </Link>

        <Link
          to="/login"
          className="flex items-center gap-2 px-6 py-3 bg-white text-green-800 font-black rounded-xl border border-white hover:bg-green-50 shadow-xl transition-all hover:-translate-y-0.5"
        >
          <Users className="w-4 h-4" />
          {t("btnJoinNow")}
        </Link>
      </div>
    </ScrollReveal>

    <ScrollReveal from="right" delay={150} className="relative hidden lg:block">
      <div className="relative max-w-md mx-auto">
        <div className="relative rounded-[2rem] bg-white/85 backdrop-blur-xl border border-white/70 shadow-2xl p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-bold text-green-600 uppercase tracking-widest">
                {t("agriConnectLive")}
              </p>
              <h3 className="text-2xl font-black text-gray-900 mt-1">
                {t("smartFarmDashboard")}
              </h3>
            </div>

            <div className="w-12 h-12 rounded-2xl bg-green-600 flex items-center justify-center shadow-lg">
              <Leaf className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="rounded-2xl bg-green-50 border border-green-100 p-4">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-3 shadow-sm">
                <CloudSun className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-xs text-gray-500 font-semibold">{t("weather")}</p>
              <h4 className="text-xl font-black text-gray-900">29°C</h4>
              <p className="text-xs text-green-700 font-semibold mt-1">
                {t("goodIrrigation")}
              </p>
            </div>

            <div className="rounded-2xl bg-amber-50 border border-amber-100 p-4">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-3 shadow-sm">
                <BarChart2 className="w-5 h-5 text-amber-600" />
              </div>
              <p className="text-xs text-gray-500 font-semibold">
                {t("mandiPrice")}
              </p>
              <h4 className="text-xl font-black text-gray-900">₹2,300</h4>
              <p className="text-xs text-green-700 font-semibold mt-1">
                {t("wheatUp")}
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-r from-green-600 to-emerald-700 p-5 text-white mb-4 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>

              <div className="flex-1">
                <h4 className="font-bold text-base">{t("aiCropDoctor")}</h4>
                <p className="text-green-100 text-xs mt-1">
                  {t("aiCropDoctorDesc")}
                </p>
              </div>

              <ArrowUpRight className="w-5 h-5 text-white" />
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm mb-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-gray-900">{t("cropHealth")}</p>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                {t("healthy")}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
                  <span>{t("wheatField")}</span>
                  <span>88%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-600 rounded-full"
                    style={{ width: "88%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
                  <span>{t("soilMoisture")}</span>
                  <span>72%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: "72%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="text-center rounded-xl bg-gray-50 p-3">
              <Users className="w-5 h-5 text-green-600 mx-auto mb-1" />
              <p className="text-sm font-black text-gray-900">50K+</p>
              <p className="text-[10px] text-gray-500 font-semibold">
                {t("farmers")}
              </p>
            </div>

            <div className="text-center rounded-xl bg-gray-50 p-3">
              <ShoppingCart className="w-5 h-5 text-green-600 mx-auto mb-1" />
              <p className="text-sm font-black text-gray-900">120+</p>
              <p className="text-[10px] text-gray-500 font-semibold">
                {t("crops")}
              </p>
            </div>

            <div className="text-center rounded-xl bg-gray-50 p-3">
              <MapPin className="w-5 h-5 text-green-600 mx-auto mb-1" />
              <p className="text-sm font-black text-gray-900">28</p>
              <p className="text-[10px] text-gray-500 font-semibold">
                {t("states")}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute -top-5 -left-6 bg-white rounded-2xl shadow-xl border border-green-100 px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900">{t("priceAlert")}</p>
            <p className="text-[11px] text-green-600 font-semibold">
              {t("soybeanRising")}
            </p>
          </div>
        </div>

        <div className="absolute -bottom-5 -right-6 bg-white rounded-2xl shadow-xl border border-green-100 px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">
            <Check className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900">
              {t("verifiedBuyers")}
            </p>
            <p className="text-[11px] text-gray-500 font-semibold">
              {t("directCropDeals")}
            </p>
          </div>
        </div>
      </div>
    </ScrollReveal>
  </div>
</section>
    {/* ════════════════════════════════════════════════════════ */}
{/* ════════════════════════════════════════════════════════ */}
{/* ACTIVE MARKETPLACE */}
{/* ════════════════════════════════════════════════════════ */}
<ProfessionalSection id="marketplace" variant="white" maxWidth="max-w-5xl">
  <div className="flex items-start justify-between gap-4 mb-7">
    <div>
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100/80 border border-green-200 text-green-700 text-xs font-black uppercase tracking-widest mb-3 shadow-sm">
        <ShoppingBag className="w-4 h-4" />
        {t("freshListings")}
      </div>

      <h2 className="text-3xl md:text-4xl font-black text-gray-950 leading-tight">
        {t("activeMarketplace")}
      </h2>

      <p className="text-gray-500 mt-1 text-sm font-medium">
        {t("marketplaceDesc")}
      </p>
    </div>

    <Link
      to="/marketplace"
      className="flex items-center gap-1 text-green-700 hover:text-green-900 font-black text-sm whitespace-nowrap"
    >
      {t("viewMore")} <ChevronRight className="w-4 h-4" />
    </Link>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {activeMarketplace.map((p, index) => (
      <ScrollReveal
        key={p.id}
        from={index % 2 === 0 ? "left" : "right"}
        delay={index * 70}
      >
        <div className="group bg-white/90 backdrop-blur rounded-2xl overflow-hidden border border-white shadow-[0_18px_60px_rgba(15,23,42,0.08)] hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
          <div className="relative h-32 overflow-hidden">
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              onError={(e) => {
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=700&auto=format&fit=crop";
              }}
            />

            <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 text-green-700 text-[10px] font-black shadow">
              {translateQuality(p.quality, t)}
            </span>
          </div>

          <div className="p-4">
            <h4 className="font-black text-gray-900 text-base mb-1">
              {translateCrop(p.name, t)}
            </h4>

            <div className="text-green-700 font-black text-lg mb-2">
              {p.price}
            </div>

            <div className="text-gray-500 text-[11px] flex items-center gap-1 mb-1">
              <MapPin className="w-3 h-3" />
              {translateRegion(p.region, t)}
            </div>

            <div className="text-gray-500 text-[11px] mb-3">
              {t("qty")}:{" "}
              <span className="font-bold text-gray-700">
                {translateQuantity(p.quantity, t)}
              </span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-[11px] text-gray-500 truncate">
                {t("farmer")}:{" "}
                <span className="font-bold text-gray-800">
                  {p.farmer}
                </span>
              </span>

              <button className="text-[11px] font-black text-green-700 hover:text-green-900">
                {t("contact")}
              </button>
            </div>
          </div>
        </div>
      </ScrollReveal>
    ))}
  </div>
</ProfessionalSection>

      {/* ════════════ ACTIVE USERS ════════════ */}
   {/* ════════════ ACTIVE USERS ════════════ */}
<ProfessionalSection variant="mint" maxWidth="max-w-5xl">
  <ScrollReveal from="up" className="text-center mb-12">
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
      <Users className="w-4 h-4" /> {t("activeUsers")}
    </div>

    <h2 className="font-black text-3xl md:text-5xl text-gray-950 mb-4">
      {t("connectingRoles")}
    </h2>

    <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base font-medium">
      {t("activeUsersDesc")}
    </p>

    <div className="w-20 h-1.5 bg-green-600 rounded-full mx-auto mt-6"></div>
  </ScrollReveal>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
    {roleCardsKr.map((card, index) => (
      <ScrollReveal key={card.key} from="up" delay={index * 140}>
        <div className="group bg-white/95 backdrop-blur rounded-[2rem] overflow-hidden shadow-[0_18px_60px_rgba(15,23,42,0.08)] border border-white hover:shadow-2xl hover:-translate-y-3 transition-all duration-700">
          <div className="relative h-44 overflow-hidden">
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent"></div>

            <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-white/95 backdrop-blur text-green-700 text-xs font-black uppercase tracking-widest shadow-md">
              {card.title}
            </div>
          </div>

          <div className="p-6">
            <h3 className="font-black text-2xl text-gray-950 mb-3">
              {card.title}
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed mb-5 font-medium">
              {card.popupDesc}
            </p>

            <div className="space-y-3 mb-6">
              {card.bullets.map((b) => (
                <div
                  key={b}
                  className="flex items-center gap-3 text-sm font-semibold text-gray-700"
                >
                  <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-green-700" />
                  </div>
                  {b}
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedRole(card)}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold shadow-md hover:shadow-lg transition-all"
            >
              {t("learnMore")} <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </ScrollReveal>
    ))}
  </div>

  {selectedRole &&
  createPortal(
    <div className="fixed inset-0 z-[2147483647] flex items-center justify-center px-4 py-6">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => setSelectedRole(null)}
      ></div>

      <div className="relative z-[2147483647] bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-fadeUp">
        <button
          onClick={() => setSelectedRole(null)}
          className="absolute top-4 right-4 z-[2147483647] w-10 h-10 rounded-full bg-white/90 hover:bg-red-50 text-gray-700 hover:text-red-500 flex items-center justify-center shadow-md transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-64 md:h-auto">
            <img
              src={selectedRole.image}
              alt={selectedRole.title}
              className="w-full h-full object-cover"
            />

            <div
              className={`absolute inset-0 bg-gradient-to-br ${selectedRole.color} opacity-60`}
            ></div>
          </div>

          <div className="p-8">
            <h3 className="text-2xl font-black text-gray-950 mb-3">
              {selectedRole.popupTitle}
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed mb-5">
              {selectedRole.popupDesc}
            </p>

            <div className="space-y-3 mb-6">
              {selectedRole.popupPoints.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-green-700" />
                  </div>

                  <p className="text-sm text-gray-700 font-medium">
                    {point}
                  </p>
                </div>
              ))}
            </div>

            <Link
              to={selectedRole.path}
              onClick={() => setSelectedRole(null)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-md transition-all"
            >
              {selectedRole.buttonText}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )}
</ProfessionalSection>

     {/* ════════════ ECOSYSTEM SERVICES ════════════ */}
<ProfessionalSection variant="gray" maxWidth="max-w-5xl">
  <ScrollReveal from="up" className="text-center mb-12">
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100/80 border border-green-200 text-green-700 text-xs font-black uppercase tracking-widest mb-4 shadow-sm">
      <Leaf className="w-4 h-4" />
      AgriConnect Ecosystem
    </div>

    <h2 className="font-black text-3xl md:text-5xl text-gray-950 mb-4">
      {t("ourEcosystemServices")}
    </h2>

    <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base font-medium">
      Explore smart farming tools, market access, crop support and real-time agriculture services in one platform.
    </p>

    <div className="w-20 h-1.5 bg-green-600 rounded-full mx-auto mt-6"></div>
  </ScrollReveal>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {ecosystemServices.map(({ icon: Icon, title, desc, path }, index) => (
      <ScrollReveal
        key={title}
        from={index === 0 ? "left" : index === 1 ? "up" : "right"}
        delay={index * 120}
      >
        <Link
          to={path}
          className="group relative block p-7 rounded-[2rem] bg-white/90 backdrop-blur border border-white shadow-[0_18px_60px_rgba(15,23,42,0.08)] hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden"
        >
          {/* Decorative gradient circle */}
          <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-green-200/40 blur-2xl group-hover:bg-green-300/60 transition-all"></div>

          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-5 group-hover:bg-green-600 group-hover:scale-110 transition-all duration-500 shadow-sm">
              <Icon className="w-7 h-7 text-green-600 group-hover:text-white transition-colors" />
            </div>

            <h3 className="font-black text-xl text-gray-950 mb-3 group-hover:text-green-700 transition-colors">
              {title}
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed font-medium mb-5">
              {desc}
            </p>

            <div className="inline-flex items-center gap-2 text-green-700 font-black text-sm">
              Explore Service
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </div>
        </Link>
      </ScrollReveal>
    ))}
  </div>
</ProfessionalSection>

     {/* ════════════ HOW IT WORKS ════════════ */}
<ProfessionalSection variant="white" maxWidth="max-w-5xl">
  <ScrollReveal from="up">
    <div className="text-center mb-14">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100/80 border border-green-200 text-green-700 text-xs font-black uppercase tracking-widest mb-4 shadow-sm">
        <Check className="w-4 h-4" />
        {t("simpleJourney")}
      </div>

      <h2 className="text-3xl md:text-5xl font-black text-gray-950 mb-4">
        {t("howWorksTitle")}
      </h2>

      <p className="text-gray-600 max-w-2xl mx-auto font-medium">
        {t("howWorksDesc")}
      </p>

      <div className="w-20 h-1.5 bg-green-600 rounded-full mx-auto mt-6"></div>
    </div>
  </ScrollReveal>

  <div className="relative">
    {/* Connecting line for desktop */}
    <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-1 bg-gradient-to-r from-green-200 via-green-500 to-green-200 rounded-full"></div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
      {journeySteps.map((s, index) => (
        <ScrollReveal
          key={s.num}
          from="up"
          delay={index * 140}
          className="text-center relative"
        >
          <div className="group bg-white/90 backdrop-blur rounded-[2rem] border border-white shadow-[0_18px_60px_rgba(15,23,42,0.08)] hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 p-7">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-700 text-white flex items-center justify-center text-2xl font-black mx-auto mb-5 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              {s.num}
            </div>

            <h3 className="font-black text-xl text-gray-950 mb-3 group-hover:text-green-700 transition-colors">
              {s.title}
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto font-medium">
              {s.desc}
            </p>

            <div className="mt-6 inline-flex items-center gap-2 text-green-700 font-black text-sm">
              Step {s.num}
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </div>
</ProfessionalSection>

     {/* ════════════ SMART FARMING ════════════ */}
<ProfessionalSection variant="green" maxWidth="max-w-6xl">
  <ScrollReveal from="up" className="text-center mb-12">
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100/90 border border-green-200 text-green-700 text-xs font-black uppercase tracking-widest mb-4 shadow-sm">
      <Bot className="w-4 h-4" />
      {t("smartAgriculture")}
    </div>

    <h2 className="font-black text-3xl md:text-5xl text-gray-950 mb-3">
      {t("smartFarmingTitle")}
    </h2>

    <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto font-medium">
      {t("smartFarmingDesc")}
    </p>

    <div className="w-20 h-1.5 bg-green-600 rounded-full mx-auto mt-6"></div>
  </ScrollReveal>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    {smartTechCards.map((tech, index) => {
      const Icon = tech.icon;

      return (
        <ScrollReveal
          key={tech.title}
          from={index % 2 === 0 ? "left" : "right"}
          delay={(index % 3) * 100}
        >
          <div className="group bg-white/95 backdrop-blur rounded-[2rem] overflow-hidden border border-white shadow-[0_18px_60px_rgba(15,23,42,0.10)] hover:shadow-2xl hover:-translate-y-3 transition-all duration-700">
            <div className="relative h-44 overflow-hidden">
              <img
                src={tech.image}
                alt={tech.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"></div>

              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-green-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
                {tech.badge}
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white/95 backdrop-blur flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-500">
                  <Icon className="w-5 h-5 text-green-700" />
                </div>

                <h4 className="font-black text-xl text-white drop-shadow-lg">
                  {tech.title}
                </h4>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-600 text-sm leading-relaxed mb-5 font-medium">
                {tech.desc}
              </p>

              <Link
                to={tech.path}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
              >
                {t("explore")}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      );
    })}
  </div>
</ProfessionalSection>
{/* ════════════ MOBILE APP VIDEO PREVIEW ════════════ */}
<section className="relative min-h-screen flex items-center overflow-hidden py-20 bg-gradient-to-br from-white via-green-50 to-emerald-100">
  {/* background blobs */}
  <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-300/25 rounded-full blur-3xl"></div>
  <div className="absolute bottom-0 -right-24 w-96 h-96 bg-emerald-300/25 rounded-full blur-3xl"></div>

  {/* dotted pattern */}
  <div
    className="absolute inset-0 opacity-[0.045]"
    style={{
      backgroundImage:
        "radial-gradient(circle at 1px 1px, #14532d 1px, transparent 0)",
      backgroundSize: "26px 26px",
    }}
  ></div>

  <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
      {/* Left Content */}
      <ScrollReveal from="left">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 border border-green-200 text-green-700 text-xs font-black uppercase tracking-widest mb-5 shadow-sm">
            <Phone className="w-4 h-4" />
            Mobile App Preview
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-950 leading-[1.05] mb-6 tracking-tight">
            Upload Crops
            <span className="block text-green-700">
              Easily from Mobile
            </span>
          </h2>

          <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium mb-8 max-w-lg">
            Farmers can upload crop details, add price, quantity, location and
            manage crop listings directly from a simple mobile dashboard.
          </p>

          <div className="space-y-4 mb-9">
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-700" />
              </div>

              <p className="text-slate-700 font-bold leading-relaxed">
                Upload crop name, crop image, quantity and price.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-700" />
              </div>

              <p className="text-slate-700 font-bold leading-relaxed">
                Show uploaded crops in a clean marketplace listing.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-green-700" />
              </div>

              <p className="text-slate-700 font-bold leading-relaxed">
                Mobile-friendly interface for farmers, buyers and agronomists.
              </p>
            </div>
          </div>

          <Link
            to="/marketplace"
            className="inline-flex items-center gap-2 px-7 py-4 bg-green-600 hover:bg-green-700 text-white font-black rounded-2xl shadow-[0_14px_35px_rgba(22,163,74,0.28)] transition-all hover:-translate-y-1"
          >
            Explore Marketplace
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </ScrollReveal>

      {/* Right Video */}
      <ScrollReveal from="right" delay={150}>
        <PhoneMockVideo />
      </ScrollReveal>
    </div>
  </div>
</section>
{/* ════════════ WEATHER & ADVISORY ════════════ */}
<section
  ref={weatherSectionRef}
  id="weather"
  className="relative min-h-screen flex items-center py-14 overflow-hidden"
>
  <div className="absolute inset-0">
    {weatherSlides.map((slide, index) => (
      <img
        key={slide.title}
        src={slide.image}
        alt={slide.title}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1000ms] ease-in-out ${
          index === weatherSlide
            ? "opacity-100 scale-110 blur-[1px]"
            : "opacity-0 scale-95 blur-0"
        }`}
      />
    ))}
  </div>

  <div className="absolute inset-0 bg-black/25"></div>
  <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/50 to-green-950/55"></div>

  {/* Professional background glow */}
  <div className="absolute -top-24 -left-24 w-80 h-80 bg-green-300/25 rounded-full blur-3xl"></div>
  <div className="absolute bottom-0 -right-24 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl"></div>

  <div
    className="absolute inset-0 opacity-[0.04]"
    style={{
      backgroundImage:
        "radial-gradient(circle at 1px 1px, #14532d 1px, transparent 0)",
      backgroundSize: "28px 28px",
    }}
  ></div>

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
      />
    ))}
  </div>

  <div className="relative z-10 max-w-5xl mx-auto px-6 w-full">
    <div
      className={`text-center mb-10 transition-all duration-1000 ${
        weatherVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-green-200 text-green-700 text-xs font-black uppercase tracking-widest mb-4 shadow-sm">
        <CloudSun className="w-4 h-4" />
        Smart Weather Advisory
      </div>

      <h2 className="font-black text-4xl md:text-5xl text-gray-950 mb-4">
        {t("weatherCropAdvisory")}
      </h2>

      <p className="text-gray-800 max-w-3xl mx-auto text-sm md:text-base leading-relaxed font-medium">
        {t("weatherAdvisoryDesc")}
      </p>

      <div className="w-20 h-1.5 bg-green-600 rounded-full mx-auto mt-5"></div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
      <div
        className={`space-y-5 transition-all duration-1000 delay-200 ${
          weatherVisible
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-24"
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-green-50/95 backdrop-blur p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] border border-white">
            <p className="text-[11px] uppercase tracking-[0.35em] text-green-700 font-black mb-4">
              {t("cropRisk")}
            </p>
            <h3 className="text-xl font-black text-green-800">
              {t("low")}
            </h3>
          </div>

          <div className="rounded-2xl bg-amber-50/95 backdrop-blur p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] border border-white">
            <p className="text-[11px] uppercase tracking-[0.35em] text-amber-700 font-black mb-4">
              {t("harvestWindow")}
            </p>
            <h3 className="text-xl font-black text-amber-800">
              {t("days34")}
            </h3>
          </div>

          <div className="rounded-2xl bg-sky-50/95 backdrop-blur p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] border border-white">
            <p className="text-[11px] uppercase tracking-[0.35em] text-sky-700 font-black mb-4">
              {t("irrigationTip")}
            </p>
            <h3 className="text-xl font-black text-sky-800">
              {t("morning")}
            </h3>
          </div>
        </div>

        <div className="rounded-3xl bg-white/92 backdrop-blur-md p-6 md:p-7 shadow-[0_18px_60px_rgba(15,23,42,0.12)] border border-white">
          <h3 className="font-black text-gray-950 text-lg mb-6">
            {t("whatThisMeans")}
          </h3>

          <div className="space-y-5">
            {[t("weatherTip1"), t("weatherTip2"), t("weatherTip3")].map(
              (tip, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${
                      i === 0
                        ? "bg-green-100 text-green-700"
                        : i === 1
                        ? "bg-amber-100 text-amber-700"
                        : "bg-sky-100 text-sky-700"
                    }`}
                  >
                    {i + 1}
                  </div>

                  <p className="text-sm text-gray-700 leading-relaxed font-medium">
                    {tip}
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-white/90 backdrop-blur p-4 border border-white shadow-[0_18px_60px_rgba(15,23,42,0.08)] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
            <CloudSun className="w-5 h-5 text-green-700" />
          </div>

          <div>
            <h4 className="font-black text-gray-900 text-sm">
              {t("smartAdvisory")}
            </h4>

            <p className="text-xs text-gray-600">
              {t("smartAdvisorySubtitle")}
            </p>
          </div>
        </div>
      </div>

      <div
        className={`rounded-3xl overflow-hidden shadow-2xl border border-white bg-white/95 backdrop-blur transition-all duration-1000 delay-300 ${
          weatherVisible
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-24"
        }`}
      >
        <div className="bg-gradient-to-br from-green-950 to-emerald-900 px-6 md:px-8 py-7 text-white">
          <div className="flex items-center justify-between gap-4 mb-5">
            <p className="text-[11px] uppercase tracking-[0.35em] text-green-300 font-black">
              {t("currentLocalSnapshot")}
            </p>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-green-100 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              {t("live")}
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-black mb-3">
            {t("cropReadyWeather")}
          </h3>

          <p className="text-green-100 text-sm leading-relaxed max-w-xl">
            {t("cropReadyDesc")}
          </p>
        </div>

        <div className="bg-white p-5 md:p-6">
          <WeatherWidget />
        </div>
      </div>
    </div>
  </div>
</section>
      {/* ════════════ MANDI PRICES ════════════ */}
<ProfessionalSection id="mandi" variant="gray" maxWidth="max-w-5xl">
  <ScrollReveal from="up">
    <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
      <div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100/80 border border-green-200 text-green-700 text-xs font-black uppercase tracking-widest mb-4 shadow-sm">
          <BarChart2 className="w-4 h-4" />
          {t("liveMarketData")}
        </div>

        <h2 className="font-black text-3xl md:text-5xl text-gray-950 mb-3">
          {t("todaysMandiPrices")}
        </h2>

        <p className="text-gray-600 text-sm md:text-base font-medium max-w-2xl">
          {t("todaysMandiDesc")}
        </p>
      </div>

      <a
        href="https://agmarknet.gov.in"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-5 py-3 bg-white/90 backdrop-blur border border-green-200 text-green-700 rounded-xl text-sm font-black hover:bg-green-50 hover:-translate-y-1 shadow-sm hover:shadow-xl transition-all"
      >
        <Building2 className="w-4 h-4" />
        {t("viewOnAgmarknet")}
      </a>
    </div>
  </ScrollReveal>

  <ScrollReveal from="up" delay={150}>
    <div className="rounded-[2rem] bg-white/90 backdrop-blur border border-white shadow-[0_18px_60px_rgba(15,23,42,0.10)] overflow-hidden">
      <MandiWidget />
    </div>
  </ScrollReveal>
</ProfessionalSection>

{/* ════════════ PARTNER WITH US ════════════ */}
<ProfessionalSection variant="white" maxWidth="max-w-6xl">
  <ScrollReveal from="up" className="text-center mb-10">
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100/80 border border-green-200 text-green-700 text-xs font-black uppercase tracking-widest mb-4 shadow-sm">
      <Handshake className="w-4 h-4" />
      Partner Network
    </div>

    <h2 className="font-black text-3xl md:text-5xl text-gray-950 mb-4">
      {t("partnerTitle")}
    </h2>

    <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base font-medium">
      Build stronger agriculture partnerships with input brands, farm services and market linkage support.
    </p>

    <div className="w-20 h-1.5 bg-green-600 rounded-full mx-auto mt-6"></div>
  </ScrollReveal>

  <ScrollReveal from="up" delay={100}>
    <div className="flex justify-center mb-10">
      <div className="bg-white/90 backdrop-blur border border-white shadow-[0_18px_60px_rgba(15,23,42,0.08)] rounded-2xl p-2 flex flex-wrap justify-center gap-2">
        {partnerTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 md:px-8 py-3 text-sm md:text-base font-black rounded-xl transition-all relative ${
              activeTab === tab.id
                ? "bg-green-600 text-white shadow-lg"
                : "text-gray-500 hover:text-green-700 hover:bg-green-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  </ScrollReveal>

  <ScrollReveal from="up" delay={200}>
    <div className="bg-white/90 backdrop-blur rounded-[2rem] p-8 md:p-12 grid grid-cols-1 lg:grid-cols-5 gap-10 border border-white shadow-[0_18px_60px_rgba(15,23,42,0.10)]">
      <div className="lg:col-span-3">
        <p className="text-gray-600 text-base leading-relaxed mb-8 font-medium">
          {currentTab.desc}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentTab.items.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="group flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-br from-white to-green-50/50 border border-green-100/70 hover:border-green-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
            >
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 group-hover:scale-110 transition-all">
                <Icon className="w-5 h-5 text-green-600 group-hover:text-white transition-colors" />
              </div>

              <span className="text-sm font-bold text-gray-800">
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mt-8">
          <Link
            to="/contact"
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            {t("requestDemo")}
          </Link>

          <Link
            to="/about"
            className="px-6 py-3 bg-white text-green-700 font-bold text-sm rounded-xl border border-green-300 hover:bg-green-50 hover:-translate-y-1 shadow-sm hover:shadow-xl transition-all"
          >
            {t("exploreMore")}
          </Link>
        </div>
      </div>

      <div className="lg:col-span-2 flex items-center justify-center">
        <div className="relative">
          <div className="absolute -top-8 -left-8 w-28 h-28 bg-green-300/30 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-emerald-300/30 rounded-full blur-2xl"></div>

          <div className="relative w-64 h-[480px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl border border-gray-800">
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-gray-900 rounded-b-2xl z-10"></div>

            <div className="w-full h-full bg-white rounded-[2.4rem] overflow-hidden relative">
              <div className="flex justify-between items-center px-5 pt-3 pb-2 text-[10px] font-semibold text-gray-700">
                <span>12:30</span>
                <span>📶 🔋</span>
              </div>

              <div className="px-4 pb-3 flex items-center justify-between border-b border-gray-100">
                <button className="text-gray-500 text-lg">←</button>
                <span className="text-xs font-semibold text-gray-700">
                  Product Details
                </span>
                <span className="text-gray-500">⋯</span>
              </div>

              <div className="relative h-44 bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_1px_1px,#16a34a_1px,transparent_0)] bg-[length:18px_18px]"></div>

                <div className="relative w-32 h-36 bg-gradient-to-br from-green-500 to-emerald-700 rounded-xl shadow-xl flex flex-col items-center justify-center text-white p-3">
                  <div className="text-[8px] font-bold uppercase mb-1">
                    Harvest+
                  </div>
                  <div className="text-2xl font-black mb-1">DITTO</div>
                  <div className="text-lg font-black mb-2">50</div>
                  <Leaf className="w-6 h-6" />
                </div>
              </div>

              <div className="flex justify-center gap-1 my-2">
                <span className="w-5 h-1 rounded-full bg-green-500"></span>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              </div>

              <div className="px-4 py-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-md bg-green-600 flex items-center justify-center">
                    <Leaf className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-[10px] font-bold text-gray-700">
                    Harvest Plus
                  </span>
                </div>

                <h5 className="font-bold text-sm text-gray-900 mb-2">
                  Ditto 50 Atrazine 50% WP
                </h5>

                <div className="bg-gray-50 rounded-lg p-2 mb-3">
                  <div className="text-[9px] text-gray-500 mb-1">
                    इस प्रोडक्ट के बारे में
                  </div>

                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-gray-700">वजन मात्रा</span>
                    <span className="font-semibold text-gray-900">
                      1 किलोग्राम, 2 किलोग्राम
                    </span>
                  </div>
                </div>

                <button className="w-full py-2 bg-green-600 text-white text-xs font-bold rounded-lg shadow-md">
                  मुझे चाहिए
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ScrollReveal>
</ProfessionalSection>
     {/* ════════════ TESTIMONIALS ════════════ */}
<ProfessionalSection variant="mint" maxWidth="max-w-5xl">
  <ScrollReveal from="up" className="text-center mb-12">
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100/80 border border-green-200 text-green-700 text-xs font-black uppercase tracking-widest mb-4 shadow-sm">
      <Users className="w-4 h-4" />
      Farmer Success Stories
    </div>

    <h2 className="font-black text-3xl md:text-5xl text-gray-950 mb-4">
      {t("voicesOfSuccess")}
    </h2>

    <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base font-medium">
      Real farmers sharing how AgriConnect helped them sell better, protect crops and make smarter decisions.
    </p>

    <div className="w-20 h-1.5 bg-green-600 rounded-full mx-auto mt-6"></div>
  </ScrollReveal>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {testimonials.map(({ name, location, text }, index) => (
      <ScrollReveal
        key={name}
        from={index === 0 ? "left" : index === 1 ? "up" : "right"}
        delay={index * 120}
      >
        <div className="group relative p-6 rounded-[2rem] bg-white/95 backdrop-blur border border-white shadow-[0_18px_60px_rgba(15,23,42,0.08)] hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden">
          {/* decorative glow */}
          <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-green-200/40 blur-2xl group-hover:bg-green-300/60 transition-all"></div>

          <div className="relative z-10">
            <div className="flex gap-0.5 mb-4 text-amber-400 text-lg">
              {[...Array(5)].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>

            <div className="text-5xl text-green-100 font-black leading-none mb-2">
              “
            </div>

            <p className="text-gray-700 text-sm leading-relaxed mb-6 italic font-medium">
              "{text}"
            </p>

            <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center font-black text-white shadow-lg">
                {name.charAt(0)}
              </div>

              <div>
                <div className="font-black text-gray-950 text-sm">
                  {name}
                </div>

                <div className="text-gray-500 text-xs flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-green-600" />
                  {t("farmer")}, {location}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    ))}
  </div>
</ProfessionalSection>

{/* ════════════ CTA ════════════ */}
<ProfessionalSection variant="dark" maxWidth="max-w-5xl">
  <ScrollReveal from="zoom">
    <div className="relative rounded-[2rem] bg-gradient-to-br from-green-600 via-emerald-700 to-green-950 overflow-hidden shadow-2xl border border-white/10">
      {/* background effects */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-lime-300/20 rounded-full blur-3xl"></div>
      <div className="absolute top-0 right-0 opacity-10">
        <Leaf className="w-72 h-72 text-white -rotate-12" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "26px 26px",
        }}
      ></div>

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 items-center p-8 md:p-12">
        <div className="hidden md:block">
          <div className="relative">
            <div className="absolute -top-5 -left-5 w-24 h-24 bg-lime-300/30 rounded-full blur-2xl"></div>

            <div className="relative w-52 h-60 rounded-[2rem] overflow-hidden shadow-2xl border border-white/20 rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
              <img
                src={IMG.ctaFarmer}
                alt="Farmer"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"></div>

              <div className="absolute bottom-4 left-4 right-4">
                <div className="px-3 py-2 rounded-xl bg-white/90 backdrop-blur text-green-700 text-xs font-black shadow-md">
                  Smart Farming Ready
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/20 text-green-100 text-xs font-black uppercase tracking-widest mb-5">
            <Sprout className="w-4 h-4" />
            Join AgriConnect
          </div>

          <h2 className="font-black text-3xl md:text-4xl text-white leading-tight mb-4">
            {t("ctaTitle")}
          </h2>

          <p className="text-green-100 text-sm md:text-base leading-relaxed font-medium">
            {t("ctaDesc")}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            to="/login"
            className="group flex items-center justify-center gap-2 px-6 py-4 bg-white text-green-700 font-black rounded-xl shadow-lg hover:bg-green-50 transition-all hover:-translate-y-1"
          >
            <ShoppingBag className="w-4 h-4" />
            {t("downloadApp")}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>

          <Link
            to="/expert"
            className="group flex items-center justify-center gap-2 px-6 py-4 bg-green-950/70 hover:bg-green-950 text-white font-black rounded-xl border border-white/20 transition-all hover:-translate-y-1 shadow-lg"
          >
            <MessageCircle className="w-4 h-4" />
            {t("talkToExpert")}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  </ScrollReveal>
</ProfessionalSection>

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
    const loadUser = () => {
      const stored = localStorage.getItem("agriUser");
      setUser(stored ? JSON.parse(stored) : null);
    };

    loadUser();

    window.addEventListener("storage", loadUser);

    return () => window.removeEventListener("storage", loadUser);
  }, []);

  if (user && user.role === "farmer") {
    return <FarmerDashboard user={user} />;
  }

  return <DefaultHome />;
};

export default Home;