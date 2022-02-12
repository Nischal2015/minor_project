// import styles from "./App.module.scss";
import React, { Suspense, lazy } from "react";

import LoadingSpinner from "./components/UI/Loading/LoadingSpinner";
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
const Signup = lazy(() => import("./pages/Entry/Signup"));
const Talent = lazy(() => import("./pages/Talent/Talent"));
const UserDetails = lazy(() => import("./pages/Entry/Username"));

const App = () => {
  return (
    <React.Fragment>
      <Suspense fallback={<LoadingSpinner />}>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='loading' element={<LoadingSpinner />} />
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
          <Route path='signup' element={<Outlet />}>
            <Route index element={<Signup />} />
            <Route path='username' element={<UserDetails />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </Suspense>
    </React.Fragment>
  );
};

export default App;
