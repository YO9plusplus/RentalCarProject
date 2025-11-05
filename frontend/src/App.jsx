import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

import CarListPage from './pages/CarList';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import MyBookingsPage from './pages/MyBooking';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route 
          path="/carlist" 
          element={
            <ProtectedRoute>
              <CarListPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/my-bookings" 
          element={
            <ProtectedRoute>
              <MyBookingsPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;