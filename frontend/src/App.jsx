import React from 'react';
// 1. Import all the routing tools
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 2. Import your pages
import CarListPage from './pages/CarList';
import LoginPage from './pages/Login';

function App() {
  return (
    // 3. Wrap everything in <BrowserRouter>
    <BrowserRouter>
      {/* 4. <Routes> will switch between your pages */}
      <Routes>
        
        {/* This is your default page (http://localhost:3000/)
          We'll make it show the CarListPage.
        */}
        <Route path="/" element={<CarListPage />} />
        
        {/* This is the /carlist route
          (http://localhost:3000/carlist)
        */}
        <Route path="/carlist" element={<CarListPage />} />

        {/* This is the /login route
          (http://localhost:3000/login)
        */}
        <Route path="/login" element={<LoginPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;