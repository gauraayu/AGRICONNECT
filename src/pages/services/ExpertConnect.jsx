import React from "react";
import {
  ClipboardList,
  Clock,
  MessageCircle,
  Microscope,
  PhoneCall,
  ShieldCheck,
  UserRoundCheck,
  Users,
} from "lucide-react";
import DetailedServicePage from "./DetailedServicePage";

const images = {
  hero: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=1600&auto=format&fit=crop",
  expert: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=900&auto=format&fit=crop",
  farmer: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=900&auto=format&fit=crop",
  wheat: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=700&auto=format&fit=crop",
  rice: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=700&auto=format&fit=crop",
  tomato: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=700&auto=format&fit=crop",
};

const ExpertConnect = () => {
  return (
    <DetailedServicePage
      badge="Expert Connect"
      title="Connect with"
      highlight="Agriculture Experts"
      subtitle="Farmers can connect with agronomists for crop disease, soil health, irrigation, fertilizer and pest control guidance."
      heroImage={images.hero}
      icon={UserRoundCheck}
      primaryText="Contact Expert"
      primaryPath="/contact"
      secondaryText="Post Problem"
      secondaryPath="/posts"
      stats={[
        { value: "Verified", label: "Expert Support" },
        { value: "Direct", label: "Farmer Guidance" },
        { value: "Quick", label: "Problem Review" },
        { value: "Trusted", label: "Crop Advice" },
      ]}
      featureTitle="Expert Guidance for Every Farmer"
      featureSubtitle="Get reliable support for crop problems and farm decisions."
      features={[
        {
          title: "Direct Query Support",
          desc: "Ask questions about crop, soil, pest, irrigation and fertilizer management.",
          icon: MessageCircle,
          color: "bg-green-50 text-green-700 border-green-100",
        },
        {
          title: "Case Management",
          desc: "Experts can review farmer problems and provide step-by-step solutions.",
          icon: ClipboardList,
          color: "bg-blue-50 text-blue-700 border-blue-100",
        },
        {
          title: "Crop Diagnosis",
          desc: "Agronomists can analyze symptoms and guide treatment decisions.",
          icon: Microscope,
          color: "bg-purple-50 text-purple-700 border-purple-100",
        },
        {
          title: "Trusted Advice",
          desc: "Receive practical and safer farm recommendations from agriculture experts.",
          icon: ShieldCheck,
          color: "bg-emerald-50 text-emerald-700 border-emerald-100",
        },
      ]}
      advisoryTitle="How to Get Better Expert Help"
      advisorySubtitle="Share complete details to receive accurate recommendations."
      advisoryCards={[
        {
          title: "Share Crop Details",
          desc: "Mention crop name, crop age, location and growth stage clearly.",
          icon: ClipboardList,
          color: "bg-slate-50 text-slate-700 border-slate-100",
        },
        {
          title: "Upload Clear Images",
          desc: "Photos help experts understand the crop problem faster.",
          icon: Microscope,
          color: "bg-purple-50 text-purple-700 border-purple-100",
        },
        {
          title: "Mention Recent Activity",
          desc: "Tell experts about recent spray, fertilizer, irrigation or rainfall.",
          icon: Clock,
          color: "bg-amber-50 text-amber-700 border-amber-100",
        },
        {
          title: "Follow Dose Carefully",
          desc: "Use expert-recommended dose, timing and safety precautions.",
          icon: ShieldCheck,
          color: "bg-green-50 text-green-700 border-green-100",
        },
      ]}
      imageCards={[
        {
          title: "Expert Crop Review",
          desc: "Agronomists can help solve crop health problems with practical guidance.",
          image: images.expert,
          icon: UserRoundCheck,
        },
        {
          title: "Farmer Support",
          desc: "Farmers can ask questions and receive support for better decisions.",
          image: images.farmer,
          icon: Users,
        },
      ]}
      cropCards={[
        {
          crop: "Wheat",
          tag: "Expert Check",
          advice: "Ask expert if crop shows yellowing, rust, weak growth or water stress.",
          image: images.wheat,
        },
        {
          crop: "Rice",
          tag: "Expert Check",
          advice: "Consult expert for blast symptoms, water imbalance or pest issues.",
          image: images.rice,
        },
        {
          crop: "Tomato",
          tag: "Expert Check",
          advice: "Get expert support for leaf curl, blight, fruit cracking or pest damage.",
          image: images.tomato,
        },
      ]}
      indexTitle="Expert Support Index"
    />
  );
};

export default ExpertConnect;