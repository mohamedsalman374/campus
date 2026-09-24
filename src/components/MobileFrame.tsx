import React from 'react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-start font-sans antialiased text-slate-800">
      {/* Top Header Banner */}
      <header className="w-full bg-slate-900 text-slate-200 text-xs py-2.5 px-4 flex items-center justify-between shadow-xs sticky top-0 z-50">
        <div className="flex items-center gap-2 max-w-lg mx-auto w-full">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold tracking-wide text-white">CampusCare Portal</span>
          <span className="text-slate-400">· Official Student Grievance System</span>
        </div>
      </header>

      {/* Main Container */}
      <div className="w-full flex-1 flex justify-center py-0 sm:py-4 px-0 sm:px-2">
        <div className="w-full max-w-lg bg-white sm:rounded-2xl shadow-sm border-0 sm:border border-slate-200/80 flex flex-col min-h-[calc(100vh-42px)]">
          {/* Child app view */}
          <main className="flex-1 flex flex-col bg-slate-50/50">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

