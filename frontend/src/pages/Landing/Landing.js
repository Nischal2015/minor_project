import React from "react";

import HeroSection from "./HeroSection";
import PopularSection from "./PopularSection";
import AboutSection from "./AboutSection";

const Landing = () => {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Categories Section */}
      <PopularSection />

      {/* About us Section */}
      <AboutSection />
    </>
  );
};

export default Landing;
