import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import Layout from './components/Layout'; // <-- Import the new Layout

function App() {
  return (
    <Routes>
      {/* The Layout component is now the parent route */}
      <Route path="/" element={<Layout />}>
        {/* These child routes will be rendered inside the Outlet */}
        <Route index element={<HomePage />} />
        <Route path="book-trial" element={<BookingPage />} />
      </Route>
    </Routes>
  );
}

export default App;