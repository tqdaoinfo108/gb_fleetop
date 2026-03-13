export const sidebarMenu = [
  { id: 'dashboard', label: 'Tổng quan', icon: 'LayoutDashboard' },
  { id: 'map_operations', label: 'Bản đồ điều vận', icon: 'Map' },
  { 
    id: 'fleet', 
    label: 'Quản lý xe', 
    icon: 'Car',
    subMenus: [
      { id: 'fuel', label: 'Định mức nhiên liệu' },
      { id: 'status', label: 'Tình trạng sử dụng' },
      { id: 'inspection', label: 'Lịch đăng kiểm' },
    ]
  },
  { id: 'drivers', label: 'Quản lý tài xế', icon: 'Users' },
  { id: 'bookings', label: 'Quản lý Booking', icon: 'CalendarDays' },
  { id: 'operations', label: 'Điều hành & Vận hành', icon: 'Settings' },
  { id: 'accounting', label: 'Kế toán', icon: 'Calculator' },
  { id: 'reports', label: 'Báo cáo', icon: 'BarChart3' },
  { id: 'crm', label: 'Chăm sóc khách hàng', icon: 'Headset' },
];

export const overviewStats = [
  { id: 'ready', label: 'Xe sẵn sàng', value: 45, icon: 'CheckCircle2', color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
  { id: 'running', label: 'Xe đang chạy', value: 112, icon: 'Navigation', color: 'text-blue-600', bgColor: 'bg-blue-50' },
  { id: 'busy_drivers', label: 'Tài xế bận', value: 108, icon: 'UserCog', color: 'text-amber-600', bgColor: 'bg-amber-50' },
  { id: 'maintenance', label: 'Đang bảo dưỡng', value: 12, icon: 'Wrench', color: 'text-rose-600', bgColor: 'bg-rose-50' },
  { id: 'total_trips', label: 'Chuyến đi hôm nay', value: 156, icon: 'Truck', color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
  { id: 'on_time_rate', label: 'Tỷ lệ đúng giờ', value: '94.5%', icon: 'Clock', color: 'text-teal-600', bgColor: 'bg-teal-50' },
  { id: 'fuel_cost', label: 'Chi phí nhiên liệu', value: '12.4M', icon: 'Fuel', color: 'text-orange-600', bgColor: 'bg-orange-50' },
  { id: 'alerts', label: 'Cảnh báo an toàn', value: 3, icon: 'AlertTriangle', color: 'text-red-600', bgColor: 'bg-red-50' },
];

export const revenueAndCostData = [
  { name: 'T1', revenue: 120, cost: 80 },
  { name: 'T2', revenue: 150, cost: 95 },
  { name: 'T3', revenue: 110, cost: 75 },
  { name: 'T4', revenue: 180, cost: 110 },
  { name: 'T5', revenue: 200, cost: 120 },
  { name: 'T6', revenue: 220, cost: 130 },
];

export const fleetStatusData = [
  { name: 'Đang chạy', value: 112, color: '#2563eb' },
  { name: 'Sẵn sàng', value: 45, color: '#10b981' },
  { name: 'Bảo dưỡng', value: 12, color: '#f43f5e' },
  { name: 'Sự cố', value: 3, color: '#f59e0b' },
];

export const recentAlerts = [
  { id: 1, type: 'speeding', message: 'Xe 51H-123.45 vượt quá tốc độ (85km/h)', time: '10 phút trước', severity: 'high' },
  { id: 2, type: 'maintenance', message: 'Xe 51G-678.90 đến hạn thay nhớt', time: '1 giờ trước', severity: 'medium' },
  { id: 3, type: 'route', message: 'Xe 51F-246.80 đi sai lộ trình dự kiến', time: '2 giờ trước', severity: 'high' },
  { id: 4, type: 'fuel', message: 'Mức tiêu hao nhiên liệu xe 51K-987.65 tăng bất thường', time: 'Hôm qua', severity: 'medium' },
];

export const revenueData = [
  { name: 'Tuần 1', value: 120000000 },
  { name: 'Tuần 2', value: 150000000 },
  { name: 'Tuần 3', value: 110000000 },
  { name: 'Tuần 4', value: 180000000 },
];

export const fleetData = [
  { id: '1', licensePlate: '51H-123.45', type: 'Sedan 4 chỗ', driver: 'Nguyễn Văn A', status: 'Sẵn sàng', inspectionDate: '15/08/2026', mileage: '45,000' },
  { id: '2', licensePlate: '51G-678.90', type: 'SUV 7 chỗ', driver: 'Trần Thị B', status: 'Đang chạy', inspectionDate: '22/10/2026', mileage: '82,100' },
  { id: '3', licensePlate: '51F-246.80', type: 'Limousine 9 chỗ', driver: 'Lê Văn C', status: 'Đang chạy', inspectionDate: '05/05/2026', mileage: '120,500' },
  { id: '4', licensePlate: '51H-135.79', type: 'Sedan 4 chỗ', driver: 'Chưa phân công', status: 'Bảo dưỡng', inspectionDate: '12/04/2026', mileage: '65,200' },
  { id: '5', licensePlate: '51K-987.65', type: 'Bán tải', driver: 'Phạm Văn D', status: 'Sẵn sàng', inspectionDate: '30/11/2026', mileage: '25,800' },
  { id: '6', licensePlate: '51H-555.55', type: 'SUV 7 chỗ', driver: 'Hoàng Thị E', status: 'Đang chạy', inspectionDate: '18/09/2026', mileage: '95,000' },
  { id: '7', licensePlate: '51G-111.22', type: 'Sedan 4 chỗ', driver: 'Vũ Văn F', status: 'Sẵn sàng', inspectionDate: '02/07/2026', mileage: '32,400' },
];

export const driversData = [
  { id: 'D1', name: 'Nguyễn Văn A', phone: '0901234567', license: 'Hạng D', status: 'Đang chạy', vehicle: '51H-123.45', rating: '4.8 ⭐' },
  { id: 'D2', name: 'Trần Thị B', phone: '0912345678', license: 'Hạng C', status: 'Sẵn sàng', vehicle: '51G-678.90', rating: '4.9 ⭐' },
  { id: 'D3', name: 'Lê Văn C', phone: '0923456789', license: 'Hạng E', status: 'Nghỉ phép', vehicle: 'Chưa phân công', rating: '4.7 ⭐' },
  { id: 'D4', name: 'Phạm Văn D', phone: '0934567890', license: 'Hạng D', status: 'Sẵn sàng', vehicle: '51K-987.65', rating: '5.0 ⭐' },
  { id: 'D5', name: 'Hoàng Thị E', phone: '0945678901', license: 'Hạng C', status: 'Đang chạy', vehicle: '51H-555.55', rating: '4.6 ⭐' },
];

export const bookingsData = [
  { id: 'BK-1001', customer: 'Công ty TNHH ABC', vehicle: '51H-123.45', startDate: '15/03/2026', endDate: '20/03/2026', status: 'Đang diễn ra', total: '5,000,000 ₫' },
  { id: 'BK-1002', customer: 'Nguyễn Hải Yến', vehicle: '51G-678.90', startDate: '18/03/2026', endDate: '19/03/2026', status: 'Đã xác nhận', total: '1,200,000 ₫' },
  { id: 'BK-1003', customer: 'Tập đoàn XYZ', vehicle: '51F-246.80', startDate: '10/03/2026', endDate: '12/03/2026', status: 'Hoàn thành', total: '8,500,000 ₫' },
  { id: 'BK-1004', customer: 'Lê Hoàng Long', vehicle: '51H-555.55', startDate: '22/03/2026', endDate: '25/03/2026', status: 'Chờ thanh toán', total: '3,400,000 ₫' },
];

export const operationsData = [
  { id: 'TR-501', bookingId: 'BK-1001', driver: 'Nguyễn Văn A', route: 'TP.HCM - Vũng Tàu', startTime: '07:00 15/03', status: 'Đang di chuyển', issues: 'Không' },
  { id: 'TR-502', bookingId: 'BK-1003', driver: 'Lê Văn C', route: 'TP.HCM - Đà Lạt', startTime: '22:00 10/03', status: 'Hoàn thành', issues: 'Kẹt xe đèo BL' },
  { id: 'TR-503', bookingId: 'BK-1002', driver: 'Trần Thị B', route: 'Nội thành TP.HCM', startTime: '08:00 18/03', status: 'Chưa bắt đầu', issues: 'Không' },
];

export const accountingData = [
  { id: 'INV-2026-001', bookingId: 'BK-1003', customer: 'Tập đoàn XYZ', amount: '8,500,000 ₫', issueDate: '12/03/2026', dueDate: '19/03/2026', status: 'Đã thanh toán' },
  { id: 'INV-2026-002', bookingId: 'BK-1004', customer: 'Lê Hoàng Long', amount: '3,400,000 ₫', issueDate: '15/03/2026', dueDate: '22/03/2026', status: 'Chờ thanh toán' },
  { id: 'INV-2026-003', bookingId: 'BK-1001', customer: 'Công ty TNHH ABC', amount: '1,500,000 ₫', issueDate: '15/03/2026', dueDate: '15/03/2026', status: 'Đã cọc' },
];

export const crmData = [
  { id: 'CUST-001', name: 'Công ty TNHH ABC', type: 'Doanh nghiệp', phone: '028-7300-1234', totalBookings: 15, totalSpent: '125,000,000 ₫', status: 'VIP' },
  { id: 'CUST-002', name: 'Tập đoàn XYZ', type: 'Doanh nghiệp', phone: '028-9999-8888', totalBookings: 42, totalSpent: '450,000,000 ₫', status: 'VVIP' },
  { id: 'CUST-003', name: 'Nguyễn Hải Yến', type: 'Cá nhân', phone: '0987654321', totalBookings: 2, totalSpent: '2,400,000 ₫', status: 'Tiêu chuẩn' },
  { id: 'CUST-004', name: 'Lê Hoàng Long', type: 'Cá nhân', phone: '0911223344', totalBookings: 5, totalSpent: '15,600,000 ₫', status: 'Thân thiết' },
];

export const fuelData = [
  { id: 'F-001', licensePlate: '51H-123.45', type: 'Sedan 4 chỗ', norm: '7.5L/100km', actual: '7.8L/100km', variance: '+0.3L', status: 'Vượt định mức', lastRefuel: '12/03/2026' },
  { id: 'F-002', licensePlate: '51G-678.90', type: 'SUV 7 chỗ', norm: '9.0L/100km', actual: '8.8L/100km', variance: '-0.2L', status: 'Tiết kiệm', lastRefuel: '13/03/2026' },
  { id: 'F-003', licensePlate: '51F-246.80', type: 'Limousine 9 chỗ', norm: '12.0L/100km', actual: '12.1L/100km', variance: '+0.1L', status: 'Bình thường', lastRefuel: '11/03/2026' },
  { id: 'F-004', licensePlate: '51K-987.65', type: 'Bán tải', norm: '8.5L/100km', actual: '9.5L/100km', variance: '+1.0L', status: 'Cảnh báo', lastRefuel: '10/03/2026' },
];

export const usageStatusData = [
  { id: 'U-001', licensePlate: '51H-123.45', currentDriver: 'Nguyễn Văn A', location: 'Quận 1, TP.HCM', speed: '45 km/h', engineStatus: 'Đang nổ máy', lastUpdate: '2 phút trước' },
  { id: 'U-002', licensePlate: '51G-678.90', currentDriver: 'Trần Thị B', location: 'TP. Vũng Tàu', speed: '0 km/h', engineStatus: 'Tắt máy', lastUpdate: '15 phút trước' },
  { id: 'U-003', licensePlate: '51F-246.80', currentDriver: 'Lê Văn C', location: 'Cao tốc LT-DG', speed: '85 km/h', engineStatus: 'Đang nổ máy', lastUpdate: 'Vừa xong' },
  { id: 'U-004', licensePlate: '51H-135.79', currentDriver: 'Chưa phân công', location: 'Bãi xe trung tâm', speed: '0 km/h', engineStatus: 'Tắt máy', lastUpdate: '1 ngày trước' },
];

export const inspectionData = [
  { id: 'I-001', licensePlate: '51H-123.45', type: 'Đăng kiểm định kỳ', lastDate: '15/02/2025', nextDate: '15/08/2026', daysLeft: 155, status: 'Bình thường' },
  { id: 'I-002', licensePlate: '51G-678.90', type: 'Bảo hiểm TNDS', lastDate: '22/10/2025', nextDate: '22/10/2026', daysLeft: 223, status: 'Bình thường' },
  { id: 'I-003', licensePlate: '51F-246.80', type: 'Phù hiệu xe hợp đồng', lastDate: '05/05/2025', nextDate: '05/05/2026', daysLeft: 53, status: 'Sắp đến hạn' },
  { id: 'I-004', licensePlate: '51H-135.79', type: 'Đăng kiểm định kỳ', lastDate: '12/04/2025', nextDate: '12/04/2026', daysLeft: 30, status: 'Sắp đến hạn' },
  { id: 'I-005', licensePlate: '51K-987.65', type: 'Bảo hiểm vật chất', lastDate: '30/11/2024', nextDate: '30/11/2025', daysLeft: -104, status: 'Quá hạn' },
];
