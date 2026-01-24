// ============================================
// Kuantan - Configuration
// The East Coast Gem, Malaysia
// ============================================

import { CityConfig } from '../types';

export const kuantanConfig: CityConfig = {
  id: 'kuantan',
  name: 'Kuantan',
  nameJa: 'クアンタン',
  country: 'Malaysia',
  countryJa: 'マレーシア',
  tagline: 'Gateway to the East Coast',
  taglineJa: '東海岸への玄関口',
  emoji: '🏖️',

  center: {
    latitude: 3.8077,
    longitude: 103.3260,
  },

  bounds: {
    north: 3.9500,
    south: 3.7000,
    east: 103.5000,
    west: 103.2000,
  },

  viewBounds: {
    north: 3.8700,
    south: 3.7500,
    east: 103.4200,
    west: 103.2500,
  },

  defaultZoom: 13,

  colors: {
    // Primary - South China Sea Blue & Tropical
    primary: '#0891b2',
    primaryLight: '#22d3ee',
    primaryDark: '#0e7490',

    // Accent - Malaysian coastal
    accent: '#059669',          // Rainforest green
    accentSecondary: '#f59e0b', // Sunset amber
    accentTertiary: '#dc2626',  // Hibiscus red
    accentQuaternary: '#fef3c7', // Sand yellow

    // Backgrounds
    background: '#f0fdfa',
    backgroundElevated: '#ffffff',
    backgroundCard: '#ffffff',

    surface: '#e0f7f4',
    surfaceLight: '#f8fefd',
    surfaceDark: '#c4ede8',

    // Text
    textPrimary: '#134e4a',
    textSecondary: '#2d6a65',
    textMuted: '#5a9a94',

    // Semantic
    success: '#059669',
    warning: '#f59e0b',
    error: '#dc2626',

    // Map
    mapOverlay: 'rgba(240, 253, 250, 0.95)',
    mapOverlayLight: 'rgba(240, 253, 250, 0.80)',

    // Pins
    photoPin: '#0891b2',
    textPin: '#059669',
    cluster: '#f59e0b',

    // Rank
    rank1: '#e0f7f4',
    rank2: '#22d3ee',
    rank3: '#f59e0b',

    // Borders
    border: 'rgba(19, 78, 74, 0.12)',
    borderLight: 'rgba(19, 78, 74, 0.06)',
    borderMedium: 'rgba(19, 78, 74, 0.20)',
  },

  landmarks: {
    telukCempedak: { latitude: 3.8125, longitude: 103.3667, name: 'Teluk Cempedak Beach' },
    masjidSultan: { latitude: 3.8125, longitude: 103.3250, name: 'Sultan Ahmad Shah State Mosque' },
    cherating: { latitude: 4.1167, longitude: 103.3833, name: 'Cherating Beach' },
    sungaiLembing: { latitude: 3.9117, longitude: 103.0278, name: 'Sungai Lembing' },
    naturalBatik: { latitude: 3.9370, longitude: 103.4530, name: 'Natural Batik Village' },
    kuantanRiver: { latitude: 3.8167, longitude: 103.3333, name: 'Kuantan River' },
    eastCoastMall: { latitude: 3.8078, longitude: 103.3269, name: 'East Coast Mall' },
    pahangArtMuseum: { latitude: 3.8083, longitude: 103.3225, name: 'Pahang Art Museum' },
    bukit: { latitude: 3.8167, longitude: 103.3167, name: 'Bukit Pelindung' },
    gelora: { latitude: 3.8056, longitude: 103.3400, name: 'Taman Gelora' },
    balok: { latitude: 3.9333, longitude: 103.3833, name: 'Balok Beach' },
    gebeng: { latitude: 3.9000, longitude: 103.3500, name: 'Gebeng Industrial Area' },
  },

  appScheme: 'mykuantan',
  storageName: 'my-kuantan-storage',
  
  // 🏖️ ビーチ・熱帯・マレーシア東海岸
  symbolSuggestions: [
    '浜', '椰', '波', '砂', '熱', '緑', '島', '潮', '魚', '珊',
    '瑚', '亀', '蟹', '貝', '林', '雨', '川', '海', '風', '陽',
    '寺', '村', '市', '港', '船', '網', '夕', '虹', '夢', '楽',
  ],
  // Kuantan/Malaysian coastal themed emojis
  emojiSuggestions: [
    '🏖️', '🌴', '🌊', '🐢', '🐠', '🦀', '🌺', '☀️', '🌅', '⛵',
    '🥥', '🍍', '🍛', '🍜', '🛖', '🛺', '🕌', '🏝️', '🌳', '🦜',
    '🐒', '🦎', '🌸', '🪸', '🐚', '🎣', '🤿', '🏄', '💙', '💚',
  ],
};

