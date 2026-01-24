// ============================================
// 京都 - Kyoto Configuration
// 千年の都、日本の伝統文化の中心
// ============================================

import { CityConfig } from '../types';

export const kyotoConfig: CityConfig = {
  id: 'kyoto',
  name: 'Kyoto',
  nameJa: '京都',
  country: 'Japan',
  countryJa: '日本',
  tagline: 'The Ancient Capital',
  taglineJa: '千年の都',
  emoji: '⛩️',

  center: {
    latitude: 35.0116,
    longitude: 135.7681,
  },

  bounds: {
    north: 35.1000,
    south: 34.9200,
    east: 135.8500,
    west: 135.6800,
  },

  viewBounds: {
    north: 35.0600,
    south: 34.9600,
    east: 135.8200,
    west: 135.7100,
  },

  defaultZoom: 13,

  colors: {
    // Primary - 朱色 (Vermillion) inspired by torii gates
    primary: '#c73e3a',
    primaryLight: '#e86b67',
    primaryDark: '#8b2b28',

    // Accent - 抹茶/金/紫 
    accent: '#7b9e4d',          // 抹茶色 matcha green
    accentSecondary: '#c9a954', // 金色 gold
    accentTertiary: '#6b5b7a',  // 京紫 Kyoto purple
    accentQuaternary: '#e8dcc4', // 和紙色 washi paper

    // Backgrounds - 白壁と畳
    background: '#faf8f5',
    backgroundElevated: '#ffffff',
    backgroundCard: '#ffffff',

    surface: '#f5f0e8',
    surfaceLight: '#fdfcfa',
    surfaceDark: '#e8e0d5',

    // Text
    textPrimary: '#2c2420',
    textSecondary: '#5a4d45',
    textMuted: '#8a7d75',

    // Semantic
    success: '#7b9e4d',
    warning: '#c9a954',
    error: '#c73e3a',

    // Map
    mapOverlay: 'rgba(250, 248, 245, 0.95)',
    mapOverlayLight: 'rgba(250, 248, 245, 0.80)',

    // Pins
    photoPin: '#c73e3a',
    textPin: '#7b9e4d',
    cluster: '#c9a954',

    // Rank
    rank1: '#f5f0e8',
    rank2: '#e8dcc4',
    rank3: '#c9a954',

    // Borders
    border: 'rgba(44, 36, 32, 0.12)',
    borderLight: 'rgba(44, 36, 32, 0.06)',
    borderMedium: 'rgba(44, 36, 32, 0.20)',
  },

  landmarks: {
    kinkakuji: { latitude: 35.0394, longitude: 135.7292, name: '金閣寺' },
    fushimiInari: { latitude: 34.9671, longitude: 135.7727, name: '伏見稲荷大社' },
    kiyomizudera: { latitude: 34.9949, longitude: 135.7850, name: '清水寺' },
    arashiyama: { latitude: 35.0094, longitude: 135.6722, name: '嵐山' },
    gion: { latitude: 35.0037, longitude: 135.7756, name: '祇園' },
    nijoCastle: { latitude: 35.0142, longitude: 135.7481, name: '二条城' },
    ginkakuji: { latitude: 35.0270, longitude: 135.7982, name: '銀閣寺' },
    kyotoStation: { latitude: 34.9858, longitude: 135.7588, name: '京都駅' },
    imperialPalace: { latitude: 35.0254, longitude: 135.7621, name: '京都御所' },
    toji: { latitude: 34.9807, longitude: 135.7478, name: '東寺' },
    nishikiMarket: { latitude: 35.0050, longitude: 135.7648, name: '錦市場' },
    philosophersPath: { latitude: 35.0188, longitude: 135.7942, name: '哲学の道' },
  },

  appScheme: 'mykyoto',
  storageName: 'my-kyoto-storage',
  
  // ⛩️ 鳥居・神社・寺院・伝統文化に関連した漢字
  symbolSuggestions: [
    '神', '社', '寺', '京', '雅', '舞', '禅', '茶', '花', '竹',
    '金', '銀', '桜', '道', '和', '橋', '門', '御', '清', '稀',
    '風', '月', '庭', '鐘', '香', '紅', '白', '水', '山', '光',
  ],
  // 京都らしい絵文字
  emojiSuggestions: [
    '⛩️', '🏯', '🎋', '🍵', '🌸', '🎎', '👘', '🏮', '🍡', '🎍',
    '🌊', '🗻', '🍁', '🌙', '✨', '🎐', '🪭', '🥢', '🍶', '🌺',
    '📿', '🔔', '🪷', '🐉', '🦊', '🎏', '🌳', '💮', '🏵️', '🎑',
  ],
};

