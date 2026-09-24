import React, { useState } from 'react';
import { NotificationItem } from '../types';
import { Header } from '../components/Header';
import {
  CheckCheck,
  RotateCw,
  Check,
  Mail,
  Megaphone,
  Bell,
  CheckCircle2,
} from 'lucide-react';

interface NotificationsViewProps {
  notifications: NotificationItem[];
  onBack: () => void;
  onMarkAllAsRead: () => void;
  onSelectNotification: (notif: NotificationItem) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  notifications,
  onBack,
  onMarkAllAsRead,
  onSelectNotification,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'updates' | 'messages' | 'announcements'>('all');

  const filteredNotifications = notifications.filter((item) => {
    if (activeFilter === 'updates') return item.type === 'update' || item.type === 'resolved';
    if (activeFilter === 'messages') return item.type === 'message';
    if (activeFilter === 'announcements') return item.type === 'announcement';
    return true;
  });

  const getNotificationIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'update':
        return (
          <div className="w-10 h-10 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0">
            <RotateCw className="w-4 h-4 stroke-[2.5]" />
          </div>
        );
      case 'resolved':
        return (
          <div className="w-10 h-10 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 stroke-[2.5]" />
          </div>
        );
      case 'message':
        return (
          <div className="w-10 h-10 rounded-full bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center shrink-0">
            <Mail className="w-4 h-4 stroke-[2.2]" />
          </div>
        );
      case 'announcement':
        return (
          <div className="w-10 h-10 rounded-full bg-[#F3E8FF] text-[#9333EA] flex items-center justify-center shrink-0">
            <Megaphone className="w-4 h-4 stroke-[2.2]" />
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
            <Bell className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50/50 pb-8">
      {/* Top Header */}
      <Header
        title="Notifications"
        onBack={onBack}
        rightAction={
          <button
            onClick={onMarkAllAsRead}
            className="p-2 text-blue-600 hover:text-blue-700 rounded-full hover:bg-blue-50 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            title="Mark all as read"
            aria-label="Mark all as read"
          >
            <CheckCheck className="w-5 h-5 stroke-[2.2]" />
          </button>
        }
      />

      {/* Filter Tabs / Pills */}
      <div className="px-4 py-3 bg-white border-b border-slate-100 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all min-h-[36px] ${
              activeFilter === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter('updates')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all min-h-[36px] ${
              activeFilter === 'updates'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
            }`}
          >
            Updates
          </button>
          <button
            onClick={() => setActiveFilter('messages')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all min-h-[36px] ${
              activeFilter === 'messages'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
            }`}
          >
            Messages
          </button>
          <button
            onClick={() => setActiveFilter('announcements')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all min-h-[36px] ${
              activeFilter === 'announcements'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
            }`}
          >
            Announcements
          </button>
        </div>
      </div>

      {/* Main List */}
      <div className="p-4 max-w-md mx-auto w-full space-y-4">
        {/* Section Header: "Today" */}
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">Today</h2>
        </div>

        {filteredNotifications.length === 0 ? (
          <div className="py-12 text-center bg-white rounded-2xl border border-slate-200 p-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
            <div className="text-xs font-bold text-slate-800">No new notifications</div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              You are all caught up with your updates.
            </div>
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => onSelectNotification(notif)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer select-none active:scale-[0.99] flex items-start gap-3.5 ${
                  notif.read
                    ? 'bg-white border-slate-200/90 shadow-2xs hover:border-blue-200'
                    : 'bg-blue-50/40 border-blue-200/80 shadow-xs hover:border-blue-300'
                }`}
              >
                {/* Icon */}
                {getNotificationIcon(notif.type)}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-900 leading-snug">
                      {notif.title}
                    </h3>
                    <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap ml-2">
                      {notif.time}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {notif.message}
                  </p>

                  {!notif.read && (
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      <span className="text-[10px] text-blue-600 font-bold">Unread</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
