'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowStore } from '@/store/windowStore';
import {
  Wifi,
  Battery,
  Volume2,
  Menu,
} from 'lucide-react';

export const Taskbar: React.FC = () => {
  const { windows, focusWindow, minimizeWindow, activeWindowId } = useWindowStore();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showStartMenu, setShowStartMenu] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Get all windows that are initialized in the store (isOpen = true)
  const runningWindows = Object.values(windows).filter(w => w.isOpen);
  
  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-[#090b11]/90 backdrop-blur-md border-t border-gray-800/60 flex items-center justify-between px-4 z-[9999] select-none font-sans">
      {/* Start Button & Running Apps */}
      <div className="flex items-center space-x-3 flex-1 overflow-hidden mr-4">
        {/* Start Button */}
        <button
          onClick={() => setShowStartMenu(!showStartMenu)}
          className={`p-2 rounded-lg transition-colors flex items-center justify-center border ${showStartMenu ? 'bg-blue-600/20 border-blue-500/40 text-blue-400' : 'bg-transparent border-transparent hover:bg-gray-800/40 text-gray-400 hover:text-white'}`}
          title="App Menu"
        >
          <Menu size={16} />
        </button>

        {/* Start Menu Popup */}
        <AnimatePresence>
          {showStartMenu && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-14 left-4 w-64 bg-[#0f111a]/95 backdrop-blur-md border border-gray-800/80 rounded-xl shadow-2xl p-4 flex flex-col space-y-3 z-[99999]"
            >
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-800/60 pb-2">
                Running Applications
              </div>
              <div className="flex flex-col space-y-1 max-h-48 overflow-y-auto">
                {runningWindows.length === 0 ? (
                  <div className="text-xs text-gray-500 py-2 italic text-center">No active applications</div>
                ) : (
                  runningWindows.map((w) => (
                    <button
                      key={w.id}
                      onClick={() => {
                        focusWindow(w.id);
                        setShowStartMenu(false);
                      }}
                      className="flex items-center space-x-2.5 px-2 py-1.5 rounded-lg text-xs hover:bg-gray-800/60 text-gray-300 hover:text-white text-left transition-colors"
                    >
                      <div className="text-blue-400">{w.icon}</div>
                      <span className="truncate">{w.title}</span>
                    </button>
                  ))
                )}
              </div>
              <div className="border-t border-gray-800/60 pt-2 flex items-center justify-between">
                <span className="text-[9px] text-gray-500 font-mono">User: sehwaaj</span>
                <span className="text-[9px] text-gray-500 font-mono">OS: v2.0.1</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Open Windows Buttons */}
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1">
          {runningWindows.map((window) => {
            const isActive = window.id === activeWindowId && !window.isMinimized;
            return (
              <motion.button
                key={window.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-3 py-1.5 rounded-lg text-xs flex items-center space-x-2 transition-all border shrink-0 ${
                  isActive 
                    ? 'bg-blue-600/10 border-blue-500/30 text-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.15)]' 
                    : window.isMinimized
                    ? 'bg-transparent border-transparent hover:bg-gray-800/40 text-gray-500 hover:text-gray-300'
                    : 'bg-gray-800/30 border-gray-800 hover:bg-gray-800/50 text-gray-300'
                }`}
                onClick={() => {
                  if (window.isMinimized) {
                    focusWindow(window.id);
                  } else if (isActive) {
                    minimizeWindow(window.id);
                  } else {
                    focusWindow(window.id);
                  }
                }}
              >
                <div className={isActive ? 'text-blue-400' : 'text-gray-400'}>{window.icon}</div>
                <span className="max-w-[80px] md:max-w-[120px] truncate">{window.title}</span>
                {/* Active indicator dot */}
                <div className={`w-1 h-1 rounded-full ${isActive ? 'bg-blue-400' : window.isMinimized ? 'bg-gray-600' : 'bg-gray-400'}`} />
              </motion.button>
            );
          })}
        </div>
      </div>
      
      {/* System Tray */}
      <div className="flex items-center space-x-4 text-gray-500 text-xs font-mono shrink-0">
        <div className="hidden sm:flex items-center space-x-3 border-r border-gray-800/60 pr-4">
          <Wifi size={14} className="hover:text-blue-400 transition-colors" />
          <Volume2 size={14} className="hover:text-blue-400 transition-colors" />
          <Battery size={14} className="hover:text-blue-400 transition-colors" />
        </div>
        
        {/* Clock */}
        <div className="text-right flex flex-col justify-center pl-1 leading-tight">
          <div className="text-gray-200 font-semibold text-[11px]">{formatTime(currentTime)}</div>
          <div className="text-[9px] text-gray-500">{formatDate(currentTime)}</div>
        </div>
      </div>
    </div>
  );
};
export default Taskbar;
