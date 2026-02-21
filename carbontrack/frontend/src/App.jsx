import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Leaf, Calculator, TrendingDown, FileText, Settings } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Calculate from './pages/Calculate';
import Activities from './pages/Activities';
import Reports from './pages/Reports';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Leaf className="w-8 h-8 text-primary-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">CarbonTrack</h1>
                <p className="text-xs text-gray-500">Carbon Accounting</p>
              </div>
            </div>
          </div>
          
          <nav className="flex-1 p-4">
            <NavLink to="/" icon={<TrendingDown />}>Dashboard</NavLink>
            <NavLink to="/calculate" icon={<Calculator />}>Quick Calculate</NavLink>
            <NavLink to="/activities" icon={<FileText />}>Activities</NavLink>
            <NavLink to="/reports" icon={<FileText />}>Reports</NavLink>
          </nav>
          
          <div className="p-4 border-t border-gray-200">
            <NavLink to="/settings" icon={<Settings />}>Settings</NavLink>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/calculate" element={<Calculate />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

function NavLink({ to, icon, children }) {
  return (
    <Link 
      to={to}
      className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-lg transition-colors mb-1"
    >
      <span className="w-5 h-5">{icon}</span>
      <span className="font-medium">{children}</span>
    </Link>
  );
}

export default App;
