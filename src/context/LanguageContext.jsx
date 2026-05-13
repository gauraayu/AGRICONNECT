import React, { createContext, useContext, useState, useEffect } from "react";

// ──────────────────────────────────────────────────────────────────
// TRANSLATIONS — add new keys here as you translate more sections
// Languages: en (English), hi (Hindi/हिन्दी), pa (Punjabi/ਪੰਜਾਬੀ)
// ──────────────────────────────────────────────────────────────────
export const translations = {
  en: {
    // ── HERO ──
    heroBadge: "The Future of Farming",
    heroTitle1: "Connect Farmers,",
    heroTitle2: "Buyers & Experts",
    heroDesc:
      "Real-time mandi prices, hyper-local weather alerts, and direct marketplace access — all in one place to empower your harvest.",
    btnCheckMandi: "Check Mandi Prices",
    btnJoinNow: "Join now",

    // ── Dashboard preview ──
    agriConnectLive: "AgriConnect Live",
    smartFarmDashboard: "Smart Farm Dashboard",
    weather: "Weather",
    goodIrrigation: "Good for irrigation",
    mandiPrice: "Mandi Price",
    wheatUp: "Wheat +4.2%",
    aiCropDoctor: "AI Crop Doctor",
    aiCropDoctorDesc: "Detect crop disease using smart AI advisory",
    cropHealth: "Crop Health",
    healthy: "Healthy",
    wheatField: "Wheat Field",
    soilMoisture: "Soil Moisture",
    farmers: "Farmers",
    crops: "Crops",
    states: "States",
    priceAlert: "Price Alert",
    soybeanRising: "Soybean rising",
    verifiedBuyers: "Verified Buyers",
    directCropDeals: "Direct crop deals",

    // ── Marketplace ──
    activeMarketplace: "Active Marketplace",
    marketplaceDesc: "Fresh crop listings from verified farmers across India",
    viewMore: "View More",
    farmer: "Farmer",
    contact: "Contact",
    qty: "Qty",

    // ── Active Users ──
    activeUsers: "Active Users",
    connectingRoles: "Connecting Every Important Role in Agriculture",
    activeUsersDesc:
      "AgriConnect brings farmers, agronomists and buyers together on one smart platform.",
    learnMore: "Learn More",

    // ── Role cards ──
    forFarmers: "For Farmers",
    forAgronomists: "For Agronomists",
    forBuyers: "For Buyers",
    directSelling: "Direct Selling",
    pestDiagnosis: "Pest Diagnosis",
    expertAssistance: "Expert Assistance",
    caseManagement: "Case Management",
    analyticsDashboard: "Analytics Dashboard",
    reputationBadges: "Reputation Badges",
    bulkOrders: "Bulk Orders",
    qualityChecks: "Quality Checks",
    traceability: "Traceability",

    // Role descriptions
    farmerDesc:
      "Farmers can use AgriConnect to sell crops directly, check mandi prices, post crop problems, get expert advice, and receive weather-based farming guidance.",
    agronomistDesc:
      "Agronomists can guide farmers, solve crop-related problems, manage cases, build trust, and provide expert farming recommendations through the platform.",
    buyerDesc:
      "Buyers can explore fresh crops, compare prices, contact farmers directly, check crop quality, and purchase produce without depending on middlemen.",

    // Popups
    howHelpsFarmers: "How AgriConnect Helps Farmers",
    howHelpsAgronomists: "How AgriConnect Helps Agronomists",
    howHelpsBuyers: "How AgriConnect Helps Buyers",

    farmerPoint1: "Post crop disease or pest problems with images",
    farmerPoint2: "Connect directly with agronomists for solutions",
    farmerPoint3: "Check daily mandi prices before selling crops",
    farmerPoint4: "Sell produce directly to buyers without middlemen",
    farmerPoint5: "Get weather alerts and smart farming suggestions",

    agronomistPoint1: "View farmer crop problems in one dashboard",
    agronomistPoint2: "Reply with expert solutions and treatment steps",
    agronomistPoint3: "Help farmers with soil, pest, irrigation and fertilizer issues",
    agronomistPoint4: "Build reputation through helpful expert responses",
    agronomistPoint5: "Support smart agriculture with data-driven advice",

    buyerPoint1: "Browse available crops from verified farmers",
    buyerPoint2: "Check price, quantity, quality and location",
    buyerPoint3: "Contact farmers directly for bulk orders",
    buyerPoint4: "Reduce middleman cost and improve transparency",
    buyerPoint5: "Build trusted supply chain from farm to market",

    joinFarmer: "Join as Farmer",
    joinAgronomist: "Join as Agronomist",
    exploreMarketplace: "Explore Marketplace",

    // ── Ecosystem Services ──
    ourEcosystemServices: "Our Ecosystem Services",
    marketplace: "Marketplace",
    marketplaceShortDesc:
      "Direct trade between farmers and bulk buyers with verified logistics support.",
    mandiPrices: "Mandi Prices",
    mandiShortDesc:
      "Real-time daily updates from 2,000+ mandis across India for informed selling.",
    weatherShortDesc:
      "Local and hyper-accurate forecasts with risk alerts for specific crop types.",

    // ── How It Works ──
    simpleJourney: "Simple Journey",
    howWorksTitle: "How AgriConnect Works",
    howWorksDesc:
      "Start with registration, explore services, and connect directly with farmers, buyers and experts.",
    step1Title: "Register",
    step1Desc: "Sign up with your phone number and verify your farm location details.",
    step2Title: "List / Browse",
    step2Desc: "List your produce for sale or browse expert advice and market prices.",
    step3Title: "Connect & Trade",
    step3Desc: "Close deals directly with buyers or get immediate solutions from experts.",

    // ── Smart Farming ──
    smartAgriculture: "Smart Agriculture",
    smartFarmingTitle: "Smart Farming Technology",
    smartFarmingDesc:
      "AI, drone, satellite, AR/VR and automation tools for modern precision farming.",
    arvrTitle: "AR/VR Farm Training",
    arvrDesc:
      "Interactive farming training for crop care, machinery handling, pest control and modern cultivation.",
    aiDiagTitle: "AI Crop Diagnostics",
    aiDiagDesc:
      "Upload crop images and detect disease, pest issues and treatment suggestions using AI.",
    satelliteTitle: "Satellite Crop Monitoring",
    satelliteDesc:
      "Monitor crop health, vegetation, stress zones and field condition using satellite insights.",
    droneTitle: "Drone / Land Rover Monitor",
    droneDesc:
      "Use drone and land rover monitoring for field scouting, crop stress and pest detection.",
    irrigationTitle: "Smart Irrigation",
    irrigationDesc:
      "Save water with soil moisture based irrigation and weather-aware crop watering guidance.",
    marketDemandTitle: "Market Demand Prediction",
    marketDemandDesc:
      "Predict crop demand, market trend and best selling time using machine learning insights.",
    explore: "Explore",

    // ── Weather Section ──
    weatherCropAdvisory: "Weather & Crop Advisory",
    weatherAdvisoryDesc:
      "Field-ready weather intelligence and agronomy tips tailored for your crop cycle. Stay ahead of storms, heat, and irrigation windows with trusted guidance.",
    cropRisk: "Crop Risk",
    low: "Low",
    harvestWindow: "Harvest Window",
    days34: "3-4 days",
    irrigationTip: "Irrigation Tip",
    morning: "Morning",
    whatThisMeans: "What this means for your farm",
    weatherTip1: "Monitor soil moisture before applying fertilizers.",
    weatherTip2: "Avoid spraying pesticides during high humidity or rain.",
    weatherTip3: "Schedule harvesting when temperature is cool and dry.",
    smartAdvisory: "Smart Advisory",
    smartAdvisorySubtitle: "Weather updates refresh based on your selected location.",
    currentLocalSnapshot: "Current Local Snapshot",
    live: "Live",
    cropReadyWeather: "Crop-ready weather",
    cropReadyDesc:
      "This widget updates automatically with your local weather and advises you on next steps for irrigation, spraying, and harvest planning.",

    // ── Mandi Prices section ──
    liveMarketData: "Live Market Data",
    todaysMandiPrices: "Today's Mandi Prices",
    todaysMandiDesc: "Real-time commodity rates from major mandis across India",
    viewOnAgmarknet: "View on Agmarknet",

    // ── Partner Section ──
    partnerTitle: "Partner with Us to Add Value to These Communities",
    agriInputBrands: "Agri Input Brands",
    farmServices: "Farm Services",
    marketLinkages: "Market Linkages",
    agriInputDesc:
      "Our vision is to provide farmers with timely access to quality, affordable, and sustainable inputs. AgriConnect hosts over 25 digital communities, each with 2,000+ members, earning farmers' trust through reliable advisories.",
    farmServicesDesc:
      "We connect farmers with verified service providers for mechanization, soil testing, custom hiring, and end-to-end farm management — all booked through one app.",
    marketLinkagesDesc:
      "Bridge the gap between farm gate and end buyers — FPOs, exporters, processors, and modern retail. Get fair prices with transparent trade and quality grading.",
    requestDemo: "Request a demo",
    exploreMore: "Explore more",

    // ── Testimonials ──
    voicesOfSuccess: "Voices of Success",

    // ── CTA ──
    ctaTitle: "Use AI, Satellite & Smart Farming Tools in One Platform",
    ctaDesc:
      "Join the 50,000+ farmers already growing their businesses with AgriConnect. Get started for free today.",
    downloadApp: "Download App",
    talkToExpert: "Talk to an Expert",

    // ── NAVBAR ──
    nav_dashboard: "Dashboard",
    nav_market: "Market",
    nav_posts: "Posts",
    nav_smart_farming: "Smart Farming",
    nav_services: "Services",
    nav_about: "About",
    nav_contact: "Contact",
    nav_login: "Login",
    nav_join_now: "Join Now",
    nav_govt_schemes: "Govt Schemes",
    nav_choose_language: "Choose Language",
scheme_pm_kisan:
  "PM-KISAN: ₹6,000/year direct to farmers — Apply at pmkisan.gov.in",
scheme_pm_fby:
  "PMFBY Crop Insurance: Pay low premium for crop insurance — Enroll before deadline",
scheme_kcc:
  "Kisan Credit Card: Easy farm loans for farmers — Apply at your bank",
scheme_drone_didi:
  "Drone Didi Scheme: Support for agricultural drones for SHGs",
scheme_pmksy:
  "PMKSY: Micro-irrigation subsidy — Per Drop More Crop scheme",
scheme_pkvy:
  "PKVY: Support for organic farming clusters — Apply now",
scheme_enam:
  "e-NAM: Sell crops online across mandis — Register at enam.gov.in",
scheme_soil_health:
  "Soil Health Card: Free soil testing support — Visit nearest KVK",
    // Posts dropdown
    nav_community_posts: "Community Posts",
    nav_community_posts_desc: "See what farmers share",
    nav_ask_crop: "Ask Crop Problem",
    nav_ask_crop_desc: "Get help with your crop",
    nav_farmer_questions: "Farmer Questions",
    nav_farmer_questions_desc: "Browse farmer queries",
    nav_expert_answers: "Expert Answers",
    nav_expert_answers_desc: "Verified expert replies",
    nav_my_posts: "My Posts",
    nav_my_posts_desc: "Manage your posts",

    // Market dropdown
    nav_marketplace: "Marketplace",
    nav_marketplace_desc: "Buy and sell crops directly",
    nav_mandi_prices: "Mandi Prices",
    nav_mandi_prices_desc: "Check latest mandi crop rates",

    // Services dropdown
    nav_weather_updates: "Weather Updates",
    nav_expert_connect: "Expert Connect",
    nav_crop_advisory: "Crop Advisory",
    nav_soil_health: "Soil Health Guide",
    nav_pest_disease: "Pest & Disease Help",
    nav_fertilizer: "Fertilizer Guidance",
    nav_irrigation: "Irrigation Tips",

    // Smart Farming dropdown
    nav_ai_doctor: "AI Crop Doctor",
    nav_satellite: "Satellite Crop Monitoring",
    nav_drone: "Drone / Land Rover Monitor",
    nav_ml_yield: "ML Yield Prediction",
    nav_arvr: "AR/VR Farming Training",
    nav_smart_irrigation: "Smart Irrigation",
    nav_market_demand: "Market Demand Prediction",

    // About dropdown
    nav_about_agriconnect: "About AgriConnect",
    nav_for_farmers: "For Farmers",
    nav_for_agronomists: "For Agronomists",
    nav_for_buyers: "For Buyers",
    nav_our_mission: "Our Mission",
    nav_how_it_works: "How It Works",

    // Profile menu
    nav_profile_home: "Home",
    nav_profile_ai_chat: "AI Chat",
    nav_profile_profile: "Profile",
    nav_profile_settings: "Settings",
    nav_profile_logout: "Log Out",
    nav_profile_logout_desc: "See you soon!",
    nav_light_mode: "Light Mode",
    nav_dark_mode: "Dark Mode",
    nav_switch_light: "Switch to light",
    nav_switch_dark: "Switch to dark",

    // ── MARKETPLACE & MISC ──
    freshListings: "Fresh Listings",
    viewAll: "View All",
    // Quality tags shown on crop cards
    qualityExport: "Export Quality",
    qualityPremium: "Premium",
    qualityOrganic: "Organic",
    qualityGood: "Good",
    qualityFresh: "Fresh",
    qualityGradeA: "Grade A",
    // Crop names (used in marketplaceCrops)
    cropWheatSona: "Wheat Sona",
    cropBasmatiRice: "Basmati Rice",
    cropHybridTomato: "Hybrid Tomato",
    cropPotatoKufri: "Potato Kufri",
    cropRedOnion: "Red Onion",
    cropYellowSoybean: "Yellow Soybean",
    cropMaize: "Maize",
    cropCotton: "Cotton",
    // Regions
    regionPunjabAmritsar: "Punjab — Amritsar",
    regionHaryanaKarnal: "Haryana — Karnal",
    regionMaharashtraNashik: "Maharashtra — Nashik",
    regionUPAgra: "Uttar Pradesh — Agra",
    regionMaharashtraLasalgaon: "Maharashtra — Lasalgaon",
    regionMPIndore: "Madhya Pradesh — Indore",
    regionMPJabalpur: "Madhya Pradesh — Jabalpur",
    regionMaharashtraNagpur: "Maharashtra — Nagpur",
    // Quintal unit
    unitQuintal: "quintal",
    // Footer
    footerConnect: "Connect",
    footerResources: "Resources",
    footerGetInTouch: "Get In Touch",
    footerContactUs: "Contact Us",
    footerAboutUs: "About Us",
    footerAIAssistant: "AI Assistant",
    footerPostProblem: "Post Problem",
    footerFAQ: "FAQ",
    footerPrivacy: "Privacy & Policy",
    footerTerms: "Terms & Conditions",
    footerMandiRates: "Mandi Rates",
    footerCropAdvisory: "Crop Advisory",
    footerStayUpdated: "Stay Updated",
    footerEmpowering:
      "Empowering farmers with smart agri tools, market insights, and trusted expert support.",
    footerAllRights: "All Rights Reserved",
    // MandiWidget
    mandiLiveRates: "Live Mandi Rates",
    mandiUpdated: "Updated",
    mandiCrop: "Crop",
    mandiPriceCol: "Price",
    mandiChange: "Change",
    mandiMarket: "Market",
    mandiSourceAgmarknet: "Source: Agmarknet India",
    mandiNoResults: "No results found for",
  },

  hi: {
    // ── HERO ──
    heroBadge: "खेती का भविष्य",
    heroTitle1: "किसानों, खरीदारों",
    heroTitle2: "और विशेषज्ञों को जोड़ें",
    heroDesc:
      "रीयल-टाइम मंडी भाव, हाइपर-लोकल मौसम अलर्ट, और सीधी बाज़ार पहुँच — आपकी फसल को सशक्त बनाने के लिए एक ही जगह पर।",
    btnCheckMandi: "मंडी भाव देखें",
    btnJoinNow: "अभी जुड़ें",

    agriConnectLive: "एग्रीकनेक्ट लाइव",
    smartFarmDashboard: "स्मार्ट फार्म डैशबोर्ड",
    weather: "मौसम",
    goodIrrigation: "सिंचाई के लिए अच्छा",
    mandiPrice: "मंडी भाव",
    wheatUp: "गेहूँ +4.2%",
    aiCropDoctor: "एआई फसल डॉक्टर",
    aiCropDoctorDesc: "स्मार्ट एआई सलाह से फसल की बीमारी पहचानें",
    cropHealth: "फसल स्वास्थ्य",
    healthy: "स्वस्थ",
    wheatField: "गेहूँ का खेत",
    soilMoisture: "मिट्टी की नमी",
    farmers: "किसान",
    crops: "फसलें",
    states: "राज्य",
    priceAlert: "भाव अलर्ट",
    soybeanRising: "सोयाबीन बढ़ रहा है",
    verifiedBuyers: "सत्यापित खरीदार",
    directCropDeals: "सीधे फसल सौदे",

    activeMarketplace: "सक्रिय बाज़ार",
    marketplaceDesc: "पूरे भारत के सत्यापित किसानों की ताज़ा फसल लिस्टिंग",
    viewMore: "और देखें",
    farmer: "किसान",
    contact: "संपर्क करें",
    qty: "मात्रा",

    activeUsers: "सक्रिय उपयोगकर्ता",
    connectingRoles: "कृषि के हर महत्वपूर्ण व्यक्ति को जोड़ना",
    activeUsersDesc:
      "एग्रीकनेक्ट किसानों, कृषि विशेषज्ञों और खरीदारों को एक स्मार्ट प्लेटफॉर्म पर लाता है।",
    learnMore: "और जानें",

    forFarmers: "किसानों के लिए",
    forAgronomists: "कृषि विशेषज्ञों के लिए",
    forBuyers: "खरीदारों के लिए",
    directSelling: "सीधी बिक्री",
    pestDiagnosis: "कीट निदान",
    expertAssistance: "विशेषज्ञ सहायता",
    caseManagement: "केस प्रबंधन",
    analyticsDashboard: "विश्लेषण डैशबोर्ड",
    reputationBadges: "प्रतिष्ठा बैज",
    bulkOrders: "थोक ऑर्डर",
    qualityChecks: "गुणवत्ता जाँच",
    traceability: "ट्रेसबिलिटी",

    farmerDesc:
      "किसान एग्रीकनेक्ट का उपयोग सीधे फसल बेचने, मंडी भाव देखने, फसल समस्याएँ पोस्ट करने, विशेषज्ञ सलाह लेने और मौसम आधारित मार्गदर्शन पाने के लिए कर सकते हैं।",
    agronomistDesc:
      "कृषि विशेषज्ञ किसानों का मार्गदर्शन कर सकते हैं, फसल समस्याओं का समाधान कर सकते हैं, केस संभाल सकते हैं, विश्वास बना सकते हैं और प्लेटफ़ॉर्म पर विशेषज्ञ सिफारिशें दे सकते हैं।",
    buyerDesc:
      "खरीदार ताज़ी फसलें देख सकते हैं, भावों की तुलना कर सकते हैं, सीधे किसानों से संपर्क कर सकते हैं, गुणवत्ता जाँच सकते हैं और बिचौलियों पर निर्भर हुए बिना खरीद सकते हैं।",

    howHelpsFarmers: "एग्रीकनेक्ट किसानों की कैसे मदद करता है",
    howHelpsAgronomists: "एग्रीकनेक्ट कृषि विशेषज्ञों की कैसे मदद करता है",
    howHelpsBuyers: "एग्रीकनेक्ट खरीदारों की कैसे मदद करता है",

    farmerPoint1: "फसल रोग या कीट समस्याएँ छवियों के साथ पोस्ट करें",
    farmerPoint2: "समाधान के लिए सीधे कृषि विशेषज्ञों से जुड़ें",
    farmerPoint3: "फसल बेचने से पहले रोज़ाना मंडी भाव देखें",
    farmerPoint4: "बिचौलियों के बिना सीधे खरीदारों को बेचें",
    farmerPoint5: "मौसम अलर्ट और स्मार्ट खेती सुझाव प्राप्त करें",

    agronomistPoint1: "एक डैशबोर्ड में सभी किसानों की फसल समस्याएँ देखें",
    agronomistPoint2: "विशेषज्ञ समाधान और उपचार चरणों के साथ जवाब दें",
    agronomistPoint3: "मिट्टी, कीट, सिंचाई और उर्वरक की समस्याओं में किसानों की मदद करें",
    agronomistPoint4: "उपयोगी विशेषज्ञ उत्तरों से प्रतिष्ठा बनाएँ",
    agronomistPoint5: "डेटा-आधारित सलाह से स्मार्ट खेती का समर्थन करें",

    buyerPoint1: "सत्यापित किसानों की उपलब्ध फसलें ब्राउज़ करें",
    buyerPoint2: "भाव, मात्रा, गुणवत्ता और स्थान देखें",
    buyerPoint3: "थोक ऑर्डर के लिए सीधे किसानों से संपर्क करें",
    buyerPoint4: "बिचौलियों की लागत घटाएँ और पारदर्शिता बढ़ाएँ",
    buyerPoint5: "खेत से बाज़ार तक भरोसेमंद आपूर्ति श्रृंखला बनाएँ",

    joinFarmer: "किसान के रूप में जुड़ें",
    joinAgronomist: "कृषि विशेषज्ञ के रूप में जुड़ें",
    exploreMarketplace: "बाज़ार देखें",

    ourEcosystemServices: "हमारी इकोसिस्टम सेवाएँ",
    marketplace: "बाज़ार",
    marketplaceShortDesc:
      "सत्यापित लॉजिस्टिक्स सहायता के साथ किसानों और थोक खरीदारों के बीच सीधा व्यापार।",
    mandiPrices: "मंडी भाव",
    mandiShortDesc:
      "जानकारीपूर्ण बिक्री के लिए पूरे भारत के 2,000+ मंडियों से रीयल-टाइम दैनिक अपडेट।",
    weatherShortDesc:
      "विशिष्ट फसल प्रकारों के लिए जोखिम अलर्ट के साथ स्थानीय और सटीक पूर्वानुमान।",

    simpleJourney: "सरल यात्रा",
    howWorksTitle: "एग्रीकनेक्ट कैसे काम करता है",
    howWorksDesc:
      "पंजीकरण से शुरू करें, सेवाएँ देखें और सीधे किसानों, खरीदारों और विशेषज्ञों से जुड़ें।",
    step1Title: "पंजीकरण करें",
    step1Desc: "अपने फोन नंबर से साइन अप करें और अपने खेत का स्थान सत्यापित करें।",
    step2Title: "सूचीबद्ध करें / ब्राउज़ करें",
    step2Desc: "अपनी उपज बिक्री के लिए सूचीबद्ध करें या विशेषज्ञ सलाह और बाज़ार भाव देखें।",
    step3Title: "जुड़ें और व्यापार करें",
    step3Desc: "सीधे खरीदारों से सौदा करें या विशेषज्ञों से तुरंत समाधान पाएँ।",

    smartAgriculture: "स्मार्ट कृषि",
    smartFarmingTitle: "स्मार्ट खेती तकनीक",
    smartFarmingDesc:
      "आधुनिक सटीक खेती के लिए एआई, ड्रोन, सैटेलाइट, एआर/वीआर और ऑटोमेशन टूल।",
    arvrTitle: "एआर/वीआर खेती प्रशिक्षण",
    arvrDesc:
      "फसल देखभाल, मशीनरी संचालन, कीट नियंत्रण और आधुनिक खेती के लिए इंटरैक्टिव प्रशिक्षण।",
    aiDiagTitle: "एआई फसल निदान",
    aiDiagDesc:
      "फसल छवियाँ अपलोड करें और एआई का उपयोग करके रोग, कीट और उपचार सुझाव प्राप्त करें।",
    satelliteTitle: "सैटेलाइट फसल निगरानी",
    satelliteDesc:
      "सैटेलाइट इनसाइट से फसल स्वास्थ्य, वनस्पति, तनाव क्षेत्र और खेत की स्थिति की निगरानी करें।",
    droneTitle: "ड्रोन / लैंड रोवर मॉनिटर",
    droneDesc:
      "खेत निरीक्षण, फसल तनाव और कीट पहचान के लिए ड्रोन और लैंड रोवर निगरानी का उपयोग करें।",
    irrigationTitle: "स्मार्ट सिंचाई",
    irrigationDesc:
      "मिट्टी की नमी आधारित सिंचाई और मौसम-जागरूक फसल पानी मार्गदर्शन से पानी बचाएँ।",
    marketDemandTitle: "बाज़ार माँग पूर्वानुमान",
    marketDemandDesc:
      "मशीन लर्निंग इनसाइट का उपयोग करके फसल माँग, बाज़ार रुझान और बेचने का सर्वोत्तम समय अनुमान लगाएँ।",
    explore: "देखें",

    weatherCropAdvisory: "मौसम और फसल सलाह",
    weatherAdvisoryDesc:
      "आपके फसल चक्र के अनुसार खेत-तैयार मौसम जानकारी और कृषि टिप्स। तूफ़ान, गर्मी और सिंचाई समय से आगे रहें।",
    cropRisk: "फसल जोखिम",
    low: "कम",
    harvestWindow: "कटाई का समय",
    days34: "3-4 दिन",
    irrigationTip: "सिंचाई सुझाव",
    morning: "सुबह",
    whatThisMeans: "आपके खेत के लिए इसका क्या मतलब है",
    weatherTip1: "उर्वरक डालने से पहले मिट्टी की नमी जाँचें।",
    weatherTip2: "अधिक नमी या बारिश में कीटनाशक छिड़काव से बचें।",
    weatherTip3: "ठंडे और सूखे मौसम में कटाई की योजना बनाएँ।",
    smartAdvisory: "स्मार्ट सलाह",
    smartAdvisorySubtitle: "आपके चुने हुए स्थान के आधार पर मौसम अपडेट होते रहते हैं।",
    currentLocalSnapshot: "वर्तमान स्थानीय स्थिति",
    live: "लाइव",
    cropReadyWeather: "फसल-तैयार मौसम",
    cropReadyDesc:
      "यह विजेट आपके स्थानीय मौसम के साथ स्वतः अपडेट होता है और सिंचाई, छिड़काव और कटाई की योजना के अगले चरणों पर सलाह देता है।",

    liveMarketData: "लाइव बाज़ार डेटा",
    todaysMandiPrices: "आज के मंडी भाव",
    todaysMandiDesc: "पूरे भारत की प्रमुख मंडियों के रीयल-टाइम कमोडिटी भाव",
    viewOnAgmarknet: "एगमार्कनेट पर देखें",

    partnerTitle: "इन समुदायों में मूल्य जोड़ने के लिए हमारे साथ साझेदारी करें",
    agriInputBrands: "कृषि इनपुट ब्रांड",
    farmServices: "खेत सेवाएँ",
    marketLinkages: "बाज़ार लिंकेज",
    agriInputDesc:
      "हमारा दृष्टिकोण किसानों को गुणवत्तापूर्ण, किफ़ायती और टिकाऊ इनपुट तक समय पर पहुँच देना है। एग्रीकनेक्ट 25+ डिजिटल समुदायों की मेज़बानी करता है, प्रत्येक में 2,000+ सदस्य हैं।",
    farmServicesDesc:
      "हम किसानों को मशीनीकरण, मिट्टी परीक्षण, कस्टम हायरिंग और संपूर्ण खेत प्रबंधन के सत्यापित सेवा प्रदाताओं से जोड़ते हैं।",
    marketLinkagesDesc:
      "खेत से अंतिम खरीदारों — FPO, निर्यातकों, प्रोसेसरों और रिटेल तक की दूरी कम करें। पारदर्शी व्यापार और गुणवत्ता ग्रेडिंग के साथ उचित मूल्य पाएँ।",
    requestDemo: "डेमो अनुरोध करें",
    exploreMore: "और देखें",

    voicesOfSuccess: "सफलता की आवाज़ें",

    ctaTitle: "एक प्लेटफॉर्म पर एआई, सैटेलाइट और स्मार्ट खेती टूल का उपयोग करें",
    ctaDesc:
      "एग्रीकनेक्ट के साथ पहले से ही अपने व्यवसाय बढ़ा रहे 50,000+ किसानों से जुड़ें। आज ही मुफ़्त शुरू करें।",
    downloadApp: "ऐप डाउनलोड करें",
    talkToExpert: "विशेषज्ञ से बात करें",

    // ── NAVBAR ──
    nav_dashboard: "डैशबोर्ड",
    nav_market: "बाज़ार",
    nav_posts: "पोस्ट",
    nav_smart_farming: "स्मार्ट खेती",
    nav_services: "सेवाएँ",
    nav_about: "हमारे बारे में",
    nav_contact: "संपर्क",
    nav_login: "लॉगिन",
    nav_join_now: "अभी जुड़ें",
    nav_govt_schemes: "सरकारी योजनाएँ",
    nav_choose_language: "भाषा चुनें",

    nav_community_posts: "समुदाय पोस्ट",
    nav_community_posts_desc: "देखें किसान क्या साझा करते हैं",
    nav_ask_crop: "फसल समस्या पूछें",
    nav_ask_crop_desc: "अपनी फसल के लिए मदद पाएँ",
    nav_farmer_questions: "किसान प्रश्न",
    nav_farmer_questions_desc: "किसानों के प्रश्न देखें",
    nav_expert_answers: "विशेषज्ञ उत्तर",
    nav_expert_answers_desc: "सत्यापित विशेषज्ञ उत्तर",
    nav_my_posts: "मेरी पोस्ट",
    nav_my_posts_desc: "अपनी पोस्ट प्रबंधित करें",

    nav_marketplace: "बाज़ार",
    nav_marketplace_desc: "सीधे फसल खरीदें और बेचें",
    nav_mandi_prices: "मंडी भाव",
    nav_mandi_prices_desc: "नवीनतम मंडी भाव देखें",

    nav_weather_updates: "मौसम अपडेट",
    nav_expert_connect: "विशेषज्ञ कनेक्ट",
    nav_crop_advisory: "फसल सलाह",
    nav_soil_health: "मिट्टी स्वास्थ्य गाइड",
    nav_pest_disease: "कीट और रोग सहायता",
    nav_fertilizer: "उर्वरक मार्गदर्शन",
    nav_irrigation: "सिंचाई सुझाव",

    nav_ai_doctor: "एआई फसल डॉक्टर",
    nav_satellite: "सैटेलाइट फसल निगरानी",
    nav_drone: "ड्रोन / लैंड रोवर मॉनिटर",
    nav_ml_yield: "एमएल उपज अनुमान",
    nav_arvr: "एआर/वीआर खेती प्रशिक्षण",
    nav_smart_irrigation: "स्मार्ट सिंचाई",
    nav_market_demand: "बाज़ार माँग अनुमान",

    nav_about_agriconnect: "एग्रीकनेक्ट के बारे में",
    nav_for_farmers: "किसानों के लिए",
    nav_for_agronomists: "कृषि विशेषज्ञों के लिए",
    nav_for_buyers: "खरीदारों के लिए",
    nav_our_mission: "हमारा मिशन",
    nav_how_it_works: "यह कैसे काम करता है",

    nav_profile_home: "होम",
    nav_profile_ai_chat: "एआई चैट",
    nav_profile_profile: "प्रोफ़ाइल",
    nav_profile_settings: "सेटिंग्स",
    nav_profile_logout: "लॉग आउट",
    nav_profile_logout_desc: "फिर मिलेंगे!",
    nav_light_mode: "लाइट मोड",
    nav_dark_mode: "डार्क मोड",
    nav_switch_light: "लाइट में बदलें",
    nav_switch_dark: "डार्क में बदलें",
scheme_pm_kisan:
  "PM-KISAN: किसानों को ₹6,000/वर्ष सीधे खाते में — pmkisan.gov.in पर आवेदन करें",
scheme_pm_fby:
  "PMFBY फसल बीमा: कम प्रीमियम पर फसल बीमा सुविधा — समय पर नामांकन करें",
scheme_kcc:
  "किसान क्रेडिट कार्ड: किसानों के लिए आसान खेती ऋण सुविधा — अपने बैंक में आवेदन करें",
scheme_drone_didi:
  "ड्रोन दीदी योजना: कृषि ड्रोन के लिए सहायता",
scheme_pmksy:
  "PMKSY: माइक्रो सिंचाई सब्सिडी — Per Drop More Crop योजना",
scheme_pkvy:
  "PKVY: जैविक खेती समूहों के लिए सहायता — आवेदन करें",
scheme_enam:
  "e-NAM: मंडियों में ऑनलाइन फसल बेचें — enam.gov.in पर रजिस्टर करें",
scheme_soil_health:
  "Soil Health Card: मिट्टी परीक्षण सहायता — नजदीकी KVK पर जाएँ",
    // ── MARKETPLACE & MISC ──
    freshListings: "ताज़ी फसलें",
    viewAll: "सभी देखें",
    qualityExport: "निर्यात गुणवत्ता",
    qualityPremium: "प्रीमियम",
    qualityOrganic: "ऑर्गेनिक",
    qualityGood: "अच्छी",
    qualityFresh: "ताज़ा",
    qualityGradeA: "ग्रेड ए",
    cropWheatSona: "गेहूँ सोना",
    cropBasmatiRice: "बासमती चावल",
    cropHybridTomato: "हाइब्रिड टमाटर",
    cropPotatoKufri: "आलू कुफरी",
    cropRedOnion: "लाल प्याज",
    cropYellowSoybean: "पीला सोयाबीन",
    cropMaize: "मक्का",
    cropCotton: "कपास",
    regionPunjabAmritsar: "पंजाब — अमृतसर",
    regionHaryanaKarnal: "हरियाणा — करनाल",
    regionMaharashtraNashik: "महाराष्ट्र — नाशिक",
    regionUPAgra: "उत्तर प्रदेश — आगरा",
    regionMaharashtraLasalgaon: "महाराष्ट्र — लासलगाँव",
    regionMPIndore: "मध्य प्रदेश — इंदौर",
    regionMPJabalpur: "मध्य प्रदेश — जबलपुर",
    regionMaharashtraNagpur: "महाराष्ट्र — नागपुर",
    unitQuintal: "क्विंटल",
    footerConnect: "जुड़ें",
    footerResources: "संसाधन",
    footerGetInTouch: "संपर्क करें",
    footerContactUs: "संपर्क करें",
    footerAboutUs: "हमारे बारे में",
    footerAIAssistant: "एआई सहायक",
    footerPostProblem: "समस्या पोस्ट करें",
    footerFAQ: "अक्सर पूछे जाने वाले प्रश्न",
    footerPrivacy: "गोपनीयता नीति",
    footerTerms: "नियम और शर्तें",
    footerMandiRates: "मंडी भाव",
    footerCropAdvisory: "फसल सलाह",
    footerStayUpdated: "अपडेट रहें",
    footerEmpowering:
      "किसानों को स्मार्ट कृषि उपकरण, बाज़ार जानकारी और विशेषज्ञ सहायता से सशक्त बनाना।",
    footerAllRights: "सभी अधिकार सुरक्षित",
    mandiLiveRates: "लाइव मंडी भाव",
    mandiUpdated: "अपडेट",
    mandiCrop: "फसल",
    mandiPriceCol: "भाव",
    mandiChange: "बदलाव",
    mandiMarket: "मंडी",
    mandiSourceAgmarknet: "स्रोत: एगमार्कनेट भारत",
    mandiNoResults: "इसके लिए कोई परिणाम नहीं मिला",
  },

  pa: {
    // ── HERO ──
    heroBadge: "ਖੇਤੀਬਾੜੀ ਦਾ ਭਵਿੱਖ",
    heroTitle1: "ਕਿਸਾਨਾਂ, ਖਰੀਦਦਾਰਾਂ",
    heroTitle2: "ਅਤੇ ਮਾਹਿਰਾਂ ਨੂੰ ਜੋੜੋ",
    heroDesc:
      "ਰੀਅਲ-ਟਾਈਮ ਮੰਡੀ ਭਾਅ, ਹਾਈਪਰ-ਲੋਕਲ ਮੌਸਮ ਅਲਰਟ, ਅਤੇ ਸਿੱਧੀ ਮਾਰਕੀਟ ਪਹੁੰਚ — ਤੁਹਾਡੀ ਫ਼ਸਲ ਨੂੰ ਮਜ਼ਬੂਤ ਕਰਨ ਲਈ ਇੱਕੋ ਥਾਂ ਉੱਤੇ।",
    btnCheckMandi: "ਮੰਡੀ ਭਾਅ ਵੇਖੋ",
    btnJoinNow: "ਹੁਣੇ ਸ਼ਾਮਲ ਹੋਵੋ",

    agriConnectLive: "ਐਗਰੀਕਨੈਕਟ ਲਾਈਵ",
    smartFarmDashboard: "ਸਮਾਰਟ ਫਾਰਮ ਡੈਸ਼ਬੋਰਡ",
    weather: "ਮੌਸਮ",
    goodIrrigation: "ਸਿੰਚਾਈ ਲਈ ਚੰਗਾ",
    mandiPrice: "ਮੰਡੀ ਭਾਅ",
    wheatUp: "ਕਣਕ +4.2%",
    aiCropDoctor: "ਏਆਈ ਫ਼ਸਲ ਡਾਕਟਰ",
    aiCropDoctorDesc: "ਸਮਾਰਟ ਏਆਈ ਸਲਾਹ ਨਾਲ ਫ਼ਸਲ ਦੀ ਬੀਮਾਰੀ ਪਛਾਣੋ",
    cropHealth: "ਫ਼ਸਲ ਸਿਹਤ",
    healthy: "ਸਿਹਤਮੰਦ",
    wheatField: "ਕਣਕ ਦਾ ਖੇਤ",
    soilMoisture: "ਮਿੱਟੀ ਦੀ ਨਮੀ",
    farmers: "ਕਿਸਾਨ",
    crops: "ਫ਼ਸਲਾਂ",
    states: "ਰਾਜ",
    priceAlert: "ਭਾਅ ਅਲਰਟ",
    soybeanRising: "ਸੋਇਆਬੀਨ ਵਧ ਰਿਹਾ ਹੈ",
    verifiedBuyers: "ਪ੍ਰਮਾਣਿਤ ਖਰੀਦਦਾਰ",
    directCropDeals: "ਸਿੱਧੇ ਫ਼ਸਲ ਸੌਦੇ",

    activeMarketplace: "ਸਰਗਰਮ ਮਾਰਕੀਟ",
    marketplaceDesc: "ਪੂਰੇ ਭਾਰਤ ਦੇ ਪ੍ਰਮਾਣਿਤ ਕਿਸਾਨਾਂ ਦੀਆਂ ਤਾਜ਼ੀਆਂ ਫ਼ਸਲ ਲਿਸਟਿੰਗਾਂ",
    viewMore: "ਹੋਰ ਵੇਖੋ",
    farmer: "ਕਿਸਾਨ",
    contact: "ਸੰਪਰਕ ਕਰੋ",
    qty: "ਮਾਤਰਾ",

    activeUsers: "ਸਰਗਰਮ ਵਰਤੋਂਕਾਰ",
    connectingRoles: "ਖੇਤੀਬਾੜੀ ਦੇ ਹਰ ਮਹੱਤਵਪੂਰਨ ਭੂਮਿਕਾ ਨੂੰ ਜੋੜਨਾ",
    activeUsersDesc:
      "ਐਗਰੀਕਨੈਕਟ ਕਿਸਾਨਾਂ, ਖੇਤੀਬਾੜੀ ਮਾਹਿਰਾਂ ਅਤੇ ਖਰੀਦਦਾਰਾਂ ਨੂੰ ਇੱਕ ਸਮਾਰਟ ਪਲੇਟਫਾਰਮ ਉੱਤੇ ਲਿਆਉਂਦਾ ਹੈ।",
    learnMore: "ਹੋਰ ਜਾਣੋ",

    forFarmers: "ਕਿਸਾਨਾਂ ਲਈ",
    forAgronomists: "ਖੇਤੀਬਾੜੀ ਮਾਹਿਰਾਂ ਲਈ",
    forBuyers: "ਖਰੀਦਦਾਰਾਂ ਲਈ",
    directSelling: "ਸਿੱਧੀ ਵਿਕਰੀ",
    pestDiagnosis: "ਕੀੜੇ ਨਿਦਾਨ",
    expertAssistance: "ਮਾਹਿਰ ਸਹਾਇਤਾ",
    caseManagement: "ਕੇਸ ਪ੍ਰਬੰਧਨ",
    analyticsDashboard: "ਵਿਸ਼ਲੇਸ਼ਣ ਡੈਸ਼ਬੋਰਡ",
    reputationBadges: "ਪ੍ਰਤਿਸ਼ਠਾ ਬੈਜ",
    bulkOrders: "ਥੋਕ ਆਰਡਰ",
    qualityChecks: "ਗੁਣਵੱਤਾ ਜਾਂਚ",
    traceability: "ਟ੍ਰੇਸੇਬਿਲਟੀ",

    farmerDesc:
      "ਕਿਸਾਨ ਐਗਰੀਕਨੈਕਟ ਦੀ ਵਰਤੋਂ ਫ਼ਸਲਾਂ ਸਿੱਧੀਆਂ ਵੇਚਣ, ਮੰਡੀ ਭਾਅ ਵੇਖਣ, ਫ਼ਸਲ ਸਮੱਸਿਆਵਾਂ ਪੋਸਟ ਕਰਨ, ਮਾਹਿਰ ਸਲਾਹ ਲੈਣ ਅਤੇ ਮੌਸਮ ਅਧਾਰਤ ਮਾਰਗਦਰਸ਼ਨ ਲਈ ਕਰ ਸਕਦੇ ਹਨ।",
    agronomistDesc:
      "ਖੇਤੀਬਾੜੀ ਮਾਹਿਰ ਕਿਸਾਨਾਂ ਦੀ ਅਗਵਾਈ ਕਰ ਸਕਦੇ ਹਨ, ਫ਼ਸਲ ਸਮੱਸਿਆਵਾਂ ਨੂੰ ਹੱਲ ਕਰ ਸਕਦੇ ਹਨ, ਕੇਸ ਸੰਭਾਲ ਸਕਦੇ ਹਨ ਅਤੇ ਪਲੇਟਫਾਰਮ ਰਾਹੀਂ ਮਾਹਿਰ ਸਿਫ਼ਾਰਸ਼ਾਂ ਦੇ ਸਕਦੇ ਹਨ।",
    buyerDesc:
      "ਖਰੀਦਦਾਰ ਤਾਜ਼ੀਆਂ ਫ਼ਸਲਾਂ ਵੇਖ ਸਕਦੇ ਹਨ, ਭਾਅ ਤੁਲਨਾ ਕਰ ਸਕਦੇ ਹਨ, ਸਿੱਧੇ ਕਿਸਾਨਾਂ ਨਾਲ ਸੰਪਰਕ ਕਰ ਸਕਦੇ ਹਨ ਅਤੇ ਵਿਚੋਲੇ ਤੋਂ ਬਿਨਾਂ ਖਰੀਦ ਸਕਦੇ ਹਨ।",

    howHelpsFarmers: "ਐਗਰੀਕਨੈਕਟ ਕਿਸਾਨਾਂ ਦੀ ਕਿਵੇਂ ਮਦਦ ਕਰਦਾ ਹੈ",
    howHelpsAgronomists: "ਐਗਰੀਕਨੈਕਟ ਖੇਤੀਬਾੜੀ ਮਾਹਿਰਾਂ ਦੀ ਕਿਵੇਂ ਮਦਦ ਕਰਦਾ ਹੈ",
    howHelpsBuyers: "ਐਗਰੀਕਨੈਕਟ ਖਰੀਦਦਾਰਾਂ ਦੀ ਕਿਵੇਂ ਮਦਦ ਕਰਦਾ ਹੈ",

    farmerPoint1: "ਚਿੱਤਰਾਂ ਨਾਲ ਫ਼ਸਲ ਰੋਗ ਜਾਂ ਕੀੜੇ ਸਮੱਸਿਆਵਾਂ ਪੋਸਟ ਕਰੋ",
    farmerPoint2: "ਹੱਲ ਲਈ ਸਿੱਧੇ ਖੇਤੀਬਾੜੀ ਮਾਹਿਰਾਂ ਨਾਲ ਜੁੜੋ",
    farmerPoint3: "ਫ਼ਸਲ ਵੇਚਣ ਤੋਂ ਪਹਿਲਾਂ ਰੋਜ਼ਾਨਾ ਮੰਡੀ ਭਾਅ ਵੇਖੋ",
    farmerPoint4: "ਵਿਚੋਲਿਆਂ ਤੋਂ ਬਿਨਾਂ ਸਿੱਧੇ ਖਰੀਦਦਾਰਾਂ ਨੂੰ ਵੇਚੋ",
    farmerPoint5: "ਮੌਸਮ ਅਲਰਟ ਅਤੇ ਸਮਾਰਟ ਖੇਤੀ ਸੁਝਾਅ ਪ੍ਰਾਪਤ ਕਰੋ",

    agronomistPoint1: "ਇੱਕ ਡੈਸ਼ਬੋਰਡ ਵਿੱਚ ਕਿਸਾਨਾਂ ਦੀਆਂ ਫ਼ਸਲ ਸਮੱਸਿਆਵਾਂ ਵੇਖੋ",
    agronomistPoint2: "ਮਾਹਿਰ ਹੱਲ ਅਤੇ ਇਲਾਜ ਦੇ ਕਦਮਾਂ ਨਾਲ ਜਵਾਬ ਦਿਓ",
    agronomistPoint3: "ਮਿੱਟੀ, ਕੀੜੇ, ਸਿੰਚਾਈ ਅਤੇ ਖਾਦ ਮੁੱਦਿਆਂ ਵਿੱਚ ਕਿਸਾਨਾਂ ਦੀ ਮਦਦ ਕਰੋ",
    agronomistPoint4: "ਮਦਦਗਾਰ ਮਾਹਿਰ ਜਵਾਬਾਂ ਰਾਹੀਂ ਪ੍ਰਤਿਸ਼ਠਾ ਬਣਾਓ",
    agronomistPoint5: "ਡੇਟਾ-ਅਧਾਰਤ ਸਲਾਹ ਨਾਲ ਸਮਾਰਟ ਖੇਤੀਬਾੜੀ ਦਾ ਸਮਰਥਨ ਕਰੋ",

    buyerPoint1: "ਪ੍ਰਮਾਣਿਤ ਕਿਸਾਨਾਂ ਦੀਆਂ ਉਪਲਬਧ ਫ਼ਸਲਾਂ ਬ੍ਰਾਉਜ਼ ਕਰੋ",
    buyerPoint2: "ਭਾਅ, ਮਾਤਰਾ, ਗੁਣਵੱਤਾ ਅਤੇ ਸਥਾਨ ਵੇਖੋ",
    buyerPoint3: "ਥੋਕ ਆਰਡਰ ਲਈ ਸਿੱਧੇ ਕਿਸਾਨਾਂ ਨਾਲ ਸੰਪਰਕ ਕਰੋ",
    buyerPoint4: "ਵਿਚੋਲੇ ਦੀ ਲਾਗਤ ਘਟਾਓ ਅਤੇ ਪਾਰਦਰਸ਼ਤਾ ਵਧਾਓ",
    buyerPoint5: "ਖੇਤ ਤੋਂ ਮਾਰਕੀਟ ਤੱਕ ਭਰੋਸੇਮੰਦ ਸਪਲਾਈ ਚੇਨ ਬਣਾਓ",

    joinFarmer: "ਕਿਸਾਨ ਵਜੋਂ ਸ਼ਾਮਲ ਹੋਵੋ",
    joinAgronomist: "ਖੇਤੀਬਾੜੀ ਮਾਹਿਰ ਵਜੋਂ ਸ਼ਾਮਲ ਹੋਵੋ",
    exploreMarketplace: "ਮਾਰਕੀਟ ਵੇਖੋ",

    ourEcosystemServices: "ਸਾਡੀਆਂ ਈਕੋਸਿਸਟਮ ਸੇਵਾਵਾਂ",
    marketplace: "ਮਾਰਕੀਟ",
    marketplaceShortDesc:
      "ਪ੍ਰਮਾਣਿਤ ਲੌਜਿਸਟਿਕ ਸਹਾਇਤਾ ਨਾਲ ਕਿਸਾਨਾਂ ਅਤੇ ਥੋਕ ਖਰੀਦਦਾਰਾਂ ਵਿਚਕਾਰ ਸਿੱਧਾ ਵਪਾਰ।",
    mandiPrices: "ਮੰਡੀ ਭਾਅ",
    mandiShortDesc:
      "ਜਾਣਕਾਰੀ ਭਰਪੂਰ ਵਿਕਰੀ ਲਈ ਪੂਰੇ ਭਾਰਤ ਦੀਆਂ 2,000+ ਮੰਡੀਆਂ ਤੋਂ ਰੀਅਲ-ਟਾਈਮ ਰੋਜ਼ਾਨਾ ਅਪਡੇਟ।",
    weatherShortDesc:
      "ਖਾਸ ਫ਼ਸਲ ਕਿਸਮਾਂ ਲਈ ਜੋਖਮ ਅਲਰਟ ਨਾਲ ਸਥਾਨਕ ਅਤੇ ਸਟੀਕ ਪੂਰਵ ਅਨੁਮਾਨ।",

    simpleJourney: "ਸਰਲ ਯਾਤਰਾ",
    howWorksTitle: "ਐਗਰੀਕਨੈਕਟ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ",
    howWorksDesc:
      "ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਨਾਲ ਸ਼ੁਰੂ ਕਰੋ, ਸੇਵਾਵਾਂ ਵੇਖੋ ਅਤੇ ਸਿੱਧੇ ਕਿਸਾਨਾਂ, ਖਰੀਦਦਾਰਾਂ ਅਤੇ ਮਾਹਿਰਾਂ ਨਾਲ ਜੁੜੋ।",
    step1Title: "ਰਜਿਸਟਰ ਕਰੋ",
    step1Desc: "ਆਪਣੇ ਫੋਨ ਨੰਬਰ ਨਾਲ ਸਾਈਨ ਅਪ ਕਰੋ ਅਤੇ ਆਪਣੇ ਖੇਤ ਦਾ ਸਥਾਨ ਤਸਦੀਕ ਕਰੋ।",
    step2Title: "ਸੂਚੀਬੱਧ / ਬ੍ਰਾਉਜ਼ ਕਰੋ",
    step2Desc: "ਆਪਣੀ ਫ਼ਸਲ ਵਿਕਰੀ ਲਈ ਸੂਚੀਬੱਧ ਕਰੋ ਜਾਂ ਮਾਹਿਰ ਸਲਾਹ ਅਤੇ ਮਾਰਕੀਟ ਭਾਅ ਵੇਖੋ।",
    step3Title: "ਜੁੜੋ ਅਤੇ ਵਪਾਰ ਕਰੋ",
    step3Desc: "ਸਿੱਧੇ ਖਰੀਦਦਾਰਾਂ ਨਾਲ ਸੌਦੇ ਕਰੋ ਜਾਂ ਮਾਹਿਰਾਂ ਤੋਂ ਤੁਰੰਤ ਹੱਲ ਪ੍ਰਾਪਤ ਕਰੋ।",

    smartAgriculture: "ਸਮਾਰਟ ਖੇਤੀਬਾੜੀ",
    smartFarmingTitle: "ਸਮਾਰਟ ਖੇਤੀ ਤਕਨਾਲੋਜੀ",
    smartFarmingDesc:
      "ਆਧੁਨਿਕ ਸਟੀਕ ਖੇਤੀ ਲਈ ਏਆਈ, ਡਰੋਨ, ਸੈਟੇਲਾਈਟ, ਏਆਰ/ਵੀਆਰ ਅਤੇ ਆਟੋਮੇਸ਼ਨ ਟੂਲ।",
    arvrTitle: "ਏਆਰ/ਵੀਆਰ ਫਾਰਮ ਟ੍ਰੇਨਿੰਗ",
    arvrDesc:
      "ਫ਼ਸਲ ਦੇਖਭਾਲ, ਮਸ਼ੀਨਰੀ ਸੰਚਾਲਨ, ਕੀੜੇ ਕੰਟਰੋਲ ਅਤੇ ਆਧੁਨਿਕ ਖੇਤੀ ਲਈ ਇੰਟਰਐਕਟਿਵ ਟ੍ਰੇਨਿੰਗ।",
    aiDiagTitle: "ਏਆਈ ਫ਼ਸਲ ਨਿਦਾਨ",
    aiDiagDesc:
      "ਫ਼ਸਲ ਚਿੱਤਰ ਅਪਲੋਡ ਕਰੋ ਅਤੇ ਏਆਈ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਰੋਗ, ਕੀੜੇ ਅਤੇ ਇਲਾਜ ਸੁਝਾਅ ਪ੍ਰਾਪਤ ਕਰੋ।",
    satelliteTitle: "ਸੈਟੇਲਾਈਟ ਫ਼ਸਲ ਨਿਗਰਾਨੀ",
    satelliteDesc:
      "ਸੈਟੇਲਾਈਟ ਇਨਸਾਈਟ ਨਾਲ ਫ਼ਸਲ ਸਿਹਤ, ਬਨਸਪਤੀ, ਤਣਾਅ ਜ਼ੋਨ ਅਤੇ ਖੇਤ ਦੀ ਸਥਿਤੀ ਦੀ ਨਿਗਰਾਨੀ ਕਰੋ।",
    droneTitle: "ਡਰੋਨ / ਲੈਂਡ ਰੋਵਰ ਨਿਗਰਾਨ",
    droneDesc:
      "ਖੇਤ ਨਿਰੀਖਣ, ਫ਼ਸਲ ਤਣਾਅ ਅਤੇ ਕੀੜੇ ਪਛਾਣ ਲਈ ਡਰੋਨ ਅਤੇ ਲੈਂਡ ਰੋਵਰ ਨਿਗਰਾਨੀ ਦੀ ਵਰਤੋਂ ਕਰੋ।",
    irrigationTitle: "ਸਮਾਰਟ ਸਿੰਚਾਈ",
    irrigationDesc:
      "ਮਿੱਟੀ ਦੀ ਨਮੀ ਅਧਾਰਤ ਸਿੰਚਾਈ ਅਤੇ ਮੌਸਮ-ਜਾਗਰੂਕ ਫ਼ਸਲ ਪਾਣੀ ਮਾਰਗਦਰਸ਼ਨ ਨਾਲ ਪਾਣੀ ਬਚਾਓ।",
    marketDemandTitle: "ਮਾਰਕੀਟ ਮੰਗ ਪੂਰਵ ਅਨੁਮਾਨ",
    marketDemandDesc:
      "ਮਸ਼ੀਨ ਲਰਨਿੰਗ ਇਨਸਾਈਟ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਫ਼ਸਲ ਮੰਗ, ਮਾਰਕੀਟ ਰੁਝਾਨ ਅਤੇ ਵੇਚਣ ਦੇ ਸਭ ਤੋਂ ਵਧੀਆ ਸਮੇਂ ਦਾ ਅਨੁਮਾਨ ਲਗਾਓ।",
    explore: "ਵੇਖੋ",

    weatherCropAdvisory: "ਮੌਸਮ ਅਤੇ ਫ਼ਸਲ ਸਲਾਹ",
    weatherAdvisoryDesc:
      "ਤੁਹਾਡੇ ਫ਼ਸਲ ਚੱਕਰ ਲਈ ਖੇਤ-ਤਿਆਰ ਮੌਸਮ ਜਾਣਕਾਰੀ ਅਤੇ ਖੇਤੀਬਾੜੀ ਟਿਪਸ। ਤੂਫ਼ਾਨ, ਗਰਮੀ ਅਤੇ ਸਿੰਚਾਈ ਸਮੇਂ ਤੋਂ ਅੱਗੇ ਰਹੋ।",
    cropRisk: "ਫ਼ਸਲ ਜੋਖਮ",
    low: "ਘੱਟ",
    harvestWindow: "ਕਟਾਈ ਦਾ ਸਮਾਂ",
    days34: "3-4 ਦਿਨ",
    irrigationTip: "ਸਿੰਚਾਈ ਸੁਝਾਅ",
    morning: "ਸਵੇਰ",
    whatThisMeans: "ਤੁਹਾਡੇ ਖੇਤ ਲਈ ਇਸਦਾ ਕੀ ਮਤਲਬ ਹੈ",
    weatherTip1: "ਖਾਦ ਪਾਉਣ ਤੋਂ ਪਹਿਲਾਂ ਮਿੱਟੀ ਦੀ ਨਮੀ ਜਾਂਚੋ।",
    weatherTip2: "ਉੱਚੀ ਨਮੀ ਜਾਂ ਮੀਂਹ ਵਿੱਚ ਕੀਟਨਾਸ਼ਕ ਛਿੜਕਾਅ ਤੋਂ ਬਚੋ।",
    weatherTip3: "ਠੰਡੇ ਅਤੇ ਸੁੱਕੇ ਮੌਸਮ ਵਿੱਚ ਕਟਾਈ ਦੀ ਯੋਜਨਾ ਬਣਾਓ।",
    smartAdvisory: "ਸਮਾਰਟ ਸਲਾਹ",
    smartAdvisorySubtitle: "ਤੁਹਾਡੇ ਚੁਣੇ ਹੋਏ ਸਥਾਨ ਦੇ ਅਧਾਰ ਉੱਤੇ ਮੌਸਮ ਅਪਡੇਟ ਹੁੰਦੇ ਹਨ।",
    currentLocalSnapshot: "ਮੌਜੂਦਾ ਸਥਾਨਕ ਸਥਿਤੀ",
    live: "ਲਾਈਵ",
    cropReadyWeather: "ਫ਼ਸਲ-ਤਿਆਰ ਮੌਸਮ",
    cropReadyDesc:
      "ਇਹ ਵਿਜੇਟ ਤੁਹਾਡੇ ਸਥਾਨਕ ਮੌਸਮ ਨਾਲ ਆਪੇ ਅਪਡੇਟ ਹੁੰਦਾ ਹੈ ਅਤੇ ਸਿੰਚਾਈ, ਛਿੜਕਾਅ ਅਤੇ ਕਟਾਈ ਦੀ ਯੋਜਨਾ ਲਈ ਅਗਲੇ ਕਦਮਾਂ ਉੱਤੇ ਸਲਾਹ ਦਿੰਦਾ ਹੈ।",

    liveMarketData: "ਲਾਈਵ ਮਾਰਕੀਟ ਡੇਟਾ",
    todaysMandiPrices: "ਅੱਜ ਦੇ ਮੰਡੀ ਭਾਅ",
    todaysMandiDesc: "ਪੂਰੇ ਭਾਰਤ ਦੀਆਂ ਪ੍ਰਮੁੱਖ ਮੰਡੀਆਂ ਦੇ ਰੀਅਲ-ਟਾਈਮ ਕਮੋਡਿਟੀ ਭਾਅ",
    viewOnAgmarknet: "ਐਗਮਾਰਕਨੈਟ ਉੱਤੇ ਵੇਖੋ",

    partnerTitle: "ਇਹਨਾਂ ਭਾਈਚਾਰਿਆਂ ਵਿੱਚ ਮੁੱਲ ਜੋੜਨ ਲਈ ਸਾਡੇ ਨਾਲ ਭਾਈਵਾਲੀ ਕਰੋ",
    agriInputBrands: "ਖੇਤੀਬਾੜੀ ਇਨਪੁਟ ਬ੍ਰਾਂਡ",
    farmServices: "ਖੇਤ ਸੇਵਾਵਾਂ",
    marketLinkages: "ਮਾਰਕੀਟ ਲਿੰਕੇਜ",
    agriInputDesc:
      "ਸਾਡਾ ਉਦੇਸ਼ ਕਿਸਾਨਾਂ ਨੂੰ ਗੁਣਵੱਤਾਪੂਰਨ, ਕਿਫਾਇਤੀ ਅਤੇ ਟਿਕਾਊ ਇਨਪੁਟ ਤੱਕ ਸਮੇਂ ਸਿਰ ਪਹੁੰਚ ਪ੍ਰਦਾਨ ਕਰਨਾ ਹੈ। ਐਗਰੀਕਨੈਕਟ 25+ ਡਿਜੀਟਲ ਭਾਈਚਾਰਿਆਂ ਦੀ ਮੇਜ਼ਬਾਨੀ ਕਰਦਾ ਹੈ।",
    farmServicesDesc:
      "ਅਸੀਂ ਕਿਸਾਨਾਂ ਨੂੰ ਮਸ਼ੀਨੀਕਰਨ, ਮਿੱਟੀ ਪਰਖ, ਕਸਟਮ ਹਾਇਰਿੰਗ ਅਤੇ ਖੇਤ ਪ੍ਰਬੰਧਨ ਦੇ ਪ੍ਰਮਾਣਿਤ ਸੇਵਾ ਪ੍ਰਦਾਤਾਵਾਂ ਨਾਲ ਜੋੜਦੇ ਹਾਂ।",
    marketLinkagesDesc:
      "ਖੇਤ ਤੋਂ ਅੰਤਮ ਖਰੀਦਦਾਰਾਂ — FPO, ਨਿਰਯਾਤਕਾਂ, ਪ੍ਰੋਸੈਸਰਾਂ ਅਤੇ ਆਧੁਨਿਕ ਰਿਟੇਲ ਤੱਕ ਦੀ ਦੂਰੀ ਘਟਾਓ।",
    requestDemo: "ਡੈਮੋ ਦੀ ਬੇਨਤੀ ਕਰੋ",
    exploreMore: "ਹੋਰ ਵੇਖੋ",

    voicesOfSuccess: "ਸਫਲਤਾ ਦੀਆਂ ਆਵਾਜ਼ਾਂ",

    ctaTitle: "ਇੱਕ ਪਲੇਟਫਾਰਮ ਵਿੱਚ ਏਆਈ, ਸੈਟੇਲਾਈਟ ਅਤੇ ਸਮਾਰਟ ਖੇਤੀ ਟੂਲ ਵਰਤੋ",
    ctaDesc:
      "ਐਗਰੀਕਨੈਕਟ ਨਾਲ ਪਹਿਲਾਂ ਹੀ ਆਪਣਾ ਕਾਰੋਬਾਰ ਵਧਾ ਰਹੇ 50,000+ ਕਿਸਾਨਾਂ ਨਾਲ ਜੁੜੋ। ਅੱਜ ਹੀ ਮੁਫ਼ਤ ਸ਼ੁਰੂ ਕਰੋ।",
    downloadApp: "ਐਪ ਡਾਊਨਲੋਡ ਕਰੋ",
    talkToExpert: "ਮਾਹਿਰ ਨਾਲ ਗੱਲ ਕਰੋ",

    // ── NAVBAR ──
    nav_dashboard: "ਡੈਸ਼ਬੋਰਡ",
    nav_market: "ਮਾਰਕੀਟ",
    nav_posts: "ਪੋਸਟਾਂ",
    nav_smart_farming: "ਸਮਾਰਟ ਖੇਤੀ",
    nav_services: "ਸੇਵਾਵਾਂ",
    nav_about: "ਸਾਡੇ ਬਾਰੇ",
    nav_contact: "ਸੰਪਰਕ",
    nav_login: "ਲੌਗਇਨ",
    nav_join_now: "ਹੁਣੇ ਸ਼ਾਮਲ ਹੋਵੋ",
    nav_govt_schemes: "ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ",
    nav_choose_language: "ਭਾਸ਼ਾ ਚੁਣੋ",

    nav_community_posts: "ਭਾਈਚਾਰਾ ਪੋਸਟਾਂ",
    nav_community_posts_desc: "ਵੇਖੋ ਕਿਸਾਨ ਕੀ ਸਾਂਝਾ ਕਰਦੇ ਹਨ",
    nav_ask_crop: "ਫ਼ਸਲ ਸਮੱਸਿਆ ਪੁੱਛੋ",
    nav_ask_crop_desc: "ਆਪਣੀ ਫ਼ਸਲ ਲਈ ਮਦਦ ਲਵੋ",
    nav_farmer_questions: "ਕਿਸਾਨ ਸਵਾਲ",
    nav_farmer_questions_desc: "ਕਿਸਾਨਾਂ ਦੇ ਸਵਾਲ ਵੇਖੋ",
    nav_expert_answers: "ਮਾਹਿਰ ਜਵਾਬ",
    nav_expert_answers_desc: "ਪ੍ਰਮਾਣਿਤ ਮਾਹਿਰ ਜਵਾਬ",
    nav_my_posts: "ਮੇਰੀਆਂ ਪੋਸਟਾਂ",
    nav_my_posts_desc: "ਆਪਣੀਆਂ ਪੋਸਟਾਂ ਪ੍ਰਬੰਧਿਤ ਕਰੋ",

    nav_marketplace: "ਮਾਰਕੀਟ",
    nav_marketplace_desc: "ਸਿੱਧੇ ਫ਼ਸਲਾਂ ਖਰੀਦੋ ਅਤੇ ਵੇਚੋ",
    nav_mandi_prices: "ਮੰਡੀ ਭਾਅ",
    nav_mandi_prices_desc: "ਨਵੀਨਤਮ ਮੰਡੀ ਭਾਅ ਵੇਖੋ",

    nav_weather_updates: "ਮੌਸਮ ਅਪਡੇਟ",
    nav_expert_connect: "ਮਾਹਿਰ ਕਨੈਕਟ",
    nav_crop_advisory: "ਫ਼ਸਲ ਸਲਾਹ",
    nav_soil_health: "ਮਿੱਟੀ ਸਿਹਤ ਗਾਈਡ",
    nav_pest_disease: "ਕੀੜੇ ਅਤੇ ਰੋਗ ਮਦਦ",
    nav_fertilizer: "ਖਾਦ ਮਾਰਗਦਰਸ਼ਨ",
    nav_irrigation: "ਸਿੰਚਾਈ ਸੁਝਾਅ",

    nav_ai_doctor: "ਏਆਈ ਫ਼ਸਲ ਡਾਕਟਰ",
    nav_satellite: "ਸੈਟੇਲਾਈਟ ਫ਼ਸਲ ਨਿਗਰਾਨੀ",
    nav_drone: "ਡਰੋਨ / ਲੈਂਡ ਰੋਵਰ ਨਿਗਰਾਨ",
    nav_ml_yield: "ਐਮਐਲ ਉਪਜ ਅਨੁਮਾਨ",
    nav_arvr: "ਏਆਰ/ਵੀਆਰ ਖੇਤੀ ਟ੍ਰੇਨਿੰਗ",
    nav_smart_irrigation: "ਸਮਾਰਟ ਸਿੰਚਾਈ",
    nav_market_demand: "ਮਾਰਕੀਟ ਮੰਗ ਅਨੁਮਾਨ",

    nav_about_agriconnect: "ਐਗਰੀਕਨੈਕਟ ਬਾਰੇ",
    nav_for_farmers: "ਕਿਸਾਨਾਂ ਲਈ",
    nav_for_agronomists: "ਖੇਤੀਬਾੜੀ ਮਾਹਿਰਾਂ ਲਈ",
    nav_for_buyers: "ਖਰੀਦਦਾਰਾਂ ਲਈ",
    nav_our_mission: "ਸਾਡਾ ਮਿਸ਼ਨ",
    nav_how_it_works: "ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ",

    nav_profile_home: "ਹੋਮ",
    nav_profile_ai_chat: "ਏਆਈ ਚੈਟ",
    nav_profile_profile: "ਪ੍ਰੋਫਾਈਲ",
    nav_profile_settings: "ਸੈਟਿੰਗਾਂ",
    nav_profile_logout: "ਲੌਗ ਆਊਟ",
    nav_profile_logout_desc: "ਫਿਰ ਮਿਲਾਂਗੇ!",
    nav_light_mode: "ਲਾਈਟ ਮੋਡ",
    nav_dark_mode: "ਡਾਰਕ ਮੋਡ",
    nav_switch_light: "ਲਾਈਟ ਵਿੱਚ ਬਦਲੋ",
    nav_switch_dark: "ਡਾਰਕ ਵਿੱਚ ਬਦਲੋ",

    // ── MARKETPLACE & MISC ──
    freshListings: "ਤਾਜ਼ੀਆਂ ਫ਼ਸਲਾਂ",
    viewAll: "ਸਾਰੇ ਵੇਖੋ",
    qualityExport: "ਨਿਰਯਾਤ ਗੁਣਵੱਤਾ",
    qualityPremium: "ਪ੍ਰੀਮੀਅਮ",
    qualityOrganic: "ਜੈਵਿਕ",
    qualityGood: "ਚੰਗੀ",
    qualityFresh: "ਤਾਜ਼ੀ",
    qualityGradeA: "ਗ੍ਰੇਡ ਏ",
    cropWheatSona: "ਕਣਕ ਸੋਨਾ",
    cropBasmatiRice: "ਬਾਸਮਤੀ ਚਾਵਲ",
    cropHybridTomato: "ਹਾਈਬ੍ਰਿਡ ਟਮਾਟਰ",
    cropPotatoKufri: "ਆਲੂ ਕੁਫਰੀ",
    cropRedOnion: "ਲਾਲ ਪਿਆਜ਼",
    cropYellowSoybean: "ਪੀਲਾ ਸੋਇਆਬੀਨ",
    cropMaize: "ਮੱਕੀ",
    cropCotton: "ਕਪਾਹ",
    regionPunjabAmritsar: "ਪੰਜਾਬ — ਅੰਮ੍ਰਿਤਸਰ",
    regionHaryanaKarnal: "ਹਰਿਆਣਾ — ਕਰਨਾਲ",
    regionMaharashtraNashik: "ਮਹਾਰਾਸ਼ਟਰ — ਨਾਸਿਕ",
    regionUPAgra: "ਉੱਤਰ ਪ੍ਰਦੇਸ਼ — ਆਗਰਾ",
    regionMaharashtraLasalgaon: "ਮਹਾਰਾਸ਼ਟਰ — ਲਾਸਲਗਾਓਂ",
    regionMPIndore: "ਮੱਧ ਪ੍ਰਦੇਸ਼ — ਇੰਦੌਰ",
    regionMPJabalpur: "ਮੱਧ ਪ੍ਰਦੇਸ਼ — ਜਬਲਪੁਰ",
    regionMaharashtraNagpur: "ਮਹਾਰਾਸ਼ਟਰ — ਨਾਗਪੁਰ",
    unitQuintal: "ਕੁਇੰਟਲ",
    footerConnect: "ਜੁੜੋ",
    footerResources: "ਸਰੋਤ",
    footerGetInTouch: "ਸੰਪਰਕ ਕਰੋ",
    footerContactUs: "ਸੰਪਰਕ ਕਰੋ",
    footerAboutUs: "ਸਾਡੇ ਬਾਰੇ",
    footerAIAssistant: "ਏਆਈ ਸਹਾਇਕ",
    footerPostProblem: "ਸਮੱਸਿਆ ਪੋਸਟ ਕਰੋ",
    footerFAQ: "ਅਕਸਰ ਪੁੱਛੇ ਜਾਣ ਵਾਲੇ ਸਵਾਲ",
    footerPrivacy: "ਗੋਪਨੀਯਤਾ ਨੀਤੀ",
    footerTerms: "ਨਿਯਮ ਅਤੇ ਸ਼ਰਤਾਂ",
    footerMandiRates: "ਮੰਡੀ ਭਾਅ",
    footerCropAdvisory: "ਫ਼ਸਲ ਸਲਾਹ",
    footerStayUpdated: "ਅਪਡੇਟ ਰਹੋ",
    footerEmpowering:
      "ਕਿਸਾਨਾਂ ਨੂੰ ਸਮਾਰਟ ਖੇਤੀਬਾੜੀ ਟੂਲ, ਮਾਰਕੀਟ ਜਾਣਕਾਰੀ ਅਤੇ ਮਾਹਿਰ ਸਹਾਇਤਾ ਨਾਲ ਸਸ਼ਕਤ ਬਣਾਉਣਾ।",
    footerAllRights: "ਸਾਰੇ ਅਧਿਕਾਰ ਸੁਰੱਖਿਅਤ",
    mandiLiveRates: "ਲਾਈਵ ਮੰਡੀ ਭਾਅ",
    mandiUpdated: "ਅਪਡੇਟ",
    mandiCrop: "ਫ਼ਸਲ",
    mandiPriceCol: "ਭਾਅ",
    mandiChange: "ਬਦਲਾਅ",
    mandiMarket: "ਮੰਡੀ",
    mandiSourceAgmarknet: "ਸਰੋਤ: ਐਗਮਾਰਕਨੈਟ ਭਾਰਤ",
    mandiNoResults: "ਇਸ ਲਈ ਕੋਈ ਨਤੀਜਾ ਨਹੀਂ ਮਿਲਿਆ",
  },
};

// ──────────────────────────────────────────────────────────────────
// CONTEXT
// ──────────────────────────────────────────────────────────────────
const LanguageContext = createContext({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
});

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    // Load from localStorage on mount (supports navbar's "agriLang" key)
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("agriLang");
      // Map navbar's "hin" (Hinglish) → "hi" since we treat them the same
      if (stored === "hin") return "hi";
      if (stored === "en" || stored === "hi" || stored === "pa") return stored;
    }
    return "en";
  });

  // Wrap setLang so it also persists to localStorage and notifies other tabs
  const setLang = (newLang) => {
    setLangState(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("agriLang", newLang);
      // Dispatch storage event for any listeners
      window.dispatchEvent(new Event("agriLangChange"));
    }
  };

  // Listen for changes from other components (e.g. navbar) via storage event
  useEffect(() => {
    const sync = () => {
      const stored = localStorage.getItem("agriLang");
      let mapped = stored === "hin" ? "hi" : stored;
      if (mapped && mapped !== lang && ["en", "hi", "pa"].includes(mapped)) {
        setLangState(mapped);
      }
    };
    window.addEventListener("storage", sync);
    window.addEventListener("agriLangChange", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("agriLangChange", sync);
    };
  }, [lang]);

  // The translator function — t("key") returns the translated string
  const t = (key) => {
    const dict = translations[lang] || translations.en;
    return dict[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook — use this in any component to get { lang, setLang, t }
export const useLanguage = () => useContext(LanguageContext);