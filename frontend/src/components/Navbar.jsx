import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from "../hooks/authAPI";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-8 sm:px-12 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* 2. Make your logo a Link to the homepage */}
          <Link to="/carlist" className="flex-shrink-0 flex items-center ">
            <i className="bi bi-car-front-fill text-2xl mr-3"></i>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              RENTAL CAR
            </h1>
          </Link>

          {/* 3. Use <Link> for your navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link
              to="/my-bookings"
              className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
            >
              My Bookings
            </Link>
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium cursor-pointer"
              >
                Logout
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}