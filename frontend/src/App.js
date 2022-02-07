// import styles from "./App.module.scss";
import React from "react";

import Navbar from "./components/Navigation/Navbar";

// Routing pages
import About from "./pages/About/About";
import Bidding from "./pages/Bidding/Bidding";
import Footer from "./components/Footer/Footer";
import Jobs from "./pages/Jobs/Jobs";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Entry/Login";
import Profile from "./pages/Profile/Profile";
import Talent from "./pages/Talent/Talent";

import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <React.Fragment>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='about' element={<About />} />
        <Route path='jobs/:id' element={<Bidding />} />
        <Route path='jobs' element={<Jobs />} />
        <Route path='login' element={<Login />} />
        <Route path='talent/:id' element={<Profile />} />
        <Route path='talent' element={<Talent />} />
        <Route path='*' element={<div>Not is the found</div>} />
      </Routes>
      <Footer />
    </React.Fragment>
  );
};

// Done using consise body
// const App = () => (
//   <Container>
//     <Login />
//   </Container>
// );

export default App;
