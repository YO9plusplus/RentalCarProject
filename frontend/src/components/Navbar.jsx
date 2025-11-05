import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout } from "../hooks/authAPI";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  const navItemClasses = "inline-flex items-center px-1 pt-1 text-sm font-bold tracking-wide border-b-2 transition-colors duration-300 ease-in-out";
  
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="px-8 sm:px-12 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* 2. Make your logo a Link to the homepage */}
          <Link to="/carlist" className="shrink-0 flex items-center ">
            <i className="bi bi-car-front-fill text-2xl mr-3"></i>
            <h1 className="text-2xl font-bold text-black tracking-tight">
              RENTAL CAR
            </h1>
          </Link>

          {/* 3. Use <Link> for your navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <NavLink
              to="/carlist"
              className={({ isActive }) =>
                `${navItemClasses} ${
                  isActive
                    ? 'text-black border-black'
                    : 'text-gray-600 border-transparent hover:text-black hover:border-black'
                }`
              }
            >
              Rent Car
            </NavLink>
            <NavLink
              to="/my-bookings"
              className={({ isActive }) =>
                `${navItemClasses} ${
                  isActive
                    ? 'text-black border-black'
                    : 'text-gray-600 border-transparent hover:text-black hover:border-black'
                }`
              }
            >
              My Bookings
            </NavLink>
              <button
                onClick={handleLogout}
                className={`${navItemClasses} text-gray-600 border-transparent hover:text-black hover:border-black cursor-pointer`}              >
                Logout
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}