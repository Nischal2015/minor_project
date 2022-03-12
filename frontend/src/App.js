// import styles from "./App.module.scss";
import React, { Suspense, lazy, useEffect } from "react";
import { checkAuthenticated, loadUser } from "./store/auth-actions";
import LoadingSpinner from "./components/UI/Loading/LoadingSpinner";
import Navbar from "./components/Navigation/Navbar";
import Footer from "./components/Footer/Footer";
import { Routes, Route, Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Alert from "./components/UI/Alert/Alert";

import { useSelector, useDispatch } from "react-redux";
import { alertActions } from "./store/alert-slice";
import RequireAuth from "./components/RequireAuth";

// Routing pages
const About = lazy(() => import("./pages/About/About"));
const ActivateUser = lazy(() => import("./pages/Entry/ActivateUser"));
const Bidding = lazy(() => import("./pages/Bidding/Bidding"));
const Jobs = lazy(() => import("./pages/Jobs/Jobs"));
const Landing = lazy(() => import("./pages/Landing/Landing"));
const Login = lazy(() => import("./pages/Entry/Login"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const Pagethree = lazy(() => import("./pages/UserProfile/Pagethree"));
const Pagefour = lazy(() => import("./pages/UserProfile/Pagefour"));
const PasswordReset = lazy(() => import("./pages/Entry/PasswordReset"));
const Payment = lazy(() => import("./pages/payment/payment"));
const PostJob = lazy(() => import("./pages/Entry/PostJob"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const ProfileDetails = lazy(() => import("./pages/UserProfile/ProfileDetails"));
const Signup = lazy(() => import("./pages/Entry/Signup"));
const Talent = lazy(() => import("./pages/Talent/Talent"));
const ResetPasswordConfirm = lazy(() =>
  import("./pages/Entry/ResetPasswordConfirm")
);
const UserBids = lazy(() => import("./pages/UserProfile/UserBids"));
const UserBidDetail = lazy(() => import("./pages/UserProfile/UserBidDetail"));
const UserJobPosts = lazy(() => import("./pages/UserProfile/UserJobPosts"));
const UserProfile = lazy(() => import("./pages/UserProfile/UserProfile"));

const App = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert.message);

  useEffect(() => {
    dispatch(checkAuthenticated());
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    let interval = setTimeout(() => {
      if (alert) {
        dispatch(alertActions.clear());
      }
    }, 6500);
    return () => clearTimeout(interval);
  }, [alert, dispatch]);

  return (
    <React.Fragment>
      <Suspense fallback={<LoadingSpinner />}>
        {/* <ScrollToTop /> */}
        <Navbar />
        {alert && <Alert />}
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='about' element={<About />} />
          <Route
            path='profile'
            element={
              <RequireAuth>
                <UserProfile />
              </RequireAuth>
            }
          >
            <Route index element={<UserBids />} />
            <Route path='bids' element={<UserBids />} />
            <Route path='job-posts' element={<UserJobPosts />} />
            <Route path='three' element={<Pagethree />} />
            <Route path='four' element={<Pagefour />} />
          </Route>
          <Route
            path='profile/edit'
            element={
              <RequireAuth>
                <ProfileDetails />
              </RequireAuth>
            }
          />

          <Route
            path='profile/job-posts/job-details/:id'
            element={
              <RequireAuth>
                <UserBidDetail />
              </RequireAuth>
            }
          />
          <Route path='jobs' element={<Outlet />}>
            <Route
              index
              element={
                <React.Fragment>
                  <ScrollToTop />
                  <Jobs />
                </React.Fragment>
              }
            />
            <Route
              path=':id'
              element={
                <RequireAuth>
                  <Bidding />
                </RequireAuth>
              }
            />
          </Route>
          <Route path='login' element={<Login />} />
          <Route path='talent' element={<Outlet />}>
            <Route
              index
              element={
                <React.Fragment>
                  <ScrollToTop />
                  <Talent />
                </React.Fragment>
              }
            />
            <Route
              path=':id'
              element={
                <RequireAuth>
                  <ScrollToTop />
                  <Profile />
                </RequireAuth>
              }
            />
          </Route>
          <Route
            path='postjob'
            element={
              <RequireAuth>
                <PostJob />
              </RequireAuth>
            }
          />
          <Route path='signup' element={<Outlet />}>
            <Route index element={<Signup />} />
          </Route>
          <Route path='reset-password' element={<PasswordReset />} />
          <Route path='activate/:uid/:token' element={<ActivateUser />} />
          <Route
            path='password/reset/confirm/:uid/:token'
            element={<ResetPasswordConfirm />}
          />
          <Route path='payment' element={<Payment />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </Suspense>
    </React.Fragment>
  );
};

export default App;
