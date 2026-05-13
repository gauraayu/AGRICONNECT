import React from "react";
import AboutTemplate from "./AboutTemplate";
import { aboutPagesData } from "../../data/aboutPagesData";

const HowItWorksPage = () => {
  return <AboutTemplate data={aboutPagesData.howItWorks} />;
};

export default HowItWorksPage;
