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
import MakeupTryOn from './pages/MakeupTryOn';
import PortfolioGenerator from './pages/PortfolioGenerator';
import BrandIdentity from './pages/BrandIdentity';
import LookBook from './pages/LookBook';

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
            <Route path="/try-on" element={<MakeupTryOn />} />
            
            {/* Pro Routes */}
            <Route path="/live" element={<LiveConsultantPage />} />
            <Route path="/video" element={<VideoStudio />} />
            <Route path="/business" element={<BusinessSuite />} />
            <Route path="/portfolio" element={<PortfolioGenerator />} />
            <Route path="/brand-identity" element={<BrandIdentity />} />
            <Route path="/lookbook" element={<LookBook />} />
          </Routes>
        </Layout>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;