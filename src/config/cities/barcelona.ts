// ============================================
// Barcelona - Configuration
// The Mediterranean Jewel, Spain
// ============================================

import { CityConfig } from '../types';

export const barcelonaConfig: CityConfig = {
  id: 'barcelona',
  name: 'Barcelona',
  nameJa: 'バルセロナ',
  country: 'Spain',
  countryJa: 'スペイン',
  tagline: 'The Mediterranean Jewel',
  taglineJa: '地中海の宝石',
  emoji: '🏗️',

  center: {
    latitude: 41.3851,
    longitude: 2.1734,
  },

  bounds: {
    north: 41.4700,
    south: 41.3200,
    east: 2.2600,
    west: 2.0500,
  },

  viewBounds: {
    north: 41.4300,
    south: 41.3500,
    east: 2.2200,
    west: 2.1200,
  },

  defaultZoom: 13,

  colors: {
    // Primary - Catalan colors
    primary: '#be123c',
    primaryLight: '#f43f5e',
    primaryDark: '#881337',

    // Accent - Mediterranean & Gaudí
    accent: '#f59e0b',          // Catalan gold
    accentSecondary: '#0d9488', // Mediterranean teal
    accentTertiary: '#1e40af',  // Ceramic blue
    accentQuaternary: '#fde68a', // Sandy yellow

    // Backgrounds
    background: '#fffbeb',
    backgroundElevated: '#ffffff',
    backgroundCard: '#ffffff',

    surface: '#fef3c7',
    surfaceLight: '#fefce8',
    surfaceDark: '#fde68a',

    // Text
    textPrimary: '#1c1917',
    textSecondary: '#44403c',
    textMuted: '#78716c',

    // Semantic
    success: '#0d9488',
    warning: '#f59e0b',
    error: '#be123c',

    // Map
    mapOverlay: 'rgba(255, 251, 235, 0.95)',
    mapOverlayLight: 'rgba(255, 251, 235, 0.80)',

    // Pins
    photoPin: '#be123c',
    textPin: '#0d9488',
    cluster: '#f59e0b',

    // Rank
    rank1: '#fef3c7',
    rank2: '#f43f5e',
    rank3: '#f59e0b',

    // Borders
    border: 'rgba(28, 25, 23, 0.12)',
    borderLight: 'rgba(28, 25, 23, 0.06)',
    borderMedium: 'rgba(28, 25, 23, 0.20)',
  },

  landmarks: {
    sagradaFamilia: { latitude: 41.4036, longitude: 2.1744, name: 'Sagrada Família' },
    parkGuell: { latitude: 41.4145, longitude: 2.1527, name: 'Park Güell' },
    casaBatllo: { latitude: 41.3916, longitude: 2.1649, name: 'Casa Batlló' },
    laRambla: { latitude: 41.3814, longitude: 2.1734, name: 'La Rambla' },
    barceloneta: { latitude: 41.3807, longitude: 2.1890, name: 'Barceloneta Beach' },
    gothicQuarter: { latitude: 41.3833, longitude: 2.1761, name: 'Gothic Quarter' },
    campNou: { latitude: 41.3809, longitude: 2.1228, name: 'Camp Nou' },
    casaMila: { latitude: 41.3954, longitude: 2.1620, name: 'Casa Milà (La Pedrera)' },
    boqueria: { latitude: 41.3816, longitude: 2.1719, name: 'La Boqueria' },
    montjuic: { latitude: 41.3641, longitude: 2.1587, name: 'Montjuïc' },
    tibidabo: { latitude: 41.4225, longitude: 2.1186, name: 'Tibidabo' },
    elBorn: { latitude: 41.3853, longitude: 2.1826, name: 'El Born' },
  },

  appScheme: 'mybarcelona',
  storageName: 'my-barcelona-storage',
  
  // 🏗️ ガウディ建築・地中海・カタルーニャ文化
  symbolSuggestions: [
    '波', '陽', '建', '曲', '海', '彩', '石', '熱', '砂', '風',
    '聖', '塔', '夢', '龍', '蜥', '蜴', '球', '足', '舞', '祭',
    '市', '港', '丘', '街', '美', '芸', '酒', '魚', '橙', '花',
  ],
  // Barcelona/Catalan themed emojis
  emojiSuggestions: [
    '🏗️', '⛪', '🏖️', '🌊', '⚽', '🎨', '🍷', '🍺', '🥘', '🦑',
    '🌻', '☀️', '🎭', '💃', '🎸', '🚇', '🛹', '🌴', '🎪', '🦎',
    '🧡', '❤️', '💛', '🍊', '🫒', '🍇', '🧀', '🍾', '✨', '🎉',
  ],
};

