import { useState, useEffect } from 'react';

export interface PlatformInfo {
  isMac: boolean;
  isWindows: boolean;
  isLinux: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isTouchDevice: boolean;
  modKeySymbol: string | null;
  modKeyText: string | null;
  getShortcutLabel: (key: string) => string | null;
}

export function usePlatform(): PlatformInfo {
  const [platform, setPlatform] = useState<PlatformInfo>({
    isMac: false,
    isWindows: false,
    isLinux: false,
    isIOS: false,
    isAndroid: false,
    isTouchDevice: false,
    modKeySymbol: 'Ctrl',
    modKeyText: 'Ctrl',
    getShortcutLabel: (key: string) => `Ctrl+${key}`,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const userAgent = window.navigator.userAgent.toLowerCase();
    const platformStr = window.navigator.platform?.toLowerCase() || '';

    const isMac = /macintosh|mac os x|macintel|ipad|iphone|ipod/.test(userAgent) || /mac/.test(platformStr);
    const isWindows = /win32|win64|windows|wince/.test(userAgent) || /win/.test(platformStr);
    const isLinux = /linux/.test(userAgent) || /linux/.test(platformStr);
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);

    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches ||
      window.innerWidth < 768;

    const modKeySymbol = isTouchDevice ? null : isMac ? '⌘' : 'Ctrl';
    const modKeyText = isTouchDevice ? null : isMac ? '⌘' : 'Ctrl';

    const getShortcutLabel = (key: string): string | null => {
      if (isTouchDevice) return null;
      return isMac ? `⌘${key.toUpperCase()}` : `Ctrl+${key.toUpperCase()}`;
    };

    setPlatform({
      isMac,
      isWindows,
      isLinux,
      isIOS,
      isAndroid,
      isTouchDevice,
      modKeySymbol,
      modKeyText,
      getShortcutLabel,
    });
  }, []);

  return platform;
}
