// ============================================
// City Configurations Index
// ============================================

export { kyotoConfig } from './kyoto';
export { sydneyConfig } from './sydney';
export { parisConfig } from './paris';
export { londonConfig } from './london';
export { romeConfig } from './rome';
export { bangkokConfig } from './bangkok';
export { kuantanConfig } from './kuantan';
export { tokyoConfig } from './tokyo';
export { taipeiConfig } from './taipei';
export { barcelonaConfig } from './barcelona';
export { berlinConfig } from './berlin';
export { rioConfig } from './rio';
export { marrakechConfig } from './marrakech';

import { kyotoConfig } from './kyoto';
import { sydneyConfig } from './sydney';
import { parisConfig } from './paris';
import { londonConfig } from './london';
import { romeConfig } from './rome';
import { bangkokConfig } from './bangkok';
import { kuantanConfig } from './kuantan';
import { tokyoConfig } from './tokyo';
import { taipeiConfig } from './taipei';
import { barcelonaConfig } from './barcelona';
import { berlinConfig } from './berlin';
import { rioConfig } from './rio';
import { marrakechConfig } from './marrakech';
import { CityConfig, CityId } from '../types';

// All cities map
export const CITIES: Record<CityId, CityConfig> = {
  kyoto: kyotoConfig,
  sydney: sydneyConfig,
  paris: parisConfig,
  london: londonConfig,
  rome: romeConfig,
  bangkok: bangkokConfig,
  kuantan: kuantanConfig,
  tokyo: tokyoConfig,
  taipei: taipeiConfig,
  barcelona: barcelonaConfig,
  berlin: berlinConfig,
  rio: rioConfig,
  marrakech: marrakechConfig,
};

// City list for UI
export const CITY_LIST: CityConfig[] = Object.values(CITIES);

// Get city by ID (with fallback)
export function getCityConfig(cityId: string): CityConfig {
  return CITIES[cityId as CityId] || kyotoConfig;
}

