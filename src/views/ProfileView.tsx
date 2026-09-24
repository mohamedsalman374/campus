import React from 'react';
import { UserProfile } from '../types';
import { Header } from '../components/Header';
import { AvatarIllustration } from '../components/AvatarIllustration';
import {
  Bell,
  Globe,
  HelpCircle,
  Shield,
  Info,
  LogOut,
  Pencil,
  ChevronRight,
  Settings,
} from 'lucide-react';

interface ProfileViewProps {
  user: UserProfile;
  onBack: () => void;
  onEditProfile: () => void;
  onOpenSetting: (setting: 'notifications' | 'language' | 'help' | 'privacy' | 'about' | 'logout') => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  onBack,
  onEditProfile,
  onOpenSetting,
}) => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50/50 pb-8">
      {/* Header */}
      <Header
        title="My Profile"
        onBack={onBack}
        rightAction={
          <button
            onClick={() => onOpenSetting('notifications')}
            className="p-2 text-slate-700 hover:text-slate-900 rounded-full hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
            title="Settings"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5 stroke-[2.2]" />
          </button>
        }
      />

      {/* Main Content */}
      <div className="p-5 max-w-md mx-auto w-full space-y-5">
        {/* User Card Header */}
        <div className="flex flex-col items-center text-center pt-2">
          {/* Large Avatar with camera badge */}
          <AvatarIllustration
            size="xl"
            showBadge={true}
            badgeType="camera"
            onCameraClick={onEditProfile}
          />

          {/* User Information */}
          <h2 className="text-xl font-extrabold text-slate-900 mt-3.5 tracking-tight">
            {user.name}
          </h2>

          <span className="text-sm font-bold text-blue-600 mt-1 font-mono tracking-wide">
            {user.rollNumber}
          </span>

          <p className="text-xs text-slate-500 mt-1 font-medium">
            {user.department}
          </p>

          <p className="text-xs text-slate-400 mt-0.5 font-mono">
            {user.email}
          </p>

          {/* Edit Profile Button */}
          <button
            onClick={onEditProfile}
            className="w-full mt-4 py-2.5 px-4 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50/60 active:scale-[0.99] rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-2xs min-h-[44px]"
          >
            <Pencil className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Settings List Group (White Card) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden divide-y divide-slate-100">
          {/* Notification Settings */}
          <button
            onClick={() => onOpenSetting('notifications')}
            className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="text-xs font-semibold text-slate-800">
                Notification Settings
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* Language */}
          <button
            onClick={() => onOpenSetting('language')}
            className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-slate-600" />
              <span className="text-xs font-semibold text-slate-800">
                Language
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <span>English</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </button>

          {/* Help & Support */}
          <button
            onClick={() => onOpenSetting('help')}
            className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-slate-600" />
              <span className="text-xs font-semibold text-slate-800">
                Help & Support
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* Privacy & Security */}
          <button
            onClick={() => onOpenSetting('privacy')}
            className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-slate-600" />
              <span className="text-xs font-semibold text-slate-800">
                Privacy & Security
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* About CampusCare */}
          <button
            onClick={() => onOpenSetting('about')}
            className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-slate-600" />
              <span className="text-xs font-semibold text-slate-800">
                About CampusCare
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
              <span>v1.0.0</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </button>
        </div>

        {/* Log Out Button */}
        <div className="pt-2">
          <button
            onClick={() => onOpenSetting('logout')}
            className="w-full py-3 bg-[#FEE2E2] hover:bg-[#FECACA] active:scale-[0.99] text-[#EF4444] rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all min-h-[46px]"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
