import React from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

// Checkmark Icon (unchanged)
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

// --- NEW SVG ICONS ---
const CalendarIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
const DeskIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7V19C4 19.5304 4.21071 20.0391 4.58579 20.4142C4.96086 20.7893 5.46957 21 6 21H18C18.5304 21 19.0391 20.7893 19.4142 20.4142C19.7893 20.0391 20 19.5304 20 19V7" /><path d="M20 7H4L12 3L20 7Z" /><path d="M12 7V13" /><path d="M8 13H16" /></svg>;
const LocationIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;


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
            <motion.h1 className="step-title" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }}>You're all set, {details.name || 'Guest'}!</motion.h1>
            <motion.p className="step-subtitle" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.9 }}>Your day pass has been sent to {details.email || 'your email'}. Scan the QR code upon arrival.</motion.p>

            {/* --- NEW TICKET DESIGN --- */}
            <motion.div className="ticket-card" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.0 }}>
                <div className="ticket-header">
                    <h4>Your Day Pass</h4>
                    <div className="ticket-logo">Co.Work</div>
                </div>
                <div className="ticket-body">
                    <div className="ticket-details">
                        <div className="detail-item">
                            <div className="detail-icon"><CalendarIcon /></div>
                            <div className="detail-text"><span>Date</span><strong>{details.date || 'Not Selected'}</strong></div>
                        </div>
                        <div className="detail-item">
                            <div className="detail-icon"><DeskIcon /></div>
                            <div className="detail-text"><span>Workspace</span><strong>{details.desk?.zone || 'Not Selected'} ({details.desk?.id})</strong></div>
                        </div>
                        <div className="detail-item">
                            <div className="detail-icon"><LocationIcon /></div>
                            <div className="detail-text"><span>Location</span><strong>Co.Work, Pune, Maharashtra</strong></div>
                        </div>
                    </div>
                    <div className="ticket-qr">
                        <div className="qr-code-wrapper">
                            <QRCodeSVG value={qrValue} size={150} imageSettings={{ src: "/logo.png", height: 25, width: 25, excavate: true }} />
                        </div>
                        <p>Scan at entrance</p>
                    </div>
                </div>
            </motion.div>

            <motion.div className="calendar-buttons" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.1 }}>
                <a href="#" className="btn btn-secondary">Add to Google Calendar</a>
            </motion.div>
        </motion.div>
    );
}

export default Step5_Confirmation;