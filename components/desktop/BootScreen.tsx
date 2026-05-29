'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BootScreenProps {
  onComplete: () => void;
}

const bootMessages = [
  { text: 'Initializing SehwaajOS v2.0.1...', delay: 150 },
  { text: 'Loading kernel modules...', delay: 100 },
  { text: 'Starting systemd services...', delay: 80 },
  { text: 'Mounting file systems... [OK]', delay: 120 },
  { text: 'Starting Docker daemon... [OK]', delay: 180 },
  { text: 'Initializing network interfaces... [OK]', delay: 100 },
  { text: 'Starting Kubernetes cluster (minikube)... [OK]', delay: 150 },
  { text: 'Loading monitoring stack (Prometheus + Grafana)... [OK]', delay: 120 },
  { text: 'Deploying Wazuh agents... [OK]', delay: 100 },
  { text: 'Starting VPN services (WireGuard)... [OK]', delay: 120 },
  { text: 'Mounting NAS storage... [OK]', delay: 90 },
  { text: 'Initializing AWS CLI profiles... [OK]', delay: 80 },
  { text: 'Loading Terraform state... [OK]', delay: 120 },
  { text: 'Starting Nginx reverse proxy... [OK]', delay: 100 },
  { text: 'Authenticating user...', delay: 150 },
  { text: 'Loading desktop environment...', delay: 200 },
  { text: 'Welcome, sehwaaj!', delay: 300 },
];

export const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [skipEnabled, setSkipEnabled] = useState(false);
  
  useEffect(() => {
    // Blinking cursor
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);
  
  useEffect(() => {
    // Enable skip after 1 second
    const skipTimer = setTimeout(() => {
      setSkipEnabled(true);
    }, 1000);
    
    return () => clearTimeout(skipTimer);
  }, []);
  
  useEffect(() => {
    if (currentIndex >= bootMessages.length) {
      const finishTimer = setTimeout(onComplete, 300);
      return () => clearTimeout(finishTimer);
    }
    
    const timer = setTimeout(() => {
      setMessages(prev => [...prev, bootMessages[currentIndex].text]);
      setCurrentIndex(prev => prev + 1);
    }, bootMessages[currentIndex].delay);
    
    return () => clearTimeout(timer);
  }, [currentIndex, onComplete]);
  
  const handleSkip = () => {
    if (skipEnabled) {
      onComplete();
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center font-mono select-none"
      onClick={handleSkip}
    >
      <div className="w-full max-w-2xl p-8 max-h-[80vh] overflow-y-auto">
        <div className="mb-8 text-center">
          <motion.h1
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="text-green-500 text-4xl font-bold mb-2 tracking-widest drop-shadow-[0_0_10px_rgba(34,197,94,0.4)]"
          >
            SehwaajOS
          </motion.h1>
          <p className="text-green-400/60 text-xs font-semibold uppercase tracking-wider">Cloud Engineering Workstation</p>
        </div>
        
        <div className="space-y-1.5 max-h-96 overflow-y-auto">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-green-400/80 text-xs md:text-sm flex items-center"
            >
              <span className="text-green-600 mr-2">❯</span>
              <span className="text-green-300 font-medium">{message}</span>
            </motion.div>
          ))}
          
          {currentIndex < bootMessages.length && (
            <div className="flex items-center text-green-500">
              <span className="mr-1">❯</span>
              <motion.span
                animate={{ opacity: showCursor ? 1 : 0 }}
                className="w-2 h-4 bg-green-500"
              />
            </div>
          )}
        </div>
        
        {skipEnabled && currentIndex < bootMessages.length && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 text-xs mt-10 hover:text-green-400 cursor-pointer transition-colors"
          >
            Click anywhere to skip boot sequence
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};
export default BootScreen;
