// src/pages/smart/ARVRFarmingTraining.jsx

import React, { useState } from "react";
import {
  FaVrCardboard,
  FaPlayCircle,
  FaSeedling,
  FaWater,
  FaLeaf,
  FaTractor,
  FaGraduationCap,
  FaCheckCircle,
  FaDownload,
  FaHeadset,
  FaArrowRight,
  FaClock,
  FaVideo,
} from "react-icons/fa";
import "../../styles/SmartFarming.css";

const trainingVideos = [
  {
    title: "Immersive Agricultural Training",
    category: "VR Farming Basics",
    duration: "Training Video",
    description:
      "Understand how virtual reality can be used for interactive agricultural learning and practical farm training.",
    embedUrl: "https://www.youtube.com/embed/4Bp13WiO1EA",
  },
  {
    title: "VR Training Solutions for Agriculture",
    category: "Modern Farming Training",
    duration: "Training Video",
    description:
      "Learn how VR can help farmers understand agricultural processes, field safety, and crop management.",
    embedUrl: "https://www.youtube.com/embed/PYdbn2UIN34",
  },
  {
    title: "VR Agricultural Machinery Training",
    category: "Farm Equipment",
    duration: "Training Video",
    description:
      "Explore how virtual reality can train users to operate agricultural machinery safely and effectively.",
    embedUrl: "https://www.youtube.com/embed/gHvX_Zs6jZs",
  },
  {
    title: "360 Agriculture Farm Tour",
    category: "360° Farm Learning",
    duration: "Playlist",
    description:
      "Watch 360-degree farm learning videos to understand crop growth, farm processes, and field activities.",
    embedUrl:
      "https://www.youtube.com/embed/videoseries?list=PLYA8jFF7Rfxt7FN7B0_ixEU6H5ztDdeL2",
  },
];

const modules = [
  {
    icon: FaWater,
    title: "Smart Irrigation Training",
    text: "Learn how to manage water efficiently using sensors, soil moisture, and crop-stage based irrigation.",
  },
  {
    icon: FaLeaf,
    title: "Crop Disease Identification",
    text: "Understand common leaf symptoms, pest attacks, fungal infections, and crop protection methods.",
  },
  {
    icon: FaTractor,
    title: "Farm Equipment Safety",
    text: "Practice safe handling of tractors, sprayers, drones, and modern agricultural machines.",
  },
  {
    icon: FaSeedling,
    title: "Organic Farming Practices",
    text: "Learn composting, natural pest control, crop rotation, and soil health improvement techniques.",
  },
];

const ARVRFarmingTraining = () => {
  const [selectedModule, setSelectedModule] = useState("Smart Irrigation");
  const [level, setLevel] = useState("Beginner");
  const [language, setLanguage] = useState("Hinglish");
  const [activeVideo, setActiveVideo] = useState(trainingVideos[0]);
  const [showPlan, setShowPlan] = useState(false);

  const handleStartTraining = () => {
    setShowPlan(true);
  };

  return (
    <div className="smart-page arvr-theme">
      <section className="arvr-hero">
        <div className="arvr-hero-content">
          <div className="smart-mini-badge">
            <FaVrCardboard />
            <span>Immersive Farmer Learning</span>
          </div>

          <h1>AR/VR Farming Training</h1>

          <p className="smart-subtitle">
            Learn modern farming techniques through immersive videos, virtual
            training modules, and practical agriculture simulations.
          </p>

          <p className="smart-description">
            AgriConnect AR/VR Farming Training helps farmers, students, and
            agronomists understand real farming situations through virtual
            learning. Watch training videos, select modules, and follow a guided
            learning path for smart agriculture.
          </p>

          <div className="smart-badges">
            <span>VR Farm Training</span>
            <span>360° Learning</span>
            <span>Equipment Safety</span>
            <span>Crop Simulation</span>
          </div>

          <div className="smart-hero-buttons">
            <button className="primary-btn" onClick={handleStartTraining}>
              Start Training <FaArrowRight />
            </button>
            <button className="secondary-btn">View Modules</button>
          </div>
        </div>

        <div className="arvr-hero-video-card">
          <iframe
            src={activeVideo.embedUrl}
            title={activeVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>

          <div className="arvr-video-info">
            <FaPlayCircle />
            <div>
              <h3>{activeVideo.title}</h3>
              <p>{activeVideo.category}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="arvr-stats">
        <div className="arvr-stat-card">
          <FaVideo />
          <h3>4+</h3>
          <p>Training Videos</p>
        </div>

        <div className="arvr-stat-card">
          <FaVrCardboard />
          <h3>360°</h3>
          <p>Virtual Farm Learning</p>
        </div>

        <div className="arvr-stat-card">
          <FaGraduationCap />
          <h3>6</h3>
          <p>Learning Modules</p>
        </div>

        <div className="arvr-stat-card">
          <FaCheckCircle />
          <h3>Beginner</h3>
          <p>Farmer Friendly</p>
        </div>
      </section>

      <section className="arvr-video-section">
        <div className="section-heading center">
          <span>Google / YouTube Learning Videos</span>
          <h2>Watch AR/VR Farming Training Videos</h2>
          <p>
            Select any training video below and learn how AR, VR, and 360°
            videos can be used in modern agriculture.
          </p>
        </div>

        <div className="arvr-video-grid">
          {trainingVideos.map((video, index) => (
            <button
              className={`arvr-video-card ${
                activeVideo.title === video.title ? "active-video" : ""
              }`}
              key={index}
              onClick={() => setActiveVideo(video)}
            >
              <div className="video-thumb">
                <iframe
                  src={video.embedUrl}
                  title={video.title}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="video-card-content">
                <span>{video.category}</span>
                <h3>{video.title}</h3>
                <p>{video.description}</p>

                <div className="video-meta">
                  <small>
                    <FaClock /> {video.duration}
                  </small>
                  <small>
                    <FaPlayCircle /> Watch
                  </small>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="arvr-workspace">
        <div className="smart-form-card">
          <div className="section-heading">
            <span>Training Setup</span>
            <h2>Choose Your AR/VR Learning Path</h2>
            <p>
              Select the training module, learning level, and language to create
              a personalized farming training plan.
            </p>
          </div>

          <div className="smart-form-grid">
            <div className="form-group">
              <label>Training Module</label>
              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
              >
                <option>Smart Irrigation</option>
                <option>Crop Disease Identification</option>
                <option>Organic Farming</option>
                <option>Drone Farming Basics</option>
                <option>Soil Health Management</option>
                <option>Farm Equipment Safety</option>
              </select>
            </div>

            <div className="form-group">
              <label>Learning Level</label>
              <select value={level} onChange={(e) => setLevel(e.target.value)}>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            <div className="form-group">
              <label>Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option>Hinglish</option>
                <option>Hindi</option>
                <option>English</option>
              </select>
            </div>

            <div className="form-group">
              <label>Training Duration</label>
              <select>
                <option>15 Minutes</option>
                <option>30 Minutes</option>
                <option>1 Hour</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button className="primary-btn" onClick={handleStartTraining}>
              Start AR/VR Training
            </button>
            <button className="light-btn">Reset</button>
          </div>
        </div>

        <div className="smart-result-card">
          <div className="section-heading">
            <span>Learning Output</span>
            <h2>Training Plan</h2>
            <p>Your selected AR/VR farming training details will appear here.</p>
          </div>

          {!showPlan ? (
            <div className="empty-result">
              <FaVrCardboard />
              <h3>No training started yet</h3>
              <p>
                Choose a module and click start training to generate your
                learning plan.
              </p>
            </div>
          ) : (
            <div className="result-content">
              <div className="score-circle">
                <strong>91%</strong>
                <span>Readiness</span>
              </div>

              <h3>{selectedModule} Training</h3>

              <p className="result-summary">
                Your {level} level training plan is ready in {language}. Watch
                the suggested videos, complete module tasks, and practice the
                steps in real field conditions.
              </p>

              <div className="metrics-grid">
                <div className="metric-card">
                  <span>Module</span>
                  <strong>{selectedModule}</strong>
                </div>
                <div className="metric-card">
                  <span>Level</span>
                  <strong>{level}</strong>
                </div>
                <div className="metric-card">
                  <span>Language</span>
                  <strong>{language}</strong>
                </div>
                <div className="metric-card">
                  <span>Certificate</span>
                  <strong>Available</strong>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="arvr-module-section">
        <div className="section-heading center">
          <span>Training Modules</span>
          <h2>Professional Farming Skill Modules</h2>
          <p>
            These modules make farmers ready for smart farming technologies,
            field safety, and crop management.
          </p>
        </div>

        <div className="smart-feature-grid">
          {modules.map((module, index) => {
            const Icon = module.icon;

            return (
              <div className="smart-feature-card" key={index}>
                <div className="feature-icon">
                  <Icon />
                </div>
                <h3>{module.title}</h3>
                <p>{module.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="treatment-plan">
        <div className="section-heading center">
          <span>How To Use AR/VR Farming Training</span>
          <h2>Simple Learning Process</h2>
          <p>
            Farmers can follow this step-by-step process to learn practical
            farming techniques with videos and virtual training.
          </p>
        </div>

        <div className="timeline-grid">
          <div className="timeline-card">
            <h3>Step 1</h3>
            <p>Select the farming topic you want to learn.</p>
          </div>

          <div className="timeline-card">
            <h3>Step 2</h3>
            <p>Watch the AR/VR or 360° training video carefully.</p>
          </div>

          <div className="timeline-card">
            <h3>Step 3</h3>
            <p>Understand the practical steps shown in the simulation.</p>
          </div>

          <div className="timeline-card">
            <h3>Step 4</h3>
            <p>Apply the method in your farm with expert guidance.</p>
          </div>
        </div>

        <div className="report-actions">
          <button className="primary-btn">
            <FaDownload /> Download Training Plan
          </button>
          <button className="secondary-btn">
            <FaHeadset /> Talk to Agronomist
          </button>
        </div>
      </section>
    </div>
  );
};

export default ARVRFarmingTraining;