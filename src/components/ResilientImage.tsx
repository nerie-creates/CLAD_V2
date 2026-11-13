import React, { useState } from 'react';
import { Shield } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
  accentHex?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackLabel,
  accentHex = '#2563EB',
}) => {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#F3F4F6] text-[#52525B] p-6 select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 border border-black/10 bg-white"
          style={{ color: accentHex }}
        >
          <Shield className="w-6 h-6" />
        </div>
        <span className="text-xs font-medium text-center text-[#111827] max-w-[16ch] leading-snug">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
      loading="lazy"
    />
  );
};
