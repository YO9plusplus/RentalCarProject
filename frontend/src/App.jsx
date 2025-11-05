import React from 'react';
// 1. Import all the routing tools
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// 2. Import your pages
import CarListPage from './pages/CarList';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;