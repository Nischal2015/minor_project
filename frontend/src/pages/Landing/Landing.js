import React, { lazy } from "react";

const HeroSection = lazy(() => import("./HeroSection"));
const PopularSection = lazy(() => import("./PopularSection"));
const AboutSection = lazy(() => import("./AboutSection"));

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
