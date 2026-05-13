import React from "react";
import AboutTemplate from "./AboutTemplate";
import { aboutPagesData } from "../../data/aboutPagesData";

const OurMissionPage = () => {
  return <AboutTemplate data={aboutPagesData.mission} />;
};

export default OurMissionPage;
