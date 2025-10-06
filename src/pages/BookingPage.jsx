import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios'; // --- 1. IMPORT AXIOS ---

import Step1_Date from '../components/booking/Step1_Date';
import Step2_ResourceType from '../components/booking/Step2_ResourceType';
import Step3_Map from '../components/booking/Step3_Map';
import Step4_Details from '../components/booking/Step4_Details';
import Step5_Confirmation from '../components/booking/Step5_Confirmation';
import './BookingPage.css';

function BookingPage() {
  const [step, setStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({
    date: null, resourceType: null, desk: null, name: '', email: ''
  });

  const handleNextStep = (data) => {
    setBookingDetails(prev => ({ ...prev, ...data }));
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  // --- 2. ADD THE API SUBMISSION FUNCTION ---
  const handleConfirmBooking = async (finalUserDetails) => {
    const fullBookingData = { ...bookingDetails, ...finalUserDetails };
    
    // Format the data to match what your backend API expects
    const apiPayload = {
      resourceId: fullBookingData.desk.id,
      date: fullBookingData.date,
      name: fullBookingData.name,
      email: fullBookingData.email,
    };

    try {
      // Send the data to your backend endpoint
      const response = await axios.post('http://localhost:3001/api/bookings', apiPayload);

      if (response.status === 201) {
        console.log('Booking confirmed!', response.data);
        // On success, update the state and move to the final confirmation screen
        setBookingDetails(fullBookingData);
        setStep(5);
      }
    } catch (error) {
      console.error('Booking failed:', error.response ? error.response.data : error.message);
      alert('Sorry, there was a problem confirming your booking. Please try again.');
    }
  };


  const renderStep = () => {
    const key = `step-${step}`;
    switch (step) {
      case 1: 
        return <Step1_Date key={key} onNext={handleNextStep} />;
      case 2: 
        return <Step2_ResourceType key={key} onNext={handleNextStep} onPrev={handlePrevStep} />;
      case 3: 
        return <Step3_Map key={key} onNext={handleNextStep} onPrev={handlePrevStep} bookingDetails={bookingDetails} />;
      case 4: 
        // --- 3. UPDATE STEP 4 TO USE THE NEW FUNCTION ---
        return <Step4_Details key={key} onConfirm={handleConfirmBooking} onPrev={handlePrevStep} />;
      case 5: 
        return <Step5_Confirmation key={key} details={bookingDetails} />;
      default: 
        return <Step1_Date key={key} onNext={handleNextStep} />;
    }
  };

  const progress = (step / 5) * 100;

  return (
    <div className="booking-container">
      {step < 5 && (
        <motion.div className="progress-bar-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.div className="progress-bar" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.5, ease: "easeInOut" }}></motion.div>
        </motion.div>
      )}
      <AnimatePresence mode="wait">
        {renderStep()}
      </AnimatePresence>
    </div>
  );
}

export default BookingPage;