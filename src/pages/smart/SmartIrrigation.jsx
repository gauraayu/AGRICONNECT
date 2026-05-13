import React, { useState } from "react";
import {
  FaTint,
  FaWater,
  FaCloudSunRain,
  FaSeedling,
  FaLeaf,
  FaClock,
  FaDownload,
  FaHeadset,
  FaCheckCircle,
} from "react-icons/fa";
import "../../styles/SmartFarming.css";

const irrigationData = {
  Tomato: {
    moisture: "38%",
    need: "Medium",
    nextIrrigation: "Tomorrow before 9 AM",
    waterAmount: "16 mm",
    method: "Drip Irrigation",
    score: "74%",
    advice:
      "Tomato needs consistent moisture. Avoid watering leaves because it can increase fungal infection risk.",
  },
  Wheat: {
    moisture: "45%",
    need: "Medium",
    nextIrrigation: "Tomorrow morning",
    waterAmount: "18 mm",
    method: "Sprinkler / Furrow Irrigation",
    score: "78%",
    advice:
      "Wheat needs balanced irrigation during root development and flowering stage. Avoid overwatering.",
  },
  Rice: {
    moisture: "60%",
    need: "High",
    nextIrrigation: "Today evening",
    waterAmount: "35 mm",
    method: "Alternate Wetting and Drying",
    score: "82%",
    advice:
      "Rice needs more water, but continuous flooding is not always required. Alternate wetting helps save water.",
  },
  Potato: {
    moisture: "41%",
    need: "Medium",
    nextIrrigation: "Next morning",
    waterAmount: "20 mm",
    method: "Sprinkler Irrigation",
    score: "76%",
    advice:
      "Potato needs regular moisture during tuber formation. Too much water can cause rotting.",
  },
};

const techniques = [
  {
    icon: FaTint,
    title: "Drip Irrigation",
    text: "Supplies water directly near plant roots. Best for vegetables, fruits, tomato, cotton, and high-value crops.",
  },
  {
    icon: FaWater,
    title: "Sprinkler Irrigation",
    text: "Sprays water like rainfall. Useful for wheat, potato, pulses, fodder crops, and uneven land.",
  },
  {
    icon: FaCloudSunRain,
    title: "Rainwater Harvesting",
    text: "Stores rainwater in ponds or tanks and uses it during dry periods to reduce water shortage.",
  },
  {
    icon: FaLeaf,
    title: "Mulching",
    text: "Covers soil to reduce evaporation, control weeds, and maintain soil moisture for longer time.",
  },
];

const tips = [
  "Irrigate early morning or evening to reduce evaporation loss.",
  "Use drip irrigation for vegetables and fruit crops.",
  "Avoid overwatering because it damages roots and increases disease risk.",
  "Check weather forecast before irrigation.",
  "Use mulch to maintain soil moisture.",
  "Repair pipe leakage and blocked nozzles regularly.",
];

const SmartIrrigation = () => {
  const [crop, setCrop] = useState("Tomato");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(irrigationData.Tomato);

  const handleCheck = () => {
    setLoading(true);

    setTimeout(() => {
      setResult(irrigationData[crop]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="smart-page irrigation-theme">
      <section className="irrigation-hero">
        <div className="irrigation-hero-left">
          <div className="smart-mini-badge">
            <FaTint />
            <span>Smart Water Management</span>
          </div>

          <h1>Smart Irrigation System</h1>

          <p className="smart-subtitle">
            Optimize water usage with crop-stage irrigation, soil moisture
            tracking, and weather-based water recommendations.
          </p>

          <p className="smart-description">
            AgriConnect Smart Irrigation helps farmers save water, prevent
            overwatering, protect crop roots, and improve yield using smart
            irrigation techniques.
          </p>

          <div className="smart-badges">
            <span>Water Saving</span>
            <span>Soil Moisture</span>
            <span>Weather Based</span>
            <span>Crop Stage Planning</span>
          </div>

          <div className="smart-hero-buttons">
            <button className="primary-btn" onClick={handleCheck}>
              Check Irrigation Need
            </button>
            <button className="secondary-btn">Set Water Alert</button>
          </div>
        </div>

        <div className="irrigation-hero-card">
          <div className="water-drop-card">
            <FaTint />
            <h2>{result.score}</h2>
            <p>Water Efficiency Score</p>
          </div>

          <div className="irrigation-hero-metrics">
            <div>
              <span>Soil Moisture</span>
              <strong>{result.moisture}</strong>
            </div>
            <div>
              <span>Irrigation Need</span>
              <strong>{result.need}</strong>
            </div>
            <div>
              <span>Next Irrigation</span>
              <strong>{result.nextIrrigation}</strong>
            </div>
            <div>
              <span>Water Amount</span>
              <strong>{result.waterAmount}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="market-workspace">
        <div className="smart-form-card">
          <div className="section-heading">
            <span>Irrigation Input</span>
            <h2>Enter Crop Details</h2>
            <p>
              Static advisory for now. Later you can connect sensors, weather
              API, or IoT device data.
            </p>
          </div>

          <div className="smart-form-grid">
            <div className="form-group">
              <label>Crop Name</label>
              <select value={crop} onChange={(e) => setCrop(e.target.value)}>
                {Object.keys(irrigationData).map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Soil Type</label>
              <select>
                <option>Black Soil</option>
                <option>Alluvial Soil</option>
                <option>Sandy Soil</option>
                <option>Clay Soil</option>
              </select>
            </div>

            <div className="form-group">
              <label>Crop Stage</label>
              <select>
                <option>Sowing</option>
                <option>Vegetative</option>
                <option>Flowering</option>
                <option>Fruiting</option>
                <option>Harvesting</option>
              </select>
            </div>

            <div className="form-group">
              <label>Weather Condition</label>
              <select>
                <option>Sunny</option>
                <option>Cloudy</option>
                <option>Rain Expected</option>
                <option>Hot</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button className="primary-btn" onClick={handleCheck}>
              Generate Irrigation Plan
            </button>
          </div>
        </div>

        <div className="smart-result-card">
          <div className="section-heading">
            <span>Smart Advisory</span>
            <h2>Irrigation Recommendation</h2>
            <p>Water requirement and irrigation plan based on selected crop.</p>
          </div>

          {loading ? (
            <div className="loading-box">
              <div className="scanner"></div>
              <h3>Calculating irrigation requirement...</h3>
              <p>Checking crop stage, moisture, and water need.</p>
            </div>
          ) : (
            <div className="result-content">
              <div className="score-circle">
                <strong>{result.score}</strong>
                <span>Efficiency</span>
              </div>

              <h3>{crop} Irrigation Plan</h3>
              <p className="result-summary">{result.advice}</p>

              <div className="metrics-grid">
                <div className="metric-card">
                  <span>Water Need</span>
                  <strong>{result.need}</strong>
                </div>
                <div className="metric-card">
                  <span>Water Amount</span>
                  <strong>{result.waterAmount}</strong>
                </div>
                <div className="metric-card">
                  <span>Next Irrigation</span>
                  <strong>{result.nextIrrigation}</strong>
                </div>
                <div className="metric-card">
                  <span>Method</span>
                  <strong>{result.method}</strong>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="irrigation-tech-section">
        <div className="section-heading center">
          <span>Irrigation Techniques</span>
          <h2>Professional Water Saving Techniques</h2>
          <p>
            Use these smart irrigation methods to save water and maintain better
            crop health.
          </p>
        </div>

        <div className="irrigation-tech-grid">
          {techniques.map((item, index) => {
            const Icon = item.icon;

            return (
              <div className="irrigation-tech-card" key={index}>
                <div className="feature-icon">
                  <Icon />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="smart-recommendations">
        <div className="section-heading center">
          <span>Water Saving Tips</span>
          <h2>Smart Irrigation Action Plan</h2>
          <p>Follow these practices to save water and protect crop roots.</p>
        </div>

        <div className="recommend-grid">
          {tips.map((tip, index) => (
            <div className="recommend-card" key={index}>
              <FaCheckCircle />
              <p>{tip}</p>
            </div>
          ))}
        </div>

        <div className="report-actions">
          <button className="primary-btn">
            <FaDownload /> Download Irrigation Report
          </button>
          <button className="secondary-btn">
            <FaHeadset /> Talk to Agronomist
          </button>
        </div>
      </section>
    </div>
  );
};

export default SmartIrrigation;