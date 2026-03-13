import React, { useState } from 'react';
import { 
  LayoutDashboard, Car, Users, CalendarDays, Settings, 
  Calculator, BarChart3, Headset, ChevronDown, ChevronRight, Menu, Map
} from 'lucide-react';
import { sidebarMenu } from '../data/mockData';
import { cn } from '../lib/utils';

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, Car, Users, CalendarDays, Settings, Calculator, BarChart3, Headset, Map
};

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  activeId: string;
  onNavigate: (id: string) => void;
}

export function Sidebar({ isCollapsed, toggleSidebar, activeId, onNavigate }: SidebarProps) {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (id: string) => {
    setOpenMenus(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside className={cn(
      "bg-slate-900 text-slate-300 transition-all duration-300 flex flex-col h-screen sticky top-0",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
        {!isCollapsed && <span className="text-white font-semibold text-lg truncate">FleetManager</span>}
        <button onClick={toggleSidebar} className="p-1 hover:bg-slate-800 rounded-md text-slate-400 hover:text-white transition-colors">
          <Menu size={20} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
        <ul className="space-y-1 px-2">
          {sidebarMenu.map((item) => {
            const Icon = iconMap[item.icon];
            const hasSubMenus = item.subMenus && item.subMenus.length > 0;
            const isOpen = openMenus[item.id];
            const isActive = activeId === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => {
                    if (hasSubMenus) toggleMenu(item.id);
                    onNavigate(item.id);
                  }}
                  className={cn(
                    "w-full flex items-center px-2 py-2.5 rounded-md transition-colors group",
                    isCollapsed ? "justify-center" : "justify-between",
                    isActive 
                      ? "bg-blue-600 text-white" 
                      : "hover:bg-slate-800 hover:text-white"
                  )}
                  title={isCollapsed ? item.label : undefined}
                >
                  <div className="flex items-center gap-3">
                    {Icon && <Icon size={20} className={cn("shrink-0 transition-colors", isActive ? "text-white" : "group-hover:text-blue-400")} />}
                    {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                  </div>
                  {!isCollapsed && hasSubMenus && (
                    isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                  )}
                </button>
                
                {!isCollapsed && hasSubMenus && isOpen && (
                  <ul className="mt-1 mb-2 space-y-1 pl-9 pr-2">
                    {item.subMenus?.map(sub => (
                      <li key={sub.id}>
                        <a href="#" className="block px-2 py-1.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors">
                          {sub.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
