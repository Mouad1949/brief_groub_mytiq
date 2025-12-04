import React from 'react';
import HeroSection from '../components/HeroSection';
import EventsGrid from '../components/EventsGrid';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <EventsGrid />
      <div className="mt-auto"> {/* Pousse le footer en bas */}
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;