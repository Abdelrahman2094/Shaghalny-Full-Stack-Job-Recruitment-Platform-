import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import Header from './components/Header.jsx';
import Jobs from './pages/Jobs';
import Recruiters from './pages/Recruiters';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login';
import Footer from './components/Footer.jsx';
import SignUp from './pages/SignUp.jsx';
import ForgetPassword from './pages/forgetPassword.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import RecruitersPage from './components/RecruitersPage.jsx';
import ContactUs from './pages/ContactUs.jsx';
import AdminRoute from './components/AdminRoute';
import JobseekersPage from './pages/JobseekersPage.jsx';
import FAQ from './pages/FAQ.jsx';
import ProfileUser from './pages/Profilepage.jsx';
import ApplyPage from './pages/ApplyPage.jsx';
import ViewApplicantsPage from './pages/ViewApplicantsPage.jsx';
import ResetPassword from './pages/ResetPassword.jsx';

function App() {
  return (
    <BrowserRouter>
      <MainContent />
    </BrowserRouter>
  );
}

function MainContent() {
  const location = useLocation(); // Get current route

  // Define paths where the header should NOT be displayed
  const hideHeaderRoutes = ['/AdminDashboard'];

  return (
    <>
      {/* Show Header only if the current route is NOT in hideHeaderRoutes */}
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Jobs" element={<Jobs />} />
        <Route path="/Recruiters" element={<Recruiters />} />
        <Route path="/JobseekersPage" element={<JobseekersPage />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/RecruitersPage" element={<RecruitersPage />} />
        <Route path="/Profilepage" element={<ProfileUser />} />
        <Route path="/apply/:id" element={<ApplyPage />} />
        <Route path="/applicants/:id" element={<ViewApplicantsPage />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* ✅ Protected Admin Dashboard route */}
        <Route
          path="/AdminDashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>

      <hr className="w-full h-[1px] bg-gray-300 border-none my-4" />
      <Footer />
    </>
  );
}

export default App;