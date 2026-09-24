import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, onBack, rightAction }) => {
  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-slate-100 sticky top-[37px] z-20">
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="p-1.5 -ml-1.5 text-slate-700 hover:text-slate-900 rounded-full hover:bg-slate-100 active:scale-95 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>
        )}
        <h1 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h1>
      </div>

      {rightAction && (
        <div className="flex items-center">
          {rightAction}
        </div>
      )}
    </div>
  );
};
