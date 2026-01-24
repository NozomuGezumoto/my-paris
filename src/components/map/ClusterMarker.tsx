// ============================================
// My City - Cluster Marker
// Displays count of grouped pins
// ============================================

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { CITY_THEME_COLORS, CITY_PIN_SIZE, CITY_SHADOWS, CITY_RADIUS, CITY_TYPOGRAPHY } from '../../constants/city-theme';

interface ClusterMarkerProps {
  count: number;
  onPress?: () => void;
}

export default function ClusterMarker({ count, onPress }: ClusterMarkerProps) {
  // Dynamic size based on count
  const getSize = () => {
    if (count < 10) return CITY_PIN_SIZE.cluster;
    if (count < 50) return CITY_PIN_SIZE.cluster + 8;
    return CITY_PIN_SIZE.cluster + 16;
  };

  const size = getSize();

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={[styles.marker, { width: size, height: size }, CITY_SHADOWS.md]}>
        <Text style={styles.count}>{count > 99 ? '99+' : count}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    borderRadius: CITY_RADIUS.full,
    borderWidth: 3,
    borderColor: CITY_THEME_COLORS.textPrimary,
    backgroundColor: CITY_THEME_COLORS.cluster,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.95,
  },
  count: {
    fontSize: CITY_TYPOGRAPHY.fontSize.md,
    fontWeight: '700',
    color: CITY_THEME_COLORS.textPrimary,
  },
});
