import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './HomePage';
import LodgeGrievance from './LodgeGrievance';
import ViewGrievanceStatus from './ViewGrievanceStatus';
import NearbyGovernmentOffices from './NearbyGovernmentOffices';
import Login from './Login';
import SignUp from './SignUp';
import Scheme from './Scheme';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './AdminLogin';

function App() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = (isOpen) => {
    console.log('Setting menu open to:', isOpen);
    setMenuOpen(isOpen);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage isMenuOpen={isMenuOpen} setMenuOpen={handleMenuOpen} />} />
        <Route path="/login" element={<Login isMenuOpen={isMenuOpen} setMenuOpen={handleMenuOpen} />} />
        <Route path="/signup" element={<SignUp isMenuOpen={isMenuOpen} setMenuOpen={handleMenuOpen} />} />
        <Route path="/schemes" element={<Scheme isMenuOpen={isMenuOpen} setMenuOpen={handleMenuOpen} />} />
        <Route path="/grievances/lodge" element={<LodgeGrievance isMenuOpen={isMenuOpen} setMenuOpen={handleMenuOpen} />} />
        <Route path="/grievances/view" element={<ViewGrievanceStatus isMenuOpen={isMenuOpen} setMenuOpen={handleMenuOpen} />} />
        <Route path="/offices" element={<NearbyGovernmentOffices isMenuOpen={isMenuOpen} setMenuOpen={handleMenuOpen} />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;