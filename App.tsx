import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import QuickChat from './pages/QuickChat';
import LiveConsultantPage from './pages/LiveConsultant';
import VideoStudio from './pages/VideoStudio';
import SkinAnalysis from './pages/SkinAnalysis';
import BusinessSuite from './pages/BusinessSuite';

import './index.css'; 

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chat" element={<QuickChat />} />
            <Route path="/skin-analysis" element={<SkinAnalysis />} />
            
            {/* Pro Routes */}
            <Route path="/live" element={<LiveConsultantPage />} />
            <Route path="/video" element={<VideoStudio />} />
            <Route path="/business" element={<BusinessSuite />} />
          </Routes>
        </Layout>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;