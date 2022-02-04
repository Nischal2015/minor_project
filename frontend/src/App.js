// import styles from "./App.module.scss";
import React from "react";

import Navbar from "./components/Navigation/Navbar";

// Routing pages
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Entry/Login";
import Profile from "./pages/Profile/Profile";
import Talent from "./pages/Talent/Talent";
import Work from "./pages/Work/Work";

import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/talent' element={<Talent />} />
        <Route path='/jobs' element={<Work />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
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
