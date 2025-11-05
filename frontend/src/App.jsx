import React from 'react';
// 1. Import all the routing tools
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// 2. Import your pages
import CarListPage from './pages/CarList';
import LoginPage from './pages/Login';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
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