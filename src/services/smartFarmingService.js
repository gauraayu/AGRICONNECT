// src/services/smartFarmingService.js

export const analyzeSmartFeature = async (featureType, formData = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = {
        satellite: {
          title: "Satellite Field Health Report",
          score: "82%",
          status: "Good",
          risk: "Low",
          summary:
            "Your field shows strong vegetation activity. A small section may need irrigation improvement.",
          metrics: [
            { label: "Vegetation Score", value: "82%" },
            { label: "Water Stress", value: "Low" },
            { label: "Risk Zone", value: "14%" },
            { label: "Crop Growth", value: "Healthy" },
          ],
          recommendations: [
            "Monitor the southern section of the field.",
            "Improve irrigation in low-moisture areas.",
            "Check crop color variation weekly.",
            "Use satellite monitoring every 7 days.",
          ],
        },

        drone: {
          title: "Drone & Rover Inspection Report",
          score: "76%",
          status: "Moderate",
          risk: "Medium",
          summary:
            "The crop field is mostly healthy, but some areas show uneven growth and mild stress.",
          metrics: [
            { label: "Crop Stress", value: "Moderate" },
            { label: "Pest Risk", value: "Low" },
            { label: "Soil Moisture", value: "Normal" },
            { label: "Damaged Area", value: "8%" },
          ],
          recommendations: [
            "Recheck affected patch after 3 days.",
            "Use drone image comparison weekly.",
            "Inspect lower leaves through rover monitoring.",
            "Balance irrigation in uneven growth zones.",
          ],
        },

        yield: {
          title: "ML Yield Prediction Report",
          score: "88%",
          status: "High Yield Potential",
          risk: "Low",
          summary:
            "Based on farm conditions, the crop has good yield potential with proper irrigation and fertilizer balance.",
          metrics: [
            { label: "Yield / Acre", value: "24 qtl" },
            { label: "Total Production", value: "96 qtl" },
            { label: "Confidence", value: "88%" },
            { label: "Yield Category", value: "High" },
          ],
          recommendations: [
            "Maintain balanced fertilizer use.",
            "Monitor pest attack during flowering stage.",
            "Follow proper irrigation schedule.",
            "Use soil testing before next crop cycle.",
          ],
        },

        arvr: {
          title: "AR/VR Training Progress",
          score: "91%",
          status: "Ready to Learn",
          risk: "No Risk",
          summary:
            "Interactive training modules are available for irrigation, crop disease, drone farming, and soil health.",
          metrics: [
            { label: "Modules", value: "6" },
            { label: "Difficulty", value: "Beginner" },
            { label: "Training Mode", value: "AR/VR" },
            { label: "Certificate", value: "Available" },
          ],
          recommendations: [
            "Start with Smart Irrigation Training.",
            "Complete Crop Disease Identification module.",
            "Practice Drone Farming Basics.",
            "Take final quiz for certificate.",
          ],
        },

        irrigation: {
          title: "Smart Irrigation Advisory",
          score: "72%",
          status: "Irrigation Needed",
          risk: "Medium",
          summary:
            "Your crop requires moderate irrigation. Water early morning to reduce evaporation loss.",
          metrics: [
            { label: "Soil Moisture", value: "42%" },
            { label: "Water Need", value: "Medium" },
            { label: "Next Irrigation", value: "Tomorrow" },
            { label: "Rainfall Chance", value: "Low" },
          ],
          recommendations: [
            "Irrigate before 9 AM.",
            "Avoid afternoon watering.",
            "Use root-zone irrigation.",
            "Check moisture again after 24 hours.",
          ],
        },

        market: {
          title: "Market Demand Prediction",
          score: "84%",
          status: "Demand Increasing",
          risk: "Medium",
          summary:
            "Market demand appears to be increasing. Farmers with storage can wait for better prices.",
          metrics: [
            { label: "Current Price", value: "₹2100/qtl" },
            { label: "7 Days Price", value: "₹2180/qtl" },
            { label: "15 Days Price", value: "₹2250/qtl" },
            { label: "Best Time", value: "10-15 Days" },
          ],
          recommendations: [
            "Hold crop if safe storage is available.",
            "Sell early if crop quality may reduce.",
            "Compare nearby mandi prices.",
            "Buyers should purchase before price rises.",
          ],
        },
      };

      resolve(results[featureType]);
    }, 1800);
  });
};