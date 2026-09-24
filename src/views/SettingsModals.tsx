import React, { useState } from 'react';
import { X, Bell, Globe, HelpCircle, Shield, Info, LogOut, Check } from 'lucide-react';

interface SettingsModalProps {
  type: 'notifications' | 'language' | 'help' | 'privacy' | 'about' | 'logout' | null;
  onClose: () => void;
  onConfirmLogout?: () => void;
}

export const SettingsModals: React.FC<SettingsModalProps> = ({
  type,
  onClose,
  onConfirmLogout,
}) => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [language, setLanguage] = useState('English');

  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            {type === 'notifications' && <Bell className="w-5 h-5 text-blue-600" />}
            {type === 'language' && <Globe className="w-5 h-5 text-blue-600" />}
            {type === 'help' && <HelpCircle className="w-5 h-5 text-blue-600" />}
            {type === 'privacy' && <Shield className="w-5 h-5 text-blue-600" />}
            {type === 'about' && <Info className="w-5 h-5 text-blue-600" />}
            {type === 'logout' && <LogOut className="w-5 h-5 text-red-600" />}
            <h3 className="text-base font-bold text-slate-900">
              {type === 'notifications' && 'Notification Settings'}
              {type === 'language' && 'App Language'}
              {type === 'help' && 'Help & Support'}
              {type === 'privacy' && 'Privacy & Security'}
              {type === 'about' && 'About CampusCare'}
              {type === 'logout' && 'Log Out Account'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="mt-4 overflow-y-auto space-y-4 pr-1 text-xs">
          {/* Notifications Setting */}
          {type === 'notifications' && (
            <div className="space-y-3">
              <p className="text-slate-500">
                Choose how and when you receive real-time updates regarding your campus grievances.
              </p>
              <div className="space-y-2">
                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50">
                  <div>
                    <div className="font-semibold text-slate-800 text-sm">Push Notifications</div>
                    <div className="text-slate-500 text-[11px]">Instant alerts on status transitions</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={pushAlerts}
                    onChange={(e) => setPushAlerts(e.target.checked)}
                    className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
                  />
                </label>
                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50">
                  <div>
                    <div className="font-semibold text-slate-800 text-sm">College Email Digest</div>
                    <div className="text-slate-500 text-[11px]">Emails sent to shivanesh@college.edu.in</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                    className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
                  />
                </label>
                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50">
                  <div>
                    <div className="font-semibold text-slate-800 text-sm">SMS Alerts (Urgent Only)</div>
                    <div className="text-slate-500 text-[11px]">Emergency safety & security notices</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={smsAlerts}
                    onChange={(e) => setSmsAlerts(e.target.checked)}
                    className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
                  />
                </label>
              </div>
            </div>
          )}

          {/* Language Selection */}
          {type === 'language' && (
            <div className="space-y-2">
              {['English', 'Tamil (தமிழ்)', 'Hindi (हिन्दी)', 'Telugu (తెలుగు)', 'Malayalam (മലയാളം)'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang.split(' ')[0]);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-left text-sm font-medium transition-colors ${
                    language === lang.split(' ')[0]
                      ? 'border-blue-500 bg-blue-50/50 text-blue-700 font-bold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span>{lang}</span>
                  {language === lang.split(' ')[0] && <Check className="w-4 h-4 text-blue-600" />}
                </button>
              ))}
            </div>
          )}

          {/* Help & Support */}
          {type === 'help' && (
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                <div className="font-bold text-blue-900 text-sm mb-1">Campus Emergency 24/7 Hotline</div>
                <div className="text-blue-800 font-mono text-sm font-bold">+91 431 269 0500</div>
                <div className="text-[11px] text-blue-600 mt-1">Direct connect to Campus Security and Ambulance</div>
              </div>

              <div className="space-y-2">
                <div className="p-2.5 rounded-lg border border-slate-200">
                  <div className="font-semibold text-slate-800">Student Grievance Cell Email</div>
                  <div className="text-slate-500 font-mono">grievance@college.edu.in</div>
                </div>
                <div className="p-2.5 rounded-lg border border-slate-200">
                  <div className="font-semibold text-slate-800">Chief Proctor Office</div>
                  <div className="text-slate-500">Administrative Block, Room 102</div>
                </div>
                <div className="p-2.5 rounded-lg border border-slate-200">
                  <div className="font-semibold text-slate-800">IT & Wi-Fi Helpdesk</div>
                  <div className="text-slate-500">Computer Center, Ground Floor (Ext: 241)</div>
                </div>
              </div>
            </div>
          )}

          {/* Privacy & Security */}
          {type === 'privacy' && (
            <div className="space-y-3 text-slate-600 leading-relaxed text-xs">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900">
                <span className="font-bold block mb-1">Whistleblower & Anonymous Protection</span>
                Grievances marked "Anonymous" automatically strip student identification, IP address, and metadata before transmission to committees.
              </div>
              <p>
                CampusCare complies with national educational grievance redressal regulations. Data is stored on encrypted campus cloud infrastructure with role-based access control.
              </p>
              <div className="font-semibold text-slate-800">Data Retention:</div>
              <p>
                Resolved complaints are archived for 3 academic years for audit and UGC accreditation compliance.
              </p>
            </div>
          )}

          {/* About CampusCare */}
          {type === 'about' && (
            <div className="space-y-3 text-center py-2">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white mx-auto flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/30">
                CC
              </div>
              <h4 className="font-bold text-base text-slate-900">CampusCare Portal</h4>
              <p className="text-xs text-blue-600 font-semibold font-mono">v1.0.0 (Production Release)</p>
              <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                Official Campus Grievance Redressal & Facilities Management System. Designed for transparent tracking, faster issue resolution, and a harmonious campus environment.
              </p>
              <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-100">
                © 2026 CampusCare Education Systems. All Rights Reserved.
              </div>
            </div>
          )}

          {/* Log Out Confirm */}
          {type === 'logout' && (
            <div className="space-y-3 py-2 text-center">
              <p className="text-sm text-slate-600">
                Are you sure you want to log out of your session as <span className="font-bold text-slate-900">Shivanesh R (22CS1007)</span>?
              </p>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 border border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 min-h-[44px]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (onConfirmLogout) onConfirmLogout();
                    onClose();
                  }}
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold min-h-[44px] shadow-sm"
                >
                  Confirm Log Out
                </button>
              </div>
            </div>
          )}
        </div>

        {type !== 'logout' && (
          <div className="pt-4 mt-2 border-t border-slate-100">
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-xs transition-colors min-h-[44px]"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
