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
import NotFound from "./pages/NotFound/NotFound";
import Profile from "./pages/Profile/Profile";
import Talent from "./pages/Talent/Talent";

import { Routes, Route, Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <React.Fragment>
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
