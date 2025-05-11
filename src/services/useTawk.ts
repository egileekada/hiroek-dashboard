// hooks/useTawkTo.ts
import { useEffect, useRef, useCallback } from 'react';

declare global {
  interface Window {
    Tawk_API?: {
      hideWidget: () => void;
      showWidget: () => void;
      maximize: () => void;
      minimize: () => void;
      toggle: () => void;
      setAttributes: (attributes: any, callback: (error: any) => void) => void;
      onLoad?: () => void;
      getStatus: () => string;
    };
    Tawk_LoadStart?: Date;
  }
}

const useTawkTo = (propertyId: string, widgetId: string) => {
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const isInitialized = useRef(false);

  const initializeTawkTo = useCallback(() => {
    if (isInitialized.current || window.Tawk_API) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    script.id = 'tawk-script';
    
    script.onload = () => {
      if (window.Tawk_API) {
        // Immediately hide the floating button and widget
        window.Tawk_API.hideWidget();
        
        // Add CSS to permanently hide the floating button
        const style = document.createElement('style');
        style.innerHTML = `
          .tawk-button-container,
          .tawk-min-container {
            display: none !important;
          }
        `;
        document.head.appendChild(style);
        
        window.Tawk_API.onLoad = () => {
          console.log('Tawk.to fully loaded');
        };
        
        isInitialized.current = true;
      }
    };

    script.onerror = () => {
      console.error('Failed to load Tawk.to script');
    };

    document.body.appendChild(script);
    scriptRef.current = script;
    window.Tawk_LoadStart = new Date();
  }, [propertyId, widgetId]);

  const cleanupTawkTo = useCallback(() => {
    if (scriptRef.current) {
      try {
        // Remove the main script
        document.body.removeChild(scriptRef.current);
        scriptRef.current = null;
        
        // Remove Tawk.to iframe and related elements
        const tawkElements = document.querySelectorAll('[id*="tawk-"], [class*="tawk-"]');
        tawkElements.forEach(el => el.remove());
        
        // Remove any injected styles
        const tawkStyles = document.querySelectorAll('style[data-tawk]');
        tawkStyles.forEach(style => style.remove());
        
        // Clear references
        delete window.Tawk_API;
        delete window.Tawk_LoadStart;
        isInitialized.current = false;
      } catch (error) {
        console.error('Error cleaning up Tawk.to:', error);
      }
    }
  }, []);

  const showChat = useCallback(() => {
    if (window.Tawk_API) {
      // Ensure widget is shown before maximizing
      window.Tawk_API.showWidget();
      window.Tawk_API.maximize();
    } else {
      console.warn('Tawk.to API not available');
    }
  }, []);

  const hideChat = useCallback(() => {
    if (window.Tawk_API) {
      window.Tawk_API.minimize();
      window.Tawk_API.hideWidget();
    }
  }, []);

  const toggleChat = useCallback(() => {
    if (window.Tawk_API) {
      window.Tawk_API.toggle();
    }
  }, []);

  const setVisitorData = useCallback((name: string, email: string, extraAttributes?: Record<string, any>) => {
    if (window.Tawk_API) {
      window.Tawk_API.setAttributes({
        name,
        email,
        ...extraAttributes
      }, (error: any) => {
        if (error) {
          console.error('Tawk.to setAttributes error:', error);
        }
      });
    }
  }, []);

  const getChatStatus = useCallback(() => {
    return window.Tawk_API?.getStatus?.() || 'uninitialized';
  }, []);

  useEffect(() => {
    initializeTawkTo();
    // Inject permanent hiding CSS
    const style = document.createElement('style');
    style.innerHTML = `
      .tawk-button-container,
      .tawk-min-container {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      style.remove();
    }; 
  }, [initializeTawkTo]);

  return {
    showChat,
    hideChat,
    toggleChat,
    setVisitorData,
    getChatStatus,
    initialize: initializeTawkTo,
    cleanup: cleanupTawkTo
  };
};

export default useTawkTo;