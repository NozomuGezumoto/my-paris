// ============================================
// City Theme - Unified Design System Export
// Re-exports city-specific theme from config
// ============================================

import { CITY_COLORS, CITY_CENTER, CITY_VIEW_BOUNDS, CITY_INITIAL_REGION, CITY_EMOJI, CITY_NAME, CITY_NAME_JA, isWithinCity, clampRegion, MAX_ZOOM_OUT_DELTA, CITY_MAPBOX_BOUNDS, CAMERA_BOUNDS, SYMBOL_SUGGESTIONS, EMOJI_SUGGESTIONS } from '../config';

// Re-export colors with generic name for easy migration
export const CITY_THEME_COLORS = CITY_COLORS;

// Typography (shared across all cities)
export const CITY_TYPOGRAPHY = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  fontSize: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 24,
    display: 32,
    hero: 48,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.8,
  },
};

// Spacing (shared across all cities)
export const CITY_SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

// Border radius (shared across all cities)
export const CITY_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
};

// Shadows (using city primary colors)
export const CITY_SHADOWS = {
  sm: {
    shadowColor: CITY_COLORS.textPrimary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: CITY_COLORS.textPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: CITY_COLORS.textPrimary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  glow: {
    shadowColor: CITY_COLORS.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  glowPrimary: {
    shadowColor: CITY_COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  glowSecondary: {
    shadowColor: CITY_COLORS.accentSecondary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
};

// Pin marker sizes (shared across all cities)
export const CITY_PIN_SIZE = {
  photo: 48,
  text: 40,
  cluster: 44,
};

// Animation durations (shared across all cities)
export const CITY_ANIMATION = {
  fast: 150,
  normal: 300,
  slow: 500,
};

// Re-export geographic constants
export {
  CITY_CENTER,
  CITY_VIEW_BOUNDS,
  CITY_INITIAL_REGION,
  CITY_EMOJI,
  CITY_NAME,
  CITY_NAME_JA,
  isWithinCity,
  clampRegion,
  MAX_ZOOM_OUT_DELTA,
  CITY_MAPBOX_BOUNDS,
  CAMERA_BOUNDS,
  SYMBOL_SUGGESTIONS,
  EMOJI_SUGGESTIONS,
};

