import React from "react";
import {
  CloudRain,
  Droplets,
  Gauge,
  Leaf,
  ShieldCheck,
  Timer,
  Waves,
  Wind,
} from "lucide-react";
import DetailedServicePage from "./DetailedServicePage";

const images = {
  hero: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=1600&auto=format&fit=crop",
  drip: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=900&auto=format&fit=crop",
  water: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&auto=format&fit=crop",
  wheat: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=700&auto=format&fit=crop",
  rice: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=700&auto=format&fit=crop",
  tomato: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=700&auto=format&fit=crop",
};

const IrrigationTips = () => {
  return (
    <DetailedServicePage
      badge="Irrigation Tips"
      title="Smart Irrigation"
      highlight="For Water Saving"
      subtitle="Use live location, local weather, crop stage and soil moisture understanding to irrigate crops at the right time and reduce water wastage."
      heroImage={images.hero}
      icon={Droplets}
      primaryText="View Irrigation Guide"
      primaryPath="/services/irrigation"
      stats={[
        { value: "Save", label: "Water Usage" },
        { value: "Smart", label: "Irrigation Timing" },
        { value: "Crop", label: "Stage-wise Need" },
        { value: "Less", label: "Water Stress" },
      ]}
      featureTitle="Water-Smart Irrigation Support"
      featureSubtitle="Plan irrigation based on weather, soil and crop needs."
      features={[
        {
          title: "Soil Moisture Awareness",
          desc: "Understand when soil is dry enough to require irrigation.",
          icon: Gauge,
          color: "bg-blue-50 text-blue-700 border-blue-100",
        },
        {
          title: "Rain-Based Planning",
          desc: "Avoid unnecessary irrigation when rainfall is expected.",
          icon: CloudRain,
          color: "bg-indigo-50 text-indigo-700 border-indigo-100",
        },
        {
          title: "Best Timing",
          desc: "Irrigate morning or evening to reduce evaporation loss.",
          icon: Timer,
          color: "bg-amber-50 text-amber-700 border-amber-100",
        },
        {
          title: "Root Protection",
          desc: "Avoid overwatering because excess water can damage roots.",
          icon: ShieldCheck,
          color: "bg-green-50 text-green-700 border-green-100",
        },
      ]}
      advisoryTitle="Irrigation Advisory"
      advisorySubtitle="Use these steps to save water and protect crop roots."
      advisoryCards={[
        {
          title: "Check Weather First",
          desc: "Avoid irrigation just before expected rainfall.",
          icon: CloudRain,
          color: "bg-indigo-50 text-indigo-700 border-indigo-100",
        },
        {
          title: "Avoid Afternoon Watering",
          desc: "Morning and evening irrigation reduces evaporation loss.",
          icon: Timer,
          color: "bg-amber-50 text-amber-700 border-amber-100",
        },
        {
          title: "Check Soil Moisture",
          desc: "Do not water only by habit. Check soil moisture and crop stage.",
          icon: Gauge,
          color: "bg-blue-50 text-blue-700 border-blue-100",
        },
        {
          title: "Prefer Drip/Sprinkler",
          desc: "Drip and sprinkler systems can reduce water wastage.",
          icon: Droplets,
          color: "bg-green-50 text-green-700 border-green-100",
        },
      ]}
      imageCards={[
        {
          title: "Drip Irrigation",
          desc: "Drip systems give water near roots and reduce wastage.",
          image: images.drip,
          icon: Droplets,
        },
        {
          title: "Rain & Water Planning",
          desc: "Plan irrigation according to rainfall and crop water need.",
          image: images.water,
          icon: Waves,
        },
      ]}
      cropCards={[
        {
          crop: "Wheat",
          tag: "Moderate",
          advice: "Avoid waterlogging and irrigate at critical growth stages.",
          image: images.wheat,
        },
        {
          crop: "Rice",
          tag: "High Water",
          advice: "Maintain proper water level and drainage for healthy growth.",
          image: images.rice,
        },
        {
          crop: "Tomato",
          tag: "Controlled",
          advice: "Use consistent moisture and avoid wetting leaves.",
          image: images.tomato,
        },
      ]}
      indexTitle="Irrigation Planning Index"
    />
  );
};

export default IrrigationTips;