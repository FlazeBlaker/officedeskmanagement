import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';
// No longer importing ParticlesBackground

function HomePage() {
  return (
    <>
      {/* No longer rendering ParticlesBackground */}
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}

export default HomePage;