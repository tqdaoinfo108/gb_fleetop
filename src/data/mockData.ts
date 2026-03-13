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
