// ============================================
// Bangkok - Configuration
// The City of Angels, Thailand
// ============================================

import { CityConfig } from '../types';

export const bangkokConfig: CityConfig = {
  id: 'bangkok',
  name: 'Bangkok',
  nameJa: 'バンコク',
  country: 'Thailand',
  countryJa: 'タイ',
  tagline: 'The City of Angels',
  taglineJa: '天使の都',
  emoji: '🛕',

  center: {
    latitude: 13.7563,
    longitude: 100.5018,
  },

  bounds: {
    north: 13.9000,
    south: 13.6000,
    east: 100.7000,
    west: 100.3500,
  },

  viewBounds: {
    north: 13.8200,
    south: 13.6900,
    east: 100.5800,
    west: 100.4200,
  },

  defaultZoom: 13,

  colors: {
    // Primary - Royal Thai Gold & Saffron
    primary: '#d4a220',
    primaryLight: '#e8c252',
    primaryDark: '#a67c00',

    // Accent - Thai heritage
    accent: '#e25822',          // Thai orange
    accentSecondary: '#006241', // Jungle green
    accentTertiary: '#7b2d26',  // Temple red
    accentQuaternary: '#f5e6d3', // Thai silk cream

    // Backgrounds
    background: '#fdfaf5',
    backgroundElevated: '#ffffff',
    backgroundCard: '#ffffff',

    surface: '#f8f0e3',
    surfaceLight: '#fefcf9',
    surfaceDark: '#ebe0cf',

    // Text
    textPrimary: '#2a2318',
    textSecondary: '#5a4d3a',
    textMuted: '#8a7d6a',

    // Semantic
    success: '#006241',
    warning: '#e25822',
    error: '#7b2d26',

    // Map
    mapOverlay: 'rgba(253, 250, 245, 0.95)',
    mapOverlayLight: 'rgba(253, 250, 245, 0.80)',

    // Pins
    photoPin: '#d4a220',
    textPin: '#006241',
    cluster: '#e25822',

    // Rank
    rank1: '#f8f0e3',
    rank2: '#e8c252',
    rank3: '#d4a220',

    // Borders
    border: 'rgba(42, 35, 24, 0.12)',
    borderLight: 'rgba(42, 35, 24, 0.06)',
    borderMedium: 'rgba(42, 35, 24, 0.20)',
  },

  landmarks: {
    grandPalace: { latitude: 13.7500, longitude: 100.4914, name: 'Grand Palace' },
    watArun: { latitude: 13.7437, longitude: 100.4888, name: 'Wat Arun' },
    watPho: { latitude: 13.7465, longitude: 100.4930, name: 'Wat Pho' },
    khaosanRoad: { latitude: 13.7589, longitude: 100.4975, name: 'Khao San Road' },
    chatuchak: { latitude: 13.7999, longitude: 100.5533, name: 'Chatuchak Market' },
    sukhumvit: { latitude: 13.7383, longitude: 100.5612, name: 'Sukhumvit' },
    chinatown: { latitude: 13.7400, longitude: 100.5100, name: 'Chinatown (Yaowarat)' },
    silom: { latitude: 13.7267, longitude: 100.5232, name: 'Silom' },
    siam: { latitude: 13.7465, longitude: 100.5347, name: 'Siam' },
    lumpiniPark: { latitude: 13.7300, longitude: 100.5418, name: 'Lumpini Park' },
    jimThompsonHouse: { latitude: 13.7492, longitude: 100.5269, name: 'Jim Thompson House' },
    iconSiam: { latitude: 13.7267, longitude: 100.5100, name: 'ICONSIAM' },
  },

  appScheme: 'mybangkok',
  storageName: 'my-bangkok-storage',
  
  // 🛕 仏教寺院・タイの伝統・天使の都
  symbolSuggestions: [
    '仏', '寺', '金', '象', '蓮', '祈', '王', '川', '香', '花',
    '天', '使', '宮', '塔', '舞', '絹', '市', '船', '夜', '熱',
    '辛', '甘', '麺', '僧', '鈴', '輪', '光', '龍', '虎', '福',
  ],
  // Bangkok/Thai themed emojis
  emojiSuggestions: [
    '🛕', '🙏', '🐘', '🌺', '🍜', '🥢', '🛺', '🚤', '☀️', '🌴',
    '👑', '💛', '🧘', '🎭', '🏮', '🍛', '🥭', '🌶️', '🍚', '🌸',
    '🐍', '🦎', '🐒', '🌊', '⛵', '🎋', '🪷', '🌙', '✨', '🪭',
  ],
};

