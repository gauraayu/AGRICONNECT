// src/pages/smart/MarketDemandPrediction.jsx

import React, { useState } from "react";
import {
  FaStore,
  FaChartLine,
  FaRupeeSign,
  FaArrowRight,
  FaArrowUp,
  FaArrowDown,
  FaWarehouse,
  FaBalanceScale,
  FaDownload,
  FaHeadset,
  FaSeedling,
  FaClock,
  FaInfoCircle,
  FaCheckCircle,
} from "react-icons/fa";
import "../../styles/SmartFarming.css";

const marketStaticData = {
  Tomato: {
    currentPrice: 2100,
    price7: 2180,
    price15: 2250,
    price30: 2320,
    demand: "Increasing",
    risk: "Medium",
    bestTime: "Sell after 10–15 days",
    farmerAdvice:
      "If storage is available, hold the crop for 10–15 days because demand is expected to increase.",
    buyerAdvice:
      "Buy within this week because prices may increase in the next 15 days.",
    insight:
      "Tomato demand is rising due to seasonal consumption and limited fresh supply in nearby markets.",
    demandScore: 84,
  },
  Wheat: {
    currentPrice: 2450,
    price7: 2470,
    price15: 2500,
    price30: 2520,
    demand: "Stable",
    risk: "Low",
    bestTime: "Sell gradually",
    farmerAdvice:
      "Sell in small batches to avoid price risk and compare mandi rates before selling.",
    buyerAdvice:
      "Buy as required because prices are mostly stable.",
    insight:
      "Wheat prices are stable because supply and demand are balanced in most mandis.",
    demandScore: 72,
  },
  Onion: {
    currentPrice: 1800,
    price7: 1950,
    price15: 2120,
    price30: 2050,
    demand: "High",
    risk: "High",
    bestTime: "Sell in 7–15 days",
    farmerAdvice:
      "Hold only if storage is safe because onion prices may rise but quality risk is also high.",
    buyerAdvice:
      "Buy early or negotiate now because demand may increase soon.",
    insight:
      "Onion market shows high price movement due to supply shortage and storage sensitivity.",
    demandScore: 91,
  },
  Potato: {
    currentPrice: 1500,
    price7: 1530,
    price15: 1580,
    price30: 1620,
    demand: "Moderate",
    risk: "Medium",
    bestTime: "Sell after 15–30 days",
    farmerAdvice:
      "Store safely and sell when local demand improves. Avoid holding damaged stock.",
    buyerAdvice:
      "Buy in planned quantity because prices may increase slowly.",
    insight:
      "Potato demand is moderate and price may improve slowly if storage quality remains good.",
    demandScore: 67,
  },
  Rice: {
    currentPrice: 3200,
    price7: 3180,
    price15: 3220,
    price30: 3260,
    demand: "Stable",
    risk: "Low",
    bestTime: "Sell when mandi rate crosses ₹3250",
    farmerAdvice:
      "Wait for a better mandi rate if storage and grain quality are good.",
    buyerAdvice:
      "Buy in small quantity now and monitor rate movement.",
    insight:
      "Rice demand is stable with minor price movement due to regular market supply.",
    demandScore: 74,
  },
};

const mandiRows = [
  { mandi: "Bhopal Mandi", crop: "Tomato", price: "₹2,100/qtl", demand: "High", trend: "Up" },
  { mandi: "Indore Mandi", crop: "Onion", price: "₹1,950/qtl", demand: "High", trend: "Up" },
  { mandi: "Ujjain Mandi", crop: "Wheat", price: "₹2,450/qtl", demand: "Stable", trend: "Flat" },
  { mandi: "Sehore Mandi", crop: "Potato", price: "₹1,520/qtl", demand: "Medium", trend: "Up" },
];

const MarketDemandPrediction = () => {
  const [formData, setFormData] = useState({
    crop: "Tomato",
    mandi: "Bhopal Mandi",
    quantity: "50",
    storage: "Yes",
    quality: "Good",
    supplyLevel: "Medium",
    demandLevel: "High",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(marketStaticData.Tomato);

  const cropOptions = Object.keys(marketStaticData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePrediction = () => {
    setLoading(true);

    setTimeout(() => {
      setResult(marketStaticData[formData.crop]);
      setLoading(false);
    }, 1200);
  };

  const priceDifference = result.price15 - result.currentPrice;
  const trendPositive = priceDifference >= 0;

  const chartData = [
    { label: "Today", value: result.currentPrice },
    { label: "7 Days", value: result.price7 },
    { label: "15 Days", value: result.price15 },
    { label: "30 Days", value: result.price30 },
  ];

  const maxPrice = Math.max(...chartData.map((item) => item.value));

  return (
    <div className="smart-page market-theme market-page">
      <section className="market-hero">
        <div className="market-hero-left">
          <div className="smart-mini-badge">
            <FaStore />
            <span>Agri Market Intelligence</span>
          </div>

          <h1>Market Demand Prediction</h1>

          <p className="smart-subtitle">
            Predict crop demand, price movement, best selling time, and buyer decision using static market intelligence data.
          </p>

          <p className="smart-description">
            This page helps farmers decide whether to sell now or wait. It uses crop price trend, mandi demand, quantity, quality, and storage condition to generate a professional market advisory.
          </p>

          <div className="smart-badges">
            <span>Demand Forecast</span>
            <span>Mandi Insights</span>
            <span>Price Trend</span>
            <span>Selling Strategy</span>
          </div>

          <div className="smart-hero-buttons">
            <button className="primary-btn" onClick={handlePrediction}>
              Predict Demand <FaArrowRight />
            </button>
            <button className="secondary-btn">Compare Mandi Prices</button>
          </div>
        </div>

        <div className="market-hero-card">
          <div className="market-live-header">
            <div>
              <span>Current Crop</span>
              <h3>{formData.crop}</h3>
            </div>
            <FaChartLine />
          </div>

          <div className="market-price-main">
            <span>Predicted 15 Days Price</span>
            <h2>₹{result.price15}/qtl</h2>
            <p className={trendPositive ? "trend-up" : "trend-down"}>
              {trendPositive ? <FaArrowUp /> : <FaArrowDown />}
              ₹{Math.abs(priceDifference)} expected difference
            </p>
          </div>

          <div className="market-mini-grid">
            <div>
              <span>Demand</span>
              <strong>{result.demand}</strong>
            </div>
            <div>
              <span>Risk</span>
              <strong>{result.risk}</strong>
            </div>
            <div>
              <span>Score</span>
              <strong>{result.demandScore}%</strong>
            </div>
            <div>
              <span>Storage</span>
              <strong>{formData.storage}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="market-stats-grid">
        <div className="market-stat-card">
          <FaRupeeSign />
          <span>Current Price</span>
          <h3>₹{result.currentPrice}/qtl</h3>
        </div>

        <div className="market-stat-card">
          <FaClock />
          <span>Best Selling Time</span>
          <h3>{result.bestTime}</h3>
        </div>

        <div className="market-stat-card">
          <FaBalanceScale />
          <span>Demand Trend</span>
          <h3>{result.demand}</h3>
        </div>

        <div className="market-stat-card">
          <FaWarehouse />
          <span>Storage Advice</span>
          <h3>{formData.storage === "Yes" ? "Can Hold" : "Sell Soon"}</h3>
        </div>
      </section>

      <section className="market-workspace">
        <div className="smart-form-card">
          <div className="section-heading">
            <span>Market Input</span>
            <h2>Enter Crop Market Details</h2>
            <p>Use static data right now. Later you can connect mandi API or ML model here.</p>
          </div>

          <div className="smart-form-grid">
            <div className="form-group">
              <label>Crop Name</label>
              <select name="crop" value={formData.crop} onChange={handleChange}>
                {cropOptions.map((crop) => (
                  <option key={crop} value={crop}>
                    {crop}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Mandi / Market</label>
              <input
                name="mandi"
                value={formData.mandi}
                onChange={handleChange}
                placeholder="Enter mandi name"
              />
            </div>

            <div className="form-group">
              <label>Quantity Available</label>
              <input
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Example: 50 quintals"
              />
            </div>

            <div className="form-group">
              <label>Storage Available</label>
              <select name="storage" value={formData.storage} onChange={handleChange}>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div className="form-group">
              <label>Crop Quality</label>
              <select name="quality" value={formData.quality} onChange={handleChange}>
                <option>Excellent</option>
                <option>Good</option>
                <option>Average</option>
                <option>Low</option>
              </select>
            </div>

            <div className="form-group">
              <label>Supply Level</label>
              <select name="supplyLevel" value={formData.supplyLevel} onChange={handleChange}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div className="form-group">
              <label>Demand Level</label>
              <select name="demandLevel" value={formData.demandLevel} onChange={handleChange}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button className="primary-btn" onClick={handlePrediction}>
              Predict Market Demand
            </button>
          </div>
        </div>

        <div className="smart-result-card">
          <div className="section-heading">
            <span>Prediction Output</span>
            <h2>Market Forecast Report</h2>
            <p>Static prediction report based on selected crop and market data.</p>
          </div>

          {loading ? (
            <div className="loading-box">
              <div className="scanner"></div>
              <h3>Analyzing market trend...</h3>
              <p>Checking demand, price movement, and selling strategy.</p>
            </div>
          ) : (
            <div className="result-content">
              <div className="score-circle">
                <strong>{result.demandScore}%</strong>
                <span>Demand Score</span>
              </div>

              <h3>{formData.crop} Market Prediction</h3>
              <p className="result-summary">{result.insight}</p>

              <div className="metrics-grid">
                <div className="metric-card">
                  <span>7 Days Price</span>
                  <strong>₹{result.price7}/qtl</strong>
                </div>
                <div className="metric-card">
                  <span>15 Days Price</span>
                  <strong>₹{result.price15}/qtl</strong>
                </div>
                <div className="metric-card">
                  <span>30 Days Price</span>
                  <strong>₹{result.price30}/qtl</strong>
                </div>
                <div className="metric-card">
                  <span>Risk Level</span>
                  <strong>{result.risk}</strong>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="market-chart-section">
        <div className="section-heading center">
          <span>Price Trend</span>
          <h2>Predicted Crop Price Movement</h2>
          <p>This chart uses static data for now. Later you can connect real mandi prices here.</p>
        </div>

        <div className="market-chart-card">
          {chartData.map((item) => (
            <div className="price-bar-item" key={item.label}>
              <div className="bar-wrapper">
                <div
                  className="price-bar"
                  style={{ height: `${(item.value / maxPrice) * 100}%` }}
                ></div>
              </div>
              <strong>₹{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="market-advice-grid">
        <div className="market-advice-card farmer-card">
          <FaSeedling />
          <h3>Farmer Selling Advice</h3>
          <p>{result.farmerAdvice}</p>
        </div>

        <div className="market-advice-card buyer-card">
          <FaStore />
          <h3>Buyer Purchase Advice</h3>
          <p>{result.buyerAdvice}</p>
        </div>

        <div className="market-advice-card">
          <FaInfoCircle />
          <h3>Market Insight</h3>
          <p>{result.insight}</p>
        </div>
      </section>

      <section className="mandi-table-section">
        <div className="section-heading">
          <span>Static Mandi Data</span>
          <h2>Nearby Market Overview</h2>
          <p>Sample mandi data for UI display. Replace this with real API data later.</p>
        </div>

        <div className="mandi-table">
          <div className="mandi-table-head">
            <span>Mandi</span>
            <span>Crop</span>
            <span>Price</span>
            <span>Demand</span>
            <span>Trend</span>
          </div>

          {mandiRows.map((row, index) => (
            <div className="mandi-table-row" key={index}>
              <span>{row.mandi}</span>
              <span>{row.crop}</span>
              <span>{row.price}</span>
              <span>{row.demand}</span>
              <span className={row.trend === "Up" ? "trend-up" : "flat-trend"}>
                {row.trend === "Up" ? <FaArrowUp /> : <FaCheckCircle />}
                {row.trend}
              </span>
            </div>
          ))}
        </div>

        <div className="report-actions">
          <button className="primary-btn">
            <FaDownload /> Download Market Report
          </button>
          <button className="secondary-btn">
            <FaHeadset /> Talk to Market Expert
          </button>
        </div>
      </section>
    </div>
  );
};

export default MarketDemandPrediction;