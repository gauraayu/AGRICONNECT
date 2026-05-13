import React from "react";
import {
  AlertTriangle,
  Calculator,
  ClipboardList,
  FlaskConical,
  Leaf,
  ShieldCheck,
  Sprout,
  Timer,
} from "lucide-react";
import DetailedServicePage from "./DetailedServicePage";

const images = {
  hero: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&auto=format&fit=crop",
  nutrients: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=900&auto=format&fit=crop",
  field: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&auto=format&fit=crop",
  wheat: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=700&auto=format&fit=crop",
  rice: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=700&auto=format&fit=crop",
  tomato: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=700&auto=format&fit=crop",
};

const FertilizerGuidance = () => {
  return (
    <DetailedServicePage
      badge="Fertilizer Guidance"
      title="Right Fertilizer"
      highlight="At The Right Time"
      subtitle="Get guidance for fertilizer selection, dose timing, crop stage requirement and safe nutrient management to improve yield and reduce waste."
      heroImage={images.hero}
      icon={FlaskConical}
      primaryText="Get Fertilizer Advice"
      primaryPath="/services/fertilizer"
      stats={[
        { value: "NPK", label: "Balanced Nutrition" },
        { value: "Stage", label: "Crop-wise Dose" },
        { value: "Safe", label: "Application Timing" },
        { value: "Less", label: "Nutrient Waste" },
      ]}
      featureTitle="Fertilizer Planning Support"
      featureSubtitle="Apply nutrients according to crop stage, soil condition and weather."
      features={[
        {
          title: "Dose Planning",
          desc: "Plan fertilizer dose according to crop, soil condition and growth stage.",
          icon: Calculator,
          color: "bg-blue-50 text-blue-700 border-blue-100",
        },
        {
          title: "Nutrient Deficiency",
          desc: "Understand common signs of nitrogen, phosphorus and potassium deficiency.",
          icon: Leaf,
          color: "bg-green-50 text-green-700 border-green-100",
        },
        {
          title: "Safe Application",
          desc: "Avoid overuse and apply fertilizers at the correct time and method.",
          icon: ShieldCheck,
          color: "bg-emerald-50 text-emerald-700 border-emerald-100",
        },
        {
          title: "Weather Timing",
          desc: "Avoid fertilizer before heavy rain or during extreme heat.",
          icon: Timer,
          color: "bg-amber-50 text-amber-700 border-amber-100",
        },
      ]}
      advisoryTitle="Fertilizer Use Advisory"
      advisorySubtitle="Follow these practical nutrient management steps."
      advisoryCards={[
        {
          title: "Use Soil Report",
          desc: "Soil test helps decide accurate fertilizer dose and prevents overuse.",
          icon: ClipboardList,
          color: "bg-slate-50 text-slate-700 border-slate-100",
        },
        {
          title: "Avoid Heavy Rain",
          desc: "Rain can wash away nutrients. Avoid fertilizer before expected rainfall.",
          icon: AlertTriangle,
          color: "bg-red-50 text-red-700 border-red-100",
        },
        {
          title: "Split Nitrogen",
          desc: "Split nitrogen dose across crop stages for better absorption.",
          icon: FlaskConical,
          color: "bg-purple-50 text-purple-700 border-purple-100",
        },
        {
          title: "Mix Organic Matter",
          desc: "Use compost or manure along with fertilizer for long-term soil health.",
          icon: Sprout,
          color: "bg-green-50 text-green-700 border-green-100",
        },
      ]}
      imageCards={[
        {
          title: "Balanced Nutrient Planning",
          desc: "NPK balance supports roots, growth, flowering and yield.",
          image: images.nutrients,
          icon: FlaskConical,
        },
        {
          title: "Field Application Timing",
          desc: "Correct time and method improve fertilizer efficiency.",
          image: images.field,
          icon: Timer,
        },
      ]}
      cropCards={[
        {
          crop: "Wheat",
          tag: "Nitrogen Need",
          advice: "Split nitrogen dose supports tillering and grain filling.",
          image: images.wheat,
        },
        {
          crop: "Rice",
          tag: "NPK Balance",
          advice: "Apply nutrients according to water level and crop stage.",
          image: images.rice,
        },
        {
          crop: "Tomato",
          tag: "Fruit Stage",
          advice: "Calcium and potassium support better fruit quality.",
          image: images.tomato,
        },
      ]}
      indexTitle="Fertilizer Guidance Index"
    />
  );
};

export default FertilizerGuidance;