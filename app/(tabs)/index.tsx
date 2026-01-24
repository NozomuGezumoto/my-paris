// ============================================
// My City - Showcase Map Screen (Main)
// ============================================

import React, { useRef, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import BottomSheet from '@gorhom/bottom-sheet';
import { CITY_THEME_COLORS } from '../../src/constants/city-theme';
import { MemoryPin } from '../../src/types';
import CityMap from '../../src/components/map/CityMap';
import MapOverlay from '../../src/components/ui/MapOverlay';
import CategorySheet from '../../src/components/ui/CategorySheet';

export default function ShowcaseMapScreen() {
  const router = useRouter();
  const categorySheetRef = useRef<BottomSheet>(null);

  const handlePinPress = useCallback((pin: MemoryPin) => {
    // Navigate directly to detail screen
    router.push(`/pin/${pin.id}`);
  }, [router]);

  const handleLongPress = useCallback(
    (coordinates: { latitude: number; longitude: number }) => {
      router.push({
        pathname: '/add-memory',
        params: {
          lat: coordinates.latitude.toString(),
          lng: coordinates.longitude.toString(),
        },
      });
    },
    [router]
  );

  const handleCategoryPress = useCallback(() => {
    categorySheetRef.current?.snapToIndex(0);
  }, []);

  const handleAddPress = useCallback(() => {
    router.push('/add-memory');
  }, [router]);

  return (
    <View style={styles.container}>
      {/* Full-screen map */}
      <CityMap
        onPinPress={handlePinPress}
        onLongPress={handleLongPress}
      />

      {/* Minimal overlay UI */}
      <MapOverlay
        onCategoryPress={handleCategoryPress}
        onAddPress={handleAddPress}
      />

      {/* Category selection sheet */}
      <CategorySheet ref={categorySheetRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CITY_THEME_COLORS.background,
  },
});
