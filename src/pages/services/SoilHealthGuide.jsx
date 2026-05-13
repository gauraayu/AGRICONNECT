import React from "react";
import {
  Activity,
  ClipboardCheck,
  Droplets,
  FlaskConical,
  Leaf,
  Recycle,
  ShieldCheck,
  Sprout,
} from "lucide-react";
import DetailedServicePage from "./DetailedServicePage";

const images = {
  hero: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1600&auto=format&fit=crop",
  soil: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=900&auto=format&fit=crop",
  organic: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=900&auto=format&fit=crop",
  wheat: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=700&auto=format&fit=crop",
  rice: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=700&auto=format&fit=crop",
  tomato: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=700&auto=format&fit=crop",
};

const SoilHealthGuide = () => {
  return (
    <DetailedServicePage
      badge="Soil Health Guide"
      title="Improve Soil Health"
      highlight="For Better Yield"
      subtitle="Understand soil condition, nutrient balance, moisture need, pH awareness and organic practices to improve long-term crop productivity."
      heroImage={images.hero}
      icon={Leaf}
      primaryText="Check Soil Guide"
      primaryPath="/services/soil-health"
      stats={[
        { value: "NPK", label: "Nutrient Awareness" },
        { value: "pH", label: "Soil Balance" },
        { value: "Moisture", label: "Water Holding" },
        { value: "Organic", label: "Soil Improvement" },
      ]}
      featureTitle="Soil Health Support"
      featureSubtitle="Healthy soil improves root growth, water use and crop productivity."
      features={[
        {
          title: "Soil Testing Guidance",
          desc: "Understand why soil testing is important before fertilizer planning.",
          icon: FlaskConical,
          color: "bg-purple-50 text-purple-700 border-purple-100",
        },
        {
          title: "Moisture Management",
          desc: "Know how soil moisture affects irrigation timing and root health.",
          icon: Droplets,
          color: "bg-blue-50 text-blue-700 border-blue-100",
        },
        {
          title: "Organic Matter",
          desc: "Improve soil texture and fertility with compost, manure and crop residue.",
          icon: Recycle,
          color: "bg-green-50 text-green-700 border-green-100",
        },
        {
          title: "Soil Protection",
          desc: "Prevent erosion, nutrient loss and poor drainage with better practices.",
          icon: ShieldCheck,
          color: "bg-emerald-50 text-emerald-700 border-emerald-100",
        },
      ]}
      advisoryTitle="Soil Care Advisory"
      advisorySubtitle="Use these practices for long-term soil fertility."
      advisoryCards={[
        {
          title: "Test Before Fertilizer",
          desc: "Use soil test reports before deciding fertilizer dose and nutrient plan.",
          icon: FlaskConical,
          color: "bg-purple-50 text-purple-700 border-purple-100",
        },
        {
          title: "Avoid Overwatering",
          desc: "Too much water can reduce oxygen in soil and damage roots.",
          icon: Droplets,
          color: "bg-blue-50 text-blue-700 border-blue-100",
        },
        {
          title: "Add Organic Matter",
          desc: "Compost and farmyard manure help improve soil structure and microbes.",
          icon: Leaf,
          color: "bg-green-50 text-green-700 border-green-100",
        },
        {
          title: "Track Soil Changes",
          desc: "Keep records of crop yield, fertilizer and soil test values every season.",
          icon: ClipboardCheck,
          color: "bg-slate-50 text-slate-700 border-slate-100",
        },
      ]}
      imageCards={[
        {
          title: "Soil Testing & Observation",
          desc: "Testing helps farmers understand pH, NPK and nutrient availability.",
          image: images.soil,
          icon: FlaskConical,
        },
        {
          title: "Organic Soil Improvement",
          desc: "Organic matter supports healthy roots and better soil water retention.",
          image: images.organic,
          icon: Sprout,
        },
      ]}
      cropCards={[
        {
          crop: "Wheat",
          tag: "Loamy Soil",
          advice: "Good drainage and balanced nitrogen support better wheat growth.",
          image: images.wheat,
        },
        {
          crop: "Rice",
          tag: "Water Soil",
          advice: "Maintain puddled soil and proper water level for rice cultivation.",
          image: images.rice,
        },
        {
          crop: "Tomato",
          tag: "Well-Drained",
          advice: "Avoid waterlogging and maintain organic matter for healthy roots.",
          image: images.tomato,
        },
      ]}
      indexTitle="Soil Health Index"
    />
  );
};

export default SoilHealthGuide;