import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  ArrowLeft,
  ShoppingBag,
  Filter,
  Phone,
  Leaf,
  ChevronDown,
} from "lucide-react";
import { marketplaceCrops } from "../data/marketplaceCrops";
import { useLanguage } from "../context/LanguageContext";

const UI_TEXT = {
  en: {
    back: "Back to Home",
    badge: "AgriConnect Marketplace",
    title: "Explore Fresh Crop Listings",
    desc: "Browse dummy crop listings from verified farmers. Buyers can check crop price, quantity, quality, farmer name and region.",
    showingListings: "Showing Listings",
    searchPlaceholder: "Search crop, farmer, region or quality...",
    allQuality: "All Quality",
    premium: "Premium",
    organic: "Organic",
    fresh: "Fresh",
    grade: "A Grade",
    exportQuality: "Export Quality",
    filter: "Filter",
    noCropsFound: "No crops found",
    trySearch: "Try searching wheat, rice, tomato, Bhopal, organic etc.",
    quantity: "Quantity",
    farmer: "Farmer",
    contactFarmer: "Contact Farmer",
    quintal: "quintal",
    priceUnit: "/qt",
  },
  hi: {
    back: "होम पर वापस जाएँ",
    badge: "एग्रीकनेक्ट बाज़ार",
    title: "ताज़ा फसल लिस्टिंग देखें",
    desc: "सत्यापित किसानों की डमी फसल लिस्टिंग देखें। खरीदार फसल का भाव, मात्रा, गुणवत्ता, किसान का नाम और क्षेत्र देख सकते हैं।",
    showingListings: "दिखाई गई लिस्टिंग",
    searchPlaceholder: "फसल, किसान, क्षेत्र या गुणवत्ता खोजें...",
    allQuality: "सभी गुणवत्ता",
    premium: "प्रीमियम",
    organic: "ऑर्गेनिक",
    fresh: "ताज़ा",
    grade: "ए ग्रेड",
    exportQuality: "निर्यात गुणवत्ता",
    filter: "फ़िल्टर",
    noCropsFound: "कोई फसल नहीं मिली",
    trySearch: "गेहूँ, चावल, टमाटर, भोपाल, ऑर्गेनिक आदि खोजें।",
    quantity: "मात्रा",
    farmer: "किसान",
    contactFarmer: "किसान से संपर्क करें",
    quintal: "क्विंटल",
    priceUnit: "/क्विंटल",
  },
  pa: {
    back: "ਹੋਮ ਤੇ ਵਾਪਸ ਜਾਓ",
    badge: "ਐਗਰੀਕਨੈਕਟ ਮਾਰਕੀਟਪਲੇਸ",
    title: "ਤਾਜ਼ਾ ਫਸਲ ਲਿਸਟਿੰਗ ਵੇਖੋ",
    desc: "ਪ੍ਰਮਾਣਿਤ ਕਿਸਾਨਾਂ ਦੀਆਂ ਡਮੀ ਫਸਲ ਲਿਸਟਿੰਗਾਂ ਵੇਖੋ। ਖਰੀਦਦਾਰ ਫਸਲ ਦਾ ਭਾਅ, ਮਾਤਰਾ, ਗੁਣਵੱਤਾ, ਕਿਸਾਨ ਦਾ ਨਾਮ ਅਤੇ ਖੇਤਰ ਵੇਖ ਸਕਦੇ ਹਨ।",
    showingListings: "ਦਿਖਾਈਆਂ ਲਿਸਟਿੰਗਾਂ",
    searchPlaceholder: "ਫਸਲ, ਕਿਸਾਨ, ਖੇਤਰ ਜਾਂ ਗੁਣਵੱਤਾ ਖੋਜੋ...",
    allQuality: "ਸਾਰੀ ਗੁਣਵੱਤਾ",
    premium: "ਪ੍ਰੀਮਿਯਮ",
    organic: "ਆਰਗੈਨਿਕ",
    fresh: "ਤਾਜ਼ਾ",
    grade: "ਏ ਗ੍ਰੇਡ",
    exportQuality: "ਨਿਰਯਾਤ ਗੁਣਵੱਤਾ",
    filter: "ਫਿਲਟਰ",
    noCropsFound: "ਕੋਈ ਫਸਲ ਨਹੀਂ ਮਿਲੀ",
    trySearch: "ਗੰਧੁਮ, ਚੌਲ, ਟਮਾਟਰ, ਭੋਪਾਲ, ਆਰਗੈਨਿਕ ਆਦਿ ਖੋਜੋ।",
    quantity: "ਮਾਤਰਾ",
    farmer: "ਕਿਸਾਨ",
    contactFarmer: "ਕਿਸਾਨ ਨਾਲ ਸੰਪਰਕ ਕਰੋ",
    quintal: "ਕੁਇੰਟਲ",
    priceUnit: "/ਕੁਇੰਟਲ",
  },
};

const CROP_NAME_HI = {
  "Wheat Sona": "गेहूँ सोना",
  "Basmati Rice": "बासमती चावल",
  "Hybrid Tomato": "हाइब्रिड टमाटर",
  "Potato Kufri": "आलू कुफरी",
  "Red Onion": "लाल प्याज",
  "Yellow Soybean": "पीला सोयाबीन",
  Maize: "मक्का",
  Cotton: "कपास",
  "Mustard Seeds": "सरसों के बीज",
  Sugarcane: "गन्ना",
  "Green Chilli": "हरी मिर्च",
  Banana: "केला",
  Apple: "सेब",
  "Mango Alphonso": "अल्फांसो आम",
  "Black Grapes": "काले अंगूर",
  Carrot: "गाजर",
  Cabbage: "पत्ता गोभी",
  Cauliflower: "फूलगोभी",
  Brinjal: "बैंगन",
  "Green Peas": "हरी मटर",
  "Durum Wheat": "ड्यूरम गेहूँ",
  "Sona Masoori Rice": "सोना मसूरी चावल",
  "Cherry Tomato": "चेरी टमाटर",
  "White Potato": "सफेद आलू",
  "White Onion": "सफेद प्याज",
  "Black Soybean": "काला सोयाबीन",
  "Sweet Corn": "स्वीट कॉर्न",
  "Long Staple Cotton": "लॉन्ग स्टेपल कपास",
  "Black Mustard": "काली सरसों",
  "Fresh Sugarcane": "ताज़ा गन्ना",
  "Dry Red Chilli": "सूखी लाल मिर्च",
  "Robusta Banana": "रोबस्टा केला",
  "Royal Apple": "रॉयल सेब",
  "Dasheri Mango": "दशहरी आम",
  "Green Grapes": "हरे अंगूर",
  "Organic Carrot": "ऑर्गेनिक गाजर",
  "Organic Cabbage": "ऑर्गेनिक पत्ता गोभी",
  "Snowball Cauliflower": "स्नोबॉल फूलगोभी",
  "Purple Brinjal": "बैंगनी बैंगन",
  "Fresh Green Peas": "ताज़ी हरी मटर",
  "Sharbati Wheat": "शरबती गेहूँ",
  "Parboiled Rice": "परबॉयल्ड चावल",
  "Roma Tomato": "रोमा टमाटर",
  "Seed Potato": "बीज आलू",
  "Organic Onion": "ऑर्गेनिक प्याज",
  "Soybean JS-9560": "सोयाबीन JS-9560",
  "White Maize": "सफेद मक्का",
  "Cotton Bales": "कपास गांठें",
  "Mustard Bold": "बोल्ड सरसों",
  "Nendran Banana": "नेंद्रन केला",
};

const CROP_NAME_PA = {
  "Wheat Sona": "ਗੰਧੁਮ ਸੋਨਾ",
  "Basmati Rice": "ਬਾਸਮਤੀ ਚੌਲ",
  "Hybrid Tomato": "ਹਾਈਬ੍ਰਿਡ ਟਮਾਟਰ",
  "Potato Kufri": "ਆਲੂ ਕੁਫਰੀ",
  "Red Onion": "ਲਾਲ ਪਿਆਜ਼",
  "Yellow Soybean": "ਪੀਲੀ ਸੋਯਾਬੀਨ",
  Maize: "ਮੱਕੀ",
  Cotton: "ਕਪਾਹ",
  "Mustard Seeds": "ਸਰੋਂ ਦੇ ਬੀਜ",
  Sugarcane: "ਗੰਨਾ",
  "Green Chilli": "ਹਰੀ ਮਿਰਚ",
  Banana: "ਕੇਲਾ",
  Apple: "ਸੇਬ",
  "Mango Alphonso": "ਅਲਫਾਂਸੋ ਅੰਬ",
  "Black Grapes": "ਕਾਲੇ ਅੰਗੂਰ",
  Carrot: "ਗਾਜਰ",
  Cabbage: "ਪੱਤਾ ਗੋਭੀ",
  Cauliflower: "ਫੁੱਲ ਗੋਭੀ",
  Brinjal: "ਬੈਂਗਣ",
  "Green Peas": "ਹਰੇ ਮਟਰ",
  "Durum Wheat": "ਡਿਊਰਮ ਗੰਧੁਮ",
  "Sona Masoori Rice": "ਸੋਨਾ ਮਸੂਰੀ ਚੌਲ",
  "Cherry Tomato": "ਚੇਰੀ ਟਮਾਟਰ",
  "White Potato": "ਸਫੈਦ ਆਲੂ",
  "White Onion": "ਸਫੈਦ ਪਿਆਜ਼",
  "Black Soybean": "ਕਾਲੀ ਸੋਯਾਬੀਨ",
  "Sweet Corn": "ਸਵੀਟ ਕੌਰਨ",
  "Long Staple Cotton": "ਲੰਮਾ ਰੇਸ਼ਾ ਕਪਾਹ",
  "Black Mustard": "ਕਾਲੀ ਸਰੋਂ",
  "Fresh Sugarcane": "ਤਾਜ਼ਾ ਗੰਨਾ",
  "Dry Red Chilli": "ਸੁੱਕੀ ਲਾਲ ਮਿਰਚ",
  "Robusta Banana": "ਰੋਬਸਟਾ ਕੇਲਾ",
  "Royal Apple": "ਰੋਇਲ ਸੇਬ",
  "Dasheri Mango": "ਦਸ਼ਹਿਰੀ ਅੰਬ",
  "Green Grapes": "ਹਰੇ ਅੰਗੂਰ",
  "Organic Carrot": "ਆਰਗੈਨਿਕ ਗਾਜਰ",
  "Organic Cabbage": "ਆਰਗੈਨਿਕ ਪੱਤਾ ਗੋਭੀ",
  "Snowball Cauliflower": "ਸਨੋਬਾਲ ਫੁੱਲ ਗੋਭੀ",
  "Purple Brinjal": "ਜਾਮਨੀ ਬੈਂਗਣ",
  "Fresh Green Peas": "ਤਾਜ਼ੇ ਹਰੇ ਮਟਰ",
  "Sharbati Wheat": "ਸ਼ਰਬਤੀ ਗੰਧੁਮ",
  "Parboiled Rice": "ਪਰਬੋਇਲਡ ਚੌਲ",
  "Roma Tomato": "ਰੋਮਾ ਟਮਾਟਰ",
  "Seed Potato": "ਬੀਜ ਆਲੂ",
  "Organic Onion": "ਆਰਗੈਨਿਕ ਪਿਆਜ਼",
  "Soybean JS-9560": "ਸੋਯਾਬੀਨ JS-9560",
  "White Maize": "ਸਫੈਦ ਮੱਕੀ",
  "Cotton Bales": "ਕਪਾਹ ਦੀਆਂ ਗੱਠਾਂ",
  "Mustard Bold": "ਬੋਲਡ ਸਰੋਂ",
  "Nendran Banana": "ਨੇੰਦਰਨ ਕੇਲਾ",
};

const QUALITY_HI = {
  "A Grade": "ए ग्रेड",
  Premium: "प्रीमियम",
  Fresh: "ताज़ा",
  "Export Quality": "निर्यात गुणवत्ता",
  Organic: "ऑर्गेनिक",
  Good: "अच्छी",
  "Fresh Cut": "ताज़ा कटी",
  Cleaned: "साफ़",
  "Seed Grade": "बीज ग्रेड",
  "Bold Seed": "बोल्ड बीज",
};

const QUALITY_PA = {
  "A Grade": "ਏ ਗ੍ਰੇਡ",
  Premium: "ਪ੍ਰੀਮਿਯਮ",
  Fresh: "ਤਾਜ਼ਾ",
  "Export Quality": "ਨਿਰਯਾਤ ਗੁਣਵੱਤਾ",
  Organic: "ਆਰਗੈਨਿਕ",
  Good: "ਚੰਗੀ",
  "Fresh Cut": "ਤਾਜ਼ਾ ਕੱਟੀ",
  Cleaned: "ਸਾਫ਼",
  "Seed Grade": "ਬੀਜ ਗ੍ਰੇਡ",
  "Bold Seed": "ਬੋਲਡ ਬੀਜ",
};

const REGION_HI = {
  Punjab: "पंजाब",
  Haryana: "हरियाणा",
  Maharashtra: "महाराष्ट्र",
  "Uttar Pradesh": "उत्तर प्रदेश",
  "Madhya Pradesh": "मध्य प्रदेश",
  Rajasthan: "राजस्थान",
  "Andhra Pradesh": "आंध्र प्रदेश",
  "Tamil Nadu": "तमिलनाडु",
  "Himachal Pradesh": "हिमाचल प्रदेश",
  Delhi: "दिल्ली",
  "West Bengal": "पश्चिम बंगाल",
  Telangana: "तेलंगाना",
  Karnataka: "कर्नाटक",
  Bihar: "बिहार",
  Gujarat: "गुजरात",
  Kerala: "केरल",
  "Jammu & Kashmir": "जम्मू और कश्मीर",
  Uttarakhand: "उत्तराखंड",
  Odisha: "ओडिशा",
};

const REGION_PA = {
  Punjab: "ਪੰਜਾਬ",
  Haryana: "ਹਰਿਆਣਾ",
  Maharashtra: "ਮਹਾਰਾਸ਼ਟਰ",
  "Uttar Pradesh": "ਉੱਤਰ ਪ੍ਰਦੇਸ਼",
  "Madhya Pradesh": "ਮੱਧ ਪ੍ਰਦੇਸ਼",
  Rajasthan: "ਰਾਜਸਥਾਨ",
  "Andhra Pradesh": "ਆਂਧਰਾ ਪ੍ਰਦੇਸ਼",
  "Tamil Nadu": "ਤਮਿਲਨਾਡੂ",
  "Himachal Pradesh": "ਹਿਮਾਚਲ ਪ੍ਰਦੇਸ਼",
  Delhi: "ਦਿੱਲੀ",
  "West Bengal": "ਪੱਛਮੀ ਬੰਗਾਲ",
  Telangana: "ਤੇਲੰਗਾਨਾ",
  Karnataka: "ਕਰਨਾਟਕ",
  Bihar: "ਬਿਹਾਰ",
  Gujarat: "ਗੁਜਰਾਤ",
  Kerala: "ਕੇਰਲ",
  "Jammu & Kashmir": "ਜੰਮੂ ਅਤੇ ਕਸ਼ਮੀਰ",
  Uttarakhand: "ਉੱਤਰਾਖੰਡ",
  Odisha: "ਓਡਿਸ਼ਾ",
};

const CITY_HI = {
  Amritsar: "अमृतसर",
  Karnal: "करनाल",
  Nashik: "नाशिक",
  Agra: "आगरा",
  Lasalgaon: "लासलगांव",
  Indore: "इंदौर",
  Jabalpur: "जबलपुर",
  Nagpur: "नागपुर",
  Jaipur: "जयपुर",
  Meerut: "मेरठ",
  Guntur: "गुंटूर",
  Trichy: "त्रिची",
  Shimla: "शिमला",
  Ratnagiri: "रत्नागिरी",
  Sangli: "सांगली",
  Azadpur: "आज़ादपुर",
  Siliguri: "सिलीगुड़ी",
  Ludhiana: "लुधियाना",
  Bhopal: "भोपाल",
  Kanpur: "कानपुर",
  Sehore: "सीहोर",
  Warangal: "वारंगल",
  Bengaluru: "बेंगलुरु",
  Patna: "पटना",
  Bhavnagar: "भावनगर",
  Ujjain: "उज्जैन",
  Mysuru: "मैसूरु",
  Rajkot: "राजकोट",
  Kota: "कोटा",
  Kolhapur: "कोल्हापुर",
  Palakkad: "पलक्कड़",
  Sopore: "सोपोर",
  Lucknow: "लखनऊ",
  Sonipat: "सोनीपत",
  Dehradun: "देहरादून",
  Cuttack: "कटक",
  Mandi: "मंडी",
  Vidisha: "विदिशा",
  Raipur: "रायपुर",
  Satara: "सतारा",
  Jalandhar: "जालंधर",
  Mandsaur: "मंदसौर",
  Harda: "हरदा",
  Udaipur: "उदयपुर",
  Surat: "सूरत",
  Bharatpur: "भरतपुर",
  Thrissur: "त्रिशूर",
};

const CITY_PA = {
  Amritsar: "ਅੰਮ੍ਰਿਤਸਰ",
  Karnal: "ਕਰਨਾਲ",
  Nashik: "ਨਾਸਿਕ",
  Agra: "ਆਗਰਾ",
  Lasalgaon: "ਲਾਸਲਗਾਂਵ",
  Indore: "ਇੰਦੌਰ",
  Jabalpur: "ਜਬਲਪੁਰ",
  Nagpur: "ਨਾਗਪੁਰ",
  Jaipur: "ਜੈਪੁਰ",
  Meerut: "ਮੇਰਠ",
  Guntur: "ਗੁੰਟੂਰ",
  Trichy: "ਤ੍ਰਿਚੀ",
  Shimla: "ਸ਼ਿਮਲਾ",
  Ratnagiri: "ਰਤਨਾਗਿਰੀ",
  Sangli: "ਸਾਂਗਲੀ",
  Azadpur: "ਆਜ਼ਾਦਪੁਰ",
  Siliguri: "ਸਿਲੀਗੁੜੀ",
  Ludhiana: "ਲੁਧਿਆਣਾ",
  Bhopal: "ਭੋਪਾਲ",
  Kanpur: "ਕਾਨਪੁਰ",
  Sehore: "ਸੀਹੋਰ",
  Warangal: "ਵਾਰੰਗਲ",
  Bengaluru: "ਬੈਂਗਲੁਰੂ",
  Patna: "ਪਟਨਾ",
  Bhavnagar: "ਭਾਵਨਗਰ",
  Ujjain: "ਉੱਜੈਨ",
  Mysuru: "ਮੈਸੂਰੁ",
  Rajkot: "ਰਾਜਕੋਟ",
  Kota: "ਕੋਟਾ",
  Kolhapur: "ਕੋਲਹਾਪੁਰ",
  Palakkad: "ਪਲੱਕੜ",
  Sopore: "ਸੋਪੋਰ",
  Lucknow: "ਲਖਨਊ",
  Sonipat: "ਸੋਨੀਪਤ",
  Dehradun: "ਦੇਹਰਾਦੂਨ",
  Cuttack: "ਕਟਕ",
  Mandi: "ਮੰਡੀ",
  Vidisha: "ਵਿਦਿਸ਼ਾ",
  Raipur: "ਰਾਇਪੁਰ",
  Satara: "ਸਤਾਰਾ",
  Jalandhar: "ਜਲੰਧਰ",
  Mandsaur: "ਮੰਦਸੌਰ",
  Harda: "ਹਰਦਾ",
  Udaipur: "ਉਦੈਪੁਰ",
  Surat: "ਸੂਰਤ",
  Bharatpur: "ਭਰਤਪੁਰ",
  Thrissur: "ਥ੍ਰਿਸ਼ੂਰ",
};

const FARMER_HI = {
  "Ramesh Singh": "रमेश सिंह",
  "Amit Kumar": "अमित कुमार",
  "Suresh Patil": "सुरेश पाटिल",
  "Mahesh Yadav": "महेश यादव",
  "Ganesh Pawar": "गणेश पवार",
  "Rajesh Verma": "राजेश वर्मा",
  "Karan Lodhi": "करण लोधी",
  "Vijay Kale": "विजय काले",
  "Bhanwar Lal": "भंवर लाल",
  "Dinesh Chaudhary": "दिनेश चौधरी",
  "Ravi Naidu": "रवि नायडू",
  "Arun Kumar": "अरुण कुमार",
  "Kamal Thakur": "कमल ठाकुर",
  "Nilesh Patil": "निलेश पाटिल",
  "Santosh More": "संतोष मोरे",
  "Rahul Kumar": "राहुल कुमार",
  "Subhash Das": "सुभाष दास",
  "Harpreet Singh": "हरप्रीत सिंह",
  "Ravi Kushwaha": "रवि कुशवाहा",
  "Akhilesh Yadav": "अखिलेश यादव",
  "Lokesh Meena": "लोकेश मीणा",
  "Prakash Rao": "प्रकाश राव",
  Manjunath: "मंजुनाथ",
  "Mohan Prasad": "मोहन प्रसाद",
  "Harsh Patel": "हर्ष पटेल",
  "Sanjay Sharma": "संजय शर्मा",
  "Naveen Gowda": "नवीन गौड़ा",
  "Jayesh Patel": "जयेश पटेल",
  "Om Prakash": "ओम प्रकाश",
  "Santosh Patil": "संतोष पाटिल",
  "Kiran Reddy": "किरण रेड्डी",
  "Vishnu Nair": "विष्णु नायर",
  "Aqib Mir": "आकिब मीर",
  "Imran Khan": "इमरान खान",
  "Vikas Jadhav": "विकास जाधव",
  "Deepak Malik": "दीपक मलिक",
  "Ankit Rawat": "अंकित रावत",
  "Bikash Sahoo": "बिकाश साहू",
  "Rohit Sharma": "रोहित शर्मा",
  "Gopal Sharma": "गोपाल शर्मा",
  "Bhupesh Sahu": "भूपेश साहू",
  "Rahul Pawar": "राहुल पवार",
  "Devendra Rathore": "देवेंद्र राठौड़",
  "Narendra Kirar": "नरेंद्र किरार",
  "Mahendra Singh": "महेंद्र सिंह",
  "Mukesh Solanki": "मुकेश सोलंकी",
  "Ratan Lal": "रतन लाल",
  "Sanoj Varghese": "सनोज वर्गीस",
};

const FARMER_PA = {
  "Ramesh Singh": "ਰਮੇਸ਼ ਸਿੰਘ",
  "Amit Kumar": "ਅਮਿਤ ਕੁਮਾਰ",
  "Suresh Patil": "ਸੁਰੇਸ਼ ਪਾਟਿਲ",
  "Mahesh Yadav": "ਮਹੇਸ਼ ਯਾਦਵ",
  "Ganesh Pawar": "ਗਣੇਸ਼ ਪਵਾਰ",
  "Rajesh Verma": "ਰਾਜੇਸ਼ ਵਰਮਾ",
  "Karan Lodhi": "ਕਰਨ ਲੋਧੀ",
  "Vijay Kale": "ਵਿਜੈ ਕਾਲੇ",
  "Bhanwar Lal": "ਭੰਵਰ ਲਾਲ",
  "Dinesh Chaudhary": "ਦਿਨੇਸ਼ ਚੌਧਰੀ",
  "Ravi Naidu": "ਰਵੀ ਨਾਇਡੂ",
  "Arun Kumar": "ਅਰੁਣ ਕੁਮਾਰ",
  "Kamal Thakur": "ਕਮਲ ਠਾਕੁਰ",
  "Nilesh Patil": "ਨਿਲੇਸ਼ ਪਾਟਿਲ",
  "Santosh More": "ਸੰਤੋਸ਼ ਮੋਰੇ",
  "Rahul Kumar": "ਰਾਹੁਲ ਕੁਮਾਰ",
  "Subhash Das": "ਸੁਭਾਸ਼ ਦਾਸ",
  "Harpreet Singh": "ਹਰਪ੍ਰੀਤ ਸਿੰਘ",
  "Ravi Kushwaha": "ਰਵੀ ਕੁਸ਼ਵਾਹਾ",
  "Akhilesh Yadav": "ਅਖਿਲੇਸ਼ ਯਾਦਵ",
  "Lokesh Meena": "ਲੋਕੇਸ਼ ਮੀਣਾ",
  "Prakash Rao": "ਪ੍ਰਕਾਸ਼ ਰਾਓ",
  Manjunath: "ਮੰਜੁਨਾਥ",
  "Mohan Prasad": "ਮੋਹਨ ਪ੍ਰਸਾਦ",
  "Harsh Patel": "ਹਰਸ਼ ਪਟੇਲ",
  "Sanjay Sharma": "ਸੰਜੇ ਸ਼ਰਮਾ",
  "Naveen Gowda": "ਨਵੀਨ ਗੌਡਾ",
  "Jayesh Patel": "ਜਯੇਸ਼ ਪਟੇਲ",
  "Om Prakash": "ਓਮ ਪ੍ਰਕਾਸ਼",
  "Santosh Patil": "ਸੰਤੋਸ਼ ਪਾਟਿਲ",
  "Kiran Reddy": "ਕਿਰਣ ਰੈੱਡੀ",
  "Vishnu Nair": "ਵਿਸ਼ਨੂ ਨਾਇਰ",
  "Aqib Mir": "ਆਕਿਬ ਮੀਰ",
  "Imran Khan": "ਇਮਰਾਨ ਖਾਨ",
  "Vikas Jadhav": "ਵਿਕਾਸ ਜਾਧਵ",
  "Deepak Malik": "ਦੀਪਕ ਮਲਿਕ",
  "Ankit Rawat": "ਅੰਕਿਤ ਰਾਵਤ",
  "Bikash Sahoo": "ਬਿਕਾਸ਼ ਸਾਹੂ",
  "Rohit Sharma": "ਰੋਹਿਤ ਸ਼ਰਮਾ",
  "Gopal Sharma": "ਗੋਪਾਲ ਸ਼ਰਮਾ",
  "Bhupesh Sahu": "ਭੂਪੇਸ਼ ਸਾਹੂ",
  "Rahul Pawar": "ਰਾਹੁਲ ਪਵਾਰ",
  "Devendra Rathore": "ਦੇਵੇਂਦਰ ਰਾਠੌੜ",
  "Narendra Kirar": "ਨਰਿੰਦਰ ਕਿਰਾਰ",
  "Mahendra Singh": "ਮਹਿੰਦਰ ਸਿੰਘ",
  "Mukesh Solanki": "ਮੁਕੇਸ਼ ਸੋਲੰਕੀ",
  "Ratan Lal": "ਰਤਨ ਲਾਲ",
  "Sanoj Varghese": "ਸਨੋਜ ਵਰਗੀਜ਼",
};

const normalizeLang = (lang) => {
  if (lang === "hi" || lang === "hin") return "hi";
  if (lang === "pa") return "pa";
  return "en";
};

const Marketplace = () => {
  const { lang } = useLanguage();
  const currentLang = normalizeLang(lang);
  const text = UI_TEXT[currentLang];

  const [search, setSearch] = useState("");
  const [quality, setQuality] = useState("all");

  const translateName = (name) => {
    if (currentLang === "hi") return CROP_NAME_HI[name] || name;
    if (currentLang === "pa") return CROP_NAME_PA[name] || name;
    return name;
  };

  const translateQuality = (q) => {
    if (currentLang === "hi") return QUALITY_HI[q] || q;
    if (currentLang === "pa") return QUALITY_PA[q] || q;
    return q;
  };

  const translateRegion = (region) => {
    if (currentLang === "en") return region;

    const [state, city] = region.split(" — ");
    const stateMap = currentLang === "hi" ? REGION_HI : REGION_PA;
    const cityMap = currentLang === "hi" ? CITY_HI : CITY_PA;

    return `${stateMap[state] || state} — ${cityMap[city] || city}`;
  };

  const translateFarmer = (farmer) => {
    if (currentLang === "hi") return FARMER_HI[farmer] || farmer;
    if (currentLang === "pa") return FARMER_PA[farmer] || farmer;
    return farmer;
  };

  const translateQuantity = (quantity) => {
    if (currentLang === "en") return quantity;
    return String(quantity).replace(/quintal/gi, text.quintal);
  };

  const translatePrice = (price) => {
    if (currentLang === "en") return price;
    return String(price).replace(/\/qt/gi, text.priceUnit);
  };

  const filteredCrops = marketplaceCrops.filter((crop) => {
    const value = search.trim().toLowerCase();

    const searchableText = [
      crop.name,
      translateName(crop.name),
      crop.region,
      translateRegion(crop.region),
      crop.farmer,
      translateFarmer(crop.farmer),
      crop.quality,
      translateQuality(crop.quality),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch = !value || searchableText.includes(value);

    const matchesQuality =
      quality === "all" || crop.quality.toLowerCase().includes(quality);

    return matchesSearch && matchesQuality;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-800 mb-5"
          >
            <ArrowLeft className="w-4 h-4" />
            {text.back}
          </Link>

          <div className="rounded-3xl bg-gradient-to-br from-green-700 to-emerald-900 p-8 md:p-10 text-white shadow-xl overflow-hidden relative">
            <div className="absolute right-0 top-0 opacity-10">
              <Leaf className="w-72 h-72 text-white -rotate-12" />
            </div>

            <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/20 text-green-100 text-xs font-bold uppercase tracking-widest mb-4">
                  <ShoppingBag className="w-4 h-4" />
                  {text.badge}
                </div>

                <h1 className="text-3xl md:text-5xl font-bold mb-3">
                  {text.title}
                </h1>

                <p className="text-green-100 max-w-2xl">{text.desc}</p>
              </div>

              <div className="bg-white/15 backdrop-blur rounded-2xl px-6 py-4 border border-white/20">
                <p className="text-xs uppercase tracking-widest text-green-100 font-bold">
                  {text.showingListings}
                </p>
                <p className="text-3xl font-black">{filteredCrops.length}</p>
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
                placeholder={text.searchPlaceholder}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-green-500 text-sm"
              />
            </div>

            <div className="relative">
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="appearance-none w-full lg:w-56 px-4 py-3 pr-10 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm focus:outline-none focus:border-green-500 bg-white"
              >
                <option value="all">{text.allQuality}</option>
                <option value="premium">{text.premium}</option>
                <option value="organic">{text.organic}</option>
                <option value="fresh">{text.fresh}</option>
                <option value="grade">{text.grade}</option>
                <option value="export">{text.exportQuality}</option>
              </select>

              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            <button className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-green-50 hover:text-green-700 hover:border-green-300 transition">
              <Filter className="w-4 h-4" />
              {text.filter}
            </button>
          </div>
        </div>

        {filteredCrops.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
            <Leaf className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 text-lg">
              {text.noCropsFound}
            </h3>
            <p className="text-gray-500 text-sm mt-1">{text.trySearch}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredCrops.map((crop) => (
              <div
                key={crop.id}
                className="group rounded-2xl bg-white border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={crop.image}
                    alt={translateName(crop.name)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=700&auto=format&fit=crop";
                    }}
                  />

                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 text-green-700 text-xs font-bold shadow-sm">
                    {translateQuality(crop.quality)}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-base mb-1">
                    {translateName(crop.name)}
                  </h3>

                  <p className="text-green-600 font-black text-xl mb-2">
                    {translatePrice(crop.price)}
                  </p>

                  <p className="text-gray-500 text-xs flex items-center gap-1 mb-2">
                    <MapPin className="w-3 h-3" />
                    {translateRegion(crop.region)}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-gray-400">{text.quantity}</p>
                      <p className="font-bold text-gray-800">
                        {translateQuantity(crop.quantity)}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-gray-400">{text.farmer}</p>
                      <p className="font-bold text-gray-800 truncate">
                        {translateFarmer(crop.farmer)}
                      </p>
                    </div>
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm transition">
                    <Phone className="w-4 h-4" />
                    {text.contactFarmer}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;