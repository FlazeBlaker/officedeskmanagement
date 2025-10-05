import React, { useState, useEffect } from 'react';
import './MathBackground.css';

function MathBackground() {
    const symbols = [
        '+', '−', '×', '÷', 'Σ', 'π', '∞', '∫', '√', 'ƒ', '≈', '≠', '≤', '≥', '∇', '∂', 'α', 'β',
        'γ', 'δ', 'λ', 'μ', 'θ', 'ω', 'φ', 'η', 'ξ', 'ψ', 'ζ', 'Δ', 'ℵ', 'ℇ', 'ℜ', '℘', '∅', '∈',
        '∩', '∪', '∀', '∃'
    ];

    // Array of the animation names from our CSS file
    const animationNames = ['shake1', 'shake2', 'shake3', 'shake4'];

    const [symbolData, setSymbolData] = useState([]);

    useEffect(() => {
        const generateRandomSymbols = () => {
            return symbols.map((symbol) => {
                const style = {
                    top: `${Math.random() * 100}vh`,
                    left: `${Math.random() * 100}vw`,
                    fontSize: `${Math.random() * 2 + 1.5}vmin`,
                    // Apply a randomly selected animation name
                    animationName: animationNames[Math.floor(Math.random() * animationNames.length)],
                    animationDuration: `${Math.random() * 15 + 10}s`, // Durations between 10s and 25s
                    animationDelay: `-${Math.random() * 10}s`,
                };
                return { symbol, style };
            });
        };
        setSymbolData(generateRandomSymbols());
    }, []);

    return (
        <div className="math-background">
            {symbolData.map((data, index) => (
                <span key={index} className="math-symbol" style={data.style}>
                    {data.symbol}
                </span>
            ))}
        </div>
    );
}

export default MathBackground;