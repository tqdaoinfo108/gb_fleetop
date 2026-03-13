import React, { useState } from 'react';
import { GenericDataTable, Column } from '../components/GenericDataTable';
import { driversData, bookingsData, operationsData, accountingData, crmData, fleetData, revenueData, fuelData, usageStatusData, inspectionData } from '../data/mockData';
import { cn } from '../lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Download } from 'lucide-react';
import { SidePanel } from '../components/SidePanel';
import { ConfirmModal } from '../components/ConfirmModal';

// Helper for status badges
const StatusBadge = ({ status }: { status: string }) => {
  let colorClass = "bg-slate-100 text-slate-700";
  if (['Sẵn sàng', 'Hoàn thành', 'Đã xác nhận', 'Đã thanh toán', 'VIP', 'VVIP', 'Tiết kiệm', 'Bình thường'].includes(status)) colorClass = "bg-emerald-100 text-emerald-700";
  if (['Đang chạy', 'Đang diễn ra', 'Đang di chuyển', 'Đang nổ máy'].includes(status)) colorClass = "bg-blue-100 text-blue-700";
  if (['Chờ thanh toán', 'Đã cọc', 'Chưa bắt đầu', 'Cảnh báo', 'Sắp đến hạn', 'Tắt máy'].includes(status)) colorClass = "bg-amber-100 text-amber-700";
  if (['Bảo dưỡng', 'Nghỉ phép', 'Vượt định mức', 'Quá hạn'].includes(status)) colorClass = "bg-rose-100 text-rose-700";

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

// Fuel Screen
const fuelColumns: Column[] = [
  { key: 'licensePlate', label: 'Biển số', render: (v) => <span className="font-medium text-slate-900">{v}</span> },
  { key: 'type', label: 'Loại xe' },
  { key: 'norm', label: 'Định mức', render: (v) => <span className="font-mono text-xs text-slate-500">{v}</span> },
  { key: 'actual', label: 'Thực tế', render: (v) => <span className="font-mono text-xs font-medium">{v}</span> },
  { key: 'variance', label: 'Chênh lệch', render: (v: string) => <span className={cn("font-mono text-xs font-medium", v.startsWith('+') ? "text-rose-600" : "text-emerald-600")}>{v}</span> },
  { key: 'status', label: 'Đánh giá', render: (v) => <StatusBadge status={v} /> },
  { key: 'lastRefuel', label: 'Đổ xăng gần nhất' },
];
export const FuelScreen = () => <GenericDataTable title="Định mức nhiên liệu" description="Theo dõi và quản lý mức tiêu hao nhiên liệu của từng xe." columns={fuelColumns} data={fuelData} primaryAction="Cập nhật định mức" />;

// Usage Status Screen
const usageStatusColumns: Column[] = [
  { key: 'licensePlate', label: 'Biển số', render: (v) => <span className="font-medium text-slate-900">{v}</span> },
  { key: 'currentDriver', label: 'Tài xế hiện tại' },
  { key: 'location', label: 'Vị trí hiện tại' },
  { key: 'speed', label: 'Tốc độ', render: (v) => <span className="font-mono text-xs">{v}</span> },
  { key: 'engineStatus', label: 'Trạng thái máy', render: (v) => <StatusBadge status={v} /> },
  { key: 'lastUpdate', label: 'Cập nhật lúc', render: (v) => <span className="text-slate-500 text-xs">{v}</span> },
];
export const UsageStatusScreen = () => <GenericDataTable title="Tình trạng sử dụng" description="Giám sát trạng thái hoạt động và vị trí xe theo thời gian thực." columns={usageStatusColumns} data={usageStatusData} />;

// Inspection Screen
const inspectionColumns: Column[] = [
  { key: 'licensePlate', label: 'Biển số', render: (v) => <span className="font-medium text-slate-900">{v}</span> },
  { key: 'type', label: 'Loại giấy tờ' },
  { key: 'lastDate', label: 'Ngày cấp gần nhất', render: (v) => <span className="text-slate-500">{v}</span> },
  { key: 'nextDate', label: 'Ngày hết hạn', render: (v) => <span className="font-medium">{v}</span> },
  { key: 'daysLeft', label: 'Còn lại (ngày)', render: (v: number) => <span className={cn("font-mono text-xs font-medium", v < 0 ? "text-rose-600" : v <= 30 ? "text-amber-600" : "text-emerald-600")}>{v}</span> },
  { key: 'status', label: 'Trạng thái', render: (v) => <StatusBadge status={v} /> },
];
export const InspectionScreen = () => <GenericDataTable title="Lịch đăng kiểm & Bảo hiểm" description="Quản lý thời hạn các loại giấy tờ xe để tránh vi phạm." columns={inspectionColumns} data={inspectionData} primaryAction="Thêm lịch mới" />;

// Drivers Screen
const driverColumns: Column[] = [
  { key: 'name', label: 'Họ và tên', render: (v) => <span className="font-medium text-slate-900">{v}</span> },
  { key: 'phone', label: 'Số điện thoại', render: (v) => <span className="font-mono text-xs">{v}</span> },
  { key: 'license', label: 'Bằng lái' },
  { key: 'status', label: 'Trạng thái', render: (v) => <StatusBadge status={v} /> },
  { key: 'vehicle', label: 'Xe đang lái' },
  { key: 'rating', label: 'Đánh giá' },
];

export const DriversScreen = () => {
  const [data, setData] = useState(driversData);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [panelMode, setPanelMode] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any>(null);

  const handleAdd = () => {
    setPanelMode('add');
    setSelectedItem(null);
    setIsPanelOpen(true);
  };

  const handleView = (item: any) => {
    setPanelMode('view');
    setSelectedItem(item);
    setIsPanelOpen(true);
  };

  const handleEdit = (item: any) => {
    setPanelMode('edit');
    setSelectedItem(item);
    setIsPanelOpen(true);
  };

  const handleDeleteClick = (item: any) => {
    setItemToDelete(item);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      setData(data.filter(d => d.id !== itemToDelete.id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would get form data and update the state
    // For now, just close the panel
    setIsPanelOpen(false);
  };

  return (
    <>
      <GenericDataTable 
        title="Quản lý tài xế" 
        description="Hồ sơ, lịch trình và đánh giá tài xế." 
        columns={driverColumns} 
        data={data} 
        primaryAction="Thêm tài xế"
        onAdd={handleAdd}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <SidePanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        title={panelMode === 'add' ? 'Thêm tài xế mới' : panelMode === 'edit' ? 'Chỉnh sửa tài xế' : 'Thông tin tài xế'}
        position="right"
      >
        {panelMode === 'view' && selectedItem ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
              <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center text-xl font-bold text-slate-500">
                {selectedItem.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">{selectedItem.name}</h3>
                <p className="text-slate-500">{selectedItem.phone}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-500 mb-1">Bằng lái</p>
                <p className="font-medium text-slate-900">{selectedItem.license}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Trạng thái</p>
                <StatusBadge status={selectedItem.status} />
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Xe đang lái</p>
                <p className="font-medium text-slate-900">{selectedItem.vehicle}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Đánh giá</p>
                <p className="font-medium text-slate-900">{selectedItem.rating}</p>
              </div>
            </div>
            
            <div className="pt-6 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => handleEdit(selectedItem)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Chỉnh sửa
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Họ và tên</label>
              <input 
                type="text" 
                defaultValue={selectedItem?.name || ''}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập họ và tên"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Số điện thoại</label>
              <input 
                type="tel" 
                defaultValue={selectedItem?.phone || ''}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập số điện thoại"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Hạng bằng lái</label>
              <select 
                defaultValue={selectedItem?.license || ''}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="" disabled>Chọn hạng bằng lái</option>
                <option value="B2">B2</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Trạng thái</label>
              <select 
                defaultValue={selectedItem?.status || 'Sẵn sàng'}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Sẵn sàng">Sẵn sàng</option>
                <option value="Đang chạy">Đang chạy</option>
                <option value="Nghỉ phép">Nghỉ phép</option>
              </select>
            </div>
            
            <div className="pt-6 border-t border-slate-100 flex justify-end gap-3 mt-8">
              <button 
                type="button"
                onClick={() => setIsPanelOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Hủy
              </button>
              <button 
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Lưu thay đổi
              </button>
            </div>
          </form>
        )}
      </SidePanel>

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Xóa tài xế"
        message={`Bạn có chắc chắn muốn xóa tài xế ${itemToDelete?.name}? Hành động này không thể hoàn tác.`}
      />
    </>
  );
};

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
export const BookingsScreen = () => {
  const [data, setData] = useState(bookingsData);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [panelMode, setPanelMode] = useState<'add' | 'edit' | 'view' | 'filter'>('add');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any>(null);

  const handleAdd = () => {
    setPanelMode('add');
    setSelectedItem(null);
    setIsPanelOpen(true);
  };

  const handleView = (item: any) => {
    setPanelMode('view');
    setSelectedItem(item);
    setIsPanelOpen(true);
  };

  const handleEdit = (item: any) => {
    setPanelMode('edit');
    setSelectedItem(item);
    setIsPanelOpen(true);
  };

  const handleFilter = () => {
    setPanelMode('filter');
    setIsPanelOpen(true);
  };

  const handleDeleteClick = (item: any) => {
    setItemToDelete(item);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      setData(data.filter(d => d.id !== itemToDelete.id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPanelOpen(false);
  };

  const handleApplyFilter = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPanelOpen(false);
    // Apply filter logic here in a real app
  };

  const renderPanelContent = () => {
    if (panelMode === 'filter') {
      return (
        <form onSubmit={handleApplyFilter} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Trạng thái</label>
            <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Tất cả trạng thái</option>
              <option value="Chờ thanh toán">Chờ thanh toán</option>
              <option value="Đã cọc">Đã cọc</option>
              <option value="Đã xác nhận">Đã xác nhận</option>
              <option value="Đang diễn ra">Đang diễn ra</option>
              <option value="Hoàn thành">Hoàn thành</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Từ ngày</label>
              <input type="date" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Đến ngày</label>
              <input type="date" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Khách hàng</label>
            <input type="text" placeholder="Tên hoặc SĐT" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="pt-6 border-t border-slate-100 flex justify-end gap-3 mt-8">
            <button type="button" onClick={() => setIsPanelOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">Hủy</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">Áp dụng lọc</button>
          </div>
        </form>
      );
    }

    if (panelMode === 'view' && selectedItem) {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <p className="text-sm text-slate-500">Mã Booking</p>
              <h3 className="text-xl font-bold text-blue-600">{selectedItem.id}</h3>
            </div>
            <StatusBadge status={selectedItem.status} />
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900 border-b border-slate-100 pb-2">Thông tin khách hàng</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-500 mb-1">Khách hàng</p>
                <p className="font-medium text-slate-900">{selectedItem.customer}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Số điện thoại</p>
                <p className="font-medium text-slate-900">{selectedItem.phone || '0901234567'}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900 border-b border-slate-100 pb-2">Thông tin dịch vụ</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-500 mb-1">Xe thuê</p>
                <p className="font-medium text-slate-900">{selectedItem.vehicle}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Tài xế</p>
                <p className="font-medium text-slate-900">{selectedItem.driver || 'Tự lái'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Ngày nhận</p>
                <p className="font-medium text-slate-900">{selectedItem.startDate}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Ngày trả</p>
                <p className="font-medium text-slate-900">{selectedItem.endDate}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-slate-500 mb-1">Địa điểm nhận xe</p>
                <p className="font-medium text-slate-900">{selectedItem.pickupLocation || 'Sân bay Tân Sơn Nhất'}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-slate-500 mb-1">Địa điểm trả xe</p>
                <p className="font-medium text-slate-900">{selectedItem.dropoffLocation || 'Quận 1, TP.HCM'}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900 border-b border-slate-100 pb-2">Thanh toán</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-500 mb-1">Tổng tiền</p>
                <p className="font-bold text-slate-900 text-lg">{selectedItem.total}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Đã cọc</p>
                <p className="font-medium text-emerald-600">{selectedItem.deposit || '0 ₫'}</p>
              </div>
            </div>
          </div>
          
          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <button 
              onClick={() => handleEdit(selectedItem)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Chỉnh sửa
            </button>
          </div>
        </div>
      );
    }

    return (
      <form onSubmit={handleSave} className="space-y-5">
        <div className="space-y-4">
          <h4 className="font-medium text-slate-900 border-b border-slate-100 pb-2">Thông tin khách hàng</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tên khách hàng *</label>
              <input type="text" defaultValue={selectedItem?.customer || ''} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Số điện thoại *</label>
              <input type="tel" defaultValue={selectedItem?.phone || ''} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-slate-900 border-b border-slate-100 pb-2">Thông tin dịch vụ</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Xe thuê *</label>
              <select defaultValue={selectedItem?.vehicle || ''} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                <option value="" disabled>Chọn xe</option>
                <option value="Toyota Vios (51H-123.45)">Toyota Vios (51H-123.45)</option>
                <option value="Ford Transit (51G-678.90)">Ford Transit (51G-678.90)</option>
                <option value="Kia Carnival (51F-246.80)">Kia Carnival (51F-246.80)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tài xế</label>
              <select defaultValue={selectedItem?.driver || ''} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Tự lái (Không kèm tài xế)</option>
                <option value="Nguyễn Văn A">Nguyễn Văn A</option>
                <option value="Trần Thị B">Trần Thị B</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Ngày nhận *</label>
              <input type="datetime-local" defaultValue={selectedItem?.startDate ? selectedItem.startDate.replace(' ', 'T') : ''} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Ngày trả *</label>
              <input type="datetime-local" defaultValue={selectedItem?.endDate ? selectedItem.endDate.replace(' ', 'T') : ''} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Địa điểm nhận</label>
              <input type="text" defaultValue={selectedItem?.pickupLocation || ''} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Địa điểm trả</label>
              <input type="text" defaultValue={selectedItem?.dropoffLocation || ''} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-slate-900 border-b border-slate-100 pb-2">Thanh toán & Trạng thái</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tổng tiền (VNĐ) *</label>
              <input type="text" defaultValue={selectedItem?.total || ''} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Trạng thái *</label>
              <select defaultValue={selectedItem?.status || 'Chờ thanh toán'} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                <option value="Chờ thanh toán">Chờ thanh toán</option>
                <option value="Đã cọc">Đã cọc</option>
                <option value="Đã xác nhận">Đã xác nhận</option>
                <option value="Đang diễn ra">Đang diễn ra</option>
                <option value="Hoàn thành">Hoàn thành</option>
                <option value="Hủy">Hủy</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Ghi chú</label>
              <textarea rows={3} defaultValue={selectedItem?.notes || ''} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-slate-100 flex justify-end gap-3 mt-8">
          <button type="button" onClick={() => setIsPanelOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">Hủy</button>
          <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">Lưu Booking</button>
        </div>
      </form>
    );
  };

  return (
    <>
      <GenericDataTable 
        title="Quản lý Booking" 
        description="Danh sách các đơn đặt xe và hợp đồng thuê." 
        columns={bookingColumns} 
        data={data} 
        primaryAction="Tạo Booking"
        onAdd={handleAdd}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        onFilter={handleFilter}
      />

      <SidePanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        title={
          panelMode === 'add' ? 'Tạo Booking mới' : 
          panelMode === 'edit' ? 'Chỉnh sửa Booking' : 
          panelMode === 'filter' ? 'Lọc danh sách Booking' :
          'Chi tiết Booking'
        }
        position="right"
        size="lg"
      >
        {renderPanelContent()}
      </SidePanel>

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Xóa Booking"
        message={`Bạn có chắc chắn muốn xóa Booking ${itemToDelete?.id}? Hành động này không thể hoàn tác.`}
      />
    </>
  );
};

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
