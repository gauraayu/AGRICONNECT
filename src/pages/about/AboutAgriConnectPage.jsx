import React from "react";
import AboutTemplate from "./AboutTemplate";
import { aboutPagesData } from "../../data/aboutPagesData";

const AboutAgriConnectPage = () => {
  return <AboutTemplate data={aboutPagesData.about} />;
};

export default AboutAgriConnectPage;
