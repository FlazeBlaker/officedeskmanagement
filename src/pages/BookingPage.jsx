import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Step1_Date from '../components/booking/Step1_Date';
import Step2_ResourceType from '../components/booking/Step2_ResourceType';
import Step3_Map from '../components/booking/Step3_Map';
import Step4_Details from '../components/booking/Step4_Details';
import Step5_Confirmation from '../components/booking/Step5_Confirmation';
import './BookingPage.css';
import { motion } from 'framer-motion';

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

  const renderStep = () => {
    const key = `step-${step}`;
    switch (step) {
      case 1: return <Step1_Date key={key} onNext={handleNextStep} />;
      case 2: return <Step2_ResourceType key={key} onNext={handleNextStep} onPrev={handlePrevStep} />;
      case 3: return <Step3_Map key={key} onNext={handleNextStep} onPrev={handlePrevStep} bookingDetails={bookingDetails} />;
      case 4: return <Step4_Details key={key} onNext={handleNextStep} onPrev={handlePrevStep} />;
      case 5: return <Step5_Confirmation key={key} details={bookingDetails} />;
      default: return <Step1_Date key={key} onNext={handleNextStep} />;
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