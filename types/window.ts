import React from 'react';

export interface WindowState {
  id: string;
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  component: React.ComponentType<WindowProps>;
  props?: Record<string, any>;
}

export interface WindowProps {
  id: string;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
}
