import React, { useState } from 'react';
import { Complaint } from '../types';
import { X, Search, ArrowRight, Clock, AlertTriangle } from 'lucide-react';

interface TrackComplaintModalProps {
  complaints: Complaint[];
  isOpen: boolean;
  onClose: () => void;
  onSelectComplaint: (complaint: Complaint) => void;
}

export const TrackComplaintModal: React.FC<TrackComplaintModalProps> = ({
  complaints,
  isOpen,
  onClose,
  onSelectComplaint,
}) => {
  const [searchId, setSearchId] = useState('');
  const [notFound, setNotFound] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setNotFound(false);
    const query = searchId.trim().toUpperCase();
    const found = complaints.find(
      (c) =>
        c.id.toUpperCase() === query ||
        c.id.replace(/-/g, '').includes(query.replace(/-/g, ''))
    );

    if (found) {
      onSelectComplaint(found);
      onClose();
    } else {
      setNotFound(true);
    }
  };

  const handleQuickPick = (complaint: Complaint) => {
    onSelectComplaint(complaint);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Track Grievance</h3>
              <p className="text-xs text-slate-500">Enter ticket ID to check real-time status</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSearch} className="mt-4">
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Complaint Tracking Number (CMP-ID)
          </label>
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchId}
              onChange={(e) => {
                setSearchId(e.target.value);
                if (notFound) setNotFound(false);
              }}
              placeholder="e.g. CMP-2026-1045"
              className="w-full pl-3.5 pr-24 py-3 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none uppercase font-mono"
              autoFocus
            />
            <button
              type="submit"
              className="absolute right-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 min-h-[38px] transition-colors"
            >
              <span>Track</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {notFound && (
            <p className="text-xs text-red-600 mt-2 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>No grievance found matching "{searchId}". Please check ID.</span>
            </p>
          )}
        </form>

        {/* Quick select your recent complaints */}
        <div className="mt-5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Your Active Grievances:
          </span>
          <div className="space-y-1.5">
            {complaints.slice(0, 3).map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => handleQuickPick(c)}
                className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 text-left transition-colors group"
              >
                <div>
                  <span className="text-xs font-bold text-blue-600 font-mono block">
                    {c.id}
                  </span>
                  <span className="text-xs font-medium text-slate-800 line-clamp-1">
                    {c.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      c.status === 'In Progress'
                        ? 'bg-amber-100 text-amber-700'
                        : c.status === 'Under Review'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {c.status}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
