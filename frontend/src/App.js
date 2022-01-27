// import styles from "./App.module.scss";
import React from "react";
import Landing from "./pages/Landing/Landing";
import Navbar from "./components/Navigation/Navbar";
import Login from "./pages/Entry/Login";
import Work from "./pages/Work/Work";
import Talent from "./pages/Talent/Talent";

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
