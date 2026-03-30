import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import WelcomeFeatures from './components/WelcomeFeatures';
import AboutUs from './components/AboutUs';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Dashboard from './components/Dashboard';
import Messages from './components/Messages';
import Packages from './components/Packages';
import Posts from './components/Posts';
import Profile from './components/Profile';
import './main.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin/reset-password" element={<ResetPassword />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/messages" element={<Messages />} />
        <Route path="/admin/packages" element={<Packages />} />
        <Route path="/admin/posts" element={<Posts />} />
        <Route path="/admin/profile" element={<Profile />} />
        
        {/* Public Routes */}
        <Route path="/" element={
          <div className="bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container">
            <Navigation />
            <Hero />
            <WelcomeFeatures />
            <AboutUs />
            <Pricing />
            <Testimonials />
            <Contact />
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
