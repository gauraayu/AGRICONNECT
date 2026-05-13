import React from "react";
import SmartFeaturePage from "./SmartFeaturePage";
import { smartPagesData } from "../../data/smartPagesData";

const DroneLandRoverMonitor = () => {
  return <SmartFeaturePage pageData={smartPagesData.drone} />;
};

export default DroneLandRoverMonitor;