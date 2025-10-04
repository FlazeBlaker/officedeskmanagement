import React, { useState, useEffect, useRef } from 'react';
import './ContactPage.css';

// Custom hook to detect when an element is on screen
const useOnScreen = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, [ref, options]);

  return [ref, isVisible];
};

function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null); // null, 'success', or 'error'
  
  const formRef = useRef(null);
  const [gridRef, gridIsVisible] = useOnScreen({ threshold: 0.1, triggerOnce: true });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate a network request
    setTimeout(() => {
      // For demonstration, we'll assume success.
      setSubmissionResult('success');
      setIsSubmitting(false);
    }, 2000);
  };

  // Effect for the magnetic button
  useEffect(() => {
    const button = formRef.current?.querySelector('.btn-primary');
    if (!button) return;
    
    const handleMouseMove = (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        button.style.setProperty('--x', `${x}px`);
        button.style.setProperty('--y', `${y}px`);
    };

    button.addEventListener('mousemove', handleMouseMove);
    return () => button.removeEventListener('mousemove', handleMouseMove);
  }, [submissionResult]); // Re-bind event listener if form re-renders


  return (
    <main className="contact-page">
      <header className="contact-header">
        <h1 className="contact-title">Let's Connect</h1>
        <p className="contact-subtitle">
          Have a question, a proposal, or just want to say hello? We’re here to listen.
        </p>
      </header>

      <div ref={gridRef} className={`contact-grid ${gridIsVisible ? 'is-visible' : ''}`}>
        <div className="contact-info-panel">
          <div className="info-card">
            <h3>Our Location</h3>
            <p>123 Innovation Drive, Tech Park, Pune, Maharashtra - 411001</p>
          </div>
          <div className="info-card">
            <h3>Email Us</h3>
            <p><a href="mailto:connect@cowork.com">connect@cowork.com</a></p>
          </div>
          <div className="info-card">
            <h3>Call Us</h3>
            <p><a href="tel:+911234567890">+91 123 456 7890</a></p>
          </div>
          <div className="map-container">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.951543883017!2d73.90412921535456!3d18.53100187363435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c126488b49e3%3A0x941a37c35e5b562a!2sKoregaon%20Park%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1671092500000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Co.Work Location">
            </iframe>
          </div>
        </div>

        <div className="contact-form-panel">
          {submissionResult === 'success' ? (
            <div className="success-message">
              <div className="success-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
              <h3>Message Sent</h3>
              <p>Thank you for reaching out. We'll get back to you shortly.</p>
            </div>
          ) : (
            <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
              <h2>Send a Message</h2>
              <div className="form-group">
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder=" " />
                <label htmlFor="name">Full Name</label>
              </div>
              <div className="form-group">
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder=" " />
                <label htmlFor="email">Email Address</label>
              </div>
              <div className="form-group">
                <select id="subject" name="subject" value={formData.subject} onChange={handleChange}>
                  <option>General Inquiry</option>
                  <option>Partnership Proposal</option>
                  <option>Tour Request</option>
                  <option>Feedback</option>
                </select>
              </div>
              <div className="form-group">
                <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required placeholder=" "></textarea>
                <label htmlFor="message">Your Message</label>
              </div>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}

export default ContactPage;