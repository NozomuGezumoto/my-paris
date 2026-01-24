// ============================================
// 台北 - Taipei Configuration
// The Heart of Taiwan
// ============================================

import { CityConfig } from '../types';

export const taipeiConfig: CityConfig = {
  id: 'taipei',
  name: 'Taipei',
  nameJa: '台北',
  country: 'Taiwan',
  countryJa: '台湾',
  tagline: 'The Heart of Taiwan',
  taglineJa: '台湾の心臓',
  emoji: '🏯',

  center: {
    latitude: 25.0330,
    longitude: 121.5654,
  },

  bounds: {
    north: 25.2100,
    south: 24.9600,
    east: 121.6800,
    west: 121.4500,
  },

  viewBounds: {
    north: 25.1000,
    south: 25.0000,
    east: 121.6200,
    west: 121.5000,
  },

  defaultZoom: 13,

  colors: {
    // Primary - Traditional & Modern Taiwan
    primary: '#0369a1',
    primaryLight: '#38bdf8',
    primaryDark: '#075985',

    // Accent - Taiwanese heritage
    accent: '#dc2626',          // Traditional red
    accentSecondary: '#16a34a', // Jade green
    accentTertiary: '#ca8a04',  // Temple gold
    accentQuaternary: '#fef9c3', // Light cream

    // Backgrounds
    background: '#fafaf9',
    backgroundElevated: '#ffffff',
    backgroundCard: '#ffffff',

    surface: '#f5f5f4',
    surfaceLight: '#fcfcfb',
    surfaceDark: '#e7e5e4',

    // Text
    textPrimary: '#1c1917',
    textSecondary: '#44403c',
    textMuted: '#78716c',

    // Semantic
    success: '#16a34a',
    warning: '#ca8a04',
    error: '#dc2626',

    // Map
    mapOverlay: 'rgba(250, 250, 249, 0.95)',
    mapOverlayLight: 'rgba(250, 250, 249, 0.80)',

    // Pins
    photoPin: '#0369a1',
    textPin: '#16a34a',
    cluster: '#dc2626',

    // Rank
    rank1: '#f5f5f4',
    rank2: '#38bdf8',
    rank3: '#ca8a04',

    // Borders
    border: 'rgba(28, 25, 23, 0.12)',
    borderLight: 'rgba(28, 25, 23, 0.06)',
    borderMedium: 'rgba(28, 25, 23, 0.20)',
  },

  landmarks: {
    taipei101: { latitude: 25.0339, longitude: 121.5645, name: '台北101' },
    cks: { latitude: 25.0347, longitude: 121.5219, name: '中正紀念堂' },
    longshan: { latitude: 25.0372, longitude: 121.4999, name: '龍山寺' },
    shilin: { latitude: 25.0873, longitude: 121.5247, name: '士林夜市' },
    ximending: { latitude: 25.0425, longitude: 121.5066, name: '西門町' },
    nationalPalaceMuseum: { latitude: 25.1024, longitude: 121.5485, name: '故宮博物院' },
    yangmingshan: { latitude: 25.1625, longitude: 121.5410, name: '陽明山' },
    daan: { latitude: 25.0267, longitude: 121.5354, name: '大安森林公園' },
    beitou: { latitude: 25.1367, longitude: 121.5056, name: '北投温泉' },
    maokong: { latitude: 24.9689, longitude: 121.5879, name: '猫空' },
    jiufen: { latitude: 25.1094, longitude: 121.8440, name: '九份' },
    raohe: { latitude: 25.0503, longitude: 121.5773, name: '饒河街夜市' },
  },

  appScheme: 'mytaipei',
  storageName: 'my-taipei-storage',
  
  // 🏯 Temple castle, Taiwanese heritage, night markets
  symbolSuggestions: [
    '台', '北', '灣', '龍', '山', '寺', '夜', '市', '茶', '福',
    '愛', '福', '壽', '喜', '春', '吉', '祥', '運', '財', '樂',
    '風', '雲', '星', '月', '天', '地', '水', '火', '心', '光',
  ],
  // Taipei/Taiwanese themed emojis
  emojiSuggestions: [
    '🏯', '🏮', '🧧', '🐉', '🦁', '🍜', '🧋', '🥟', '🍚', '🍡',
    '🛵', '🚇', '🌃', '⛩️', '🎋', '🌸', '🪭', '🎐', '☔', '🌙',
    '✨', '💫', '❤️', '🧡', '💛', '🌺', '🌻', '🎎', '🀄', '🎴',
  ],
};

