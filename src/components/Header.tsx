import React, { useState } from 'react';
import { Bell, User, LogOut, X, AlertTriangle, Info, CheckCircle2, Menu } from 'lucide-react';
import { cn } from '../lib/utils';

const mockNotifications = [
  { id: 1, title: 'Cảnh báo tốc độ', message: 'Xe 51H-123.45 vượt quá tốc độ cho phép (85km/h).', time: '10 phút trước', unread: true, type: 'warning' },
  { id: 2, title: 'Booking mới', message: 'Khách hàng Nguyễn Hải Yến vừa tạo booking mới BK-1005.', time: '1 giờ trước', unread: true, type: 'info' },
  { id: 3, title: 'Bảo dưỡng', message: 'Xe 51G-678.90 đã hoàn thành bảo dưỡng định kỳ.', time: 'Hôm qua', unread: false, type: 'success' },
];

export function Header({ toggleSidebar }: { toggleSidebar?: () => void }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  
  const [profile, setProfile] = useState({
    name: 'Nguyễn Văn A',
    phone: '0901234567',
    email: 'admin@gbsoft.vn',
    role: 'Quản trị viên',
    empId: 'EMP-001'
  });

  const [editForm, setEditForm] = useState(profile);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const handleSaveProfile = () => {
    setProfile(editForm);
    setShowEditProfile(false);
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        {toggleSidebar && (
          <button 
            onClick={toggleSidebar} 
            className="lg:hidden p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
          >
            <Menu size={20} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-4 lg:gap-6 ml-auto">
        
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => { setShowNotifications(!showNotifications); setShowProfileMenu(false); }}
            className="relative p-2 text-slate-500 hover:text-slate-700 transition-colors rounded-full hover:bg-slate-100"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <span className="font-semibold text-slate-800">Thông báo ({unreadCount} mới)</span>
                {unreadCount > 0 && (
                  <button onClick={markAllAsRead} className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline">
                    Đánh dấu đã đọc
                  </button>
                )}
              </div>
              <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-sm text-slate-500">Không có thông báo nào</div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {notifications.map(notif => (
                      <div key={notif.id} className={cn("p-4 flex gap-3 hover:bg-slate-50 transition-colors cursor-pointer", notif.unread ? "bg-blue-50/30" : "")}>
                        <div className={cn(
                          "mt-0.5 p-1.5 rounded-full shrink-0 h-fit",
                          notif.type === 'warning' ? "bg-amber-100 text-amber-600" :
                          notif.type === 'success' ? "bg-emerald-100 text-emerald-600" :
                          "bg-blue-100 text-blue-600"
                        )}>
                          {notif.type === 'warning' && <AlertTriangle size={14} />}
                          {notif.type === 'success' && <CheckCircle2 size={14} />}
                          {notif.type === 'info' && <Info size={14} />}
                        </div>
                        <div>
                          <p className={cn("text-sm mb-0.5", notif.unread ? "font-semibold text-slate-900" : "font-medium text-slate-700")}>{notif.title}</p>
                          <p className="text-xs text-slate-600 leading-relaxed">{notif.message}</p>
                          <p className="text-[10px] text-slate-400 mt-1.5 font-medium">{notif.time}</p>
                        </div>
                        {notif.unread && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full shrink-0 mt-1.5 ml-auto"></div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="p-2 border-t border-slate-100 text-center bg-slate-50">
                <button className="text-xs font-medium text-slate-600 hover:text-slate-900">Xem tất cả thông báo</button>
              </div>
            </div>
          )}
        </div>
        
        {/* Profile Dropdown */}
        <div className="relative">
          <div 
            onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); }} 
            className="flex items-center gap-3 cursor-pointer pl-4 border-l border-slate-200 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold text-sm">
              {profile.name.split(' ').pop()?.[0] || 'U'}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-slate-700 leading-none">{profile.name}</p>
              <p className="text-xs text-slate-500 mt-1">{profile.role}</p>
            </div>
          </div>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-4 border-b border-slate-100 md:hidden">
                <p className="text-sm font-medium text-slate-900">{profile.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{profile.email}</p>
              </div>
              <div className="p-1.5">
                <button 
                  onClick={() => { setShowEditProfile(true); setShowProfileMenu(false); setEditForm(profile); }}
                  className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg flex items-center gap-2.5 transition-colors"
                >
                  <User size={16} className="text-slate-400" /> 
                  Hồ sơ cá nhân
                </button>
                <div className="h-px bg-slate-100 my-1.5 mx-2"></div>
                <button className="w-full text-left px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2.5 transition-colors">
                  <LogOut size={16} className="text-rose-500" /> 
                  Đăng xuất
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-4 lg:p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800">Hồ sơ cá nhân</h3>
              <button onClick={() => setShowEditProfile(false)} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 lg:p-6 space-y-5">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-2xl border-4 border-white shadow-sm">
                    {editForm.name.split(' ').pop()?.[0] || 'U'}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Họ và tên</label>
                  <input 
                    type="text" 
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Số điện thoại</label>
                  <input 
                    type="tel" 
                    value={editForm.phone}
                    onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                  />
                </div>
                
                <div className="pt-2">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 border-b border-slate-100 pb-2">Thông tin hệ thống (Không thể sửa)</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Email</label>
                      <input 
                        type="email" 
                        value={editForm.email}
                        disabled
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-slate-500 rounded-lg text-sm cursor-not-allowed" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Vai trò</label>
                        <input 
                          type="text" 
                          value={editForm.role}
                          disabled
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-slate-500 rounded-lg text-sm cursor-not-allowed" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Mã nhân viên</label>
                        <input 
                          type="text" 
                          value={editForm.empId}
                          disabled
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-slate-500 rounded-lg text-sm cursor-not-allowed" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 lg:p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button onClick={() => setShowEditProfile(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 bg-slate-100 rounded-lg transition-colors">
                Hủy
              </button>
              <button onClick={handleSaveProfile} className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm">
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
