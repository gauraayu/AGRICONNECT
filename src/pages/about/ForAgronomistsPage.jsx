import React from "react";
import AboutTemplate from "./AboutTemplate";
import { aboutPagesData } from "../../data/aboutPagesData";

const ForAgronomistsPage = () => {
  return <AboutTemplate data={aboutPagesData.agronomists} />;
};

export default ForAgronomistsPage;
