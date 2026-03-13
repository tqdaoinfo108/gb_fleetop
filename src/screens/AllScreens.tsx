import React from 'react';
import { GenericDataTable, Column } from '../components/GenericDataTable';
import { driversData, bookingsData, operationsData, accountingData, crmData, fleetData, revenueData } from '../data/mockData';
import { cn } from '../lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Download } from 'lucide-react';

// Helper for status badges
const StatusBadge = ({ status }: { status: string }) => {
  let colorClass = "bg-slate-100 text-slate-700";
  if (['Sẵn sàng', 'Hoàn thành', 'Đã xác nhận', 'Đã thanh toán', 'VIP', 'VVIP'].includes(status)) colorClass = "bg-emerald-100 text-emerald-700";
  if (['Đang chạy', 'Đang diễn ra', 'Đang di chuyển'].includes(status)) colorClass = "bg-blue-100 text-blue-700";
  if (['Chờ thanh toán', 'Đã cọc', 'Chưa bắt đầu'].includes(status)) colorClass = "bg-amber-100 text-amber-700";
  if (['Bảo dưỡng', 'Nghỉ phép'].includes(status)) colorClass = "bg-rose-100 text-rose-700";

  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", colorClass)}>
      {status}
    </span>
  );
};

// Fleet Screen
const fleetColumns: Column[] = [
  { key: 'licensePlate', label: 'Biển số', render: (v) => <span className="font-medium text-slate-900">{v}</span> },
  { key: 'type', label: 'Loại xe' },
  { key: 'driver', label: 'Tài xế' },
  { key: 'status', label: 'Trạng thái', render: (v) => <StatusBadge status={v} /> },
  { key: 'inspectionDate', label: 'Ngày đăng kiểm', render: (v) => <span className="text-slate-500">{v}</span> },
  { key: 'mileage', label: 'Km vận hành', render: (v) => <span className="font-mono text-xs">{v}</span> },
];
export const FleetScreen = () => <GenericDataTable title="Quản lý xe" description="Danh sách và tình trạng toàn bộ phương tiện." columns={fleetColumns} data={fleetData} primaryAction="Thêm xe mới" />;

// Drivers Screen
const driverColumns: Column[] = [
  { key: 'name', label: 'Họ và tên', render: (v) => <span className="font-medium text-slate-900">{v}</span> },
  { key: 'phone', label: 'Số điện thoại', render: (v) => <span className="font-mono text-xs">{v}</span> },
  { key: 'license', label: 'Bằng lái' },
  { key: 'status', label: 'Trạng thái', render: (v) => <StatusBadge status={v} /> },
  { key: 'vehicle', label: 'Xe đang lái' },
  { key: 'rating', label: 'Đánh giá' },
];
export const DriversScreen = () => <GenericDataTable title="Quản lý tài xế" description="Hồ sơ, lịch trình và đánh giá tài xế." columns={driverColumns} data={driversData} primaryAction="Thêm tài xế" />;

// Bookings Screen
const bookingColumns: Column[] = [
  { key: 'id', label: 'Mã Booking', render: (v) => <span className="font-mono text-xs font-medium text-blue-600">{v}</span> },
  { key: 'customer', label: 'Khách hàng', render: (v) => <span className="font-medium text-slate-900">{v}</span> },
  { key: 'vehicle', label: 'Xe' },
  { key: 'startDate', label: 'Ngày nhận' },
  { key: 'endDate', label: 'Ngày trả' },
  { key: 'status', label: 'Trạng thái', render: (v) => <StatusBadge status={v} /> },
  { key: 'total', label: 'Tổng tiền', render: (v) => <span className="font-medium text-slate-900">{v}</span> },
];
export const BookingsScreen = () => <GenericDataTable title="Quản lý Booking" description="Danh sách các đơn đặt xe và hợp đồng thuê." columns={bookingColumns} data={bookingsData} primaryAction="Tạo Booking" />;

// Operations Screen
const operationColumns: Column[] = [
  { key: 'id', label: 'Mã chuyến', render: (v) => <span className="font-mono text-xs font-medium text-blue-600">{v}</span> },
  { key: 'bookingId', label: 'Mã Booking', render: (v) => <span className="font-mono text-xs text-slate-500">{v}</span> },
  { key: 'driver', label: 'Tài xế', render: (v) => <span className="font-medium text-slate-900">{v}</span> },
  { key: 'route', label: 'Lộ trình' },
  { key: 'startTime', label: 'Thời gian xuất phát' },
  { key: 'status', label: 'Trạng thái', render: (v) => <StatusBadge status={v} /> },
  { key: 'issues', label: 'Sự cố' },
];
export const OperationsScreen = () => <GenericDataTable title="Điều hành & Vận hành" description="Theo dõi lộ trình và trạng thái chuyến đi theo thời gian thực." columns={operationColumns} data={operationsData} />;

// Accounting Screen
const accountingColumns: Column[] = [
  { key: 'id', label: 'Mã hóa đơn', render: (v) => <span className="font-mono text-xs font-medium text-blue-600">{v}</span> },
  { key: 'bookingId', label: 'Mã Booking', render: (v) => <span className="font-mono text-xs text-slate-500">{v}</span> },
  { key: 'customer', label: 'Khách hàng', render: (v) => <span className="font-medium text-slate-900">{v}</span> },
  { key: 'amount', label: 'Số tiền', render: (v) => <span className="font-medium text-slate-900">{v}</span> },
  { key: 'issueDate', label: 'Ngày xuất' },
  { key: 'dueDate', label: 'Hạn thanh toán' },
  { key: 'status', label: 'Trạng thái', render: (v) => <StatusBadge status={v} /> },
];
export const AccountingScreen = () => <GenericDataTable title="Kế toán & Công nợ" description="Quản lý hóa đơn, thanh toán và công nợ khách hàng." columns={accountingColumns} data={accountingData} primaryAction="Tạo hóa đơn" />;

// CRM Screen
const crmColumns: Column[] = [
  { key: 'id', label: 'Mã KH', render: (v) => <span className="font-mono text-xs text-slate-500">{v}</span> },
  { key: 'name', label: 'Tên khách hàng', render: (v) => <span className="font-medium text-slate-900">{v}</span> },
  { key: 'type', label: 'Phân loại' },
  { key: 'phone', label: 'Số điện thoại', render: (v) => <span className="font-mono text-xs">{v}</span> },
  { key: 'totalBookings', label: 'Số chuyến' },
  { key: 'totalSpent', label: 'Tổng chi tiêu', render: (v) => <span className="font-medium text-slate-900">{v}</span> },
  { key: 'status', label: 'Hạng thành viên', render: (v) => <StatusBadge status={v} /> },
];
export const CRMScreen = () => <GenericDataTable title="Chăm sóc khách hàng" description="Quản lý thông tin và lịch sử giao dịch của khách hàng." columns={crmColumns} data={crmData} primaryAction="Thêm khách hàng" />;

// Reports Screen
export const ReportsScreen = () => {
  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Báo cáo & Thống kê</h1>
          <p className="text-sm text-slate-500 mt-1">Phân tích hiệu quả hoạt động và doanh thu.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
          <Download size={16} /> Xuất báo cáo
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Biểu đồ doanh thu</h2>
          <div className="flex-1 min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData} margin={{ top: 5, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(value) => `${value / 1000000}M`} />
                <Tooltip formatter={(value: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)} />
                <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Tỷ lệ lấp đầy xe</h2>
          <div className="flex-1 min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 5, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(value) => `${value / 1000000}M`} />
                <Tooltip formatter={(value: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)} />
                <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
