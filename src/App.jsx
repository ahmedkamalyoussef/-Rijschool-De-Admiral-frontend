import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import WelcomeFeatures from './components/WelcomeFeatures';
import AboutUs from './components/AboutUs';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import SocialMediaQR from './components/SocialMediaQR';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Messages from './components/Messages';
import Packages from './components/Packages';
import Posts from './components/Posts';
import Profile from './components/Profile';
import './main.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#22c55e',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        <Routes>
          {/* Admin Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/messages" element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          } />
          <Route path="/admin/packages" element={
            <ProtectedRoute>
              <Packages />
            </ProtectedRoute>
          } />
          <Route path="/admin/posts" element={
            <ProtectedRoute>
              <Posts />
            </ProtectedRoute>
          } />
          <Route path="/admin/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          
          {/* Public Routes */}
          <Route path="/" element={
            <div className="bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container">
              <Navigation />
              <Hero />
              <WelcomeFeatures />
              <AboutUs />
              <Pricing />
              <Testimonials />
              <SocialMediaQR />
              <Contact />
              <Footer />
            </div>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
