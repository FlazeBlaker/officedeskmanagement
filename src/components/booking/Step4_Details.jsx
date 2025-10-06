import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Change 'onNext' to 'onConfirm' here 👇
function Step4_Details({ onConfirm, onPrev }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const isFormValid = name.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <motion.div
      className="booking-step split-layout"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <div className="step-content">
        <motion.h1 className="step-title" initial={{y:-20, opacity:0}} animate={{y:0, opacity:1}}>Almost there!</motion.h1>
        <motion.p className="step-subtitle" initial={{y:-20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay: 0.1}}>Just a few details to lock in your free spot.</motion.p>

        {/* And change 'onNext' to 'onConfirm' in the form submission handler here 👇 */}
        <motion.form className="details-form" onSubmit={(e) => { e.preventDefault(); onConfirm({ name, email }); }} initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 0.2}}>
          <div className="form-group">
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            <label htmlFor="name">What should we call you?</label>
          </div>
          <div className="form-group">
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label htmlFor="email">Where should we send your QR code?</label>
          </div>
          
          <div className="step-actions">
            <button className="btn btn-back" onClick={onPrev} type="button">Back</button>
            <button type="submit" className="btn btn-primary" disabled={!isFormValid}>Confirm Booking</button>
          </div>
        </motion.form>
      </div>
      <motion.div 
        className="step-image-container details-image"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      ></motion.div>
    </motion.div>
  );
}

export default Step4_Details;