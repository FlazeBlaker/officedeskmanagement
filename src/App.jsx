import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import DigitalAurora from './components/DigitalAurora';
import MathBackground from './components/MathBackground'; // <-- 1. Import the new component
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProfilePage from './pages/ProfilePage';
import './index.css';

function App() {
    return (
        <>
            {/* Backgrounds are placed here to persist across all pages */}
            <DigitalAurora />
            <MathBackground /> {/* <-- 2. Add the component here */}

            <Routes>
                {/* Routes with Navbar and Footer */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="book-trial" element={<BookingPage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                </Route>

                {/* Auth routes without Navbar and Footer */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            </Routes>
        </>
    );
}

export default App;