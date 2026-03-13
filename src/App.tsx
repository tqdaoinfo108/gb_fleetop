/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { FleetScreen, DriversScreen, BookingsScreen, OperationsScreen, AccountingScreen, CRMScreen, ReportsScreen } from './screens/AllScreens';
import { MapOperationsScreen } from './screens/MapOperationsScreen';

export default function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'map_operations': return <MapOperationsScreen />;
      case 'fleet': return <FleetScreen />;
      case 'drivers': return <DriversScreen />;
      case 'bookings': return <BookingsScreen />;
      case 'operations': return <OperationsScreen />;
      case 'accounting': return <AccountingScreen />;
      case 'reports': return <ReportsScreen />;
      case 'crm': return <CRMScreen />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        toggleSidebar={toggleSidebar} 
        activeId={activeTab}
        onNavigate={setActiveTab}
      />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          {renderScreen()}
        </main>
      </div>
    </div>
  );
}

