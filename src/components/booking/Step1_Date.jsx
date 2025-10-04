import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 }
  },
  exit: { opacity: 0 }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
};

function Step1_Date({ onNext }) {
  const [date, setDate] = useState(null);

  const handleNext = () => {
    onNext({ date: date.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) });
  };

  const minDate = new Date();

  return (
    <motion.div
      className="booking-step split-layout"
      variants={containerVariants} initial="hidden" animate="visible" exit="exit"
    >
      <div className="step-content">
        <motion.h1 variants={itemVariants} className="step-title">Let's Get Your Awesome Day Started.</motion.h1>
        <motion.p variants={itemVariants} className="step-subtitle">Your complimentary day pass is ready. Just pick a date.</motion.p>
        <motion.div variants={itemVariants} className="calendar-wrapper">
          <Calendar onChange={setDate} value={date} minDate={minDate} minDetail="month" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <button className="btn btn-primary" onClick={handleNext} disabled={!date}>
            Next: Choose Your Spot
          </button>
        </motion.div>
      </div>
      <motion.div 
        className="step-image-container date-image"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      ></motion.div>
    </motion.div>
  );
}

export default Step1_Date;