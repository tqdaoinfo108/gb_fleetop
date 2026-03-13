/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { FleetScreen, FuelScreen, UsageStatusScreen, InspectionScreen, DriversScreen, BookingsScreen, OperationsScreen, AccountingScreen, CRMScreen, ReportsScreen } from './screens/AllScreens';
import { MapOperationsScreen } from './screens/MapOperationsScreen';

export default function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(window.innerWidth < 1024);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarCollapsed(true);
      } else {
        setIsSidebarCollapsed(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'map_operations': return <MapOperationsScreen />;
      case 'fleet': return <FleetScreen />;
      case 'fuel': return <FuelScreen />;
      case 'status': return <UsageStatusScreen />;
      case 'inspection': return <InspectionScreen />;
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
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto custom-scrollbar relative">
          {renderScreen()}
        </main>
      </div>
    </div>
  );
}

