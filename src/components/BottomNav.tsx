import React from 'react';
import { Home, FileText, Plus, Bell, User } from 'lucide-react';

export type TabType = 'home' | 'complaints' | 'register' | 'notifications' | 'profile';

interface BottomNavProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  unreadCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  unreadCount,
}) => {
  return (
    <div className="sticky bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200/90 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] select-none">
      <div className="max-w-md mx-auto grid grid-cols-5 items-center h-16 px-1 relative">
        {/* Tab 1: Home */}
        <button
          onClick={() => onSelectTab('home')}
          className="flex flex-col items-center justify-center py-1 transition-colors min-h-[44px]"
          aria-label="Home"
        >
          <Home
            className={`w-6 h-6 transition-transform ${
              currentTab === 'home'
                ? 'text-blue-600 fill-blue-600 scale-105'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          />
          <span
            className={`text-[11px] font-medium mt-1 tracking-tight ${
              currentTab === 'home' ? 'text-blue-600 font-semibold' : 'text-slate-500'
            }`}
          >
            Home
          </span>
        </button>

        {/* Tab 2: Complaints */}
        <button
          onClick={() => onSelectTab('complaints')}
          className="flex flex-col items-center justify-center py-1 transition-colors min-h-[44px]"
          aria-label="Complaints"
        >
          <FileText
            className={`w-6 h-6 transition-transform ${
              currentTab === 'complaints'
                ? 'text-blue-600 fill-blue-600 scale-105'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          />
          <span
            className={`text-[11px] font-medium mt-1 tracking-tight ${
              currentTab === 'complaints' ? 'text-blue-600 font-semibold' : 'text-slate-500'
            }`}
          >
            Complaints
          </span>
        </button>

        {/* Tab 3 (Center): Register Complaint Floating Action Button */}
        <div className="flex items-center justify-center relative">
          <button
            onClick={() => onSelectTab('register')}
            className="w-14 h-14 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(37,99,235,0.4)] transition-all -translate-y-4 border-4 border-white focus:outline-none focus:ring-4 focus:ring-blue-300"
            title="Register a New Complaint"
            aria-label="Register a New Complaint"
          >
            <Plus className="w-8 h-8 stroke-[2.5]" />
          </button>
        </div>

        {/* Tab 4: Notifications */}
        <button
          onClick={() => onSelectTab('notifications')}
          className="flex flex-col items-center justify-center py-1 transition-colors relative min-h-[44px]"
          aria-label="Notifications"
        >
          <div className="relative">
            <Bell
              className={`w-6 h-6 transition-transform ${
                currentTab === 'notifications'
                  ? 'text-blue-600 fill-blue-600 scale-105'
                : 'text-slate-500 hover:text-slate-700'
              }`}
            />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1.5 min-w-4 h-4 px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </div>
          <span
            className={`text-[11px] font-medium mt-1 tracking-tight ${
              currentTab === 'notifications' ? 'text-blue-600 font-semibold' : 'text-slate-500'
            }`}
          >
            Notifications
          </span>
        </button>

        {/* Tab 5: Profile */}
        <button
          onClick={() => onSelectTab('profile')}
          className="flex flex-col items-center justify-center py-1 transition-colors min-h-[44px]"
          aria-label="Profile"
        >
          <User
            className={`w-6 h-6 transition-transform ${
              currentTab === 'profile'
                ? 'text-blue-600 fill-blue-600 scale-105'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          />
          <span
            className={`text-[11px] font-medium mt-1 tracking-tight ${
              currentTab === 'profile' ? 'text-blue-600 font-semibold' : 'text-slate-500'
            }`}
          >
            Profile
          </span>
        </button>
      </div>
    </div>
  );
};
