import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './PaymentPage.css';

function PaymentPage() {
    const location = useLocation();
    const { planName, planPrice } = location.state || { planName: 'Selected Plan', planPrice: 'N/A' };

    const [cardDetails, setCardDetails] = useState({
        number: '',
        name: '',
        expiry: '',
        cvc: ''
    });
    const [isFlipped, setIsFlipped] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === 'number') {
            formattedValue = value.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim();
        }
        if (name === 'expiry') {
            if (value.length > 5) return;
            formattedValue = value.replace(/[^\d]/g, '').replace(/(.{2})/, '$1/').slice(0, 5);
        }
        if (name === 'cvc') {
            formattedValue = value.replace(/[^\d]/g, '').slice(0, 4);
        }

        setCardDetails(prev => ({ ...prev, [name]: formattedValue }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
        }, 2000);
    };

    if (isSuccess) {
        return (
            <div className="payment-container">
                <div className="payment-success-card">
                    <div className="success-checkmark">✓</div>
                    <h2>Payment Successful!</h2>
                    <p>Your {planName} plan is now active. Welcome to Co.Work!</p>
                    <Link to="/" className="btn btn-primary">Back to Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="payment-container">
            <div className="payment-layout">
                {/* --- Interactive card is unchanged --- */}
                <div className="card-scene">
                    <div className={`credit-card ${isFlipped ? 'flipped' : ''}`}>
                        <div className="card-face card-front">
                            <div className="card-chip"></div>
                            <div className="card-logo"><img src="/logo.png" alt="logo" /></div>
                            <div className="card-number">{cardDetails.number || '#### #### #### ####'}</div>
                            <div className="card-footer">
                                <div className="card-holder">
                                    <span>Card Holder</span>
                                    <strong>{cardDetails.name.toUpperCase() || 'YOUR NAME'}</strong>
                                </div>
                                <div className="card-expiry">
                                    <span>Expires</span>
                                    <strong>{cardDetails.expiry || 'MM/YY'}</strong>
                                </div>
                            </div>
                        </div>
                        <div className="card-face card-back">
                            <div className="card-strip"></div>
                            <div className="card-cvc-box">
                                <span>CVC</span>
                                <div className="cvc-display">{cardDetails.cvc}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="payment-form-container">
                    <div className="payment-header">
                        <h2>Complete Your Purchase</h2>
                        <p>You are purchasing the <strong>{planName}</strong> plan.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="payment-form">
                        <div className="form-group">
                            <input
                                type="tel"
                                name="number"
                                value={cardDetails.number}
                                onChange={handleChange}
                                maxLength="19"
                                placeholder="Card Number"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                value={cardDetails.name}
                                onChange={handleChange}
                                placeholder="Cardholder Name"
                                required
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="expiry"
                                    value={cardDetails.expiry}
                                    onChange={handleChange}
                                    maxLength="5"
                                    placeholder="Expiry Date (MM/YY)"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="tel"
                                    name="cvc"
                                    value={cardDetails.cvc}
                                    onChange={handleChange}
                                    maxLength="4"
                                    placeholder="CVC"
                                    required
                                    onFocus={() => setIsFlipped(true)}
                                    onBlur={() => setIsFlipped(false)}
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-full" disabled={isProcessing}>
                            {isProcessing ? 'Processing...' : `Pay ${planPrice}`}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PaymentPage;