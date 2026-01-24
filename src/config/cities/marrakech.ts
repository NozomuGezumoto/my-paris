// ============================================
// Marrakech - Configuration
// The Red City, Morocco
// ============================================

import { CityConfig } from '../types';

export const marrakechConfig: CityConfig = {
  id: 'marrakech',
  name: 'Marrakech',
  nameJa: 'マラケシュ',
  country: 'Morocco',
  countryJa: 'モロッコ',
  tagline: 'The Red City',
  taglineJa: '赤の都市',
  emoji: '🕌',

  center: {
    latitude: 31.6295,
    longitude: -7.9811,
  },

  bounds: {
    north: 31.7500,
    south: 31.5500,
    east: -7.8500,
    west: -8.1000,
  },

  viewBounds: {
    north: 31.6900,
    south: 31.5800,
    east: -7.9200,
    west: -8.0500,
  },

  defaultZoom: 13,

  colors: {
    // Primary - Moroccan terracotta
    primary: '#b45309',
    primaryLight: '#d97706',
    primaryDark: '#92400e',

    // Accent - Moroccan heritage
    accent: '#0369a1',          // Moroccan blue
    accentSecondary: '#166534', // Garden green
    accentTertiary: '#c9a954',  // Brass gold
    accentQuaternary: '#fef3c7', // Sand cream

    // Backgrounds
    background: '#fef7ed',
    backgroundElevated: '#ffffff',
    backgroundCard: '#ffffff',

    surface: '#fed7aa',
    surfaceLight: '#fff7ed',
    surfaceDark: '#fdba74',

    // Text
    textPrimary: '#431407',
    textSecondary: '#78350f',
    textMuted: '#a16207',

    // Semantic
    success: '#166534',
    warning: '#d97706',
    error: '#dc2626',

    // Map
    mapOverlay: 'rgba(254, 247, 237, 0.95)',
    mapOverlayLight: 'rgba(254, 247, 237, 0.80)',

    // Pins
    photoPin: '#b45309',
    textPin: '#0369a1',
    cluster: '#c9a954',

    // Rank
    rank1: '#fed7aa',
    rank2: '#d97706',
    rank3: '#c9a954',

    // Borders
    border: 'rgba(67, 20, 7, 0.12)',
    borderLight: 'rgba(67, 20, 7, 0.06)',
    borderMedium: 'rgba(67, 20, 7, 0.20)',
  },

  landmarks: {
    jemaaElFna: { latitude: 31.6258, longitude: -7.9891, name: 'Jemaa el-Fna' },
    koutubia: { latitude: 31.6237, longitude: -7.9937, name: 'Koutoubia Mosque' },
    bahiaPalace: { latitude: 31.6215, longitude: -7.9829, name: 'Bahia Palace' },
    elBadiPalace: { latitude: 31.6181, longitude: -7.9850, name: 'El Badi Palace' },
    majorelleGarden: { latitude: 31.6416, longitude: -8.0033, name: 'Jardin Majorelle' },
    saadianTombs: { latitude: 31.6172, longitude: -7.9883, name: 'Saadian Tombs' },
    medina: { latitude: 31.6295, longitude: -7.9870, name: 'Medina' },
    souks: { latitude: 31.6308, longitude: -7.9867, name: 'Souks' },
    benYoussef: { latitude: 31.6319, longitude: -7.9870, name: 'Ben Youssef Madrasa' },
    menara: { latitude: 31.6144, longitude: -8.0222, name: 'Menara Gardens' },
    mellah: { latitude: 31.6181, longitude: -7.9778, name: 'Mellah (Jewish Quarter)' },
    gueliz: { latitude: 31.6361, longitude: -8.0125, name: 'Gueliz' },
  },

  appScheme: 'mymarrakech',
  storageName: 'my-marrakech-storage',
  
  // 🕌 モスク・モロッコの伝統・メディナ
  symbolSuggestions: [
    '砂', '城', '香', '迷', '市', '陽', '紅', '門', '塔', '宮',
    '駱', '駝', '泉', '庭', '茶', '薄', '荷', '革', '絨', '毯',
    '夜', '月', '星', '金', '銅', '青', '白', '幾', '何', '祈',
  ],
  // Marrakech/Moroccan themed emojis
  emojiSuggestions: [
    '🕌', '🐪', '🌙', '⭐', '🧿', '🫖', '☕', '🍵', '🌴', '☀️',
    '🏺', '🪔', '🕯️', '🎭', '🧵', '🪭', '🌺', '🌸', '🌵', '🏜️',
    '🍊', '🫒', '🥙', '🍋', '✨', '💫', '🧡', '❤️', '🪬', '🔔',
  ],
};

