// src/pages/smart/AiCropDoctor.jsx

import React, { useState } from "react";
import {
  FaRobot,
  FaUpload,
  FaLeaf,
  FaMicroscope,
  FaHeartbeat,
  FaDownload,
  FaHeadset,
  FaRedo,
  FaTrash,
  FaCheckCircle,
} from "react-icons/fa";
import "../../styles/SmartFarming.css";

const AiCropDoctor = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleScan = () => {
    if (!selectedImage) {
      alert("Please upload crop image first");
      return;
    }

    setLoading(true);
    setResult(null);

    setTimeout(() => {
      setResult({
        cropType: "Tomato",
        diseaseName: "Early Blight",
        detectedProblem: "Fungal Infection",
        confidence: "92%",
        severity: "Medium",
        affectedPart: "Leaves",
        healthScore: "68%",
        isCurable: "Yes",
        possibleCause:
          "High humidity, infected soil, poor air circulation, and water droplets on leaves.",
        symptoms: [
          "Brown circular spots on leaves",
          "Yellowing around infected area",
          "Dry and weak leaves",
          "Slow plant growth",
        ],
        organicTreatment: [
          "Remove infected leaves immediately.",
          "Spray neem oil solution in the evening.",
          "Use compost tea or organic fungicide.",
          "Avoid overhead watering.",
        ],
        chemicalTreatment: [
          "Use copper-based fungicide.",
          "Apply Mancozeb as per recommended dosage.",
          "Repeat spray after 7 days if infection continues.",
        ],
        preventionTips: [
          "Keep proper spacing between plants.",
          "Water near roots only.",
          "Use disease-free seeds.",
          "Rotate crops every season.",
        ],
        expertAdvice:
          "The uploaded image shows symptoms similar to fungal infection. Early action can prevent disease spread and protect crop yield.",
      });

      setLoading(false);
    }, 2000);
  };

  const removeImage = () => {
    setSelectedImage(null);
    setPreview("");
    setResult(null);
  };

  return (
    <div className="smart-page crop-doctor-theme">
      <section className="smart-hero crop-doctor-hero">
        <div className="smart-hero-content">
          <div className="smart-mini-badge">
            <FaRobot />
            <span>AI Image Diagnosis</span>
          </div>

          <h1>AI Crop Doctor</h1>
          <p className="smart-subtitle">
            Upload a crop image and detect possible diseases, pests, and nutrient deficiencies using AI-powered crop scanning.
          </p>

          <p className="smart-description">
            AgriConnect AI Crop Doctor helps farmers identify plant health problems at an early stage. Scan leaves, fruits, stems, or infected crop areas and receive disease severity, treatment plan, and prevention guidance.
          </p>

          <div className="smart-badges">
            <span>Image Based Diagnosis</span>
            <span>Disease Detection</span>
            <span>Pest Analysis</span>
            <span>Treatment Advice</span>
          </div>

          <div className="smart-hero-buttons">
            <button className="primary-btn" onClick={handleScan}>
              Scan Crop Image
            </button>
            <button className="secondary-btn">Talk to Agronomist</button>
          </div>
        </div>

        <div className="doctor-preview-card">
          {preview ? (
            <img src={preview} alt="Crop Preview" />
          ) : (
            <div className="preview-placeholder">
              <FaLeaf />
              <h3>Upload Crop Image</h3>
              <p>Leaf, fruit, stem, or infected crop area</p>
            </div>
          )}

          <div className="health-card">
            <FaHeartbeat />
            <div>
              <span>Plant Health Score</span>
              <strong>{result ? result.healthScore : "Waiting"}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="crop-doctor-workspace">
        <div className="upload-card">
          <div className="section-heading">
            <span>Crop Image Upload</span>
            <h2>Upload Image for AI Scan</h2>
            <p>Use a clear image of the affected crop part for better diagnosis.</p>
          </div>

          <label className="upload-box">
            <FaUpload />
            <h3>Drag & Drop or Click to Upload</h3>
            <p>Supported formats: JPG, JPEG, PNG</p>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>

          {selectedImage && (
            <div className="file-info">
              <span>{selectedImage.name}</span>
              <button onClick={removeImage}>
                <FaTrash /> Remove
              </button>
            </div>
          )}

          <div className="form-actions">
            <button className="primary-btn" onClick={handleScan}>
              <FaMicroscope /> Scan Crop Image
            </button>
            <button className="light-btn" onClick={removeImage}>
              <FaRedo /> Scan Another
            </button>
          </div>
        </div>

        <div className="smart-result-card">
          <div className="section-heading">
            <span>AI Diagnosis</span>
            <h2>Crop Health Report</h2>
            <p>Disease detection result and treatment advice will appear here.</p>
          </div>

          {loading && (
            <div className="loading-box">
              <div className="scanner"></div>
              <h3>Scanning crop image with AI...</h3>
              <p>Analyzing visible symptoms and plant health indicators.</p>
            </div>
          )}

          {!loading && !result && (
            <div className="empty-result">
              <FaMicroscope />
              <h3>No image scanned yet</h3>
              <p>Upload crop image and click scan to get diagnosis.</p>
            </div>
          )}

          {!loading && result && (
            <div className="result-content">
              <div className="score-circle">
                <strong>{result.confidence}</strong>
                <span>Confidence</span>
              </div>

              <h3>{result.diseaseName}</h3>
              <p className="result-summary">{result.expertAdvice}</p>

              <div className="metrics-grid">
                <div className="metric-card">
                  <span>Crop Type</span>
                  <strong>{result.cropType}</strong>
                </div>
                <div className="metric-card">
                  <span>Problem</span>
                  <strong>{result.detectedProblem}</strong>
                </div>
                <div className="metric-card">
                  <span>Severity</span>
                  <strong>{result.severity}</strong>
                </div>
                <div className="metric-card">
                  <span>Affected Part</span>
                  <strong>{result.affectedPart}</strong>
                </div>
                <div className="metric-card">
                  <span>Curable</span>
                  <strong>{result.isCurable}</strong>
                </div>
                <div className="metric-card">
                  <span>Health Score</span>
                  <strong>{result.healthScore}</strong>
                </div>
              </div>

              <div className="severity-meter">
                <span>Severity Meter</span>
                <div className="meter-track">
                  <div className="meter-fill"></div>
                </div>
                <strong>{result.severity}</strong>
              </div>
            </div>
          )}
        </div>
      </section>

      {result && (
        <>
          <section className="doctor-diagnosis-grid">
            <DiagnosisCard title="Disease Symptoms" items={result.symptoms} />
            <DiagnosisCard title="Main Causes" items={[result.possibleCause]} />
            <DiagnosisCard title="Organic Treatment" items={result.organicTreatment} />
            <DiagnosisCard title="Chemical Treatment" items={result.chemicalTreatment} />
            <DiagnosisCard title="Prevention Tips" items={result.preventionTips} />
          </section>

          <section className="treatment-plan">
            <div className="section-heading center">
              <span>AI Recommended Treatment Plan</span>
              <h2>7-Day Crop Recovery Plan</h2>
              <p>Follow these steps and upload image again after 7 days for progress check.</p>
            </div>

            <div className="timeline-grid">
              <div className="timeline-card">
                <h3>Day 1</h3>
                <p>Remove infected leaves and isolate affected plants.</p>
              </div>
              <div className="timeline-card">
                <h3>Day 2-3</h3>
                <p>Spray recommended organic solution or fungicide.</p>
              </div>
              <div className="timeline-card">
                <h3>Day 4-7</h3>
                <p>Monitor leaf spots, color, moisture, and plant growth.</p>
              </div>
              <div className="timeline-card">
                <h3>After 7 Days</h3>
                <p>Upload image again and compare plant health improvement.</p>
              </div>
            </div>

            <div className="report-actions">
              <button className="primary-btn">
                <FaDownload /> Download Diagnosis Report
              </button>
              <button className="secondary-btn">
                <FaHeadset /> Talk to Agronomist
              </button>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

const DiagnosisCard = ({ title, items }) => {
  return (
    <div className="diagnosis-card">
      <h3>{title}</h3>
      {items.map((item, index) => (
        <p key={index}>
          <FaCheckCircle /> {item}
        </p>
      ))}
    </div>
  );
};

export default AiCropDoctor;