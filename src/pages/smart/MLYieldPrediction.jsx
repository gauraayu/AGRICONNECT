import React from "react";
import SmartFeaturePage from "./SmartFeaturePage";
import { smartPagesData } from "../../data/smartPagesData";

const MLYieldPrediction = () => {
  return <SmartFeaturePage pageData={smartPagesData.yield} />;
};

export default MLYieldPrediction;