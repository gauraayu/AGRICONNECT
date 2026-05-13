import React, { useState } from "react";
import "./CropAdvisory.css";

const cropData = {
  Wheat: {
    image:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200&auto=format&fit=crop",
    season: "Rabi Season",
    soil: "Loamy soil with good drainage",
    irrigation: "Irrigate at crown root, tillering, flowering and grain filling stage",
    fertilizer: "Use nitrogen, phosphorus and potassium as per soil test report",
    pests: "Aphids, termites and rust disease",
    advice:
      "Use certified seeds, maintain proper spacing, avoid excess irrigation and monitor rust symptoms regularly.",
  },
  Rice: {
    image:
      "https://images.unsplash.com/photo-1536054246443-45c1f45f489c?w=1200&auto=format&fit=crop",
    season: "Kharif Season",
    soil: "Clayey or loamy soil with water retention",
    irrigation: "Maintain standing water during early growth stages",
    fertilizer: "Apply nitrogen in split doses for better yield",
    pests: "Stem borer, leaf folder and blast disease",
    advice:
      "Use healthy seedlings, avoid overcrowding, keep field bunds clean and monitor leaf spots.",
  },
  Tomato: {
    image:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=1200&auto=format&fit=crop",
    season: "All-season vegetable crop",
    soil: "Well-drained sandy loam soil",
    irrigation: "Regular light irrigation, avoid waterlogging",
    fertilizer: "Use compost with balanced NPK fertilizer",
    pests: "Fruit borer, whitefly and leaf curl virus",
    advice:
      "Use staking, remove infected leaves, apply mulch and avoid overhead irrigation.",
  },
  Potato: {
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=1200&auto=format&fit=crop",
    season: "Rabi Season",
    soil: "Loose, well-drained sandy loam soil",
    irrigation: "Irrigate after planting and during tuber formation",
    fertilizer: "Use organic manure and potassium-rich fertilizer",
    pests: "Late blight, early blight and cutworm",
    advice:
      "Use disease-free seed tubers, do earthing-up properly and protect from late blight.",
  },
};

const advisoryCards = [
  {
    icon: "🌱",
    title: "Soil Health Advisory",
    text: "Check soil pH, organic carbon and nutrient level before fertilizer application.",
  },
  {
    icon: "💧",
    title: "Irrigation Guidance",
    text: "Give water according to crop stage and avoid over-irrigation to prevent root diseases.",
  },
  {
    icon: "🐛",
    title: "Pest & Disease Alert",
    text: "Monitor leaves, stem and fruits weekly for early pest or disease symptoms.",
  },
  {
    icon: "🌦️",
    title: "Weather-Based Tips",
    text: "Protect crops from heavy rain, heat waves, frost and strong winds using timely actions.",
  },
];

function CropAdvisory() {
  const [selectedCrop, setSelectedCrop] = useState("Wheat");
  const crop = cropData[selectedCrop];

  return (
    <div className="crop-advisory-page">
      <section
        className="crop-hero"
        style={{ backgroundImage: `url(${crop.image})` }}
      >
        <div className="crop-hero-overlay">
          <span className="crop-badge">AgriConnect Services</span>
          <h1>Smart Crop Advisory</h1>
          <p>
            Get crop-wise guidance for soil, irrigation, fertilizers, pest
            control and better farming decisions.
          </p>
        </div>
      </section>

      <section className="crop-selector-section">
        <div className="section-heading">
          <span>Choose Crop</span>
          <h2>Personalized Farming Guidance</h2>
          <p>
            Select a crop and get useful advisory details for better yield and
            crop protection.
          </p>
        </div>

        <div className="crop-buttons">
          {Object.keys(cropData).map((item) => (
            <button
              key={item}
              onClick={() => setSelectedCrop(item)}
              className={selectedCrop === item ? "active" : ""}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="crop-detail-card">
          <div className="crop-detail-image">
            <img src={crop.image} alt={selectedCrop} />
          </div>

          <div className="crop-detail-content">
            <span className="season-tag">{crop.season}</span>
            <h3>{selectedCrop} Advisory</h3>

            <div className="crop-info-grid">
              <div>
                <strong>🌾 Soil Type</strong>
                <p>{crop.soil}</p>
              </div>
              <div>
                <strong>💧 Irrigation</strong>
                <p>{crop.irrigation}</p>
              </div>
              <div>
                <strong>🧪 Fertilizer</strong>
                <p>{crop.fertilizer}</p>
              </div>
              <div>
                <strong>🐛 Common Issues</strong>
                <p>{crop.pests}</p>
              </div>
            </div>

            <div className="expert-advice">
              <strong>👨‍🌾 Expert Advice</strong>
              <p>{crop.advice}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="advisory-services">
        <div className="section-heading">
          <span>Advisory Features</span>
          <h2>How AgriConnect Helps Farmers</h2>
        </div>

        <div className="advisory-grid">
          {advisoryCards.map((card, index) => (
            <div className="advisory-card" key={index}>
              <div className="advisory-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="crop-calendar">
        <div className="calendar-content">
          <span>Seasonal Advisory</span>
          <h2>Crop Care Timeline</h2>

          <div className="timeline">
            <div className="timeline-item">
              <h4>1. Before Sowing</h4>
              <p>Test soil, select quality seeds and prepare the field.</p>
            </div>

            <div className="timeline-item">
              <h4>2. Growing Stage</h4>
              <p>Apply irrigation, nutrients and check crop health weekly.</p>
            </div>

            <div className="timeline-item">
              <h4>3. Flowering Stage</h4>
              <p>Protect crop from pest attack and avoid water stress.</p>
            </div>

            <div className="timeline-item">
              <h4>4. Harvesting Stage</h4>
              <p>Harvest at the correct maturity stage for better quality.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="crop-cta">
        <h2>Need Expert Help?</h2>
        <p>
          Farmers can post crop problems and connect with agronomists for better
          crop solutions.
        </p>
        <button>Ask Crop Expert</button>
      </section>
    </div>
  );
}

export default CropAdvisory;