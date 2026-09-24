/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Complaint, ComplaintStatus, NotificationItem, UserProfile } from './types';
import { INITIAL_COMPLAINTS, INITIAL_NOTIFICATIONS, INITIAL_USER } from './data/initialData';
import { MobileFrame } from './components/MobileFrame';
import { BottomNav, TabType } from './components/BottomNav';
import { HomeView } from './views/HomeView';
import { ComplaintsView } from './views/ComplaintsView';
import { RegisterComplaintView } from './views/RegisterComplaintView';
import { NotificationsView } from './views/NotificationsView';
import { ProfileView } from './views/ProfileView';
import { ComplaintDetailModal } from './components/ComplaintDetailModal';
import { TrackComplaintModal } from './components/TrackComplaintModal';
import { EditProfileModal } from './views/EditProfileModal';
import { SettingsModals } from './views/SettingsModals';

export default function App() {
  // Primary Navigation State
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [previousTab, setPreviousTab] = useState<TabType>('home');

  // Core Data States with localStorage caching for high responsiveness
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('campuscare_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    const saved = localStorage.getItem('campuscare_complaints');
    return saved ? JSON.parse(saved) : INITIAL_COMPLAINTS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('campuscare_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Filters & Pre-selections
  const [complaintsFilter, setComplaintsFilter] = useState<'all' | 'open' | 'resolved' | 'others'>('all');
  const [preselectedCategory, setPreselectedCategory] = useState<string | undefined>();

  // Modals
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [activeSettingModal, setActiveSettingModal] = useState<
    'notifications' | 'language' | 'help' | 'privacy' | 'about' | 'logout' | null
  >(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('campuscare_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('campuscare_complaints', JSON.stringify(complaints));
  }, [complaints]);

  useEffect(() => {
    localStorage.setItem('campuscare_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Unread notifications calculation
  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  // Tab Navigation with history
  const handleNavigateTab = (newTab: TabType) => {
    setPreviousTab(currentTab);
    setCurrentTab(newTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackNavigation = () => {
    if (currentTab !== 'home') {
      setCurrentTab('home');
    } else if (previousTab && previousTab !== currentTab) {
      setCurrentTab(previousTab);
    }
  };

  // Add a newly registered complaint
  const handleRegisterComplaint = (newComplaint: Complaint) => {
    setComplaints((prev) => [newComplaint, ...prev]);

    // Create an associated notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      type: 'update',
      title: 'Complaint Registered',
      message: `Your complaint ${newComplaint.id} has been registered successfully.`,
      time: 'Just now',
      dateGroup: 'Today',
      complaintId: newComplaint.id,
      read: false,
    };

    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Update complaint status dynamically (e.g. In Progress -> Resolved)
  const handleUpdateStatus = (id: string, newStatus: ComplaintStatus) => {
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const updatedTimeline = [
            ...c.timeline,
            {
              id: `t-${Date.now()}`,
              title: `Status: ${newStatus}`,
              timestamp: 'Just now',
              description: `Complaint status updated to ${newStatus}.`,
              actor: 'Campus Official',
            },
          ];
          return { ...c, status: newStatus, timeline: updatedTimeline };
        }
        return c;
      })
    );

    if (selectedComplaint && selectedComplaint.id === id) {
      setSelectedComplaint((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    // Add status update notification
    const statusNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      type: newStatus === 'Resolved' ? 'resolved' : 'update',
      title: newStatus === 'Resolved' ? 'Complaint Resolved' : 'Complaint Updated',
      message:
        newStatus === 'Resolved'
          ? `${id} has been resolved. Thank you for your patience!`
          : `Your complaint ${id} is now ${newStatus}.`,
      time: 'Just now',
      dateGroup: 'Today',
      complaintId: id,
      read: false,
    };

    setNotifications((prev) => [statusNotif, ...prev]);
  };

  // Mark all notifications as read
  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Click on a notification
  const handleSelectNotification = (notif: NotificationItem) => {
    // Mark this one as read
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
    );

    // If it has an associated complaint, open it
    if (notif.complaintId) {
      const match = complaints.find((c) => c.id === notif.complaintId);
      if (match) {
        setSelectedComplaint(match);
      }
    }
  };

  // Category selection on home screen
  const handleSelectCategoryFromHome = (categoryName: string) => {
    setPreselectedCategory(categoryName);
    handleNavigateTab('register');
  };

  // Complaint filter from home stat cards
  const handleFilterFromHome = (filter: 'all' | 'open' | 'resolved' | 'in_progress') => {
    if (filter === 'in_progress') {
      setComplaintsFilter('others');
    } else {
      setComplaintsFilter(filter);
    }
    handleNavigateTab('complaints');
  };

  // Reset to sample initial state
  const handleConfirmLogout = () => {
    localStorage.removeItem('campuscare_complaints');
    localStorage.removeItem('campuscare_notifications');
    localStorage.removeItem('campuscare_user');
    setUser(INITIAL_USER);
    setComplaints(INITIAL_COMPLAINTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setCurrentTab('home');
  };

  return (
    <MobileFrame>
      {/* Current Screen View */}
      <div className="flex-1 flex flex-col">
        {currentTab === 'home' && (
          <HomeView
            user={user}
            complaints={complaints}
            unreadNotificationsCount={unreadNotificationsCount}
            onNavigateTab={handleNavigateTab}
            onSelectComplaintFilter={handleFilterFromHome}
            onOpenTrackModal={() => setIsTrackModalOpen(true)}
            onSelectCategoryForNewComplaint={handleSelectCategoryFromHome}
            onSelectComplaint={(c) => setSelectedComplaint(c)}
          />
        )}

        {currentTab === 'complaints' && (
          <ComplaintsView
            complaints={complaints}
            selectedFilter={complaintsFilter}
            onFilterChange={setComplaintsFilter}
            onSelectComplaint={(c) => setSelectedComplaint(c)}
            onBack={handleBackNavigation}
          />
        )}

        {currentTab === 'register' && (
          <RegisterComplaintView
            onBack={handleBackNavigation}
            onSubmitSuccess={handleRegisterComplaint}
            initialCategory={preselectedCategory}
          />
        )}

        {currentTab === 'notifications' && (
          <NotificationsView
            notifications={notifications}
            onBack={handleBackNavigation}
            onMarkAllAsRead={handleMarkAllNotificationsRead}
            onSelectNotification={handleSelectNotification}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileView
            user={user}
            onBack={handleBackNavigation}
            onEditProfile={() => setIsEditProfileOpen(true)}
            onOpenSetting={(setting) => setActiveSettingModal(setting)}
          />
        )}
      </div>

      {/* Persistent Bottom Tab Navigation Bar */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={handleNavigateTab}
        unreadCount={unreadNotificationsCount}
      />

      {/* Global Interactive Modals */}
      {/* 1. Complaint Live Tracking & Detail Modal */}
      <ComplaintDetailModal
        complaint={selectedComplaint}
        onClose={() => setSelectedComplaint(null)}
        onUpdateStatus={handleUpdateStatus}
      />

      {/* 2. Track Complaint by CMP-ID Search Modal */}
      <TrackComplaintModal
        complaints={complaints}
        isOpen={isTrackModalOpen}
        onClose={() => setIsTrackModalOpen(false)}
        onSelectComplaint={(c) => setSelectedComplaint(c)}
      />

      {/* 3. Edit Profile Modal */}
      <EditProfileModal
        user={user}
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        onSave={(updated) => setUser(updated)}
      />

      {/* 4. Settings & Legal Modals */}
      <SettingsModals
        type={activeSettingModal}
        onClose={() => setActiveSettingModal(null)}
        onConfirmLogout={handleConfirmLogout}
      />
    </MobileFrame>
  );
}
