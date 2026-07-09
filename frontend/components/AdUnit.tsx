import React, { useEffect, useRef } from 'react';
import { AdProps } from '../types.ts';

export const AdUnit: React.FC<AdProps> = ({ slotId = "auto", format = "auto", className = "", style }) => {
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    // Prevent multiple initializations in React strict mode
    if (initialized.current) return;
    
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      initialized.current = true;
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, []);

  return (
    <div className={`relative bg-dark-200 border border-dark-100 rounded-lg overflow-hidden flex items-center justify-center ${className}`} style={style}>
      {/* Placeholder text for development/adblockers */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 text-xs pointer-events-none">
        <span className="font-semibold tracking-widest uppercase mb-1">Advertisement</span>
        <span>Support MSIMobsen Music</span>
      </div>
      
      <ins
        ref={adRef}
        className="adsbygoogle relative z-10 w-full h-full"
        style={{ display: 'block', ...style }}
        data-ad-client="ca-pub-9501043041040319"
        data-ad-slot={slotId !== "auto" ? slotId : undefined}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};
