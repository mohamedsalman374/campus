import React from 'react';

interface AvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  badgeType?: 'status' | 'camera';
  onCameraClick?: () => void;
  imageUrl?: string;
  className?: string;
}

export const AvatarIllustration: React.FC<AvatarProps> = ({
  size = 'md',
  showBadge = true,
  badgeType = 'status',
  onCameraClick,
  imageUrl,
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24',
  };

  const isLarge = size === 'lg' || size === 'xl';

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        className={`${sizeMap[size]} rounded-full overflow-hidden flex items-center justify-center shadow-inner border border-white/40`}
        style={{ backgroundColor: '#648873' }}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="User Avatar" className="w-full h-full object-cover" />
        ) : (
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full transform translate-y-1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background disc */}
            <circle cx="50" cy="50" r="50" fill="#648873" />
            
            {/* Shirt / Shoulders */}
            <path
              d="M15 98 C15 78 30 70 50 70 C70 70 85 78 85 98 Z"
              fill="#52745F"
            />
            {/* White Collar / V-neck */}
            <path
              d="M40 70 L50 82 L60 70 L55 68 L50 72 L45 68 Z"
              fill="#FFFFFF"
            />

            {/* Neck */}
            <rect x="44" y="58" width="12" height="15" rx="2" fill="#F4C29E" />

            {/* Face */}
            <ellipse cx="50" cy="46" rx="22" ry="22" fill="#F8CBB0" />

            {/* Ears */}
            <ellipse cx="28" cy="47" rx="3.5" ry="5.5" fill="#E8B597" />
            <ellipse cx="72" cy="47" rx="3.5" ry="5.5" fill="#E8B597" />

            {/* Hair */}
            <path
              d="M27 44 C27 26 36 21 50 21 C64 21 73 26 73 44 C67 36 60 35 50 35 C38 35 32 37 27 44 Z"
              fill="#2D2B2A"
            />

            {/* Eyes */}
            <circle cx="43" cy="46" r="2.2" fill="#2D2B2A" />
            <circle cx="57" cy="46" r="2.2" fill="#2D2B2A" />
            <circle cx="43.8" cy="45.2" r="0.7" fill="#FFFFFF" />
            <circle cx="57.8" cy="45.2" r="0.7" fill="#FFFFFF" />

            {/* Eyebrows */}
            <path d="M40 41 Q43 39 46 41" stroke="#2D2B2A" strokeWidth="1" strokeLinecap="round" />
            <path d="M54 41 Q57 39 60 41" stroke="#2D2B2A" strokeWidth="1" strokeLinecap="round" />

            {/* Smile */}
            <path
              d="M45 53 Q50 58 55 53"
              stroke="#B26A4A"
              strokeWidth="1.6"
              strokeLinecap="round"
              fill="none"
            />

            {/* Cheek blush */}
            <circle cx="39" cy="51" r="2.5" fill="#F29F80" opacity="0.4" />
            <circle cx="61" cy="51" r="2.5" fill="#F29F80" opacity="0.4" />
          </svg>
        )}
      </div>

      {showBadge && badgeType === 'status' && (
        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full ring-1 ring-emerald-400"></span>
      )}

      {showBadge && badgeType === 'camera' && (
        <button
          onClick={onCameraClick}
          type="button"
          className="absolute -bottom-1 -right-1 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md transition-transform hover:scale-105 active:scale-95 border-2 border-white"
          title="Change Profile Picture"
          aria-label="Change photo"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
};
