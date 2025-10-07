import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('authToken')); // 👈 1. ADD THIS LINE

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            try {
                const decodedUser = jwtDecode(storedToken);
                const currentTime = Date.now() / 1000;
                if (decodedUser.exp > currentTime) {
                    setUser(decodedUser);
                    setToken(storedToken); // 👈 2. ADD THIS LINE
                } else {
                    localStorage.removeItem('authToken');
                }
            } catch (error) {
                console.error("Invalid token found in localStorage:", error);
                localStorage.removeItem('authToken');
            }
        }
    }, []);

    const login = (newToken) => { // 👈 3. RENAME "token" to "newToken" here
        localStorage.setItem('authToken', newToken);
        const decodedUser = jwtDecode(newToken);
        setUser(decodedUser);
        setToken(newToken); // 👈 4. ADD THIS LINE
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
        setToken(null); // 👈 5. ADD THIS LINE
    };

    return (
        // 👇 6. ADD 'token' to the value object
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};