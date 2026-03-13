import React from 'react';
import { Search, Bell, User } from 'lucide-react';

export function Header() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-end px-6 sticky top-0 z-10">

      <div className="flex items-center gap-6 ml-4">
        <button className="relative p-2 text-slate-500 hover:text-slate-700 transition-colors rounded-full hover:bg-slate-100">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 cursor-pointer pl-4 border-l border-slate-200">
          <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold text-sm">
            NA
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-slate-700 leading-none">Nguyễn Văn A</p>
            <p className="text-xs text-slate-500 mt-1">Quản trị viên</p>
          </div>
        </div>
      </div>
    </header>
  );
}
