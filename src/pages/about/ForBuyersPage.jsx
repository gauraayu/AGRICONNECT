import React from "react";
import AboutTemplate from "./AboutTemplate";
import { aboutPagesData } from "../../data/aboutPagesData";

const ForBuyersPage = () => {
  return <AboutTemplate data={aboutPagesData.buyers} />;
};

export default ForBuyersPage;
