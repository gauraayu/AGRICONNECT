// src/pages/smart/SmartFeaturePage.jsx

import React, { useState } from "react";
import { FaCheckCircle, FaDownload, FaHeadset, FaRedo, FaArrowRight } from "react-icons/fa";
import { analyzeSmartFeature } from "../../services/smartFarmingService";
import "../../styles/SmartFarming.css";

const SmartFeaturePage = ({ pageData }) => {
  const Icon = pageData.icon;

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setResult(null);

    const response = await analyzeSmartFeature(pageData.type, formData);

    setResult(response);
    setLoading(false);
  };

  const handleReset = () => {
    setFormData({});
    setResult(null);
  };

  return (
    <div className={`smart-page ${pageData.theme}`}>
      <section className="smart-hero">
        <div className="smart-hero-content">
          <div className="smart-mini-badge">
            <Icon />
            <span>{pageData.badge}</span>
          </div>

          <h1>{pageData.title}</h1>
          <p className="smart-subtitle">{pageData.subtitle}</p>
          <p className="smart-description">{pageData.description}</p>

          <div className="smart-badges">
            {pageData.badges.map((badge, index) => (
              <span key={index}>{badge}</span>
            ))}
          </div>

          <div className="smart-hero-buttons">
            <button className="primary-btn" onClick={handleAnalyze}>
              Start Analysis <FaArrowRight />
            </button>
            <button className="secondary-btn">Talk to Expert</button>
          </div>
        </div>

        <div className="smart-hero-card">
          <img src={pageData.heroImage} alt={pageData.title} />
          <div className="hero-overlay-card">
            <Icon />
            <div>
              <h3>Smart Status</h3>
              <p>{result ? result.status : "Ready for Analysis"}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="smart-feature-grid">
        {pageData.featureCards.map((card, index) => {
          const CardIcon = card.icon;
          return (
            <div className="smart-feature-card" key={index}>
              <div className="feature-icon">
                <CardIcon />
              </div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          );
        })}
      </section>

      <section className="smart-workspace">
        <div className="smart-form-card">
          <div className="section-heading">
            <span>Input Panel</span>
            <h2>{pageData.formTitle}</h2>
            <p>Fill details below to generate a professional smart farming report.</p>
          </div>

          <div className="smart-form-grid">
            {pageData.fields.map((field) => (
              <div className="form-group" key={field.name}>
                <label>{field.label}</label>

                {field.type === "select" ? (
                  <select
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options.map((option) => (
                      <option value={option} key={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="form-actions">
            <button className="primary-btn" onClick={handleAnalyze}>
              {pageData.buttonText}
            </button>
            <button className="light-btn" onClick={handleReset}>
              <FaRedo /> Reset
            </button>
          </div>
        </div>

        <div className="smart-result-card">
          <div className="section-heading">
            <span>AI Output</span>
            <h2>Smart Report</h2>
            <p>Analysis result will appear here after processing your data.</p>
          </div>

          {loading && (
            <div className="loading-box">
              <div className="scanner"></div>
              <h3>{pageData.loadingText}</h3>
              <p>Please wait while AgriConnect prepares your report.</p>
            </div>
          )}

          {!loading && !result && (
            <div className="empty-result">
              <Icon />
              <h3>No report generated yet</h3>
              <p>Enter details and click on analysis button to view smart recommendations.</p>
            </div>
          )}

          {!loading && result && (
            <div className="result-content">
              <div className="score-circle">
                <strong>{result.score}</strong>
                <span>Confidence</span>
              </div>

              <h3>{result.title}</h3>
              <p className="result-summary">{result.summary}</p>

              <div className="risk-row">
                <div>
                  <span>Status</span>
                  <strong>{result.status}</strong>
                </div>
                <div>
                  <span>Risk Level</span>
                  <strong>{result.risk}</strong>
                </div>
              </div>

              <div className="metrics-grid">
                {result.metrics.map((item, index) => (
                  <div className="metric-card" key={index}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {result && (
        <section className="smart-recommendations">
          <div className="section-heading center">
            <span>Recommended Action Plan</span>
            <h2>Expert Smart Farming Suggestions</h2>
            <p>Use these suggestions to improve crop health, reduce risk, and increase productivity.</p>
          </div>

          <div className="recommend-grid">
            {result.recommendations.map((item, index) => (
              <div className="recommend-card" key={index}>
                <FaCheckCircle />
                <p>{item}</p>
              </div>
            ))}
          </div>

          <div className="report-actions">
            <button className="primary-btn">
              <FaDownload /> Download Report
            </button>
            <button className="secondary-btn">
              <FaHeadset /> Talk to Agronomist
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default SmartFeaturePage;