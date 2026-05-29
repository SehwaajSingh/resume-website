'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface DesktopIconProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  accentClass?: string;
  style?: React.CSSProperties;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ icon: Icon, label, onClick, accentClass = 'text-blue-400 border-blue-500/20 bg-blue-500/10', style }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={style}
      className="absolute flex flex-col items-center justify-center p-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/5 w-24 h-[88px] text-center cursor-pointer transition-colors duration-200 select-none group focus:outline-none"
    >
      <div className={`relative p-2.5 rounded-lg backdrop-blur-sm border transition-all shadow-lg flex items-center justify-center ${accentClass}`}>
        <Icon className="w-6.5 h-6.5 transition-colors filter drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]" />
      </div>
      <span className="mt-1.5 text-[10px] font-semibold text-gray-300 group-hover:text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] max-w-[92px] leading-tight font-mono tracking-tight whitespace-normal break-words">
        {label}
      </span>
    </motion.button>
  );
};
export default DesktopIcon;
