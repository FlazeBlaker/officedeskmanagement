import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Imports from both versions are combined here
import Layout from './components/Layout';
import DigitalAurora from './components/DigitalAurora';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import './index.css';

function App() {
  // Using the superior react-router-dom setup
  return (
    <>
      {/* The background is placed here to apply to all pages */}
      <DigitalAurora />
      
      <Routes>
        {/* The Layout component provides the Navbar and Footer for all nested pages */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="book-trial" element={<BookingPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;