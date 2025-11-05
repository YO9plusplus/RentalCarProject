import React from 'react';
// 1. Import the <Link> component
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* 2. Make your logo a Link to the homepage */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              RENTAL
            </h1>
          </Link>

          {/* 3. Use <Link> for your navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link
              to="/carlist"
              className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
            >
              My Bookings
            </Link>
            <Link
              to="/login"
              className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
            >
              Login
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}