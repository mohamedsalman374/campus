import React, { useState } from 'react';
import { Complaint, ComplaintCategory, UserProfile } from '../types';
import { CATEGORIES } from '../data/initialData';
import { AvatarIllustration } from '../components/AvatarIllustration';
import { CampusBannerIllustration } from '../components/CampusBannerIllustration';
import {
  Bell,
  Search,
  Plus,
  FileText,
  Radio,
  GraduationCap,
  Building2,
  Wrench,
  Shield,
  Utensils,
  Bus,
  X,
  ChevronRight,
} from 'lucide-react';

interface HomeViewProps {
  user: UserProfile;
  complaints: Complaint[];
  unreadNotificationsCount: number;
  onNavigateTab: (tab: 'home' | 'complaints' | 'register' | 'notifications' | 'profile') => void;
  onSelectComplaintFilter: (filter: 'all' | 'open' | 'resolved' | 'in_progress') => void;
  onOpenTrackModal: () => void;
  onSelectCategoryForNewComplaint: (categoryName: string) => void;
  onSelectComplaint: (complaint: Complaint) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  user,
  complaints,
  unreadNotificationsCount,
  onNavigateTab,
  onSelectComplaintFilter,
  onOpenTrackModal,
  onSelectCategoryForNewComplaint,
  onSelectComplaint,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate statistics
  const totalCount = complaints.length;
  const openCount = complaints.filter((c) => c.status === 'Open' || c.status === 'Under Review').length;
  const resolvedCount = complaints.filter((c) => c.status === 'Resolved').length;
  const inProgressCount = complaints.filter((c) => c.status === 'In Progress').length;

  // Search filtered complaints
  const searchResults = searchQuery.trim()
    ? complaints.filter(
        (c) =>
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-orange-500" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-purple-600" />;
      case 'Wrench':
        return <Wrench className="w-6 h-6 text-emerald-500" />;
      case 'Shield':
        return <Shield className="w-6 h-6 text-indigo-600" />;
      case 'Utensils':
        return <Utensils className="w-6 h-6 text-rose-500" />;
      case 'Bus':
        return <Bus className="w-6 h-6 text-red-500" />;
      default:
        return <FileText className="w-6 h-6 text-blue-500" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col px-4 pt-3 pb-8 space-y-4 max-w-md mx-auto w-full">
      {/* Top Greeting Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab('profile')}
            className="rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            title="View Profile"
          >
            <AvatarIllustration size="sm" showBadge={true} badgeType="status" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight flex items-center gap-1">
              <span>Hello, {user.name.split(' ')[0]}!</span>
              <span className="text-xl">👋</span>
            </h1>
            <p className="text-xs text-slate-500">Good to see you back</p>
          </div>
        </div>

        {/* Notifications Icon with Badge */}
        <button
          onClick={() => onNavigateTab('notifications')}
          className="relative p-2.5 rounded-full hover:bg-slate-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="View notifications"
        >
          <Bell className="w-6 h-6 text-slate-700" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 min-w-4 h-4 px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-xs">
              {unreadNotificationsCount}
            </span>
          )}
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-slate-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search complaints, categories..."
          className="w-full pl-10 pr-9 py-2.5 bg-white rounded-full border border-slate-200 text-xs text-slate-800 placeholder-slate-400 shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* If Search Active: Show live search results popup */}
      {searchQuery.trim() !== '' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-3 space-y-2 animate-in fade-in duration-150">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
            Matching Complaints ({searchResults.length}):
          </div>
          {searchResults.length === 0 ? (
            <p className="text-xs text-slate-500 py-3 text-center">
              No complaint found matching "{searchQuery}".
            </p>
          ) : (
            searchResults.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  onSelectComplaint(c);
                  setSearchQuery('');
                }}
                className="w-full p-2 text-left rounded-xl hover:bg-slate-50 border border-slate-100 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-blue-600 font-mono">{c.id}</div>
                  <div className="text-xs font-semibold text-slate-900">{c.title}</div>
                  <div className="text-[11px] text-slate-500">{c.location}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            ))
          )}
        </div>
      )}

      {/* Hero Banner: "Report. Track. Resolve. / For a Better Campus." */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 p-4 text-white shadow-md flex items-center justify-between">
        <div className="z-10 max-w-[200px] space-y-1">
          <h2 className="text-lg font-extrabold tracking-tight leading-snug">
            Report. Track. Resolve.
          </h2>
          <p className="text-xs text-blue-100 font-normal">
            For a Better Campus.
          </p>
        </div>

        {/* Vector College Campus Building Illustration */}
        <div className="z-10 -mr-2">
          <CampusBannerIllustration />
        </div>

        {/* Ambient subtle backdrop shine */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* 4 Metric Stats Cards */}
      <div className="grid grid-cols-4 gap-2">
        {/* Total */}
        <button
          onClick={() => {
            onSelectComplaintFilter('all');
            onNavigateTab('complaints');
          }}
          className="bg-white p-2.5 rounded-2xl border border-slate-100 shadow-2xs flex flex-col items-center justify-center hover:border-blue-300 transition-all active:scale-95"
        >
          <span className="text-xl font-black text-blue-600 font-sans tabular-nums">
            {totalCount}
          </span>
          <span className="text-[11px] font-medium text-slate-500 mt-0.5">Total</span>
        </button>

        {/* Open */}
        <button
          onClick={() => {
            onSelectComplaintFilter('open');
            onNavigateTab('complaints');
          }}
          className="bg-white p-2.5 rounded-2xl border border-slate-100 shadow-2xs flex flex-col items-center justify-center hover:border-red-300 transition-all active:scale-95"
        >
          <span className="text-xl font-black text-rose-500 font-sans tabular-nums">
            {openCount}
          </span>
          <span className="text-[11px] font-medium text-slate-500 mt-0.5">Open</span>
        </button>

        {/* Resolved */}
        <button
          onClick={() => {
            onSelectComplaintFilter('resolved');
            onNavigateTab('complaints');
          }}
          className="bg-white p-2.5 rounded-2xl border border-slate-100 shadow-2xs flex flex-col items-center justify-center hover:border-emerald-300 transition-all active:scale-95"
        >
          <span className="text-xl font-black text-emerald-500 font-sans tabular-nums">
            {resolvedCount}
          </span>
          <span className="text-[11px] font-medium text-slate-500 mt-0.5">Resolved</span>
        </button>

        {/* In Progress */}
        <button
          onClick={() => {
            onSelectComplaintFilter('in_progress');
            onNavigateTab('complaints');
          }}
          className="bg-white p-2.5 rounded-2xl border border-slate-100 shadow-2xs flex flex-col items-center justify-center hover:border-amber-300 transition-all active:scale-95"
        >
          <span className="text-xl font-black text-amber-500 font-sans tabular-nums">
            {inProgressCount}
          </span>
          <span className="text-[11px] font-medium text-slate-500 mt-0.5 whitespace-nowrap">
            In Progress
          </span>
        </button>
      </div>

      {/* Main Full-Width CTA: "+ Register Complaint" */}
      <button
        onClick={() => onNavigateTab('register')}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all min-h-[48px]"
      >
        <Plus className="w-5 h-5 stroke-[2.5]" />
        <span>Register Complaint</span>
      </button>

      {/* Quick Action Split Cards (My Complaints & Track Complaint) */}
      <div className="grid grid-cols-2 gap-3">
        {/* Card 1: My Complaints */}
        <button
          onClick={() => onNavigateTab('complaints')}
          className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-2xs flex items-center gap-3 text-left hover:border-blue-200 transition-all active:scale-98"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 leading-tight">My Complaints</div>
            <div className="text-[11px] text-slate-400 mt-0.5">View all</div>
          </div>
        </button>

        {/* Card 2: Track Complaint */}
        <button
          onClick={onOpenTrackModal}
          className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-2xs flex items-center gap-3 text-left hover:border-emerald-200 transition-all active:scale-98"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 leading-tight">Track Complaint</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Enter ID</div>
          </div>
        </button>
      </div>

      {/* Complaint Categories Section */}
      <div className="pt-1">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-900">Complaint Categories</h3>
          <button
            onClick={() => onNavigateTab('complaints')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            See All
          </button>
        </div>

        {/* 2 rows x 3 columns Grid */}
        <div className="grid grid-cols-3 gap-2.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategoryForNewComplaint(cat.name)}
              className="bg-white p-3 rounded-2xl border border-slate-100 shadow-2xs flex flex-col items-center justify-center text-center hover:border-blue-200 hover:shadow-xs transition-all active:scale-95 min-h-[96px]"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-2"
                style={{ backgroundColor: cat.bgColor }}
              >
                {getCategoryIcon(cat.iconName)}
              </div>
              <span className="text-[11px] font-semibold text-slate-700 leading-tight line-clamp-2">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
