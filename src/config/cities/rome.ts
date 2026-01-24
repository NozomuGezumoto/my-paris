// ============================================
// Rome - Configuration
// The Eternal City, Italy
// ============================================

import { CityConfig } from '../types';

export const romeConfig: CityConfig = {
  id: 'rome',
  name: 'Rome',
  nameJa: 'ローマ',
  country: 'Italy',
  countryJa: 'イタリア',
  tagline: 'The Eternal City',
  taglineJa: '永遠の都',
  emoji: '🏛️',

  center: {
    latitude: 41.9028,
    longitude: 12.4964,
  },

  bounds: {
    north: 42.0000,
    south: 41.8000,
    east: 12.6000,
    west: 12.3500,
  },

  viewBounds: {
    north: 41.9500,
    south: 41.8500,
    east: 12.5600,
    west: 12.4300,
  },

  defaultZoom: 13,

  colors: {
    // Primary - Terracotta & Roman Gold
    primary: '#8b4513',
    primaryLight: '#cd853f',
    primaryDark: '#5c2d0e',

    // Accent - Roman heritage
    accent: '#c9a227',          // Imperial gold
    accentSecondary: '#355e3b', // Cypress green
    accentTertiary: '#800020',  // Burgundy
    accentQuaternary: '#d4c4a8', // Travertine

    // Backgrounds
    background: '#faf6f0',
    backgroundElevated: '#ffffff',
    backgroundCard: '#ffffff',

    surface: '#f0e8dc',
    surfaceLight: '#fcfaf7',
    surfaceDark: '#e0d4c4',

    // Text
    textPrimary: '#2c2418',
    textSecondary: '#5a4a3a',
    textMuted: '#8a7a6a',

    // Semantic
    success: '#355e3b',
    warning: '#c9a227',
    error: '#800020',

    // Map
    mapOverlay: 'rgba(250, 246, 240, 0.95)',
    mapOverlayLight: 'rgba(250, 246, 240, 0.80)',

    // Pins
    photoPin: '#8b4513',
    textPin: '#355e3b',
    cluster: '#c9a227',

    // Rank
    rank1: '#f0e8dc',
    rank2: '#cd853f',
    rank3: '#c9a227',

    // Borders
    border: 'rgba(44, 36, 24, 0.12)',
    borderLight: 'rgba(44, 36, 24, 0.06)',
    borderMedium: 'rgba(44, 36, 24, 0.20)',
  },

  landmarks: {
    colosseum: { latitude: 41.8902, longitude: 12.4922, name: 'Colosseo' },
    vatican: { latitude: 41.9029, longitude: 12.4534, name: 'Città del Vaticano' },
    stPetersBasilica: { latitude: 41.9022, longitude: 12.4539, name: 'Basilica di San Pietro' },
    treviFountain: { latitude: 41.9009, longitude: 12.4833, name: 'Fontana di Trevi' },
    pantheon: { latitude: 41.8986, longitude: 12.4769, name: 'Pantheon' },
    spanishSteps: { latitude: 41.9058, longitude: 12.4823, name: 'Piazza di Spagna' },
    romanForum: { latitude: 41.8925, longitude: 12.4853, name: 'Foro Romano' },
    piazzaNavona: { latitude: 41.8992, longitude: 12.4730, name: 'Piazza Navona' },
    villaBorghese: { latitude: 41.9137, longitude: 12.4853, name: 'Villa Borghese' },
    trastevere: { latitude: 41.8867, longitude: 12.4695, name: 'Trastevere' },
    campoDeiFiori: { latitude: 41.8956, longitude: 12.4722, name: 'Campo de\' Fiori' },
    castelSantAngelo: { latitude: 41.9031, longitude: 12.4663, name: 'Castel Sant\'Angelo' },
  },

  appScheme: 'myrome',
  storageName: 'my-rome-storage',
  
  // 🏛️ 古代神殿・帝国・永遠の都
  symbolSuggestions: [
    '柱', '泉', '永', '神', '殿', '帝', '道', '古', '石', '遺',
    '闘', '勝', '凱', '門', '広', '像', '壁', '円', '聖', '教',
    '丘', '川', '橋', '塔', '宮', '美', '芸', '愛', '陽', '酒',
  ],
  // Rome/Italian themed emojis
  emojiSuggestions: [
    '🏛️', '⛪', '🍕', '🍝', '🍷', '🛵', '🌻', '☀️', '⛲', '🏟️',
    '🗿', '🎭', '✝️', '👼', '🎨', '🖼️', '🏺', '📜', '🌿', '🫒',
    '🍦', '☕', '🥂', '🍋', '⭐', '🌙', '🕊️', '💫', '🌸', '❤️',
  ],
};

