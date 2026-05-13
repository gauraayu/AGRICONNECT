import React from "react";
import {
  AlertTriangle,
  Bug,
  Camera,
  ClipboardList,
  Leaf,
  Microscope,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import DetailedServicePage from "./DetailedServicePage";

const images = {
  hero: "https://images.unsplash.com/photo-1598512752271-33f913a5af13?w=1600&auto=format&fit=crop",
  leaf: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=900&auto=format&fit=crop",
  crop: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=900&auto=format&fit=crop",
  wheat: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=700&auto=format&fit=crop",
  rice: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=700&auto=format&fit=crop",
  tomato: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=700&auto=format&fit=crop",
};

const PestDiseaseHelp = () => {
  return (
    <DetailedServicePage
      badge="Pest & Disease Help"
      title="Pest & Disease"
      highlight="Help for Farmers"
      subtitle="Identify crop symptoms, understand pest and disease risk, upload problem details and connect with experts for treatment suggestions."
      heroImage={images.hero}
      icon={Bug}
      primaryText="Post Crop Problem"
      primaryPath="/posts"
      stats={[
        { value: "Photo", label: "Image-Based Support" },
        { value: "Fast", label: "Problem Reporting" },
        { value: "Expert", label: "Treatment Guidance" },
        { value: "Safe", label: "Prevention Tips" },
      ]}
      featureTitle="Crop Problem Detection Support"
      featureSubtitle="Help farmers report symptoms clearly and get useful treatment guidance."
      features={[
        {
          title: "Photo Upload Guidance",
          desc: "Take clear images of leaves, stems, fruits and roots to explain crop damage.",
          icon: Camera,
          color: "bg-blue-50 text-blue-700 border-blue-100",
        },
        {
          title: "Expert Diagnosis",
          desc: "Agronomists can check symptoms and provide treatment and prevention steps.",
          icon: Microscope,
          color: "bg-purple-50 text-purple-700 border-purple-100",
        },
        {
          title: "Pest Risk Warning",
          desc: "High humidity and rainfall can increase pest and fungal disease risk.",
          icon: ShieldAlert,
          color: "bg-red-50 text-red-700 border-red-100",
        },
        {
          title: "Treatment Tracking",
          desc: "Farmers can record what treatment was applied and monitor crop recovery.",
          icon: ClipboardList,
          color: "bg-green-50 text-green-700 border-green-100",
        },
      ]}
      advisoryTitle="Disease & Pest Advisory"
      advisorySubtitle="Follow these steps before applying any pesticide or treatment."
      advisoryCards={[
        {
          title: "Do Not Guess",
          desc: "Avoid random chemical spraying without identifying the problem correctly.",
          icon: AlertTriangle,
          color: "bg-red-50 text-red-700 border-red-100",
        },
        {
          title: "Capture Clear Photos",
          desc: "Take close-up and full plant photos in daylight for better diagnosis.",
          icon: Camera,
          color: "bg-blue-50 text-blue-700 border-blue-100",
        },
        {
          title: "Separate Infected Plants",
          desc: "If infection is spreading, separate affected plants where possible.",
          icon: ShieldCheck,
          color: "bg-emerald-50 text-emerald-700 border-emerald-100",
        },
        {
          title: "Monitor Leaves",
          desc: "Check leaf spots, holes, curling, yellowing and fungal growth regularly.",
          icon: Leaf,
          color: "bg-green-50 text-green-700 border-green-100",
        },
      ]}
      imageCards={[
        {
          title: "Leaf Symptom Check",
          desc: "Leaf color, spots, holes and curling help identify many crop issues.",
          image: images.leaf,
          icon: Leaf,
        },
        {
          title: "Field-Wide Monitoring",
          desc: "Check whether the problem is limited to one area or spreading widely.",
          image: images.crop,
          icon: ShieldAlert,
        },
      ]}
      cropCards={[
        {
          crop: "Wheat",
          tag: "Rust Risk",
          advice: "Check yellow or brown patches on leaves and avoid late diagnosis.",
          image: images.wheat,
        },
        {
          crop: "Rice",
          tag: "Blast Risk",
          advice: "Monitor leaf spots and field humidity during wet weather.",
          image: images.rice,
        },
        {
          crop: "Tomato",
          tag: "Blight Risk",
          advice: "Watch dark spots on leaves and stems after rainfall.",
          image: images.tomato,
        },
      ]}
      indexTitle="Pest & Disease Index"
    />
  );
};

export default PestDiseaseHelp;