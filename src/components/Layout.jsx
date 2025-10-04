import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout() {
  return (
    <>
      <Navbar />
      <main>
        {/* The Outlet component renders the current page's content */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;