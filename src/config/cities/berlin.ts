// ============================================
// Berlin - Configuration
// The Creative Capital, Germany
// ============================================

import { CityConfig } from '../types';

export const berlinConfig: CityConfig = {
  id: 'berlin',
  name: 'Berlin',
  nameJa: 'ベルリン',
  country: 'Germany',
  countryJa: 'ドイツ',
  tagline: 'The Creative Capital',
  taglineJa: '創造の都',
  emoji: '🐻',

  center: {
    latitude: 52.5200,
    longitude: 13.4050,
  },

  bounds: {
    north: 52.6800,
    south: 52.3400,
    east: 13.7700,
    west: 13.0900,
  },

  viewBounds: {
    north: 52.5800,
    south: 52.4600,
    east: 13.5000,
    west: 13.3000,
  },

  defaultZoom: 13,

  colors: {
    // Primary - Industrial & Bauhaus
    primary: '#1f2937',
    primaryLight: '#4b5563',
    primaryDark: '#111827',

    // Accent - Berlin creative
    accent: '#eab308',          // Berliner gold
    accentSecondary: '#ef4444', // GDR red
    accentTertiary: '#3b82f6',  // Modern blue
    accentQuaternary: '#d4d4d4', // Concrete gray

    // Backgrounds
    background: '#f9fafb',
    backgroundElevated: '#ffffff',
    backgroundCard: '#ffffff',

    surface: '#f3f4f6',
    surfaceLight: '#fafafa',
    surfaceDark: '#e5e7eb',

    // Text
    textPrimary: '#111827',
    textSecondary: '#374151',
    textMuted: '#6b7280',

    // Semantic
    success: '#10b981',
    warning: '#eab308',
    error: '#ef4444',

    // Map
    mapOverlay: 'rgba(249, 250, 251, 0.95)',
    mapOverlayLight: 'rgba(249, 250, 251, 0.80)',

    // Pins
    photoPin: '#1f2937',
    textPin: '#3b82f6',
    cluster: '#eab308',

    // Rank
    rank1: '#f3f4f6',
    rank2: '#4b5563',
    rank3: '#eab308',

    // Borders
    border: 'rgba(17, 24, 39, 0.12)',
    borderLight: 'rgba(17, 24, 39, 0.06)',
    borderMedium: 'rgba(17, 24, 39, 0.20)',
  },

  landmarks: {
    brandenburgGate: { latitude: 52.5163, longitude: 13.3777, name: 'Brandenburger Tor' },
    reichstag: { latitude: 52.5186, longitude: 13.3762, name: 'Reichstag' },
    berlinWall: { latitude: 52.5074, longitude: 13.4390, name: 'East Side Gallery' },
    museumIsland: { latitude: 52.5169, longitude: 13.4019, name: 'Museumsinsel' },
    alexanderplatz: { latitude: 52.5219, longitude: 13.4132, name: 'Alexanderplatz' },
    tvTower: { latitude: 52.5208, longitude: 13.4094, name: 'Fernsehturm' },
    checkpoint: { latitude: 52.5075, longitude: 13.3904, name: 'Checkpoint Charlie' },
    potsdamerPlatz: { latitude: 52.5096, longitude: 13.3762, name: 'Potsdamer Platz' },
    tiergarten: { latitude: 52.5145, longitude: 13.3500, name: 'Tiergarten' },
    kreuzberg: { latitude: 52.4894, longitude: 13.4027, name: 'Kreuzberg' },
    prenzlauerBerg: { latitude: 52.5420, longitude: 13.4170, name: 'Prenzlauer Berg' },
    charlottenburg: { latitude: 52.5205, longitude: 13.2956, name: 'Schloss Charlottenburg' },
  },

  appScheme: 'myberlin',
  storageName: 'my-berlin-storage',
  
  // 🐻 ベルリンの熊・創造の都・歴史
  symbolSuggestions: [
    '熊', '壁', '門', '芸', '自', '由', '創', '夜', '街', '音',
    '統', '塔', '博', '館', '園', '橋', '川', '島', '東', '西',
    '麦', '酒', '鷹', '星', '雷', '鉄', '輪', '風', '火', '光',
  ],
  // Berlin/German themed emojis
  emojiSuggestions: [
    '🐻', '🚪', '🎨', '🎸', '🍺', '🥨', '🌭', '🚇', '🏛️', '⛪',
    '🎭', '🎬', '📚', '🖼️', '🎤', '💿', '🎧', '🌳', '🚴', '🛴',
    '🧱', '✊', '❤️', '🖤', '💛', '🌃', '🌉', '⚡', '✨', '🎪',
  ],
};

