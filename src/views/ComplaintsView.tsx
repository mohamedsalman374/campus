import React, { useState } from 'react';
import { Complaint, ComplaintStatus } from '../types';
import { Header } from '../components/Header';
import {
  Search,
  Laptop,
  Wrench,
  Shield,
  MapPin,
  ChevronRight,
  Check,
  CheckCircle2,
  Utensils,
  Bus,
  FileText,
  X,
  Clock,
  Sparkles,
} from 'lucide-react';

interface ComplaintsViewProps {
  complaints: Complaint[];
  selectedFilter: 'all' | 'open' | 'resolved' | 'others';
  onFilterChange: (filter: 'all' | 'open' | 'resolved' | 'others') => void;
  onSelectComplaint: (complaint: Complaint) => void;
  onBack: () => void;
}

export const ComplaintsView: React.FC<ComplaintsViewProps> = ({
  complaints,
  selectedFilter,
  onFilterChange,
  onSelectComplaint,
  onBack,
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate counts
  const totalCount = complaints.length;
  const openCount = complaints.filter(
    (c) => c.status === 'Open' || c.status === 'Under Review'
  ).length;
  const resolvedCount = complaints.filter((c) => c.status === 'Resolved').length;
  const othersCount = complaints.filter((c) => c.status === 'In Progress').length;

  // Filter complaints
  const filteredList = complaints.filter((c) => {
    // Tab filter
    let matchesTab = true;
    if (selectedFilter === 'open') {
      matchesTab = c.status === 'Open' || c.status === 'Under Review';
    } else if (selectedFilter === 'resolved') {
      matchesTab = c.status === 'Resolved';
    } else if (selectedFilter === 'others') {
      matchesTab = c.status === 'In Progress';
    }

    // Search query filter
    let matchesSearch = true;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      matchesSearch =
        c.id.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q);
    }

    return matchesTab && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('it') || cat.includes('tech') || cat.includes('wifi') || cat.includes('network')) {
      return (
        <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <Laptop className="w-5 h-5" />
        </div>
      );
    }
    if (cat.includes('infra') || cat.includes('fan') || cat.includes('room') || cat.includes('maintenance')) {
      return (
        <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <Wrench className="w-5 h-5" />
        </div>
      );
    }
    if (cat.includes('safety') || cat.includes('security') || cat.includes('harass')) {
      return (
        <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
          <Shield className="w-5 h-5" />
        </div>
      );
    }
    if (cat.includes('food') || cat.includes('cafeteria') || cat.includes('mess')) {
      return (
        <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
          <Utensils className="w-5 h-5" />
        </div>
      );
    }
    if (cat.includes('trans') || cat.includes('bus')) {
      return (
        <div className="w-11 h-11 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
          <Bus className="w-5 h-5" />
        </div>
      );
    }
    return (
      <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
        <FileText className="w-5 h-5" />
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50/50 pb-8">
      {/* Top Header */}
      <Header
        title="My Complaints"
        onBack={onBack}
        rightAction={
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 text-slate-700 hover:text-slate-900 rounded-full hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Search complaints"
          >
            <Search className="w-5 h-5 stroke-[2.2]" />
          </button>
        }
      />

      {/* Expandable Search Input */}
      {showSearch && (
        <div className="px-4 py-2 bg-white border-b border-slate-100 animate-in fade-in duration-150">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID, title, or location..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-slate-100 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 outline-none"
              autoFocus
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-400"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Filter Tabs / Pills Row */}
      <div className="px-4 py-3 bg-white border-b border-slate-100 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2">
          {/* All */}
          <button
            onClick={() => onFilterChange('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all min-h-[36px] ${
              selectedFilter === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
            }`}
          >
            All ({totalCount})
          </button>

          {/* Open */}
          <button
            onClick={() => onFilterChange('open')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all min-h-[36px] ${
              selectedFilter === 'open'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
            }`}
          >
            Open ({openCount})
          </button>

          {/* Resolved */}
          <button
            onClick={() => onFilterChange('resolved')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all min-h-[36px] ${
              selectedFilter === 'resolved'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
            }`}
          >
            Resolved ({resolvedCount})
          </button>

          {/* Others */}
          <button
            onClick={() => onFilterChange('others')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all min-h-[36px] ${
              selectedFilter === 'others'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
            }`}
          >
            Others ({othersCount})
          </button>
        </div>
      </div>

      {/* Complaints Cards List */}
      <div className="p-4 space-y-3 max-w-md mx-auto w-full">
        {filteredList.length === 0 ? (
          <div className="py-12 text-center bg-white rounded-2xl border border-slate-200/80 p-6">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
              <FileText className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">No complaints found</h4>
            <p className="text-xs text-slate-500 mt-1">
              There are no grievances registered in this category.
            </p>
          </div>
        ) : (
          filteredList.map((complaint) => (
            <div
              key={complaint.id}
              onClick={() => onSelectComplaint(complaint)}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-blue-300 p-4 transition-all cursor-pointer select-none active:scale-[0.99]"
            >
              {/* Card Header: ID & Date */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 font-mono tracking-wide">
                  {complaint.id}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {complaint.date}
                </span>
              </div>

              {/* Main Info Row */}
              <div className="flex items-center gap-3.5 my-1.5">
                {getCategoryIcon(complaint.category)}

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 leading-snug truncate">
                    {complaint.title}
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5 font-medium">
                    {complaint.category}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{complaint.location}</span>
                  </div>
                </div>

                <div className="text-slate-400 pl-1 shrink-0">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>

              {/* Status Badge (Pill at bottom left) */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                {complaint.status === 'In Progress' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#FEF3C7] text-[#D97706]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                    <span>In Progress</span>
                  </span>
                ) : complaint.status === 'Under Review' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#DBEAFE] text-[#2563EB]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                    <span>Under Review</span>
                  </span>
                ) : complaint.status === 'Resolved' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#DCFCE7] text-[#16A34A]">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Resolved</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    <span>Open</span>
                  </span>
                )}

                <span className="text-[11px] text-slate-400 font-medium">
                  Tap to track →
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
