// import styles from "./App.module.scss";
import Landing from "./pages/Landing/Landing";
import Navbar from "./components/Navigation/Navbar";
import Login from "./pages/Entry/Login";

import { Routes, Route } from "react-router-dom";
import React from "react";

const App = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path='/' element={<Landing />} exact />
        <Route path='/login' element={<Login />} exact />
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

// import React, { useState } from "react";

// const App = () => {
//   const [count, setCount] = useState(0);

//   const decrementCountHandler = () => {
//     setCount((genius) => genius - 1);
//     setCount((prevCount) => prevCount - 1);
//   };

//   return (
//     <div>
//       <button onClick={decrementCountHandler}>-</button>
//       <span>{count}</span>
//       <button>+</button>
//     </div>
//   );
// };

// export default App;
