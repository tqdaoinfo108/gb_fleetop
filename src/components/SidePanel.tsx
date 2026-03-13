import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  position?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function SidePanel({ isOpen, onClose, title, children, position = 'right', size = 'md' }: SidePanelProps) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'w-full sm:w-[400px]',
    md: 'w-full sm:w-[500px]',
    lg: 'w-full sm:w-[600px] md:w-[700px]',
    xl: 'w-full sm:w-[600px] md:w-[800px] lg:w-[1000px]',
  };

  return (
    <div className="fixed inset-0 z-[100] flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className={cn(
        "fixed top-0 bottom-0 bg-white shadow-2xl flex flex-col animate-in duration-300 ease-out",
        sizeClasses[size],
        position === 'left' ? "left-0 slide-in-from-left" : "right-0 slide-in-from-right"
      )}>
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50 shrink-0">
          <h2 className="text-lg font-semibold text-slate-900 truncate pr-4">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors shrink-0"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 pb-12 custom-scrollbar bg-white">
          {children}
        </div>
      </div>
    </div>
  );
}
