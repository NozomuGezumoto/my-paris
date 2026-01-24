// ============================================
// City Configuration Types
// ============================================

export type CityId =
  | 'kyoto'
  | 'sydney'
  | 'paris'
  | 'london'
  | 'rome'
  | 'bangkok'
  | 'kuantan'
  | 'tokyo'
  | 'taipei'
  | 'barcelona'
  | 'berlin'
  | 'rio'
  | 'marrakech';

export interface CityCenter {
  latitude: number;
  longitude: number;
}

export interface CityBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface CityLandmark {
  latitude: number;
  longitude: number;
  name: string;
}

export interface CityColors {
  // Primary palette
  primary: string;
  primaryLight: string;
  primaryDark: string;

  // Accent colors
  accent: string;
  accentSecondary: string;
  accentTertiary: string;
  accentQuaternary: string;

  // Backgrounds
  background: string;
  backgroundElevated: string;
  backgroundCard: string;

  // Surface variations
  surface: string;
  surfaceLight: string;
  surfaceDark: string;

  // Text colors
  textPrimary: string;
  textSecondary: string;
  textMuted: string;

  // Semantic colors
  success: string;
  warning: string;
  error: string;

  // Map overlay colors
  mapOverlay: string;
  mapOverlayLight: string;

  // Pin colors
  photoPin: string;
  textPin: string;
  cluster: string;

  // Rank colors
  rank1: string;
  rank2: string;
  rank3: string;

  // Borders
  border: string;
  borderLight: string;
  borderMedium: string;
}

export interface CityConfig {
  id: CityId;
  name: string;
  nameJa: string;
  country: string;
  countryJa: string;
  tagline: string;
  taglineJa: string;
  emoji: string;

  // Geographic
  center: CityCenter;
  bounds: CityBounds;
  viewBounds: CityBounds;
  defaultZoom: number;

  // Theme
  colors: CityColors;

  // Landmarks
  landmarks: Record<string, CityLandmark>;

  // App config
  appScheme: string;
  storageName: string;
  
  // Text pin suggestions (characters related to city emoji/theme)
  symbolSuggestions: string[];
  emojiSuggestions: string[];
}

