import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check for a token in localStorage when the app loads
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                // Optional but recommended: Check if the token is expired
                const currentTime = Date.now() / 1000;
                if (decodedUser.exp > currentTime) {
                    setUser(decodedUser);
                } else {
                    // Token is expired, so remove it
                    localStorage.removeItem('authToken');
                }
            } catch (error) {
                // If token is invalid for any reason, remove it
                console.error("Invalid token found in localStorage:", error);
                localStorage.removeItem('authToken');
            }
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('authToken', token);
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};