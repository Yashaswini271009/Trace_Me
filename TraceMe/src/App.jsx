import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import InputPage from './pages/InputPage';
import Dashboard from './pages/Dashboard';
import SharePage from './pages/SharePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/input" element={<InputPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/share" element={<SharePage />} />
      </Routes>
    </BrowserRouter>
  );
}
