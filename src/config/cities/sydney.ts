// ============================================
// Sydney - Configuration
// The Harbour City, Australia
// ============================================

import { CityConfig } from '../types';

export const sydneyConfig: CityConfig = {
  id: 'sydney',
  name: 'Sydney',
  nameJa: 'シドニー',
  country: 'Australia',
  countryJa: 'オーストラリア',
  tagline: 'The Harbour City',
  taglineJa: '港湾都市',
  emoji: '⛵',

  center: {
    latitude: -33.8688,
    longitude: 151.2093,
  },

  bounds: {
    north: -33.7500,
    south: -33.9800,
    east: 151.3500,
    west: 151.0500,
  },

  viewBounds: {
    north: -33.80,
    south: -33.93,
    east: 151.30,
    west: 151.12,
  },

  defaultZoom: 13,

  colors: {
    // Primary - Harbour Blue
    primary: '#0077b6',
    primaryLight: '#48cae4',
    primaryDark: '#023e8a',

    // Accent - Coastal Australian
    accent: '#ff8c42',          // Sunset coral
    accentSecondary: '#2a9d8f', // Ocean teal
    accentTertiary: '#e9c46a',  // Beach sand
    accentQuaternary: '#f4845f', // Coral reef

    // Backgrounds
    background: '#f0f7ff',
    backgroundElevated: '#ffffff',
    backgroundCard: '#ffffff',

    surface: '#e8f4f8',
    surfaceLight: '#f8fcff',
    surfaceDark: '#d4e8ed',

    // Text
    textPrimary: '#1a2b3c',
    textSecondary: '#3d5a73',
    textMuted: '#7a9bb0',

    // Semantic
    success: '#2a9d8f',
    warning: '#e9c46a',
    error: '#e63946',

    // Map
    mapOverlay: 'rgba(240, 247, 255, 0.95)',
    mapOverlayLight: 'rgba(240, 247, 255, 0.80)',

    // Pins
    photoPin: '#0077b6',
    textPin: '#2a9d8f',
    cluster: '#ff8c42',

    // Rank
    rank1: '#e8f4f8',
    rank2: '#48cae4',
    rank3: '#e9c46a',

    // Borders
    border: 'rgba(26, 43, 60, 0.12)',
    borderLight: 'rgba(26, 43, 60, 0.06)',
    borderMedium: 'rgba(26, 43, 60, 0.20)',
  },

  landmarks: {
    operaHouse: { latitude: -33.8568, longitude: 151.2153, name: 'Sydney Opera House' },
    harbourBridge: { latitude: -33.8523, longitude: 151.2108, name: 'Sydney Harbour Bridge' },
    circularQuay: { latitude: -33.8610, longitude: 151.2107, name: 'Circular Quay' },
    bondiBeach: { latitude: -33.8908, longitude: 151.2743, name: 'Bondi Beach' },
    manlyBeach: { latitude: -33.7969, longitude: 151.2878, name: 'Manly Beach' },
    darlingHarbour: { latitude: -33.8732, longitude: 151.1987, name: 'Darling Harbour' },
    tarongaZoo: { latitude: -33.8432, longitude: 151.2411, name: 'Taronga Zoo' },
    royalBotanicGarden: { latitude: -33.8642, longitude: 151.2166, name: 'Royal Botanic Garden' },
    theRocks: { latitude: -33.8590, longitude: 151.2085, name: 'The Rocks' },
    barangaroo: { latitude: -33.8616, longitude: 151.2010, name: 'Barangaroo' },
    surryHills: { latitude: -33.8850, longitude: 151.2120, name: 'Surry Hills' },
    newtown: { latitude: -33.8971, longitude: 151.1789, name: 'Newtown' },
  },

  appScheme: 'mysydney',
  storageName: 'my-sydney-storage',
  
  // ⛵ 帆船・港湾・ビーチ・コースタルライフ
  symbolSuggestions: [
    '海', '港', '波', '帆', '潮', '浜', '岸', '湾', '陽', '南',
    '泳', '砂', '鯨', '貝', '魚', '青', '風', '橋', '虹', '夏',
    '珊', '瑚', '島', '空', '雲', '光', '遊', '楽', '友', '愛',
  ],
  // Sydney/coastal themed emojis
  emojiSuggestions: [
    '⛵', '🌊', '🏖️', '🦘', '🐨', '🦈', '🏄', '☀️', '🌅', '🐚',
    '🌴', '🎭', '🏟️', '🌉', '⚓', '🚢', '🦭', '🐬', '🦩', '🪸',
    '🍺', '🍷', '☕', '🍔', '🌺', '🎨', '📸', '🎶', '💙', '🤙',
  ],
};

