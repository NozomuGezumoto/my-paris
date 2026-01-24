// ============================================
// London - Configuration
// The Historic Capital, United Kingdom
// ============================================

import { CityConfig } from '../types';

export const londonConfig: CityConfig = {
  id: 'london',
  name: 'London',
  nameJa: 'ロンドン',
  country: 'United Kingdom',
  countryJa: 'イギリス',
  tagline: 'The Historic Capital',
  taglineJa: '歴史の都',
  emoji: '🎡',

  center: {
    latitude: 51.5074,
    longitude: -0.1278,
  },

  bounds: {
    north: 51.6000,
    south: 51.4000,
    east: 0.0500,
    west: -0.3000,
  },

  viewBounds: {
    north: 51.5500,
    south: 51.4600,
    east: -0.0200,
    west: -0.2200,
  },

  defaultZoom: 13,

  colors: {
    // Primary - Royal Navy & British Racing Green
    primary: '#1a365d',
    primaryLight: '#3d5a80',
    primaryDark: '#0d1b2a',

    // Accent - British heritage
    accent: '#c8102e',          // British red
    accentSecondary: '#004225', // Racing green
    accentTertiary: '#d4af37',  // Royal gold
    accentQuaternary: '#8b7355', // Tea brown

    // Backgrounds
    background: '#f5f5f0',
    backgroundElevated: '#ffffff',
    backgroundCard: '#ffffff',

    surface: '#e8e6e1',
    surfaceLight: '#fafaf8',
    surfaceDark: '#d5d3ce',

    // Text
    textPrimary: '#1a1a1a',
    textSecondary: '#4a4a4a',
    textMuted: '#757575',

    // Semantic
    success: '#004225',
    warning: '#d4af37',
    error: '#c8102e',

    // Map
    mapOverlay: 'rgba(245, 245, 240, 0.95)',
    mapOverlayLight: 'rgba(245, 245, 240, 0.80)',

    // Pins
    photoPin: '#1a365d',
    textPin: '#004225',
    cluster: '#c8102e',

    // Rank
    rank1: '#e8e6e1',
    rank2: '#3d5a80',
    rank3: '#d4af37',

    // Borders
    border: 'rgba(26, 26, 26, 0.12)',
    borderLight: 'rgba(26, 26, 26, 0.06)',
    borderMedium: 'rgba(26, 26, 26, 0.20)',
  },

  landmarks: {
    bigBen: { latitude: 51.5007, longitude: -0.1246, name: 'Big Ben' },
    buckinghamPalace: { latitude: 51.5014, longitude: -0.1419, name: 'Buckingham Palace' },
    towerOfLondon: { latitude: 51.5081, longitude: -0.0759, name: 'Tower of London' },
    londonEye: { latitude: 51.5033, longitude: -0.1195, name: 'London Eye' },
    towerBridge: { latitude: 51.5055, longitude: -0.0754, name: 'Tower Bridge' },
    britishMuseum: { latitude: 51.5194, longitude: -0.1270, name: 'British Museum' },
    westminsterAbbey: { latitude: 51.4994, longitude: -0.1273, name: 'Westminster Abbey' },
    stPaulsCathedral: { latitude: 51.5138, longitude: -0.0984, name: "St Paul's Cathedral" },
    hydePark: { latitude: 51.5073, longitude: -0.1657, name: 'Hyde Park' },
    coventGarden: { latitude: 51.5117, longitude: -0.1240, name: 'Covent Garden' },
    camden: { latitude: 51.5390, longitude: -0.1426, name: 'Camden Town' },
    notingHill: { latitude: 51.5090, longitude: -0.1960, name: 'Notting Hill' },
  },

  appScheme: 'mylondon',
  storageName: 'my-london-storage',
  
  // 🎡 ロンドンアイ・王室・歴史・英国伝統
  symbolSuggestions: [
    '王', '橋', '塔', '霧', '紅', '冠', '城', '鐘', '雨', '傘',
    '茶', '宮', '河', '衛', '騎', '獅', '園', '館', '劇', '古',
    '夜', '灯', '石', '道', '書', '時', '音', '紳', '淑', '英',
  ],
  // London/British themed emojis
  emojiSuggestions: [
    '🎡', '🇬🇧', '👑', '🏰', '☕', '🫖', '🍺', '🚇', '🚌', '☔',
    '⏰', '🎭', '🎪', '📚', '🎸', '⚽', '🌳', '🌁', '🦁', '🐕',
    '🍻', '🥧', '🐟', '🎩', '💂', '📮', '🔔', '🌹', '✨', '💷',
  ],
};

