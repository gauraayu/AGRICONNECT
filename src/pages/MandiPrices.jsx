import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BarChart2,
  Search,
  MapPin,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronDown,
  IndianRupee,
  Leaf,
} from "lucide-react";
import { mandiPrices } from "../data/mandiPrices";
import { useLanguage } from "../context/LanguageContext";

const TEXT = {
  en: {
    back: "Back to Home",
    badge: "Dummy Mandi Price Board",
    title: "Today's Mandi Prices",
    desc: "Check dummy mandi rates for 50 crops across different Indian markets. Search by crop, mandi, state or quality.",
    listings: "Listings",
    rising: "Rising",
    highest: "Highest",
    search: "Search crop, mandi, state or quality...",
    allStates: "All States",
    cropsRising: "Crops price rising",
    cropsFalling: "Crops price falling",
    highestPrice: "Highest dummy price",
    crop: "Crop",
    price: "Price",
    change: "Change",
    market: "Market",
    quality: "Quality",
    noFound: "No mandi price found",
    trySearch: "Try searching wheat, rice, Bhopal, premium etc.",
    note: "Note: This is dummy mandi price data for UI/demo purpose.",
    unit: "₹/quintal",
  },
  hi: {
    back: "होम पर वापस जाएँ",
    badge: "डमी मंडी भाव बोर्ड",
    title: "आज के मंडी भाव",
    desc: "भारत की अलग-अलग मंडियों में 50 फसलों के डमी भाव देखें। फसल, मंडी, राज्य या गुणवत्ता से खोजें।",
    listings: "लिस्टिंग",
    rising: "बढ़त",
    highest: "सबसे अधिक",
    search: "फसल, मंडी, राज्य या गुणवत्ता खोजें...",
    allStates: "सभी राज्य",
    cropsRising: "फसलों के भाव बढ़ रहे हैं",
    cropsFalling: "फसलों के भाव गिर रहे हैं",
    highestPrice: "सबसे अधिक डमी भाव",
    crop: "फसल",
    price: "भाव",
    change: "बदलाव",
    market: "मंडी",
    quality: "गुणवत्ता",
    noFound: "कोई मंडी भाव नहीं मिला",
    trySearch: "गेहूँ, चावल, भोपाल, प्रीमियम आदि खोजें।",
    note: "नोट: यह UI/demo purpose के लिए डमी मंडी भाव डेटा है।",
    unit: "₹/क्विंटल",
  },
  pa: {
    back: "ਹੋਮ ਤੇ ਵਾਪਸ ਜਾਓ",
    badge: "ਡਮੀ ਮੰਡੀ ਭਾਅ ਬੋਰਡ",
    title: "ਅੱਜ ਦੇ ਮੰਡੀ ਭਾਅ",
    desc: "ਭਾਰਤ ਦੀਆਂ ਵੱਖ-ਵੱਖ ਮੰਡੀਆਂ ਵਿੱਚ 50 ਫਸਲਾਂ ਦੇ ਡਮੀ ਭਾਅ ਵੇਖੋ। ਫਸਲ, ਮੰਡੀ, ਰਾਜ ਜਾਂ ਗੁਣਵੱਤਾ ਨਾਲ ਖੋਜੋ।",
    listings: "ਲਿਸਟਿੰਗ",
    rising: "ਵੱਧ ਰਹੇ",
    highest: "ਸਭ ਤੋਂ ਵੱਧ",
    search: "ਫਸਲ, ਮੰਡੀ, ਰਾਜ ਜਾਂ ਗੁਣਵੱਤਾ ਖੋਜੋ...",
    allStates: "ਸਾਰੇ ਰਾਜ",
    cropsRising: "ਫਸਲਾਂ ਦੇ ਭਾਅ ਵੱਧ ਰਹੇ ਹਨ",
    cropsFalling: "ਫਸਲਾਂ ਦੇ ਭਾਅ ਘੱਟ ਰਹੇ ਹਨ",
    highestPrice: "ਸਭ ਤੋਂ ਵੱਧ ਡਮੀ ਭਾਅ",
    crop: "ਫਸਲ",
    price: "ਭਾਅ",
    change: "ਬਦਲਾਅ",
    market: "ਮੰਡੀ",
    quality: "ਗੁਣਵੱਤਾ",
    noFound: "ਕੋਈ ਮੰਡੀ ਭਾਅ ਨਹੀਂ ਮਿਲਿਆ",
    trySearch: "ਗੰਧੁਮ, ਚੌਲ, ਭੋਪਾਲ, ਪ੍ਰੀਮਿਯਮ ਆਦਿ ਖੋਜੋ।",
    note: "ਨੋਟ: ਇਹ UI/demo purpose ਲਈ ਡਮੀ ਮੰਡੀ ਭਾਅ ਡਾਟਾ ਹੈ।",
    unit: "₹/ਕੁਇੰਟਲ",
  },
};

const CROP_PA = {
  Wheat: "ਗੰਧੁਮ",
  Soybean: "ਸੋਯਾਬੀਨ",
  Rice: "ਚੌਲ",
  Maize: "ਮੱਕੀ",
  Cotton: "ਕਪਾਹ",
  Mustard: "ਸਰੋਂ",
  Tomato: "ਟਮਾਟਰ",
  Potato: "ਆਲੂ",
  Onion: "ਪਿਆਜ਼",
  Sugarcane: "ਗੰਨਾ",
  "Green Chilli": "ਹਰੀ ਮਿਰਚ",
  Banana: "ਕੇਲਾ",
  Apple: "ਸੇਬ",
  Mango: "ਅੰਬ",
  Grapes: "ਅੰਗੂਰ",
  Carrot: "ਗਾਜਰ",
  Cabbage: "ਪੱਤਾ ਗੋਭੀ",
  Cauliflower: "ਫੁੱਲ ਗੋਭੀ",
  Brinjal: "ਬੈਂਗਣ",
  "Green Peas": "ਹਰੇ ਮਟਰ",
  "Basmati Rice": "ਬਾਸਮਤੀ ਚੌਲ",
  Groundnut: "ਮੂੰਗਫਲੀ",
  "Tur Dal": "ਅਰਹਰ ਦਾਲ",
  "Moong Dal": "ਮੂੰਗ ਦਾਲ",
  "Urad Dal": "ਉੜਦ ਦਾਲ",
  Gram: "ਚਣਾ",
  Barley: "ਜੌ",
  Jowar: "ਜਵਾਰ",
  Bajra: "ਬਾਜਰਾ",
  Ragi: "ਰਾਗੀ",
  Coriander: "ਧਨੀਆ",
  Cumin: "ਜੀਰਾ",
  Turmeric: "ਹਲਦੀ",
  Garlic: "ਲਸਣ",
  Ginger: "ਅਦਰਕ",
  Lemon: "ਨਿੰਬੂ",
  Orange: "ਸੰਤਰਾ",
  Papaya: "ਪਪੀਤਾ",
  Watermelon: "ਤਰਬੂਜ਼",
  Pomegranate: "ਅਨਾਰ",
  Spinach: "ਪਾਲਕ",
  Fenugreek: "ਮੇਥੀ",
  "Bottle Gourd": "ਲੌਕੀ",
  "Bitter Gourd": "ਕਰੇਲਾ",
  Pumpkin: "ਕੱਦੂ",
  Cucumber: "ਖੀਰਾ",
  Beans: "ਫਲੀਆਂ",
  Capsicum: "ਸ਼ਿਮਲਾ ਮਿਰਚ",
  Coconut: "ਨਾਰੀਅਲ",
  "Tea Leaves": "ਚਾਹ ਪੱਤੀ",
};

const MARKET_HI = {
  Bhopal: "भोपाल",
  Indore: "इंदौर",
  Raipur: "रायपुर",
  Jabalpur: "जबलपुर",
  Nagpur: "नागपुर",
  Jaipur: "जयपुर",
  Nashik: "नाशिक",
  Agra: "आगरा",
  Lasalgaon: "लासलगांव",
  Meerut: "मेरठ",
  Guntur: "गुंटूर",
  Trichy: "त्रिची",
  Shimla: "शिमला",
  Ratnagiri: "रत्नागिरी",
  Sangli: "सांगली",
  Azadpur: "आज़ादपुर",
  Siliguri: "सिलीगुड़ी",
  Ludhiana: "लुधियाना",
  Kanpur: "कानपुर",
  Karnal: "करनाल",
  Rajkot: "राजकोट",
  Akola: "अकोला",
  Kota: "कोटा",
  Vidisha: "विदिशा",
  Hisar: "हिसार",
  Solapur: "सोलापुर",
  Jodhpur: "जोधपुर",
  Mysuru: "मैसूरु",
  Unjha: "ऊंझा",
  Erode: "इरोड",
  Mandsaur: "मंदसौर",
  Kochi: "कोच्चि",
  Hyderabad: "हैदराबाद",
  Surat: "सूरत",
  Bengaluru: "बेंगलुरु",
  Pune: "पुणे",
  Darjeeling: "दार्जिलिंग",
  Patna: "पटना",
  Delhi: "दिल्ली",
};

const MARKET_PA = {
  Bhopal: "ਭੋਪਾਲ",
  Indore: "ਇੰਦੌਰ",
  Raipur: "ਰਾਇਪੁਰ",
  Jabalpur: "ਜਬਲਪੁਰ",
  Nagpur: "ਨਾਗਪੁਰ",
  Jaipur: "ਜੈਪੁਰ",
  Nashik: "ਨਾਸਿਕ",
  Agra: "ਆਗਰਾ",
  Lasalgaon: "ਲਾਸਲਗਾਂਵ",
  Meerut: "ਮੇਰਠ",
  Guntur: "ਗੁੰਟੂਰ",
  Trichy: "ਤ੍ਰਿਚੀ",
  Shimla: "ਸ਼ਿਮਲਾ",
  Ratnagiri: "ਰਤਨਾਗਿਰੀ",
  Sangli: "ਸਾਂਗਲੀ",
  Azadpur: "ਆਜ਼ਾਦਪੁਰ",
  Siliguri: "ਸਿਲੀਗੁੜੀ",
  Ludhiana: "ਲੁਧਿਆਣਾ",
  Kanpur: "ਕਾਨਪੁਰ",
  Karnal: "ਕਰਨਾਲ",
  Rajkot: "ਰਾਜਕੋਟ",
  Akola: "ਅਕੋਲਾ",
  Kota: "ਕੋਟਾ",
  Vidisha: "ਵਿਦਿਸ਼ਾ",
  Hisar: "ਹਿਸਾਰ",
  Solapur: "ਸੋਲਾਪੁਰ",
  Jodhpur: "ਜੋਧਪੁਰ",
  Mysuru: "ਮੈਸੂਰੁ",
  Unjha: "ਊੰਝਾ",
  Erode: "ਇਰੋਡ",
  Mandsaur: "ਮੰਦਸੌਰ",
  Kochi: "ਕੋਚੀ",
  Hyderabad: "ਹੈਦਰਾਬਾਦ",
  Surat: "ਸੂਰਤ",
  Bengaluru: "ਬੈਂਗਲੁਰੂ",
  Pune: "ਪੁਣੇ",
  Darjeeling: "ਦਾਰਜੀਲਿੰਗ",
  Patna: "ਪਟਨਾ",
  Delhi: "ਦਿੱਲੀ",
};

const STATE_HI = {
  "Madhya Pradesh": "मध्य प्रदेश",
  Maharashtra: "महाराष्ट्र",
  Rajasthan: "राजस्थान",
  Chhattisgarh: "छत्तीसगढ़",
  "Uttar Pradesh": "उत्तर प्रदेश",
  "Andhra Pradesh": "आंध्र प्रदेश",
  "Tamil Nadu": "तमिलनाडु",
  "Himachal Pradesh": "हिमाचल प्रदेश",
  Delhi: "दिल्ली",
  "West Bengal": "पश्चिम बंगाल",
  Punjab: "पंजाब",
  Haryana: "हरियाणा",
  Gujarat: "गुजरात",
  Karnataka: "कर्नाटक",
  Kerala: "केरल",
  Telangana: "तेलंगाना",
  Bihar: "बिहार",
};

const STATE_PA = {
  "Madhya Pradesh": "ਮੱਧ ਪ੍ਰਦੇਸ਼",
  Maharashtra: "ਮਹਾਰਾਸ਼ਟਰ",
  Rajasthan: "ਰਾਜਸਥਾਨ",
  Chhattisgarh: "ਛੱਤੀਸਗੜ੍ਹ",
  "Uttar Pradesh": "ਉੱਤਰ ਪ੍ਰਦੇਸ਼",
  "Andhra Pradesh": "ਆਂਧਰਾ ਪ੍ਰਦੇਸ਼",
  "Tamil Nadu": "ਤਮਿਲਨਾਡੂ",
  "Himachal Pradesh": "ਹਿਮਾਚਲ ਪ੍ਰਦੇਸ਼",
  Delhi: "ਦਿੱਲੀ",
  "West Bengal": "ਪੱਛਮੀ ਬੰਗਾਲ",
  Punjab: "ਪੰਜਾਬ",
  Haryana: "ਹਰਿਆਣਾ",
  Gujarat: "ਗੁਜਰਾਤ",
  Karnataka: "ਕਰਨਾਟਕ",
  Kerala: "ਕੇਰਲ",
  Telangana: "ਤੇਲੰਗਾਨਾ",
  Bihar: "ਬਿਹਾਰ",
};

const QUALITY_HI = {
  Premium: "प्रीमियम",
  Organic: "ऑर्गेनिक",
  Fresh: "ताज़ा",
  "A Grade": "ए ग्रेड",
  "Export Quality": "निर्यात गुणवत्ता",
  Good: "अच्छी",
  "Fresh Cut": "ताज़ा कटी",
};

const QUALITY_PA = {
  Premium: "ਪ੍ਰੀਮਿਯਮ",
  Organic: "ਆਰਗੈਨਿਕ",
  Fresh: "ਤਾਜ਼ਾ",
  "A Grade": "ਏ ਗ੍ਰੇਡ",
  "Export Quality": "ਨਿਰਯਾਤ ਗੁਣਵੱਤਾ",
  Good: "ਚੰਗੀ",
  "Fresh Cut": "ਤਾਜ਼ਾ ਕੱਟੀ",
};
const CROP_IMAGES = {
  Wheat:
    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=120&auto=format&fit=crop",
  Soybean:
    "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=120&auto=format&fit=crop",
  Rice:
    "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=120&auto=format&fit=crop",
  Maize:
    "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=120&auto=format&fit=crop",
  Cotton:
    "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=120&auto=format&fit=crop",
  Mustard:
    "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=120&auto=format&fit=crop",
  Tomato:
    "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=120&auto=format&fit=crop",
  Potato:
    "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=120&auto=format&fit=crop",
  Onion:
    "https://images.unsplash.com/photo-1508747703725-719777637510?w=120&auto=format&fit=crop",
  Sugarcane:
    "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=120&auto=format&fit=crop",

  "Green Chilli":
    "https://images.unsplash.com/photo-1526346698789-22fd84314424?w=120&auto=format&fit=crop",
  Banana:
    "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=120&auto=format&fit=crop",
  Apple:
    "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=120&auto=format&fit=crop",
  Mango:
    "https://images.unsplash.com/photo-1553279768-865429fa0078?w=120&auto=format&fit=crop",
  Grapes:
    "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=120&auto=format&fit=crop",
  Carrot:
    "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=120&auto=format&fit=crop",
  Cabbage:
    "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=120&auto=format&fit=crop",
  Cauliflower:
    "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=120&auto=format&fit=crop",
  Brinjal:
    "https://images.unsplash.com/photo-1604245437608-50c6bb8d4ee4?w=120&auto=format&fit=crop",
  "Green Peas":
    "https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=120&auto=format&fit=crop",

  "Basmati Rice":
    "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=120&auto=format&fit=crop",
  Groundnut:
    "https://images.unsplash.com/photo-1536591375667-8530c944d9e9?w=120&auto=format&fit=crop",
  "Tur Dal":
    "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=120&auto=format&fit=crop",
  "Moong Dal":
    "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=120&auto=format&fit=crop",
  "Urad Dal":
    "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=120&auto=format&fit=crop",
  Gram:
    "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=120&auto=format&fit=crop",
  Barley:
    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=120&auto=format&fit=crop",
  Jowar:
    "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=120&auto=format&fit=crop",
  Bajra:
    "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=120&auto=format&fit=crop",
  Ragi:
    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=120&auto=format&fit=crop",

  Coriander:
    "https://images.unsplash.com/photo-1600628422019-1e572d8f179e?w=120&auto=format&fit=crop",
  Cumin:
    "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=120&auto=format&fit=crop",
  Turmeric:
    "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?w=120&auto=format&fit=crop",
  Garlic:
    "https://images.unsplash.com/photo-1615477550927-6ec4a8c5bb2f?w=120&auto=format&fit=crop",
  Ginger:
    "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=120&auto=format&fit=crop",
  Lemon:
    "https://images.unsplash.com/photo-1587496679742-bad502958fbf?w=120&auto=format&fit=crop",
  Orange:
    "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=120&auto=format&fit=crop",
  Papaya:
    "https://images.unsplash.com/photo-1617112848923-cc2234396a8d?w=120&auto=format&fit=crop",
  Watermelon:
    "https://images.unsplash.com/photo-1563114773-84221bd62daa?w=120&auto=format&fit=crop",
  Pomegranate:
    "https://images.unsplash.com/photo-1606509036992-4399d5c5afe4?w=120&auto=format&fit=crop",

  Spinach:
    "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=120&auto=format&fit=crop",
  Fenugreek:
    "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=120&auto=format&fit=crop",
  "Bottle Gourd":
    "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=120&auto=format&fit=crop",
  "Bitter Gourd":
    "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=120&auto=format&fit=crop",
  Pumpkin:
    "https://images.unsplash.com/photo-1506917728037-b6af01a7d403?w=120&auto=format&fit=crop",
  Cucumber:
    "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=120&auto=format&fit=crop",
  Beans:
    "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=120&auto=format&fit=crop",
  Capsicum:
    "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=120&auto=format&fit=crop",
  Coconut:
    "https://images.unsplash.com/photo-1580984969071-a8da5656c2fb?w=120&auto=format&fit=crop",
  "Tea Leaves":
    "https://images.unsplash.com/photo-1523920290228-4f321a939b4c?w=120&auto=format&fit=crop",
};

const FALLBACK_CROP_IMAGE =
  "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=120&auto=format&fit=crop";

const getCropImage = (cropName) => {
  return CROP_IMAGES[cropName] || FALLBACK_CROP_IMAGE;
};
const normalizeLang = (lang) => {
  if (lang === "hi" || lang === "hin") return "hi";
  if (lang === "pa") return "pa";
  return "en";
};

const MandiPrices = () => {
  const { lang } = useLanguage();
  const currentLang = normalizeLang(lang);
  const text = TEXT[currentLang];

  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("all");

  const translateCrop = (item) => {
    if (currentLang === "hi") return item.hindi || item.crop;
    if (currentLang === "pa") return CROP_PA[item.crop] || item.crop;
    return item.crop;
  };

  const translateSubCrop = (item) => {
    if (currentLang === "en") return item.hindi;
    return item.crop;
  };

  const translateMarket = (market) => {
    if (currentLang === "hi") return MARKET_HI[market] || market;
    if (currentLang === "pa") return MARKET_PA[market] || market;
    return market;
  };

  const translateState = (state) => {
    if (currentLang === "hi") return STATE_HI[state] || state;
    if (currentLang === "pa") return STATE_PA[state] || state;
    return state;
  };

  const translateQuality = (quality) => {
    if (currentLang === "hi") return QUALITY_HI[quality] || quality;
    if (currentLang === "pa") return QUALITY_PA[quality] || quality;
    return quality;
  };

  const formatNumber = (num) => {
    if (currentLang === "hi") return Number(num).toLocaleString("hi-IN");
    if (currentLang === "pa") return Number(num).toLocaleString("pa-IN");
    return Number(num).toLocaleString("en-IN");
  };

  const states = ["all", ...new Set(mandiPrices.map((item) => item.state))];

  const filteredPrices = mandiPrices.filter((item) => {
    const value = search.trim().toLowerCase();

    const searchableText = [
      item.crop,
      item.hindi,
      CROP_PA[item.crop],
      item.market,
      MARKET_HI[item.market],
      MARKET_PA[item.market],
      item.state,
      STATE_HI[item.state],
      STATE_PA[item.state],
      item.quality,
      QUALITY_HI[item.quality],
      QUALITY_PA[item.quality],
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch = !value || searchableText.includes(value);
    const matchesState = stateFilter === "all" || item.state === stateFilter;

    return matchesSearch && matchesState;
  });

  const highestPrice = Math.max(...mandiPrices.map((item) => item.price));
  const risingCount = mandiPrices.filter((item) => item.change > 0).length;
  const fallingCount = mandiPrices.filter((item) => item.change < 0).length;

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-800 mb-5"
        >
          <ArrowLeft className="w-4 h-4" />
          {text.back}
        </Link>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-700 via-emerald-800 to-green-950 p-8 md:p-10 text-white shadow-xl mb-8">
          <div className="absolute -right-16 -top-16 opacity-10">
            <Leaf className="w-80 h-80 text-white" />
          </div>

          <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/20 text-green-100 text-xs font-bold uppercase tracking-widest mb-4">
                <BarChart2 className="w-4 h-4" />
                {text.badge}
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-3">
                {text.title}
              </h1>

              <p className="text-green-100 max-w-2xl">{text.desc}</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/15 backdrop-blur rounded-2xl px-4 py-3 border border-white/20">
                <p className="text-[10px] uppercase tracking-widest text-green-100 font-bold">
                  {text.listings}
                </p>
                <p className="text-2xl font-black">{filteredPrices.length}</p>
              </div>

              <div className="bg-white/15 backdrop-blur rounded-2xl px-4 py-3 border border-white/20">
                <p className="text-[10px] uppercase tracking-widest text-green-100 font-bold">
                  {text.rising}
                </p>
                <p className="text-2xl font-black">{risingCount}</p>
              </div>

              <div className="bg-white/15 backdrop-blur rounded-2xl px-4 py-3 border border-white/20">
                <p className="text-[10px] uppercase tracking-widest text-green-100 font-bold">
                  {text.highest}
                </p>
                <p className="text-2xl font-black">
                  ₹{formatNumber(highestPrice)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={text.search}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-green-500 text-sm"
              />
            </div>

            <div className="relative">
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="appearance-none w-full lg:w-64 px-4 py-3 pr-10 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm focus:outline-none focus:border-green-500 bg-white"
              >
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state === "all" ? text.allStates : translateState(state)}
                  </option>
                ))}
              </select>

              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center mb-3">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-2xl font-black text-gray-900">
              {risingCount}
            </h3>
            <p className="text-sm text-gray-500">{text.cropsRising}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center mb-3">
              <TrendingDown className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="text-2xl font-black text-gray-900">
              {fallingCount}
            </h3>
            <p className="text-sm text-gray-500">{text.cropsFalling}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center mb-3">
              <IndianRupee className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="text-2xl font-black text-gray-900">
              ₹{formatNumber(highestPrice)}
            </h3>
            <p className="text-sm text-gray-500">{text.highestPrice}</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-6 px-5 py-3 bg-gray-50 border-b border-gray-100">
            <span className="text-xs font-bold text-gray-500 uppercase col-span-2">
              {text.crop}
            </span>
            <span className="text-xs font-bold text-gray-500 uppercase text-right">
              {text.price}
            </span>
            <span className="text-xs font-bold text-gray-500 uppercase text-center">
              {text.change}
            </span>
            <span className="text-xs font-bold text-gray-500 uppercase text-right">
              {text.market}
            </span>
            <span className="text-xs font-bold text-gray-500 uppercase text-right">
              {text.quality}
            </span>
          </div>

          {filteredPrices.length === 0 ? (
            <div className="py-12 text-center">
              <Leaf className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900">{text.noFound}</h3>
              <p className="text-sm text-gray-500 mt-1">{text.trySearch}</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {filteredPrices.map((item) => (
                <div
                  key={item.id}
                className="grid grid-cols-6 px-5 py-3 hover:bg-green-50/40 transition-colors items-center"
                >
                 <div className="col-span-2">
  <div className="flex items-center gap-3">
    <img
      src={getCropImage(item.crop)}
      alt={translateCrop(item)}
      className="w-12 h-12 rounded-xl object-cover border border-gray-100 shadow-sm flex-shrink-0"
      onError={(e) => {
        e.currentTarget.src = FALLBACK_CROP_IMAGE;
      }}
    />

    <div className="min-w-0">
      <div className="font-bold text-gray-900 text-sm truncate">
        {translateCrop(item)}
      </div>

      <div className="text-gray-400 text-xs truncate">
        {translateSubCrop(item)}
      </div>
    </div>
  </div>
</div>

                  <div className="text-right">
                    <div className="font-black text-gray-900 text-sm">
                      {formatNumber(item.price)}
                    </div>
                    <div className="text-gray-400 text-xs">{text.unit}</div>
                  </div>

                  <div className="flex items-center justify-center">
                    {item.change > 0 ? (
                      <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        <TrendingUp className="w-3 h-3" />
                        <span className="text-xs font-bold">
                          +{item.change}
                        </span>
                      </div>
                    ) : item.change < 0 ? (
                      <div className="flex items-center gap-1 text-red-500 bg-red-50 px-2 py-1 rounded-full">
                        <TrendingDown className="w-3 h-3" />
                        <span className="text-xs font-bold">
                          {item.change}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                        <Minus className="w-3 h-3" />
                        <span className="text-xs font-bold">0</span>
                      </div>
                    )}
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-semibold text-gray-700 flex items-center justify-end gap-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      {translateMarket(item.market)}
                    </div>
                    <div className="text-[11px] text-gray-400">
                      {translateState(item.state)}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-flex px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                      {translateQuality(item.quality)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="text-xs text-gray-400 mt-4 text-center">{text.note}</p>
      </div>
    </div>
  );
};

export default MandiPrices;