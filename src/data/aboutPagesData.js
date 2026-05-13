import {
  Info,
  Sprout,
  GraduationCap,
  ShoppingBag,
  Target,
  Settings,
  ShieldCheck,
  CloudSun,
  Store,
  MessageCircle,
  BarChart3,
  Leaf,
  Users,
  Smartphone,
  Brain,
  Handshake,
} from "lucide-react";

import { aboutImages } from "./aboutImages";

export const aboutPagesData = {
  about: {
    badge: "About AgriConnect",
    title: "Empowering Agriculture with Smart Digital Connections",
    subtitle:
      "AgriConnect brings farmers, agronomists, and buyers together on one trusted platform for better farming decisions, expert support, and direct market access.",
    image: aboutImages.about,
    icon: Info,
    theme: "from-green-700 to-emerald-900",
    stats: [
      { label: "Connected Users", value: "25K+" },
      { label: "Crop Problems Solved", value: "8K+" },
      { label: "Smart Farming Tools", value: "15+" },
      { label: "Marketplace Reach", value: "50K+" },
    ],
    features: [
      {
        icon: Users,
        title: "One Agriculture Network",
        text:
          "Farmers, agronomists, and buyers can interact in one simple digital ecosystem.",
      },
      {
        icon: Brain,
        title: "AI-Powered Farming Support",
        text:
          "Smart tools like crop doctor, yield prediction, market prediction, and irrigation advisory help farmers make better decisions.",
      },
      {
        icon: Store,
        title: "Direct Marketplace Access",
        text:
          "Farmers can list crops for sale and buyers can discover fresh produce directly.",
      },
    ],
    sections: [
      {
        title: "Why AgriConnect?",
        text:
          "Agriculture still faces problems like lack of expert guidance, market dependency, delayed information, and limited technology access. AgriConnect solves these problems by bringing crop advisory, marketplace, community posts, AI tools, and expert support into one platform.",
      },
      {
        title: "Our Digital Farming Vision",
        text:
          "The platform is designed to make farming more profitable, transparent, and technology-driven. It helps farmers identify crop problems, track market demand, check weather updates, sell crops, and connect with specialists.",
      },
    ],
  },

  farmers: {
    badge: "For Farmers",
    title: "Helping Farmers Grow Better, Sell Smarter, and Reduce Risk",
    subtitle:
      "Farmers can post crop problems, upload crops for sale, use AI crop diagnosis, check market demand, and get expert farming guidance.",
    image: aboutImages.farmers,
    icon: Sprout,
    theme: "from-lime-600 to-green-900",
    stats: [
      { label: "Crop Listings", value: "12K+" },
      { label: "Expert Replies", value: "9K+" },
      { label: "Disease Checks", value: "6K+" },
      { label: "Market Insights", value: "24/7" },
    ],
    features: [
      {
        icon: MessageCircle,
        title: "Post Crop Problems",
        text:
          "Farmers can upload crop images and ask questions about diseases, pests, soil, irrigation, and fertilizers.",
      },
      {
        icon: Store,
        title: "Sell Crops Directly",
        text:
          "Farmers can upload crop photo, quantity, price, quality, harvest date, and location to show crops in marketplace.",
      },
      {
        icon: CloudSun,
        title: "Weather & Irrigation Help",
        text:
          "Farmers can check weather alerts and get smart irrigation suggestions based on crop needs.",
      },
    ],
    sections: [
      {
        title: "What Farmers Can Do",
        text:
          "Farmers can manage crop issues, sell produce, check mandi prices, use AI Crop Doctor, predict crop yield, and understand market demand. This reduces dependency on middlemen and improves farming decisions.",
      },
      {
        title: "Farmer Dashboard Benefits",
        text:
          "After login, farmers get a dedicated dashboard where they can upload crops for sale, create community posts, view marketplace listings, access AI tools, and manage their profile.",
      },
    ],
  },

  agronomists: {
    badge: "For Agronomists",
    title: "A Professional Space for Crop Experts and Agricultural Advisors",
    subtitle:
      "Agronomists can guide farmers, answer crop problems, provide treatment advice, and support better farming practices.",
    image: aboutImages.agronomists,
    icon: GraduationCap,
    theme: "from-cyan-600 to-blue-900",
    stats: [
      { label: "Expert Answers", value: "9K+" },
      { label: "Farmer Queries", value: "20K+" },
      { label: "Crop Categories", value: "30+" },
      { label: "Advisory Reach", value: "India" },
    ],
    features: [
      {
        icon: ShieldCheck,
        title: "Verified Expert Advice",
        text:
          "Agronomists can provide reliable solutions for crop disease, pest control, soil nutrition, and irrigation.",
      },
      {
        icon: Leaf,
        title: "Crop Health Guidance",
        text:
          "Experts can help farmers identify symptoms and suggest organic or chemical treatment plans.",
      },
      {
        icon: BarChart3,
        title: "Data-Based Recommendations",
        text:
          "Experts can use crop history, images, weather, and market insights to give better recommendations.",
      },
    ],
    sections: [
      {
        title: "Role of Agronomists",
        text:
          "Agronomists act as trusted crop advisors. They help farmers solve crop disease, nutrient deficiency, pest attack, soil health, irrigation, and fertilizer-related problems.",
      },
      {
        title: "How Experts Add Value",
        text:
          "By replying to farmer posts, reviewing AI crop diagnosis, and giving practical field solutions, agronomists improve farmer confidence and crop productivity.",
      },
    ],
  },

  buyers: {
    badge: "For Buyers",
    title: "Connecting Buyers with Fresh Crops Directly from Farmers",
    subtitle:
      "Buyers can explore listed crops, compare prices, check quantity and quality, and connect directly with farmers.",
    image: aboutImages.buyers,
    icon: ShoppingBag,
    theme: "from-orange-500 to-amber-800",
    stats: [
      { label: "Fresh Listings", value: "12K+" },
      { label: "Crop Categories", value: "25+" },
      { label: "Direct Sellers", value: "8K+" },
      { label: "Market Access", value: "Fast" },
    ],
    features: [
      {
        icon: Store,
        title: "Explore Crop Marketplace",
        text:
          "Buyers can check crop name, price, quantity, quality, location, and farmer details.",
      },
      {
        icon: Handshake,
        title: "Direct Farmer Connection",
        text:
          "Buyers can contact farmers directly without unnecessary middlemen.",
      },
      {
        icon: BarChart3,
        title: "Demand & Price Awareness",
        text:
          "Market prediction tools help buyers understand price movement and demand trends.",
      },
    ],
    sections: [
      {
        title: "What Buyers Can Do",
        text:
          "Buyers can browse available crops, compare prices, check crop quality, view location, and connect with farmers for purchasing fresh produce.",
      },
      {
        title: "Why Buyers Benefit",
        text:
          "Direct marketplace access reduces confusion, saves time, improves transparency, and helps buyers source crops faster from trusted farmers.",
      },
    ],
  },

  mission: {
    badge: "Our Mission",
    title: "Building a Smarter, Fairer, and More Connected Agriculture System",
    subtitle:
      "Our mission is to support farmers with technology, expert knowledge, transparent markets, and smart farming tools.",
    image: aboutImages.mission,
    icon: Target,
    theme: "from-rose-600 to-red-900",
    stats: [
      { label: "Farmer First", value: "100%" },
      { label: "Digital Access", value: "24/7" },
      { label: "Better Decisions", value: "AI" },
      { label: "Market Transparency", value: "High" },
    ],
    features: [
      {
        icon: Sprout,
        title: "Support Farmers",
        text:
          "Provide farmers with tools that improve crop health, productivity, and selling opportunities.",
      },
      {
        icon: ShieldCheck,
        title: "Trusted Guidance",
        text:
          "Bring expert advice, verified solutions, and smart advisory features into one place.",
      },
      {
        icon: Handshake,
        title: "Fair Market Access",
        text:
          "Help farmers connect directly with buyers and reduce dependency on middlemen.",
      },
    ],
    sections: [
      {
        title: "Mission Statement",
        text:
          "AgriConnect aims to make modern agriculture accessible to every farmer through technology, community support, expert guidance, and digital marketplace access.",
      },
      {
        title: "Long-Term Goal",
        text:
          "The long-term goal is to create a complete agriculture ecosystem where farmers can diagnose crop issues, learn better practices, sell produce, and make data-driven decisions.",
      },
    ],
  },

  howItWorks: {
    badge: "How It Works",
    title: "A Simple Digital Workflow for Farmers, Experts, and Buyers",
    subtitle:
      "AgriConnect works through an easy process: register, select role, use dashboard, post problems, sell crops, and connect with the right people.",
    image: aboutImages.howItWorks,
    icon: Settings,
    theme: "from-violet-600 to-purple-900",
    stats: [
      { label: "Step 1", value: "Login" },
      { label: "Step 2", value: "Dashboard" },
      { label: "Step 3", value: "Use Tools" },
      { label: "Step 4", value: "Connect" },
    ],
    features: [
      {
        icon: Smartphone,
        title: "Create Account",
        text:
          "Users register as farmer, agronomist, or buyer and access role-based features.",
      },
      {
        icon: MessageCircle,
        title: "Post & Interact",
        text:
          "Farmers post crop problems, experts reply, and buyers explore crops in marketplace.",
      },
      {
        icon: Brain,
        title: "Use Smart Tools",
        text:
          "AI Crop Doctor, yield prediction, irrigation planning, and market demand prediction support decision-making.",
      },
    ],
    sections: [
      {
        title: "Platform Workflow",
        text:
          "A farmer logs in and opens the farmer dashboard. From there, the farmer can upload crop listings, post crop problems, check marketplace, use AI Crop Doctor, and access smart farming tools.",
      },
      {
        title: "Community + Marketplace + AI",
        text:
          "The platform combines three important parts: community support for problem-solving, marketplace for crop selling, and AI tools for better farming decisions.",
      },
    ],
  },
};
