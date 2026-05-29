import { create } from 'zustand';
import { WindowState } from '@/types/window';

interface WindowStore {
  windows: Record<string, WindowState>;
  activeWindowId: string | null;
  maxZIndex: number;
  openWindow: (window: Omit<WindowState, 'zIndex'>) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updatePosition: (id: string, position: { x: number; y: number }) => void;
  updateSize: (id: string, size: { width: number; height: number }) => void;
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: {},
  activeWindowId: null,
  maxZIndex: 100,
  
  openWindow: (windowData) => {
    const { maxZIndex } = get();
    const newZIndex = maxZIndex + 1;
    const windowId = windowData.id;
    
    set((state) => ({
      windows: {
        ...state.windows,
        [windowId]: {
          ...windowData,
          zIndex: newZIndex,
          isOpen: true,
          isMinimized: false,
        },
      },
      activeWindowId: windowId,
      maxZIndex: newZIndex,
    }));
  },
  
  closeWindow: (id) => {
    set((state) => {
      const newWindows = { ...state.windows };
      delete newWindows[id];
      return {
        windows: newWindows,
        activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
      };
    });
  },
  
  minimizeWindow: (id) => {
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isMinimized: true },
      },
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    }));
  },
  
  maximizeWindow: (id) => {
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { 
          ...state.windows[id], 
          isMaximized: !state.windows[id].isMaximized 
        },
      },
    }));
  },
  
  focusWindow: (id) => {
    const newZIndex = get().maxZIndex + 1;
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], zIndex: newZIndex, isMinimized: false, isOpen: true },
      },
      activeWindowId: id,
      maxZIndex: newZIndex,
    }));
  },
  
  updatePosition: (id, position) => {
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], position },
      },
    }));
  },
  
  updateSize: (id, size) => {
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], size },
      },
    }));
  },
}));
