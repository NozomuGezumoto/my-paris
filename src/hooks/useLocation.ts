// ============================================
// My Tokyo - Location Hook
// Handles location permissions and current position
// ============================================

import { useState, useEffect, useCallback } from 'react';
import * as Location from 'expo-location';
import { isWithinTokyo, TOKYO_CENTER } from '../constants/tokyo';

interface LocationState {
  latitude: number;
  longitude: number;
  isInTokyo: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useLocation() {
  const [location, setLocation] = useState<LocationState>({
    latitude: TOKYO_CENTER.latitude,
    longitude: TOKYO_CENTER.longitude,
    isInTokyo: true,
    isLoading: false,
    error: null,
  });

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const requestPermission = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setHasPermission(status === 'granted');
      return status === 'granted';
    } catch (error) {
      setHasPermission(false);
      return false;
    }
  }, []);

  const getCurrentLocation = useCallback(async () => {
    setLocation((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const granted = await requestPermission();
      if (!granted) {
        setLocation((prev) => ({
          ...prev,
          isLoading: false,
          error: 'Location permission denied',
        }));
        return null;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = position.coords;
      const isInTokyo = isWithinTokyo(latitude, longitude);

      setLocation({
        latitude,
        longitude,
        isInTokyo,
        isLoading: false,
        error: isInTokyo ? null : 'Location is outside Tokyo region',
      });

      return { latitude, longitude, isInTokyo };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get location';
      setLocation((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      return null;
    }
  }, [requestPermission]);

  return {
    ...location,
    hasPermission,
    requestPermission,
    getCurrentLocation,
  };
}
