// ============================================
// My City - Text Pin Marker
// Single character in styled circle
// ============================================

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { CITY_THEME_COLORS, CITY_PIN_SIZE, CITY_SHADOWS, CITY_RADIUS, CITY_TYPOGRAPHY } from '../../constants/city-theme';

interface TextMarkerProps {
  textChar: string;
  onPress?: () => void;
  size?: number;
}

export default function TextMarker({
  textChar,
  onPress,
  size = CITY_PIN_SIZE.text,
}: TextMarkerProps) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={[styles.marker, { width: size, height: size }, CITY_SHADOWS.md]}>
        <Text style={styles.text}>{textChar}</Text>
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
    borderWidth: 2,
    borderColor: CITY_THEME_COLORS.textPin,
    backgroundColor: CITY_THEME_COLORS.backgroundCard,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: CITY_TYPOGRAPHY.fontSize.xl,
    color: CITY_THEME_COLORS.textPrimary,
    fontWeight: '600',
  },
  pointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: CITY_THEME_COLORS.textPin,
    marginTop: -2,
  },
});
