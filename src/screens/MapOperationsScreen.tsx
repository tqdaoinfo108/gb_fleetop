import React, { useState, useEffect } from 'react';
import { SlidersHorizontal, Info, Plus, Minus, Navigation, CheckCircle2, AlertCircle, Clock, PlusCircle, FileText, Truck, Search, X } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { cn } from '../lib/utils';

// Fix Leaflet default icon issue in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icon generator
const createCustomIcon = (colorClass: string) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div class="w-6 h-6 rounded-full border-2 border-white shadow-md flex items-center justify-center ${colorClass}"><div class="w-2 h-2 bg-white rounded-full"></div></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

const mockVehicles = [
  {
    id: 'BK-9021',
    plate: '51C - 442.10',
    driver: 'Lê Minh Tuấn',
    status: 'Đang di chuyển',
    statusColor: 'text-blue-700',
    statusBg: 'bg-blue-600',
    markerColor: 'bg-blue-600',
    from: 'Cảng Cát Lái, TP. Thủ Đức',
    to: 'KCN VSIP II, Bình Dương',
    odometer: '124,560 km',
    speed: '45 km/h',
    progress: 65,
    position: [10.7600, 106.7700] as [number, number],
    route: [
      [10.7600, 106.7700],
      [10.7800, 106.7800],
      [10.8200, 106.8000],
      [10.8800, 106.8300],
      [10.9200, 106.8800]
    ] as [number, number][],
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGBeNWDkLb1QX5UoaSOdMMQqI58PPtdvtJ9zwGNenQh3rF1N8c117fLp9kXFpSRtAQmOg561fA2sev6PEO0nsrNGp0OqJnPKxx-gnjLuUtZQSh6crRSi6JfdTYxAHw__jST6kqDsTENwdln5Cyp6TQuLyI43HcI8rOLvDunrApR5ABTRyRH0kLIq1i3U2e1lt61u3rSCt_E8idhswwXd0yrEM2O55K4rw7mnOaZSrZ84kbCON0xoKW2GrvqYWlIZUPfECJ_flbvr4',
    category: 'running',
    region: 'TP. HCM'
  },
  {
    id: 'BK-8842',
    plate: '51H - 112.98',
    driver: 'Trần Hoàng Long',
    status: 'Tạm dừng',
    statusColor: 'text-orange-600',
    statusBg: 'bg-orange-600',
    markerColor: 'bg-orange-600',
    from: 'Sân bay Tân Sơn Nhất',
    to: 'Quận 7, TP. HCM',
    odometer: '89,210 km',
    speed: '0 km/h',
    progress: 40,
    position: [10.8185, 106.6588] as [number, number],
    route: [
      [10.8185, 106.6588],
      [10.7950, 106.6750],
      [10.7700, 106.6900],
      [10.7450, 106.7100],
      [10.7300, 106.7250]
    ] as [number, number][],
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEhhMZcPaWtp9YfvrnG0asCOFTYj-xvKINqEaVn1C_g6ElS6tO5HSEVxtFG-ZjlUztlj9RoEucAHic2yBZhYWazAzvNXwWGPUo5NRbxK84p1GnMxBpZqiADT3umjKrOBk9AtzLgw26xEwu5FpcWlzeUyNJMWBmhWBcaHoJWZ9Fu4aWnwQ4UnOWk679rkptgTrRrCM6Ih6IxwhKSDomDKROowfgXBxFzqkFjfQ-3iCYgeVs4bqLnsjZq64Y9axexVZjzxTJJ8fyLt4',
    category: 'running',
    region: 'TP. HCM'
  },
  {
    id: 'BK-7210',
    plate: '29C - 998.01',
    driver: 'Phạm Quốc Cường',
    status: 'Đã gán lệnh',
    statusColor: 'text-slate-500',
    statusBg: 'bg-slate-400',
    markerColor: 'bg-slate-400',
    from: 'Kho Logistics ICD',
    to: 'Phan Thiết, Bình Thuận',
    odometer: '45,300 km',
    speed: '0 km/h',
    progress: 0,
    position: [10.8500, 106.7500] as [number, number],
    route: [
      [10.8500, 106.7500],
      [10.8800, 106.8500],
      [10.9200, 107.1000],
      [10.9500, 107.5000],
      [10.9300, 108.1000]
    ] as [number, number][],
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANY_tN6Rl7XcHXUWjxbshL_43-9borLB8_mVJvpj_0x20Znherc1j5F6uZ7baW9cvWK3OrQTfs-NPB0hNOQESKgWF2Pw1MySu_w4IU-0w9OjBxBH4ZXH7uHxRp2TVcJ_a6lT7d4TJZqWU2Dp9ia5ZceWBeO_01hzW-A0mCp6qt35coXNKFC-fXjRuQRWnbSXUgadEBrWqGDEVTS2AHtamFuqfRGmCu_Z0WKsf9w6a33AljPNr_7Oh4khilfGqa8rHeZzwO4Z6b5nQ',
    category: 'waiting',
    region: 'TP. HCM'
  },
  {
    id: 'BK-5533',
    plate: '29H - 123.45',
    driver: 'Nguyễn Văn A',
    status: 'Đang di chuyển',
    statusColor: 'text-blue-700',
    statusBg: 'bg-blue-600',
    markerColor: 'bg-blue-600',
    from: 'KCN Thăng Long',
    to: 'Cảng Hải Phòng',
    odometer: '12,300 km',
    speed: '55 km/h',
    progress: 30,
    position: [21.0285, 105.8542] as [number, number],
    route: [
      [21.0285, 105.8542],
      [21.0000, 105.9500],
      [20.9500, 106.1500],
      [20.9000, 106.4500],
      [20.8500, 106.6800]
    ] as [number, number][],
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANY_tN6Rl7XcHXUWjxbshL_43-9borLB8_mVJvpj_0x20Znherc1j5F6uZ7baW9cvWK3OrQTfs-NPB0hNOQESKgWF2Pw1MySu_w4IU-0w9OjBxBH4ZXH7uHxRp2TVcJ_a6lT7d4TJZqWU2Dp9ia5ZceWBeO_01hzW-A0mCp6qt35coXNKFC-fXjRuQRWnbSXUgadEBrWqGDEVTS2AHtamFuqfRGmCu_Z0WKsf9w6a33AljPNr_7Oh4khilfGqa8rHeZzwO4Z6b5nQ',
    category: 'running',
    region: 'Hà Nội'
  },
  {
    id: 'BK-1122',
    plate: '43C - 567.89',
    driver: 'Lê Đại Hành',
    status: 'Hoàn thành',
    statusColor: 'text-green-600',
    statusBg: 'bg-green-600',
    markerColor: 'bg-green-600',
    from: 'Cảng Tiên Sa',
    to: 'KCN Hòa Khánh',
    odometer: '56,700 km',
    speed: '0 km/h',
    progress: 100,
    position: [16.0678, 108.2208] as [number, number],
    route: [
      [16.0678, 108.2208],
      [16.0750, 108.2100],
      [16.0850, 108.1800],
      [16.0950, 108.1600],
      [16.1050, 108.1400]
    ] as [number, number][],
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGBeNWDkLb1QX5UoaSOdMMQqI58PPtdvtJ9zwGNenQh3rF1N8c117fLp9kXFpSRtAQmOg561fA2sev6PEO0nsrNGp0OqJnPKxx-gnjLuUtZQSh6crRSi6JfdTYxAHw__jST6kqDsTENwdln5Cyp6TQuLyI43HcI8rOLvDunrApR5ABTRyRH0kLIq1i3U2e1lt61u3rSCt_E8idhswwXd0yrEM2O55K4rw7mnOaZSrZ84kbCON0xoKW2GrvqYWlIZUPfECJ_flbvr4',
    category: 'completed',
    region: 'Đà Nẵng'
  }
];

function MapController({ center, zoom, trigger }: { center: [number, number], zoom: number, trigger: number }) {
  const map = useMap();
  useEffect(() => {
    if (trigger > 0) {
      map.flyTo(center, zoom, { duration: 1.5 });
    } else {
      map.setView(center, zoom);
    }
  }, [center[0], center[1], zoom, trigger, map]);
  return null;
}

export function MapOperationsScreen() {
  const [activeTab, setActiveTab] = useState<'running' | 'waiting' | 'completed'>('running');
  const [selectedRegion, setSelectedRegion] = useState<string>('Tất cả khu vực');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const filteredVehicles = mockVehicles.filter(v => {
    if (searchQuery) {
      return v.plate.toLowerCase().includes(searchQuery.toLowerCase()) || 
             v.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
             v.id.toLowerCase().includes(searchQuery.toLowerCase());
    }
    const matchTab = v.category === activeTab;
    const matchRegion = selectedRegion === 'Tất cả khu vực' || v.region === selectedRegion;
    return matchTab && matchRegion;
  });

  const [selectedVehicle, setSelectedVehicle] = useState(filteredVehicles[0] || mockVehicles[0]);
  const [mapCenter, setMapCenter] = useState<[number, number]>(selectedVehicle.position);
  const [mapZoom, setMapZoom] = useState(13);
  const [flyToTrigger, setFlyToTrigger] = useState(0);
  const [detailedRoute, setDetailedRoute] = useState<[number, number][]>([]);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);

  useEffect(() => {
    if (!selectedVehicle || !selectedVehicle.route || selectedVehicle.route.length < 2) {
      setDetailedRoute([]);
      return;
    }

    const fetchRoute = async () => {
      setIsLoadingRoute(true);
      // Set initial straight line while loading
      setDetailedRoute(selectedVehicle.route);
      
      try {
        const start = selectedVehicle.route[0];
        const end = selectedVehicle.route[selectedVehicle.route.length - 1];
        
        const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`);
        const data = await response.json();
        
        if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
          const coords = data.routes[0].geometry.coordinates.map((c: [number, number]) => [c[1], c[0]] as [number, number]);
          setDetailedRoute(coords);
        }
      } catch (error) {
        console.error("Failed to fetch route", error);
      } finally {
        setIsLoadingRoute(false);
      }
    };

    fetchRoute();
  }, [selectedVehicle]);

  useEffect(() => {
    if (filteredVehicles.length > 0 && (!selectedVehicle || !filteredVehicles.find(v => v.id === selectedVehicle.id))) {
      setSelectedVehicle(filteredVehicles[0]);
      setMapCenter(filteredVehicles[0].position);
      setFlyToTrigger(t => t + 1);
    }
  }, [activeTab, selectedRegion, filteredVehicles, selectedVehicle]);

  const handleSelectVehicle = (vehicle: typeof mockVehicles[0]) => {
    setSelectedVehicle(vehicle);
    setMapCenter(vehicle.position);
    setMapZoom(15);
    setFlyToTrigger(t => t + 1);
    setIsSearchFocused(false);
    setSearchQuery('');
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] w-full relative overflow-hidden">
      {/* Left Sidebar (Booking List) */}
      <section className="bg-white border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col w-full lg:h-full lg:w-[400px] z-[500] shrink-0 relative">
        {/* Search Bar */}
        <div className="p-3 lg:p-4 border-b border-slate-200 flex gap-2 bg-white z-20">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Tìm biển số, tài xế, mã xe..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              className="w-full pl-9 pr-9 py-2.5 lg:py-2 bg-slate-100 border-transparent rounded-lg text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Sidebar Tabs */}
        <div className="hidden lg:flex border-b border-slate-200 px-2 lg:px-4 shrink-0 overflow-x-auto whitespace-nowrap hide-scrollbar">
          <button 
            onClick={() => setActiveTab('running')}
            className={cn("px-3 py-3 lg:px-4 lg:py-4 text-sm font-bold border-b-2", activeTab === 'running' ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700")}
          >
            Đang chạy ({mockVehicles.filter(v => v.category === 'running' && (selectedRegion === 'Tất cả khu vực' || v.region === selectedRegion)).length})
          </button>
          <button 
            onClick={() => setActiveTab('waiting')}
            className={cn("px-3 py-3 lg:px-4 lg:py-4 text-sm font-bold border-b-2", activeTab === 'waiting' ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700")}
          >
            Chờ lệnh ({mockVehicles.filter(v => v.category === 'waiting' && (selectedRegion === 'Tất cả khu vực' || v.region === selectedRegion)).length})
          </button>
          <button 
            onClick={() => setActiveTab('completed')}
            className={cn("px-3 py-3 lg:px-4 lg:py-4 text-sm font-bold border-b-2", activeTab === 'completed' ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700")}
          >
            Hoàn thành ({mockVehicles.filter(v => v.category === 'completed' && (selectedRegion === 'Tất cả khu vực' || v.region === selectedRegion)).length})
          </button>
        </div>
        
        {/* Filter Bar */}
        <div className="hidden lg:flex p-3 lg:p-4 bg-slate-50 gap-2 shrink-0 border-b border-slate-200">
          <select 
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="text-xs border-slate-200 rounded-md focus:ring-blue-500 focus:border-blue-500 flex-1 px-3 py-2 border bg-white"
          >
            <option value="Tất cả khu vực">Tất cả khu vực</option>
            <option value="Hà Nội">Hà Nội</option>
            <option value="TP. HCM">TP. HCM</option>
            <option value="Đà Nẵng">Đà Nẵng</option>
          </select>
          <button className="p-2 border border-slate-200 rounded-md bg-white hover:bg-slate-50 flex items-center justify-center">
            <SlidersHorizontal className="w-4 h-4 text-slate-600" />
          </button>
        </div>
        
        {/* Booking List Content */}
        <div className={cn(
          "overflow-y-auto custom-scrollbar bg-white z-10",
          "lg:flex-1 lg:relative lg:block lg:p-4 lg:space-y-3",
          (isSearchFocused || searchQuery) ? "absolute top-full left-0 right-0 max-h-[60vh] shadow-2xl border-b border-slate-200 p-3 space-y-2" : "hidden lg:block"
        )}>
          {filteredVehicles.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-sm">
              Không có chuyến xe nào phù hợp
            </div>
          ) : (
            filteredVehicles.map((vehicle) => {
              const isSelected = selectedVehicle?.id === vehicle.id;
              return (
              <article 
                key={vehicle.id}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelectVehicle(vehicle)}
                className={cn(
                  "p-3 lg:p-4 rounded-xl border transition-all cursor-pointer relative group",
                  isSelected ? "border-blue-300 bg-blue-50 shadow-md" : "border-slate-200 bg-white hover:border-slate-300"
                )}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter",
                    isSelected ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"
                  )}>
                    {vehicle.id}
                  </span>
                  <span className={cn("text-xs font-semibold flex items-center", vehicle.statusColor)}>
                    {vehicle.status === 'Đang di chuyển' && <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse mr-1.5", vehicle.statusBg)}></span>}
                    {vehicle.status}
                  </span>
                </div>
                <div className={cn("space-y-2 mb-4", !isSelected && "opacity-75")}>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex flex-col items-center">
                      <div className="w-2.5 h-2.5 rounded-full border-2 border-slate-400 bg-white"></div>
                      <div className="w-px h-6 bg-slate-300"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-xs text-slate-500 truncate">Điểm đi</p>
                      <p className="text-sm font-medium text-slate-800 truncate">{vehicle.from}</p>
                      <div className="h-3"></div>
                      <p className="text-xs text-slate-500 truncate">Điểm đến</p>
                      <p className="text-sm font-medium text-slate-800 truncate">{vehicle.to}</p>
                    </div>
                  </div>
                </div>
                <div className={cn("pt-3 border-t flex justify-between items-center", isSelected ? "border-blue-200" : "border-slate-100")}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-300 overflow-hidden">
                      <img alt="Avatar" src={vehicle.avatar} />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-700">{vehicle.driver}</p>
                      <p className="text-[10px] text-slate-500">{vehicle.plate}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-500">Odometer</p>
                    <p className="text-xs font-bold text-slate-700">{vehicle.odometer}</p>
                  </div>
                </div>
              </article>
            );
          }))}
        </div>
        
        {/* Summary Footer */}
        <div className="hidden lg:grid p-4 bg-slate-50 border-t border-slate-200 grid-cols-2 gap-4 shrink-0">
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Tổng xe chạy</p>
            <p className="text-xl font-black text-blue-600">42</p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Hiệu suất</p>
            <p className="text-xl font-black text-green-600">94%</p>
          </div>
        </div>
      </section>

      {/* Right Map Section */}
      <section className="relative flex-1 w-full bg-slate-200 overflow-hidden z-0">
        <MapContainer 
          center={mapCenter} 
          zoom={mapZoom} 
          zoomControl={false}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          <MapController center={mapCenter} zoom={mapZoom} trigger={flyToTrigger} />
          
          {detailedRoute.length > 0 && (
            <Polyline 
              positions={detailedRoute} 
              color="#2563eb" 
              weight={6} 
              opacity={isLoadingRoute ? 0.5 : 1} 
            />
          )}
          
          {filteredVehicles.map(vehicle => (
            <Marker 
              key={vehicle.id} 
              position={vehicle.position}
              icon={createCustomIcon(vehicle.markerColor)}
              ref={(ref) => {
                if (ref && selectedVehicle?.id === vehicle.id) {
                  ref.openPopup();
                }
              }}
              eventHandlers={{
                click: () => handleSelectVehicle(vehicle),
              }}
            >
              <Popup className="custom-popup" closeButton={false}>
                <div className="p-1 w-48 lg:w-56">
                  <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-3 pb-2 lg:pb-3 border-b border-slate-100">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100 shrink-0">
                      <Truck className="text-blue-600 w-4 h-4 lg:w-5 lg:h-5" />
                    </div>
                    <div>
                      <p className="text-xs lg:text-sm font-black text-slate-800 m-0 leading-tight">{vehicle.plate}</p>
                      <p className="text-[10px] lg:text-xs text-green-600 font-bold m-0 mt-1">Vận tốc: {vehicle.speed}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Tài xế:</span>
                      <span className="font-bold text-slate-700">{vehicle.driver}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Hành trình:</span>
                      <span className="font-bold text-slate-700">{vehicle.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
                      <div className="bg-blue-500 h-full" style={{ width: `${vehicle.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        
        {/* Floating Map Controls (Top) */}
        <div className="absolute top-4 right-4 lg:top-6 lg:right-6 flex justify-end items-start pointer-events-none z-[400]">
          <div className="flex flex-col gap-2 pointer-events-auto">
            <button 
              onClick={() => setMapZoom(z => Math.min(z + 1, 18))}
              className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <Plus className="w-5 h-5 text-slate-600" />
            </button>
            <button 
              onClick={() => setMapZoom(z => Math.max(z - 1, 3))}
              className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <Minus className="w-5 h-5 text-slate-600" />
            </button>
            <div className="h-2"></div>
            <button 
              onClick={() => {
                if (selectedVehicle) {
                  setMapCenter(selectedVehicle.position);
                  setMapZoom(15);
                  setFlyToTrigger(t => t + 1);
                }
              }}
              className="w-10 h-10 bg-blue-600 rounded-lg shadow-md flex items-center justify-center hover:bg-blue-700 transition-colors"
            >
              <Navigation className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
        
        {/* Quick Stats Overlay (Bottom Right) */}
        <div className="hidden lg:flex absolute bottom-6 right-6 left-6 justify-end gap-3 pointer-events-none z-[400]">
          <div className="bg-white rounded-xl shadow-xl p-4 border border-slate-200 flex gap-6 pointer-events-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Trực tuyến</p>
                <p className="text-lg font-black text-slate-800">128</p>
              </div>
            </div>
            <div className="w-px h-10 bg-slate-200"></div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cảnh báo</p>
                <p className="text-lg font-black text-slate-800">03</p>
              </div>
            </div>
            <div className="w-px h-10 bg-slate-200"></div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dừng đỗ</p>
                <p className="text-lg font-black text-slate-800">14</p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Actions */}
        <div className="absolute bottom-4 lg:bottom-6 left-1/2 -translate-x-1/2 flex items-center bg-slate-900 text-white rounded-full px-4 py-2 lg:px-6 lg:py-3 shadow-2xl gap-2 lg:gap-4 pointer-events-auto z-[400] w-max">
          <button className="flex items-center gap-1 lg:gap-2 hover:text-blue-400 transition-colors border-r border-slate-700 pr-2 lg:pr-4">
            <PlusCircle className="w-4 h-4 lg:w-5 lg:h-5" />
            <span className="text-xs lg:text-sm font-bold">Tạo Vận Đơn Mới</span>
          </button>
          <button className="flex items-center gap-1 lg:gap-2 hover:text-blue-400 transition-colors">
            <FileText className="w-4 h-4 lg:w-5 lg:h-5" />
            <span className="text-xs lg:text-sm font-bold">Báo Cáo</span>
          </button>
        </div>
      </section>

      {/* Floating Actions (Moved outside map to float over everything) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center bg-slate-900 text-white rounded-full px-5 py-3 lg:px-6 lg:py-3 shadow-2xl gap-3 lg:gap-4 pointer-events-auto z-[400] w-max">
        <button className="flex items-center gap-2 hover:text-blue-400 transition-colors border-r border-slate-700 pr-3 lg:pr-4">
          <PlusCircle className="w-5 h-5" />
          <span className="text-sm font-bold hidden md:inline">Tạo Vận Đơn Mới</span>
        </button>
        <button className="flex items-center gap-2 hover:text-blue-400 transition-colors">
          <FileText className="w-5 h-5" />
          <span className="text-sm font-bold hidden md:inline">Báo Cáo</span>
        </button>
      </div>
    </div>
  );
}
