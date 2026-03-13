import React from 'react';
import { overviewStats, revenueData, fleetData, revenueAndCostData, fleetStatusData, recentAlerts } from '../data/mockData';
import { 
  CheckCircle2, Navigation, UserCog, Wrench, 
  Download, Filter, Plus, Eye, Edit, Trash2,
  Truck, Clock, Fuel, AlertTriangle, Bell
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { cn } from '../lib/utils';

const iconMap: Record<string, React.ElementType> = {
  CheckCircle2, Navigation, UserCog, Wrench, Truck, Clock, Fuel, AlertTriangle
};

export function Dashboard() {
  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 max-w-7xl mx-auto w-full">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-slate-900 tracking-tight">Tổng quan</h1>
          <p className="text-sm text-slate-500 mt-1">Quản lý và theo dõi tình trạng đội xe của bạn.</p>
        </div>
        <div className="flex flex-row items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none justify-center inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm">
            <Download size={16} />
            <span className="hidden sm:inline">Xuất file PDF</span>
            <span className="sm:hidden">Xuất PDF</span>
          </button>
          <button className="flex-1 md:flex-none justify-center inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-blue-600 border border-transparent text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
            <Plus size={16} />
            <span className="hidden sm:inline">Thêm xe mới</span>
            <span className="sm:hidden">Thêm mới</span>
          </button>
        </div>
      </div>

      {/* Overview Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat) => {
          const Icon = iconMap[stat.icon];
          return (
            <div key={stat.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
              <div className={cn("p-3 rounded-lg", stat.bgColor, stat.color)}>
                {Icon && <Icon size={24} />}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-2xl font-semibold text-slate-900 mt-1">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue vs Cost Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Doanh thu & Chi phí (Triệu VNĐ)</h2>
          <div className="flex-1 min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueAndCostData} margin={{ top: 5, right: 20, left: -20, bottom: 0 }} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
                <Bar dataKey="revenue" name="Doanh thu" fill="#2563eb" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="cost" name="Chi phí" fill="#f43f5e" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fleet Status Pie Chart */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Trạng thái đội xe</h2>
          <div className="flex-1 min-h-[300px] w-full flex flex-col items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={fleetStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {fleetStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#0f172a', fontWeight: 500 }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-slate-900">172</span>
              <span className="text-sm text-slate-500">Tổng số xe</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area: Alerts & Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Alerts */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-500" />
              Cảnh báo gần đây
            </h2>
            <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">3 Mới</span>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {recentAlerts.map(alert => (
              <div key={alert.id} className="p-3 hover:bg-slate-50 rounded-lg transition-colors border-b border-slate-100 last:border-0 flex gap-3 items-start">
                <div className={cn(
                  "p-2 rounded-full shrink-0 mt-0.5",
                  alert.severity === 'high' ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"
                )}>
                  <AlertTriangle size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800 leading-snug">{alert.message}</p>
                  <p className="text-xs text-slate-500 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-slate-200 bg-slate-50 text-center">
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Xem tất cả cảnh báo</button>
          </div>
        </div>

        {/* Table Section */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
            <h2 className="text-lg font-semibold text-slate-900">Danh sách đội xe</h2>
            <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-md text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
              <Filter size={14} />
              Lọc
            </button>
          </div>
          
          {/* Mobile Card View */}
          <div className="xl:hidden divide-y divide-slate-100">
            {fleetData.map((car) => (
              <div key={car.id} className="p-4 space-y-3 bg-white hover:bg-slate-50/50 transition-colors">
                <div className="flex justify-between items-start gap-4">
                  <span className="text-slate-500 text-xs font-medium shrink-0">Biển số</span>
                  <span className="text-slate-900 text-sm font-medium text-right break-words">{car.licensePlate}</span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <span className="text-slate-500 text-xs font-medium shrink-0">Loại xe</span>
                  <span className="text-slate-900 text-sm text-right break-words">{car.type}</span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <span className="text-slate-500 text-xs font-medium shrink-0">Tài xế</span>
                  <span className="text-slate-900 text-sm text-right break-words">{car.driver}</span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <span className="text-slate-500 text-xs font-medium shrink-0">Trạng thái</span>
                  <span className="text-right">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                      car.status === 'Sẵn sàng' ? "bg-emerald-100 text-emerald-700" :
                      car.status === 'Đang chạy' ? "bg-blue-100 text-blue-700" :
                      "bg-rose-100 text-rose-700"
                    )}>
                      {car.status}
                    </span>
                  </span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <span className="text-slate-500 text-xs font-medium shrink-0">Ngày đăng kiểm</span>
                  <span className="text-slate-500 text-sm text-right break-words">{car.inspectionDate}</span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <span className="text-slate-500 text-xs font-medium shrink-0">Km vận hành</span>
                  <span className="text-slate-900 text-sm font-mono text-right break-words">{car.mileage}</span>
                </div>
                <div className="flex justify-end gap-2 pt-3 mt-2 border-t border-slate-50">
                  <button className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors bg-slate-50" title="Xem">
                    <Eye size={16} />
                  </button>
                  <button className="p-2 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors bg-slate-50" title="Sửa">
                    <Edit size={16} />
                  </button>
                  <button className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors bg-slate-50" title="Xóa">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden xl:block overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3">Biển số</th>
                  <th className="px-5 py-3">Loại xe</th>
                  <th className="px-5 py-3">Tài xế</th>
                  <th className="px-5 py-3">Trạng thái</th>
                  <th className="px-5 py-3">Ngày đăng kiểm</th>
                  <th className="px-5 py-3">Km vận hành</th>
                  <th className="px-5 py-3 text-right sticky right-0 bg-slate-50 z-10 shadow-[-10px_0_15px_-5px_rgba(0,0,0,0.05)]">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {fleetData.map((car) => (
                  <tr key={car.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-5 py-3 font-medium text-slate-900">{car.licensePlate}</td>
                    <td className="px-5 py-3">{car.type}</td>
                    <td className="px-5 py-3">{car.driver}</td>
                    <td className="px-5 py-3">
                      <span className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                        car.status === 'Sẵn sàng' ? "bg-emerald-100 text-emerald-700" :
                        car.status === 'Đang chạy' ? "bg-blue-100 text-blue-700" :
                        "bg-rose-100 text-rose-700"
                      )}>
                        {car.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-slate-500">{car.inspectionDate}</td>
                    <td className="px-5 py-3 font-mono text-xs">{car.mileage}</td>
                    <td className="px-5 py-3 text-right sticky right-0 bg-white group-hover:bg-slate-50/50 transition-colors shadow-[-10px_0_15px_-5px_rgba(0,0,0,0.05)] z-10">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Xem">
                          <Eye size={16} />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors" title="Sửa">
                          <Edit size={16} />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors" title="Xóa">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-slate-200 bg-slate-50 text-xs text-slate-500 text-center">
            Hiển thị 1 đến {fleetData.length} trong số {fleetData.length} mục
          </div>
        </div>
      </div>
    </div>
  );
}
