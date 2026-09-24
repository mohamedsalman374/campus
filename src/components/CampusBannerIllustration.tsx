import React from 'react';

export const CampusBannerIllustration: React.FC = () => {
  return (
    <div className="relative w-36 h-28 flex-shrink-0 select-none overflow-hidden">
      <svg
        viewBox="0 0 160 120"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft background glow */}
        <circle cx="95" cy="50" r="45" fill="#3B82F6" opacity="0.35" />

        {/* Green lush campus hills behind building */}
        <ellipse cx="40" cy="115" rx="55" ry="32" fill="#0E623B" />
        <ellipse cx="125" cy="115" rx="50" ry="34" fill="#0A502F" />
        <ellipse cx="90" cy="118" rx="75" ry="28" fill="#147A49" />

        {/* Dome spire / flagpole */}
        <line x1="95" y1="18" x2="95" y2="30" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
        <circle cx="95" cy="18" r="2.5" fill="#F59E0B" />

        {/* Blue Dome */}
        <path
          d="M75 44 C75 29 115 29 115 44 Z"
          fill="#0284C7"
        />
        {/* Dome base rim */}
        <rect x="73" y="44" width="44" height="4" rx="1.5" fill="#38BDF8" />

        {/* Pediment roof triangle */}
        <path
          d="M60 48 L95 36 L130 48 Z"
          fill="#E2E8F0"
        />
        <path
          d="M63 48 L95 38 L127 48 Z"
          fill="#F1F5F9"
        />
        {/* Pediment border highlight */}
        <path
          d="M60 48 L95 36 L130 48"
          stroke="#CBD5E1"
          strokeWidth="1.5"
        />

        {/* Main building facade */}
        <rect x="67" y="48" width="56" height="52" fill="#FFFFFF" rx="1" />
        <rect x="67" y="48" width="56" height="4" fill="#E2E8F0" />

        {/* Windows - Upper row */}
        <rect x="73" y="56" width="7" height="9" rx="1" fill="#2563EB" />
        <rect x="83" y="56" width="7" height="9" rx="1" fill="#2563EB" />
        <rect x="100" y="56" width="7" height="9" rx="1" fill="#2563EB" />
        <rect x="110" y="56" width="7" height="9" rx="1" fill="#2563EB" />

        {/* Arched Center Doorway */}
        <path
          d="M89 100 V78 C89 74 101 74 101 78 V100 Z"
          fill="#1E3A8A"
        />
        {/* Door transom detail */}
        <path
          d="M89 78 C89 74 101 74 101 78"
          stroke="#93C5FD"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Windows - Lower side row */}
        <rect x="73" y="74" width="7" height="9" rx="1" fill="#2563EB" />
        <rect x="110" y="74" width="7" height="9" rx="1" fill="#2563EB" />

        {/* Steps in front of entrance */}
        <rect x="85" y="98" width="20" height="3" fill="#CBD5E1" rx="0.5" />
        <rect x="82" y="101" width="26" height="3" fill="#94A3B8" rx="0.5" />

        {/* Foreground bushes */}
        <circle cx="58" cy="104" r="9" fill="#16A34A" />
        <circle cx="68" cy="106" r="7" fill="#22C55E" />
        <circle cx="124" cy="104" r="8" fill="#16A34A" />
        <circle cx="134" cy="107" r="7" fill="#22C55E" />
      </svg>
    </div>
  );
};
