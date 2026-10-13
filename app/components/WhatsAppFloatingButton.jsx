'use client';

import { useState, useEffect } from 'react';
import { DEFAULT_WHATSAPP_SETTINGS, buildWhatsAppChatUrl } from '@/lib/whatsapp';

export default function WhatsAppFloatingButton() {
  const [settings, setSettings] = useState(DEFAULT_WHATSAPP_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadSettings() {
      try {
        const res = await fetch('/api/contact/settings', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data && data.settings && isMounted) {
            setSettings(data.settings);
          }
        }
      } catch (err) {
        console.warn('Could not load WhatsApp settings, using default:', err);
      } finally {
        if (isMounted) setIsLoaded(true);
      }
    }

    loadSettings();

    // Listen for live update events from admin panel in same window
    const handleSettingsUpdate = (e) => {
      if (e.detail) {
        setSettings(e.detail);
      } else {
        loadSettings();
      }
    };

    window.addEventListener('whatsapp-settings-updated', handleSettingsUpdate);
    window.addEventListener('storage', (e) => {
      if (e.key === 'whatsapp_settings_sync') {
        loadSettings();
      }
    });

    return () => {
      isMounted = false;
      window.removeEventListener('whatsapp-settings-updated', handleSettingsUpdate);
    };
  }, []);

  // If disabled by admin, don't show
  if (isLoaded && settings.isEnabled === false) {
    return null;
  }

  const chatUrl = buildWhatsAppChatUrl(settings.whatsappNumber, settings.whatsappMessage);

  return (
    <div
      className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50 flex items-center group select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip bubble (visible on desktop hover) */}
      <div
        className={`hidden sm:flex items-center gap-2 mr-3 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-gray-800 text-xs font-semibold shadow-lg border border-emerald-100/80 transition-all duration-300 pointer-events-none transform ${
          isHovered
            ? 'opacity-100 translate-x-0 scale-100'
            : 'opacity-0 translate-x-3 scale-95'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>{settings.tooltipText || 'WhatsApp এ সরাসরি চ্যাট করুন'}</span>
      </div>

      {/* Main Round Floating WhatsApp Button */}
      <a
        href={chatUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#2BE271] text-white flex items-center justify-center shadow-[0_10px_25px_-3px_rgba(37,211,102,0.55),0_4px_10px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_35px_-2px_rgba(37,211,102,0.7),0_6px_14px_rgba(0,0,0,0.2)] hover:scale-110 active:scale-95 transition-all duration-300 ease-out"
      >
        {/* Ambient pulse ring animation */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none" />

        {/* Subtle glossy border */}
        <span className="absolute inset-0 rounded-full border border-white/30 pointer-events-none" />

        {/* WhatsApp Official Vector Logo */}
        <svg
          className="w-7 h-7 md:w-8 md:h-8 fill-current drop-shadow-sm transition-transform duration-300 group-hover:rotate-6"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.004c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.487-8.414z" />
        </svg>

        {/* Online Status Green Indicator Pill */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white" />
        </span>
      </a>
    </div>
  );
}
