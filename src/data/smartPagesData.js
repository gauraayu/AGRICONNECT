// src/data/smartPagesData.js

import {
  FaSatelliteDish,
  FaRobot,
  FaChartLine,
  FaVrCardboard,
  FaTint,
  FaStore,
  FaLeaf,
  FaMapMarkedAlt,
  FaSeedling,
  FaWater,
  FaGraduationCap,
  FaRupeeSign,
} from "react-icons/fa";

export const smartPagesData = {
  satellite: {
    type: "satellite",
    routeTitle: "Satellite Crop Monitoring",
    badge: "Remote Farm Intelligence",
    title: "Satellite Crop Monitoring",
    subtitle:
      "Monitor crop health, vegetation growth, water stress, and risk zones using satellite-powered insights.",
    description:
      "AgriConnect Satellite Crop Monitoring helps farmers and agronomists track large farm areas remotely. It provides field-level crop health insights, weak zone detection, vegetation score, and irrigation alerts.",
    icon: FaSatelliteDish,
    theme: "satellite-theme",
    heroImage:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&auto=format&fit=crop",
    badges: ["Field Health Tracking", "Vegetation Index", "Water Stress", "Remote Monitoring"],
    formTitle: "Enter Field Details",
    buttonText: "Monitor My Field",
    loadingText: "Analyzing satellite field data...",
    fields: [
      { name: "location", label: "Farm Location", type: "text", placeholder: "Enter village / district" },
      { name: "crop", label: "Crop Name", type: "text", placeholder: "Wheat, Rice, Tomato..." },
      { name: "area", label: "Farm Area", type: "text", placeholder: "Example: 5 acres" },
      { name: "soil", label: "Soil Type", type: "select", options: ["Black Soil", "Alluvial Soil", "Red Soil", "Sandy Soil"] },
      { name: "irrigation", label: "Irrigation Type", type: "select", options: ["Drip", "Sprinkler", "Canal", "Rainfed"] },
      { name: "season", label: "Season", type: "select", options: ["Kharif", "Rabi", "Zaid"] },
    ],
    featureCards: [
      { icon: FaMapMarkedAlt, title: "Crop Health Map", text: "View field condition using satellite-based crop monitoring." },
      { icon: FaLeaf, title: "Vegetation Analysis", text: "Understand plant growth and greenery through vegetation score." },
      { icon: FaWater, title: "Water Stress Alerts", text: "Detect low moisture areas before crop damage increases." },
    ],
  },

  drone: {
    type: "drone",
    routeTitle: "Drone & Land Rover Monitor",
    badge: "Smart Field Inspection",
    title: "Drone & Land Rover Crop Monitor",
    subtitle:
      "Inspect crop health, soil moisture, pest risk, and damaged field zones through drone and rover monitoring.",
    description:
      "This smart monitoring page helps farmers upload field inspection details and generate a professional crop condition report using drone and ground-level rover style analysis.",
    icon: FaRobot,
    theme: "drone-theme",
    heroImage:
      "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1200&auto=format&fit=crop",
    badges: ["Drone Monitoring", "Ground Rover Analysis", "Crop Stress", "Pest Tracking"],
    formTitle: "Field Inspection Details",
    buttonText: "Start Field Scan",
    loadingText: "Scanning field inspection data...",
    fields: [
      { name: "crop", label: "Crop Name", type: "text", placeholder: "Enter crop name" },
      { name: "fieldCondition", label: "Field Condition", type: "select", options: ["Healthy", "Uneven Growth", "Dry Patches", "Pest Symptoms"] },
      { name: "moisture", label: "Soil Moisture", type: "select", options: ["Low", "Normal", "High"] },
      { name: "pest", label: "Pest Signs", type: "select", options: ["No", "Mild", "Medium", "High"] },
      { name: "area", label: "Affected Area", type: "text", placeholder: "Example: 1 acre / 10%" },
      { name: "inspection", label: "Inspection Mode", type: "select", options: ["Drone", "Land Rover", "Both"] },
    ],
    featureCards: [
      { icon: FaRobot, title: "Aerial Monitoring", text: "Detect weak patches and crop stress through drone-style inspection." },
      { icon: FaSeedling, title: "Ground Inspection", text: "Analyze plant base, soil, moisture, and lower crop damage." },
      { icon: FaChartLine, title: "Inspection Report", text: "Generate smart reports with field action suggestions." },
    ],
  },

  yield: {
    type: "yield",
    routeTitle: "ML Yield Prediction",
    badge: "Machine Learning Forecast",
    title: "ML Yield Prediction",
    subtitle:
      "Estimate expected crop production using machine learning based on crop, soil, rainfall, fertilizer, and irrigation.",
    description:
      "ML Yield Prediction helps farmers plan harvest, storage, selling, and transport by estimating expected production before harvest.",
    icon: FaChartLine,
    theme: "yield-theme",
    heroImage:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop",
    badges: ["Yield Forecasting", "Farm Data Analysis", "Production Planning", "Smart Suggestions"],
    formTitle: "Enter Farm Data",
    buttonText: "Predict Yield",
    loadingText: "Running ML yield model...",
    fields: [
      { name: "crop", label: "Crop Name", type: "text", placeholder: "Wheat, Rice, Soybean..." },
      { name: "district", label: "State / District", type: "text", placeholder: "Enter location" },
      { name: "area", label: "Farm Area", type: "text", placeholder: "Example: 4 acres" },
      { name: "soil", label: "Soil Type", type: "select", options: ["Black Soil", "Alluvial Soil", "Red Soil", "Sandy Soil"] },
      { name: "rainfall", label: "Rainfall", type: "text", placeholder: "Example: 600 mm" },
      { name: "fertilizer", label: "Fertilizer Used", type: "text", placeholder: "Example: Urea, DAP" },
      { name: "temperature", label: "Temperature", type: "text", placeholder: "Example: 28°C" },
      { name: "irrigation", label: "Irrigation Type", type: "select", options: ["Drip", "Sprinkler", "Canal", "Rainfed"] },
    ],
    featureCards: [
      { icon: FaChartLine, title: "Yield Estimation", text: "Predict expected production per acre using farm inputs." },
      { icon: FaSeedling, title: "Input Analysis", text: "Analyze crop, soil, rainfall, fertilizer, and irrigation." },
      { icon: FaLeaf, title: "Improvement Tips", text: "Get practical suggestions to increase production." },
    ],
  },

  arvr: {
    type: "arvr",
    routeTitle: "AR/VR Farming Training",
    badge: "Immersive Farmer Learning",
    title: "AR/VR Farming Training",
    subtitle:
      "Learn modern farming techniques through immersive AR and VR-based training modules.",
    description:
      "AgriConnect AR/VR Farming Training helps farmers, students, and agronomists learn practical farming skills using interactive digital training.",
    icon: FaVrCardboard,
    theme: "arvr-theme",
    heroImage:
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=1200&auto=format&fit=crop",
    badges: ["Virtual Training", "Modern Farming", "Skill Development", "Interactive Learning"],
    formTitle: "Choose Training Module",
    buttonText: "Start Training",
    loadingText: "Preparing AR/VR training module...",
    fields: [
      { name: "module", label: "Training Module", type: "select", options: ["Smart Irrigation", "Crop Disease Identification", "Organic Farming", "Drone Farming", "Soil Health"] },
      { name: "level", label: "Learning Level", type: "select", options: ["Beginner", "Intermediate", "Advanced"] },
      { name: "language", label: "Language", type: "select", options: ["English", "Hindi", "Hinglish"] },
      { name: "duration", label: "Training Duration", type: "select", options: ["15 Minutes", "30 Minutes", "1 Hour"] },
    ],
    featureCards: [
      { icon: FaVrCardboard, title: "Virtual Crop Training", text: "Learn sowing, irrigation, fertilization, and harvesting." },
      { icon: FaLeaf, title: "Disease Simulation", text: "Understand crop disease spread through visual training." },
      { icon: FaGraduationCap, title: "Skill Development", text: "Improve farming knowledge through guided lessons." },
    ],
  },

  irrigation: {
    type: "irrigation",
    routeTitle: "Smart Irrigation",
    badge: "Water Saving Intelligence",
    title: "Smart Irrigation System",
    subtitle:
      "Optimize water usage with irrigation recommendations based on crop type, soil moisture, weather, and field condition.",
    description:
      "Smart Irrigation helps farmers reduce water wastage and improve crop growth by suggesting the right irrigation time and water quantity.",
    icon: FaTint,
    theme: "irrigation-theme",
    heroImage:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&auto=format&fit=crop",
    badges: ["Water Saving", "Soil Moisture", "Weather Advice", "Irrigation Schedule"],
    formTitle: "Check Irrigation Need",
    buttonText: "Check Irrigation",
    loadingText: "Calculating irrigation requirement...",
    fields: [
      { name: "crop", label: "Crop Name", type: "text", placeholder: "Enter crop name" },
      { name: "soilMoisture", label: "Soil Moisture", type: "text", placeholder: "Example: 42%" },
      { name: "soil", label: "Soil Type", type: "select", options: ["Black Soil", "Alluvial Soil", "Sandy Soil", "Clay Soil"] },
      { name: "weather", label: "Weather", type: "select", options: ["Sunny", "Cloudy", "Rain Expected", "Hot"] },
      { name: "cropStage", label: "Crop Stage", type: "select", options: ["Sowing", "Vegetative", "Flowering", "Harvesting"] },
      { name: "irrigation", label: "Irrigation Method", type: "select", options: ["Drip", "Sprinkler", "Flood", "Canal"] },
    ],
    featureCards: [
      { icon: FaTint, title: "Water Requirement", text: "Know how much water your crop needs." },
      { icon: FaWater, title: "Moisture Tracking", text: "Track low, normal, or high soil moisture condition." },
      { icon: FaLeaf, title: "Water Saving Plan", text: "Reduce water waste while keeping crops healthy." },
    ],
  },

  market: {
    type: "market",
    routeTitle: "Market Demand Prediction",
    badge: "Agri Market Intelligence",
    title: "Market Demand Prediction",
    subtitle:
      "Predict crop demand, price movement, and best selling time using AI-powered market intelligence.",
    description:
      "Market Demand Prediction helps farmers and buyers make smarter selling and purchasing decisions using demand trends and mandi insights.",
    icon: FaStore,
    theme: "market-theme",
    heroImage:
      "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=1200&auto=format&fit=crop",
    badges: ["Demand Forecast", "Price Trend", "Mandi Insights", "Selling Strategy"],
    formTitle: "Enter Market Details",
    buttonText: "Predict Demand",
    loadingText: "Analyzing market trends...",
    fields: [
      { name: "crop", label: "Crop Name", type: "text", placeholder: "Tomato, Wheat, Onion..." },
      { name: "mandi", label: "Mandi / Market", type: "text", placeholder: "Enter mandi name" },
      { name: "currentPrice", label: "Current Price", type: "text", placeholder: "Example: ₹2100/qtl" },
      { name: "quantity", label: "Quantity Available", type: "text", placeholder: "Example: 50 quintals" },
      { name: "demand", label: "Demand Level", type: "select", options: ["Low", "Medium", "High"] },
      { name: "storage", label: "Storage Available", type: "select", options: ["Yes", "No"] },
    ],
    featureCards: [
      { icon: FaStore, title: "Demand Forecasting", text: "Know if demand may increase, decrease, or remain stable." },
      { icon: FaChartLine, title: "Price Movement", text: "Check possible price changes for coming days." },
      { icon: FaRupeeSign, title: "Selling Strategy", text: "Get advice on whether to sell now or wait." },
    ],
  },
};