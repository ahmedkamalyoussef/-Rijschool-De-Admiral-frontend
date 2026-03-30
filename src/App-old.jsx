import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import WelcomeFeatures from './components/WelcomeFeatures';
import AboutUs from './components/AboutUs';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './styles/globals.css';

function App() {
  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container scroll-smooth">
      <Navigation />
      <Hero />
      <WelcomeFeatures />
      <AboutUs />
      <Pricing />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
