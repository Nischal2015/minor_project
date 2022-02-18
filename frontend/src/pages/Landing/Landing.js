import React from "react";

import HeroSection from "./HeroSection";
import PopularSection from "./PopularSection";
import AboutSection from "./AboutSection";

const Landing = () => {
  return (
    <React.Fragment>
      {/* Hero Section */}
      <HeroSection />

      {/* Categories Section */}
      <PopularSection />

      {/* About us Section */}
      <AboutSection />
    </React.Fragment>
  );
};

export default Landing;
