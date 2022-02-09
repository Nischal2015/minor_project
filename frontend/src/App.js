// import styles from "./App.module.scss";
import React, { Suspense, lazy } from "react";

import Navbar from "./components/Navigation/Navbar";
import { Routes, Route, Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

// Routing pages
const About = lazy(() => import("./pages/About/About"));
const Bidding = lazy(() => import("./pages/Bidding/Bidding"));
const Footer = lazy(() => import("./components/Footer/Footer"));
const Jobs = lazy(() => import("./pages/Jobs/Jobs"));
const Landing = lazy(() => import("./pages/Landing/Landing"));
const Login = lazy(() => import("./pages/Entry/Login"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Talent = lazy(() => import("./pages/Talent/Talent"));

const App = () => {
  return (
    <React.Fragment>
      <Suspense fallback={<div>Loading...</div>}>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='about' element={<About />} />
          <Route path='jobs' element={<Outlet />}>
            <Route index element={<Jobs />} />
            <Route path=':id' element={<Bidding />} />
          </Route>
          <Route path='login' element={<Login />} />
          <Route path='talent' element={<Outlet />}>
            <Route index element={<Talent />} />
            <Route path=':id' element={<Profile />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </Suspense>
    </React.Fragment>
  );
};

export default App;
