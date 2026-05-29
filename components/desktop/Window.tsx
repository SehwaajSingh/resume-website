'use client';

import React, { useRef, useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minimize2, Maximize2 } from 'lucide-react';
import { useWindowStore } from '@/store/windowStore';
import { WindowState } from '@/types/window';

interface WindowProps {
  window: WindowState;
}

export const Window: React.FC<WindowProps> = ({ window }) => {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updatePosition } = useWindowStore();
  const [isDragging, setIsDragging] = useState(false);
  const [mounted, setMounted] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeWindow(window.id);
  };
  
  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    minimizeWindow(window.id);
  };
  
  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    maximizeWindow(window.id);
  };
  
  if (!mounted) return null;

  return (
    <AnimatePresence>
      {window.isOpen && !window.isMinimized && (
        <Draggable
          nodeRef={nodeRef}
          handle=".window-titlebar"
          position={window.isMaximized ? { x: 0, y: 0 } : window.position}
          bounds="parent"
          disabled={window.isMaximized}
          onStart={() => {
            setIsDragging(true);
            focusWindow(window.id);
          }}
          onDrag={(_, data) => updatePosition(window.id, { x: data.x, y: data.y })}
          onStop={(_, data) => {
            setIsDragging(false);
            updatePosition(window.id, { x: data.x, y: data.y });
          }}
          onMouseDown={() => focusWindow(window.id)}
        >
          <motion.div
            ref={nodeRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              ...(window.isMaximized ? {
                width: '100vw',
                height: 'calc(100vh - 48px)', // leave space for taskbar
              } : {
                width: window.size.width,
                height: window.size.height,
              })
            }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute rounded-xl overflow-hidden shadow-2xl border border-gray-700/50 flex flex-col ${
              window.isMaximized ? 'fixed top-0 left-0 rounded-none border-none' : ''
            }`}
            style={{
              zIndex: window.zIndex,
              backdropFilter: 'blur(20px)',
              backgroundColor: 'rgba(15, 17, 26, 0.95)',
            }}
          >
            {/* Title Bar */}
            <div className="window-titlebar flex items-center justify-between px-4 py-2.5 bg-[#141622]/90 border-b border-gray-800/80 cursor-move select-none">
              <div className="flex items-center space-x-2">
                <div className="text-gray-400 group-hover:text-white transition-colors">
                  {window.icon}
                </div>
                <span className="text-xs font-semibold text-gray-300 font-mono tracking-wide">{window.title}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleMinimize}
                  className="p-1 rounded hover:bg-gray-700/50 transition-colors"
                  title="Minimize"
                >
                  <Minimize2 size={12} className="text-gray-400" />
                </button>
                <button
                  onClick={handleMaximize}
                  className="p-1 rounded hover:bg-gray-700/50 transition-colors"
                  title={window.isMaximized ? 'Restore' : 'Maximize'}
                >
                  <Maximize2 size={12} className="text-gray-400" />
                </button>
                <button
                  onClick={handleClose}
                  className="p-1 rounded hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                  title="Close"
                >
                  <X size={12} />
                </button>
              </div>
            </div>
            
            {/* Window Content */}
            <div className="flex-1 overflow-hidden relative">
              <window.component
                id={window.id}
                onClose={() => closeWindow(window.id)}
                onMinimize={() => minimizeWindow(window.id)}
                onMaximize={() => maximizeWindow(window.id)}
                {...window.props}
              />
            </div>
          </motion.div>
        </Draggable>
      )}
    </AnimatePresence>
  );
};
export default Window;
