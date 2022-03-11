// import styles from "./App.module.scss";
import React, { Suspense, lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuthenticated, loadUser } from "./store/auth-actions";

import LoadingSpinner from "./components/UI/Loading/LoadingSpinner";
import Navbar from "./components/Navigation/Navbar";
import Footer from "./components/Footer/Footer";
import { Routes, Route, Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Room from "./pages/Message/Room";
import Inbox from "./pages/Message/Inbox";

// Routing pages
const About = lazy(() => import("./pages/About/About"));
const ActivateUser = lazy(() => import("./pages/Entry/ActivateUser"));
const Bidding = lazy(() => import("./pages/Bidding/Bidding"));
const Jobs = lazy(() => import("./pages/Jobs/Jobs"));
const Landing = lazy(() => import("./pages/Landing/Landing"));
const Login = lazy(() => import("./pages/Entry/Login"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Signup = lazy(() => import("./pages/Entry/Signup"));
const Talent = lazy(() => import("./pages/Talent/Talent"));
const PasswordReset = lazy(() => import("./pages/Entry/PasswordReset"));
const ResetPasswordConfirm = lazy(() =>
  import("./pages/Entry/ResetPasswordConfirm")
);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthenticated());
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Suspense fallback={<LoadingSpinner />}>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="loading" element={<LoadingSpinner />} />
          <Route path="about" element={<About />} />
          <Route path="jobs" element={<Outlet />}>
            <Route index element={<Jobs />} />
            <Route path=":id" element={<Bidding />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="room" element={<Room />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="talent" element={<Outlet />}>
            <Route index element={<Talent />} />
            <Route path=":id" element={<Profile />} />
          </Route>
          <Route path="signup" element={<Outlet />}>
            <Route index element={<Signup />} />
          </Route>
          <Route path="reset-password" element={<PasswordReset />} />
          <Route path="activate/:uid/:token" element={<ActivateUser />} />
          <Route
            path="password/reset/confirm/:uid/:token"
            element={<ResetPasswordConfirm />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Suspense>
    </React.Fragment>
  );
};

export default App;
