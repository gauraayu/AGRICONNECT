import React from "react";
import AboutTemplate from "./AboutTemplate";
import { aboutPagesData } from "../../data/aboutPagesData";

const ForFarmersPage = () => {
  return <AboutTemplate data={aboutPagesData.farmers} />;
};

export default ForFarmersPage;
