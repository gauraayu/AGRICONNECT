import React from "react";
import SmartFeaturePage from "./SmartFeaturePage";
import { smartPagesData } from "../../data/smartPagesData";

const SatelliteCropMonitoring = () => {
  return <SmartFeaturePage pageData={smartPagesData.satellite} />;
};

export default SatelliteCropMonitoring;