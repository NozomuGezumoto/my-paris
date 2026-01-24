// ============================================
// Paris - Configuration
// The City of Light, France
// ============================================

import { CityConfig } from '../types';

export const parisConfig: CityConfig = {
  id: 'paris',
  name: 'Paris',
  nameJa: 'パリ',
  country: 'France',
  countryJa: 'フランス',
  tagline: 'The City of Light',
  taglineJa: '光の都',
  emoji: '🗼',

  center: {
    latitude: 48.8566,
    longitude: 2.3522,
  },

  bounds: {
    north: 48.9500,
    south: 48.7800,
    east: 2.5000,
    west: 2.2000,
  },

  viewBounds: {
    north: 48.9000,
    south: 48.8100,
    east: 2.4200,
    west: 2.2800,
  },

  defaultZoom: 13,

  colors: {
    // Primary - Bleu de Paris
    primary: '#1e3a5f',
    primaryLight: '#4a6fa5',
    primaryDark: '#0d1f33',

    // Accent - French elegance
    accent: '#c9a227',          // Or (gold)
    accentSecondary: '#8b0000', // Bordeaux red
    accentTertiary: '#d4c4a8',  // Cream
    accentQuaternary: '#6b5b4f', // Café brown

    // Backgrounds
    background: '#f7f5f0',
    backgroundElevated: '#ffffff',
    backgroundCard: '#ffffff',

    surface: '#efe9df',
    surfaceLight: '#fbf9f6',
    surfaceDark: '#e0d8ca',

    // Text
    textPrimary: '#1a1a1a',
    textSecondary: '#4a4a4a',
    textMuted: '#7a7a7a',

    // Semantic
    success: '#4a7c59',
    warning: '#c9a227',
    error: '#8b0000',

    // Map
    mapOverlay: 'rgba(247, 245, 240, 0.95)',
    mapOverlayLight: 'rgba(247, 245, 240, 0.80)',

    // Pins
    photoPin: '#1e3a5f',
    textPin: '#8b0000',
    cluster: '#c9a227',

    // Rank
    rank1: '#efe9df',
    rank2: '#4a6fa5',
    rank3: '#c9a227',

    // Borders
    border: 'rgba(26, 26, 26, 0.12)',
    borderLight: 'rgba(26, 26, 26, 0.06)',
    borderMedium: 'rgba(26, 26, 26, 0.20)',
  },

  landmarks: {
    eiffelTower: { latitude: 48.8584, longitude: 2.2945, name: 'Tour Eiffel' },
    louvre: { latitude: 48.8606, longitude: 2.3376, name: 'Musée du Louvre' },
    notredame: { latitude: 48.8530, longitude: 2.3499, name: 'Notre-Dame de Paris' },
    arcDeTriomphe: { latitude: 48.8738, longitude: 2.2950, name: "Arc de Triomphe" },
    sacreCoeur: { latitude: 48.8867, longitude: 2.3431, name: 'Sacré-Cœur' },
    montmartre: { latitude: 48.8862, longitude: 2.3411, name: 'Montmartre' },
    champselysees: { latitude: 48.8698, longitude: 2.3078, name: 'Champs-Élysées' },
    museeOrsay: { latitude: 48.8600, longitude: 2.3266, name: "Musée d'Orsay" },
    luxembourgGarden: { latitude: 48.8462, longitude: 2.3372, name: 'Jardin du Luxembourg' },
    latinQuarter: { latitude: 48.8490, longitude: 2.3470, name: 'Quartier Latin' },
    marais: { latitude: 48.8566, longitude: 2.3611, name: 'Le Marais' },
    saintgermain: { latitude: 48.8539, longitude: 2.3338, name: 'Saint-Germain-des-Prés' },
  },

  appScheme: 'myparis',
  storageName: 'my-paris-storage',
  
  // 🗼 エッフェル塔・芸術・恋愛・優雅
  symbolSuggestions: [
    '塔', '光', '愛', '花', '美', '芸', '香', '夢', '街', '橋',
    '恋', '絵', '館', '庭', '河', '宮', '金', '薔', '薇', '詩',
    '舞', '音', '酒', '夜', '星', '月', '雅', '彩', '石', '凱',
  ],
  // Paris/French themed emojis
  emojiSuggestions: [
    '🗼', '🥐', '🍷', '🎨', '💕', '🌹', '🥖', '☕', '🧀', '🗺️',
    '🏛️', '⛪', '🎭', '🚇', '🚴', '📸', '✨', '💎', '👗', '💄',
    '🍾', '🥂', '🍰', '🎪', '🌸', '🪻', '🌺', '🎻', '🖼️', '💐',
  ],
};

