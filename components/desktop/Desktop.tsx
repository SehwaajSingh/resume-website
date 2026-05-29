'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowStore } from '@/store/windowStore';
import { Window } from './Window';
import { DesktopIcon } from './DesktopIcon';
import { Taskbar } from './Taskbar';
import { BootScreen } from './BootScreen';

import {
  Folder,
  FileText,
  Terminal as TerminalIcon,
  Shield,
  Cloud,
  Github,
  Mail,
  Award,
  User,
  Cpu,
  Layers,
  Clock3,
  ShieldAlert,
} from 'lucide-react';

// Import our custom desktop apps
import { Terminal } from '../apps/Terminal';
import { FileExplorer } from '../apps/FileExplorer';
import { ResumeViewer } from '../apps/ResumeViewer';
import { Skills } from '../apps/Skills';
import { AboutMe } from '../apps/AboutMe';
import { CyberLab } from '../apps/CyberLab';
import { AWSLab } from '../apps/AWSLab';
import { GitHubApp } from '../apps/GitHubApp';
import { Contact } from '../apps/Contact';

const DesktopWidget: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}> = ({ title, icon, children, className = '' }) => (
  <div className={`rounded-lg border border-white/10 bg-[#0b0d13]/78 backdrop-blur-md shadow-2xl ${className}`}>
    <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
        {icon}
        <span>{title}</span>
      </div>
      <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
    </div>
    {children}
  </div>
);

const DesktopWidgets: React.FC = () => {
  const [now, setNow] = useState(new Date());
  const [cpu, setCpu] = useState(27);
  const [ram, setRam] = useState(51);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
      setCpu((prev) => Math.max(12, Math.min(76, prev + Math.round(Math.random() * 10 - 5))));
      setRam((prev) => Math.max(38, Math.min(82, prev + Math.round(Math.random() * 4 - 2))));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const date = now.toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short' });
  const metrics = [
    { label: 'CPU', value: cpu, bar: 'bg-rose-400' },
    { label: 'RAM', value: ram, bar: 'bg-amber-400' },
  ];

  return (
    <div className="pointer-events-none absolute bottom-20 right-5 top-5 hidden w-[300px] flex-col gap-3 xl:flex z-0">
      <DesktopWidget title="Ludhiana Clock" icon={<Clock3 size={13} className="text-cyan-300" />} className="shrink-0">
        <div className="px-4 py-4">
          <div className="text-3xl font-bold text-white tabular-nums tracking-normal">{time}</div>
          <div className="mt-1 text-xs text-gray-500">{date} / Asia-Kolkata</div>
        </div>
      </DesktopWidget>

      <DesktopWidget title="Host Metrics" icon={<Cpu size={13} className="text-rose-300" />}>
        <div className="space-y-3 px-4 py-4 text-xs">
          {metrics.map(({ label, value, bar }) => (
            <div key={label}>
              <div className="mb-1 flex justify-between font-mono text-gray-400">
                <span>{label}</span>
                <span className="text-white">{value}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-gray-900">
                <div className={`h-full rounded-full ${bar}`} style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
          <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[10px] text-gray-500">
            <span>EC2 Ubuntu</span>
            <span className="text-right text-green-400">healthy</span>
          </div>
        </div>
      </DesktopWidget>

      <DesktopWidget title="Docker Stack" icon={<Layers size={13} className="text-sky-300" />}>
        <div className="space-y-2 px-3 py-3 text-[11px] font-mono">
          {['next-frontend', 'fastapi-backend', 'nginx-proxy', 'prometheus'].map((name) => (
            <div key={name} className="flex items-center justify-between rounded-md bg-black/25 px-2 py-1.5">
              <span className="flex items-center gap-2 text-gray-300"><span className="h-1.5 w-1.5 rounded-full bg-green-400" />{name}</span>
              <span className="text-gray-500">up</span>
            </div>
          ))}
        </div>
      </DesktopWidget>

      <DesktopWidget title="Security Pulse" icon={<ShieldAlert size={13} className="text-red-300" />} className="mt-auto">
        <div className="space-y-2 px-3 py-3 text-[11px]">
          <div className="rounded-md border border-red-500/20 bg-red-500/10 px-2 py-2">
            <div className="font-mono text-red-200">CloudTrail to Lambda</div>
            <div className="mt-0.5 text-gray-500">Open SSH auto-remediation verified</div>
          </div>
          <div className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-2">
            <div className="font-mono text-emerald-200">Wazuh / Snort lab</div>
            <div className="mt-0.5 text-gray-500">Agents and IDS rules monitored</div>
          </div>
        </div>
      </DesktopWidget>
    </div>
  );
};

export const Desktop: React.FC = () => {
  const { windows, openWindow, focusWindow } = useWindowStore();
  const [booted, setBooted] = useState(false);
  const [showBoot, setShowBoot] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check screen size
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleBootComplete = () => {
    setBooted(true);
    setTimeout(() => setShowBoot(false), 500);
  };
  
  // Check if user has visited before
  useEffect(() => {
    const hasVisited = localStorage.getItem('sehwaajos-visited');
    if (hasVisited) {
      setShowBoot(false);
      setBooted(true);
    } else {
      localStorage.setItem('sehwaajos-visited', 'true');
    }
  }, []);
  
  const desktopIcons = [
    { 
      id: 'terminal', 
      label: 'Terminal.sh', 
      icon: TerminalIcon, 
      accentClass: 'text-green-300 border-green-500/30 bg-green-500/10 group-hover:bg-green-500/15',
      desktopPosition: { x: 36, y: 28 },
      title: 'Terminal Console',
      component: Terminal,
      defaultSize: { width: 700, height: 450 },
      defaultPosition: { x: 80, y: 40 }
    },
    { 
      id: 'projects', 
      label: 'Projects/', 
      icon: Folder, 
      accentClass: 'text-yellow-300 border-yellow-500/30 bg-yellow-500/10 group-hover:bg-yellow-500/15',
      desktopPosition: { x: 154, y: 58 },
      title: 'Projects File Explorer',
      component: FileExplorer,
      defaultSize: { width: 850, height: 500 },
      defaultPosition: { x: 120, y: 60 }
    },
    { 
      id: 'resume', 
      label: 'Resume.pdf', 
      icon: FileText, 
      accentClass: 'text-red-300 border-red-500/30 bg-red-500/10 group-hover:bg-red-500/15',
      desktopPosition: { x: 54, y: 150 },
      title: 'Resume PDF Viewer',
      component: ResumeViewer,
      defaultSize: { width: 750, height: 550 },
      defaultPosition: { x: 100, y: 50 }
    },
    { 
      id: 'skills', 
      label: 'Skills.tf', 
      icon: Award, 
      accentClass: 'text-purple-300 border-purple-500/30 bg-purple-500/10 group-hover:bg-purple-500/15',
      desktopPosition: { x: 188, y: 178 },
      title: 'Skills Matrix',
      component: Skills,
      defaultSize: { width: 700, height: 480 },
      defaultPosition: { x: 160, y: 90 }
    },
    { 
      id: 'cyber', 
      label: 'SOC.lab', 
      icon: Shield, 
      accentClass: 'text-red-400 border-red-500/30 bg-red-500/10 group-hover:bg-red-500/15',
      desktopPosition: { x: 38, y: 290 },
      title: 'SOC cybersecurity Workstation',
      component: CyberLab,
      defaultSize: { width: 800, height: 500 },
      defaultPosition: { x: 180, y: 110 }
    },
    { 
      id: 'aws', 
      label: 'AWS.security', 
      icon: Cloud, 
      accentClass: 'text-orange-300 border-orange-500/30 bg-orange-500/10 group-hover:bg-orange-500/15',
      desktopPosition: { x: 164, y: 318 },
      title: 'AWS cloud Deployments',
      component: AWSLab,
      defaultSize: { width: 800, height: 500 },
      defaultPosition: { x: 200, y: 130 }
    },
    { 
      id: 'github', 
      label: 'GitHub.com', 
      icon: Github, 
      accentClass: 'text-white border-gray-400/30 bg-gray-400/10 group-hover:bg-gray-400/15',
      desktopPosition: { x: 302, y: 74 },
      title: 'GitHub live Activity',
      component: GitHubApp,
      defaultSize: { width: 800, height: 500 },
      defaultPosition: { x: 220, y: 150 }
    },
    { 
      id: 'contact', 
      label: 'Contact.card', 
      icon: Mail, 
      accentClass: 'text-cyan-300 border-cyan-500/30 bg-cyan-500/10 group-hover:bg-cyan-500/15',
      desktopPosition: { x: 310, y: 230 },
      title: 'Contact Card',
      component: Contact,
      defaultSize: { width: 680, height: 450 },
      defaultPosition: { x: 240, y: 170 }
    },
    { 
      id: 'about', 
      label: 'AboutMe.txt', 
      icon: User, 
      accentClass: 'text-sky-300 border-sky-500/30 bg-sky-500/10 group-hover:bg-sky-500/15',
      desktopPosition: { x: 46, y: 424 },
      title: 'About Sehwaaj',
      component: AboutMe,
      defaultSize: { width: 720, height: 480 },
      defaultPosition: { x: 60, y: 30 }
    },
  ];

  const handleIconClick = (iconData: typeof desktopIcons[0]) => {
    // If the window is already in the store, focus it
    if (windows[iconData.id]) {
      focusWindow(iconData.id);
      return;
    }

    // Determine custom size / behavior for mobile devices
    const position = isMobile ? { x: 0, y: 0 } : iconData.defaultPosition;
    const size = isMobile ? { width: window.innerWidth, height: window.innerHeight - 48 } : iconData.defaultSize;

    // Launch window in the store
    openWindow({
      id: iconData.id,
      title: iconData.title,
      icon: React.createElement(iconData.icon, { size: 14 }),
      isOpen: true,
      isMinimized: false,
      isMaximized: isMobile, // default maximized on mobile screens
      position,
      size,
      component: iconData.component,
    });
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-[#0c0e17] via-[#151226] to-[#0a0812] relative select-none font-mono">
      {/* Dynamic Grid Background Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Boot Screen */}
      <AnimatePresence>
        {showBoot && (
          <BootScreen onComplete={handleBootComplete} />
        )}
      </AnimatePresence>
      
      {/* Desktop Environment */}
      {booted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="h-full w-full relative flex flex-col justify-between"
        >
          {/* Main Desktop Space */}
          <div className="flex-1 w-full relative p-4 pb-16 overflow-hidden">
            <DesktopWidgets />

            <div className="absolute left-0 top-0 z-10 h-[calc(100vh-64px)] w-full sm:w-[520px]">
              {desktopIcons.map((icon, index) => (
                <DesktopIcon
                  key={icon.id}
                  icon={icon.icon}
                  label={icon.label}
                  accentClass={icon.accentClass}
                  style={isMobile ? { left: 16 + (index % 3) * 88, top: 16 + Math.floor(index / 3) * 92 } : { left: icon.desktopPosition.x, top: icon.desktopPosition.y }}
                  onClick={() => handleIconClick(icon)}
                />
              ))}
            </div>
            
            {/* Draggable Windows Layer */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="pointer-events-auto h-full w-full relative">
                {Object.values(windows).map((window) => (
                  <Window key={window.id} window={window} />
                ))}
              </div>
            </div>
          </div>
          
          {/* Floating taskbar */}
          <Taskbar />
        </motion.div>
      )}
    </div>
  );
};
export default Desktop;
