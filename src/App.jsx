import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DigitalAurora from './components/DigitalAurora';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage'; // Import the new Contact Page
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <>
      <DigitalAurora />
      <Navbar setPage={setCurrentPage} />
      
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'contact' && <ContactPage />} {/* Add the new condition */}
      
      <Footer />
    </>
  );
}

export default App;