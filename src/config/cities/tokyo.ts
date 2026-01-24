// ============================================
// 東京 - Tokyo Configuration
// The Modern Metropolis, Japan
// ============================================

import { CityConfig } from '../types';

export const tokyoConfig: CityConfig = {
  id: 'tokyo',
  name: 'Tokyo',
  nameJa: '東京',
  country: 'Japan',
  countryJa: '日本',
  tagline: 'The Modern Metropolis',
  taglineJa: '未来都市',
  emoji: '🗼',

  center: {
    latitude: 35.6762,
    longitude: 139.6503,
  },

  bounds: {
    north: 35.8200,
    south: 35.5300,
    east: 139.9100,
    west: 139.5000,
  },

  viewBounds: {
    north: 35.7500,
    south: 35.6000,
    east: 139.8200,
    west: 139.6800,
  },

  defaultZoom: 13,

  colors: {
    // Primary - 藍色 & Modern
    primary: '#1e40af',
    primaryLight: '#3b82f6',
    primaryDark: '#1e3a8a',

    // Accent - Neo-Tokyo
    accent: '#f43f5e',          // Neon pink
    accentSecondary: '#10b981', // Tech green
    accentTertiary: '#f59e0b',  // Electric amber
    accentQuaternary: '#e5e7eb', // Steel gray

    // Backgrounds
    background: '#f8fafc',
    backgroundElevated: '#ffffff',
    backgroundCard: '#ffffff',

    surface: '#f1f5f9',
    surfaceLight: '#fafbfc',
    surfaceDark: '#e2e8f0',

    // Text
    textPrimary: '#0f172a',
    textSecondary: '#334155',
    textMuted: '#64748b',

    // Semantic
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',

    // Map
    mapOverlay: 'rgba(248, 250, 252, 0.95)',
    mapOverlayLight: 'rgba(248, 250, 252, 0.80)',

    // Pins
    photoPin: '#1e40af',
    textPin: '#10b981',
    cluster: '#f43f5e',

    // Rank
    rank1: '#f1f5f9',
    rank2: '#3b82f6',
    rank3: '#f59e0b',

    // Borders
    border: 'rgba(15, 23, 42, 0.12)',
    borderLight: 'rgba(15, 23, 42, 0.06)',
    borderMedium: 'rgba(15, 23, 42, 0.20)',
  },

  landmarks: {
    tokyoTower: { latitude: 35.6586, longitude: 139.7454, name: '東京タワー' },
    skytree: { latitude: 35.7101, longitude: 139.8107, name: '東京スカイツリー' },
    shibuya: { latitude: 35.6595, longitude: 139.7004, name: '渋谷' },
    shinjuku: { latitude: 35.6896, longitude: 139.6917, name: '新宿' },
    sensoji: { latitude: 35.7147, longitude: 139.7966, name: '浅草寺' },
    meiji: { latitude: 35.6764, longitude: 139.6993, name: '明治神宮' },
    ginza: { latitude: 35.6717, longitude: 139.7649, name: '銀座' },
    akihabara: { latitude: 35.7023, longitude: 139.7745, name: '秋葉原' },
    ueno: { latitude: 35.7142, longitude: 139.7774, name: '上野' },
    roppongi: { latitude: 35.6628, longitude: 139.7313, name: '六本木' },
    harajuku: { latitude: 35.6702, longitude: 139.7027, name: '原宿' },
    odaiba: { latitude: 35.6294, longitude: 139.7747, name: 'お台場' },
    tokyoStation: { latitude: 35.6812, longitude: 139.7671, name: '東京駅' },
    imperialPalace: { latitude: 35.6852, longitude: 139.7528, name: '皇居' },
  },

  appScheme: 'mytokyo',
  storageName: 'my-tokyo-storage',
  
  // 🗼 タワー・近代都市・テクノロジーに関連した漢字
  symbolSuggestions: [
    '塔', '東', '都', '電', '駅', '街', '港', '橋', '渋', '新',
    '秋', '銀', '光', '空', '星', '夢', '未', '音', '絵', '影',
    '原', '宿', '品', '丸', '天', '虹', '雷', '風', '波', '炎',
  ],
  // 東京らしい絵文字
  emojiSuggestions: [
    '🗼', '🏙️', '🌃', '🚄', '🚃', '🎮', '📱', '🎌', '🍜', '🍣',
    '🛒', '🎤', '🎧', '💿', '🎬', '🌈', '⚡', '🔥', '💫', '🌟',
    '🎯', '🎰', '🎁', '🏪', '🌸', '🎏', '🍱', '🥟', '🍙', '🎊',
  ],
};

