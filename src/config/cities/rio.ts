// ============================================
// Rio de Janeiro - Configuration
// The Marvelous City, Brazil
// ============================================

import { CityConfig } from '../types';

export const rioConfig: CityConfig = {
  id: 'rio',
  name: 'Rio de Janeiro',
  nameJa: 'リオ・デ・ジャネイロ',
  country: 'Brazil',
  countryJa: 'ブラジル',
  tagline: 'The Marvelous City',
  taglineJa: '驚異の都市',
  emoji: '🎭',

  center: {
    latitude: -22.9068,
    longitude: -43.1729,
  },

  bounds: {
    north: -22.7500,
    south: -23.0800,
    east: -43.0000,
    west: -43.4500,
  },

  viewBounds: {
    north: -22.8500,
    south: -22.9800,
    east: -43.1000,
    west: -43.2800,
  },

  defaultZoom: 13,

  colors: {
    // Primary - Brazilian tropical
    primary: '#0d9488',
    primaryLight: '#14b8a6',
    primaryDark: '#0f766e',

    // Accent - Carnival & beach
    accent: '#f59e0b',          // Samba gold
    accentSecondary: '#22c55e', // Tropical green
    accentTertiary: '#f43f5e',  // Carnival pink
    accentQuaternary: '#38bdf8', // Ocean blue

    // Backgrounds
    background: '#f0fdf4',
    backgroundElevated: '#ffffff',
    backgroundCard: '#ffffff',

    surface: '#dcfce7',
    surfaceLight: '#f7fef9',
    surfaceDark: '#bbf7d0',

    // Text
    textPrimary: '#14532d',
    textSecondary: '#166534',
    textMuted: '#4ade80',

    // Semantic
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',

    // Map
    mapOverlay: 'rgba(240, 253, 244, 0.95)',
    mapOverlayLight: 'rgba(240, 253, 244, 0.80)',

    // Pins
    photoPin: '#0d9488',
    textPin: '#22c55e',
    cluster: '#f59e0b',

    // Rank
    rank1: '#dcfce7',
    rank2: '#14b8a6',
    rank3: '#f59e0b',

    // Borders
    border: 'rgba(20, 83, 45, 0.12)',
    borderLight: 'rgba(20, 83, 45, 0.06)',
    borderMedium: 'rgba(20, 83, 45, 0.20)',
  },

  landmarks: {
    christRedeemer: { latitude: -22.9519, longitude: -43.2105, name: 'Cristo Redentor' },
    sugarloaf: { latitude: -22.9486, longitude: -43.1546, name: 'Pão de Açúcar' },
    copacabana: { latitude: -22.9711, longitude: -43.1822, name: 'Copacabana' },
    ipanema: { latitude: -22.9839, longitude: -43.2045, name: 'Ipanema' },
    maracana: { latitude: -22.9121, longitude: -43.2302, name: 'Maracanã' },
    lapaArches: { latitude: -22.9137, longitude: -43.1798, name: 'Arcos da Lapa' },
    santaTeresa: { latitude: -22.9222, longitude: -43.1878, name: 'Santa Teresa' },
    tijuca: { latitude: -22.9539, longitude: -43.2833, name: 'Floresta da Tijuca' },
    botafogo: { latitude: -22.9511, longitude: -43.1813, name: 'Botafogo' },
    leblon: { latitude: -22.9881, longitude: -43.2242, name: 'Leblon' },
    selaronSteps: { latitude: -22.9155, longitude: -43.1790, name: 'Escadaria Selarón' },
    museumTomorrow: { latitude: -22.8943, longitude: -43.1807, name: 'Museu do Amanhã' },
  },

  appScheme: 'myrio',
  storageName: 'my-rio-storage',
  
  // 🎭 カーニバル・サンバ・ビーチライフ
  symbolSuggestions: [
    '祭', '舞', '浜', '陽', '山', '波', '熱', '歓', '彩', '輝',
    '救', '主', '像', '丘', '森', '球', '足', '鳥', '羽', '仮',
    '面', '鼓', '笛', '夜', '星', '月', '夢', '愛', '情', '楽',
  ],
  // Rio/Brazilian themed emojis
  emojiSuggestions: [
    '🎭', '🎉', '💃', '🏖️', '🌊', '🌴', '⚽', '🎶', '🥁', '🎺',
    '✝️', '🗻', '🌅', '🦜', '🦋', '🍹', '🥥', '☀️', '🏄', '🎊',
    '💛', '💚', '💙', '🌺', '🌸', '🍊', '🍋', '✨', '🔥', '🤸',
  ],
};

