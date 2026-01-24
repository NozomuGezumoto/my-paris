// ============================================
// My City - Configuration Entry Point
// Reads CITY environment variable and exports active city config
// ============================================

import Constants from 'expo-constants';
import { CityConfig, CityId } from './types';
import { CITIES, getCityConfig, CITY_LIST } from './cities';

// Get city from Expo config extra (set via app.config.js)
const cityId: CityId = (Constants.expoConfig?.extra?.city as CityId) || 'kyoto';

// Active city configuration
export const CITY_CONFIG: CityConfig = getCityConfig(cityId);

// ============================================
// Convenient exports for components
// ============================================

// City info
export const CITY_ID = CITY_CONFIG.id;
export const CITY_NAME = CITY_CONFIG.name;
export const CITY_NAME_JA = CITY_CONFIG.nameJa;
export const CITY_EMOJI = CITY_CONFIG.emoji;
export const APP_NAME = `My ${CITY_CONFIG.name}`;
export const APP_NAME_JA = `My ${CITY_CONFIG.nameJa}`;

// Geographic
export const CITY_CENTER = CITY_CONFIG.center;
export const CITY_BOUNDS = CITY_CONFIG.bounds;
export const CITY_VIEW_BOUNDS = CITY_CONFIG.viewBounds;
export const CITY_LANDMARKS = CITY_CONFIG.landmarks;
export const DEFAULT_ZOOM = CITY_CONFIG.defaultZoom;

// Theme colors
export const CITY_COLORS = CITY_CONFIG.colors;

// Storage
export const STORAGE_NAME = CITY_CONFIG.storageName;

// Text Pin Suggestions (city-specific characters)
export const SYMBOL_SUGGESTIONS = CITY_CONFIG.symbolSuggestions;
export const EMOJI_SUGGESTIONS = CITY_CONFIG.emojiSuggestions;

// ============================================
// Geographic helper functions
// ============================================

// Initial region for map
export const CITY_INITIAL_REGION = {
  latitude: CITY_CENTER.latitude,
  longitude: CITY_CENTER.longitude,
  latitudeDelta: Math.abs(CITY_VIEW_BOUNDS.south - CITY_VIEW_BOUNDS.north),
  longitudeDelta: Math.abs(CITY_VIEW_BOUNDS.west - CITY_VIEW_BOUNDS.east),
};

// Maximum delta (maximum zoom out level)
export const MAX_ZOOM_OUT_DELTA = {
  latitudeDelta: 0.25,
  longitudeDelta: 0.25,
};

// Check if coordinates are within city region
export function isWithinCity(lat: number, lng: number): boolean {
  return (
    lat <= CITY_VIEW_BOUNDS.north &&
    lat >= CITY_VIEW_BOUNDS.south &&
    lng >= CITY_VIEW_BOUNDS.west &&
    lng <= CITY_VIEW_BOUNDS.east
  );
}

// Clamp region to city bounds
export function clampRegion(region: {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}) {
  // Clamp delta (zoom level)
  const latitudeDelta = Math.min(Math.abs(region.latitudeDelta), MAX_ZOOM_OUT_DELTA.latitudeDelta);
  const longitudeDelta = Math.min(Math.abs(region.longitudeDelta), MAX_ZOOM_OUT_DELTA.longitudeDelta);

  // Calculate bounds based on current view
  const halfLatDelta = latitudeDelta / 2;
  const halfLngDelta = longitudeDelta / 2;

  // Clamp center position to keep view within bounds
  let latitude = region.latitude;
  let longitude = region.longitude;

  // Ensure the view doesn't go outside the bounds
  const minLat = CITY_VIEW_BOUNDS.south + halfLatDelta;
  const maxLat = CITY_VIEW_BOUNDS.north - halfLatDelta;
  const minLng = CITY_VIEW_BOUNDS.west + halfLngDelta;
  const maxLng = CITY_VIEW_BOUNDS.east - halfLngDelta;

  latitude = Math.max(minLat, Math.min(maxLat, latitude));
  longitude = Math.max(minLng, Math.min(maxLng, longitude));

  return {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  };
}

// For Mapbox bounds format [west, south, east, north]
export const CITY_MAPBOX_BOUNDS: [[number, number], [number, number]] = [
  [CITY_VIEW_BOUNDS.west, CITY_VIEW_BOUNDS.south],
  [CITY_VIEW_BOUNDS.east, CITY_VIEW_BOUNDS.north],
];

// Camera bounds with padding
export const CAMERA_BOUNDS = {
  ne: [CITY_VIEW_BOUNDS.east, CITY_VIEW_BOUNDS.north] as [number, number],
  sw: [CITY_VIEW_BOUNDS.west, CITY_VIEW_BOUNDS.south] as [number, number],
  paddingLeft: 20,
  paddingRight: 20,
  paddingTop: 20,
  paddingBottom: 20,
};

// ============================================
// Re-exports
// ============================================

export { CITIES, CITY_LIST, getCityConfig } from './cities';
export type { CityConfig, CityId, CityColors, CityCenter, CityBounds, CityLandmark } from './types';

