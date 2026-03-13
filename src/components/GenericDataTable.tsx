import React from 'react';
import { Filter, Plus, Download, Eye, Edit, Trash2 } from 'lucide-react';

export interface Column {
  key: string;
  label: string;
  render?: (value: any, item: any) => React.ReactNode;
}

interface GenericDataTableProps {
  title: string;
  description: string;
  columns: Column[];
  data: any[];
  primaryAction?: string;
  onAdd?: () => void;
  onView?: (item: any) => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  onFilter?: () => void;
}

export function GenericDataTable({ title, description, columns, data, primaryAction, onAdd, onView, onEdit, onDelete, onFilter }: GenericDataTableProps) {
  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-slate-900 tracking-tight">{title}</h1>
          <p className="text-sm text-slate-500 mt-1">{description}</p>
        </div>
        <div className="flex flex-row items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none justify-center inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
            <Download size={16} />
            <span className="hidden sm:inline">Xuất file PDF</span>
            <span className="sm:hidden">Xuất PDF</span>
          </button>
          {primaryAction && (
            <button 
              onClick={onAdd}
              className="flex-1 md:flex-none justify-center inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">{primaryAction}</span>
              <span className="sm:hidden">Thêm mới</span>
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 md:p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-base md:text-lg font-semibold text-slate-900">Danh sách dữ liệu</h2>
          <button 
            onClick={onFilter}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-md text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Filter size={14} /> Lọc
          </button>
        </div>

        {/* Mobile Card View */}
        <div className="xl:hidden divide-y divide-slate-100">
          {data.map((item, idx) => (
            <div key={item.id || idx} className="p-4 space-y-3 bg-white hover:bg-slate-50/50 transition-colors">
              {columns.map(col => (
                <div key={col.key} className="flex justify-between items-start gap-4">
                  <span className="text-slate-500 text-xs font-medium shrink-0">{col.label}</span>
                  <span className="text-slate-900 text-sm text-right break-words">
                    {col.render ? col.render(item[col.key], item) : item[col.key]}
                  </span>
                </div>
              ))}
              <div className="flex justify-end gap-2 pt-3 mt-2 border-t border-slate-50">
                {onView && (
                  <button onClick={() => onView(item)} className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors bg-slate-50" title="Xem">
                    <Eye size={16} />
                  </button>
                )}
                {onEdit && (
                  <button onClick={() => onEdit(item)} className="p-2 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors bg-slate-50" title="Sửa">
                    <Edit size={16} />
                  </button>
                )}
                {onDelete && (
                  <button onClick={() => onDelete(item)} className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors bg-slate-50" title="Xóa">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden xl:block overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                {columns.map(col => <th key={col.key} className="px-5 py-3">{col.label}</th>)}
                <th className="px-5 py-3 text-right sticky right-0 bg-slate-50 z-10 shadow-[-10px_0_15px_-5px_rgba(0,0,0,0.05)]">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {data.map((item, idx) => (
                <tr key={item.id || idx} className="hover:bg-slate-50/50 transition-colors group">
                  {columns.map(col => (
                    <td key={col.key} className="px-5 py-3">
                      {col.render ? col.render(item[col.key], item) : item[col.key]}
                    </td>
                  ))}
                  <td className="px-5 py-3 text-right sticky right-0 bg-white group-hover:bg-slate-50/50 transition-colors shadow-[-10px_0_15px_-5px_rgba(0,0,0,0.05)] z-10">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {onView && (
                        <button onClick={() => onView(item)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Xem">
                          <Eye size={16} />
                        </button>
                      )}
                      {onEdit && (
                        <button onClick={() => onEdit(item)} className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors" title="Sửa">
                          <Edit size={16} />
                        </button>
                      )}
                      {onDelete && (
                        <button onClick={() => onDelete(item)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors" title="Xóa">
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-200 bg-slate-50 text-xs text-slate-500 text-center">
          Hiển thị 1 đến {data.length} trong số {data.length} mục
        </div>
      </div>
    </div>
  );
}
