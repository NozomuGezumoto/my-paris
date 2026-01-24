// ============================================
// My City - Photo Pin Marker
// Circular thumbnail with border
// ============================================

import React from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import { CITY_THEME_COLORS, CITY_PIN_SIZE, CITY_SHADOWS, CITY_RADIUS } from '../../constants/city-theme';

interface PhotoMarkerProps {
  photoUri: string;
  onPress?: () => void;
  size?: number;
}

export default function PhotoMarker({
  photoUri,
  onPress,
  size = CITY_PIN_SIZE.photo,
}: PhotoMarkerProps) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={[styles.marker, { width: size, height: size }, CITY_SHADOWS.md]}>
        <Image
          source={{ uri: photoUri }}
          style={[styles.image, { width: size - 6, height: size - 6 }]}
          resizeMode="cover"
        />
      </View>
      <View style={styles.pointer} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  marker: {
    borderRadius: CITY_RADIUS.full,
    borderWidth: 3,
    borderColor: CITY_THEME_COLORS.textPrimary,
    backgroundColor: CITY_THEME_COLORS.photoPin,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: CITY_RADIUS.full,
  },
  pointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: CITY_THEME_COLORS.textPrimary,
    marginTop: -2,
  },
});
