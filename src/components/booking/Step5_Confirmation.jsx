import React from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

function CheckmarkIcon() {
  return (
    <motion.svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
      <motion.circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"
        initial={{ strokeDashoffset: 166 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <motion.path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, ease: "easeOut", delay: 0.5 }}
      />
    </motion.svg>
  )
}

function Step5_Confirmation({ details }) {
  const { width, height } = useWindowSize();
  const qrValue = JSON.stringify({ name: details.name, desk: details.desk?.id, date: details.date });

  return (
    <motion.div
      className="booking-step confirmation"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
    >
      <Confetti width={width} height={height} numberOfPieces={200} recycle={false} />
      <CheckmarkIcon />
      <motion.h1 className="step-title" initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay: 0.8}}>You're all set, {details.name || 'Guest'}!</motion.h1>
      <motion.p className="step-subtitle" initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay: 0.9}}>Get ready for a productive day. Your QR code has been sent to {details.email || 'your email'}.</motion.p>
      
      <motion.div className="confirmation-card" initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay: 1.0}}>
        <div className="qr-code-wrapper">
            <QRCodeSVG value={qrValue} size={180} imageSettings={{ src: "/vite.svg", height: 35, width: 35, excavate: true }}/>
        </div>
        <div className="booking-summary">
          <h3>Booking Summary</h3>
          <p><strong>Date:</strong> {details.date || 'Not Selected'}</p>
          <p><strong>Your Spot:</strong> {details.desk?.zone || 'Not Selected'} ({details.desk?.id})</p>
          <p><strong>Location:</strong> Co.Work, Pune, Maharashtra</p>
          <p className="scan-instruction">Scan this at the entrance upon arrival.</p>
        </div>
      </motion.div>
      
      <motion.div className="calendar-buttons" initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay: 1.1}}>
          <a href="#" className="btn btn-secondary">Add to Google Calendar</a>
      </motion.div>
    </motion.div>
  );
}

export default Step5_Confirmation;