// ============================================
// My City - Map Overlay UI
// Minimal UI elements floating over the map
// ============================================

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  CITY_THEME_COLORS,
  CITY_TYPOGRAPHY,
  CITY_SPACING,
  CITY_RADIUS,
  CITY_SHADOWS,
  CITY_EMOJI,
} from '../../constants/city-theme';
import { useStore } from '../../store/useStore';

interface MapOverlayProps {
  onCategoryPress: () => void;
  onAddPress: () => void;
}

export default function MapOverlay({ onCategoryPress, onAddPress }: MapOverlayProps) {
  const insets = useSafeAreaInsets();
  const pins = useStore((state) => state.pins);
  const selectedCategoryId = useStore((state) => state.selectedCategoryId);
  const pinCategories = useStore((state) => state.pinCategories);
  const displayMode = useStore((state) => state.displayMode);
  const setDisplayMode = useStore((state) => state.setDisplayMode);

  // Calculate filtered pins count directly (ensures re-render on state change)
  const filteredPinsCount = selectedCategoryId
    ? pins.filter((pin) => 
        pinCategories.some((pc) => pc.pinId === pin.id && pc.categoryId === selectedCategoryId)
      ).length
    : pins.length;

  return (
    <>
      {/* Top overlay - Pin count */}
      <View style={[styles.topContainer, { top: insets.top + CITY_SPACING.md }]}>
        <View style={styles.countBadge}>
          <Text style={styles.countNumber}>{filteredPinsCount}</Text>
          <Text style={styles.countLabel}>memories</Text>
        </View>
      </View>

      {/* Bottom overlay - Action buttons */}
      <View style={[styles.bottomContainer, { bottom: insets.bottom + CITY_SPACING.xl }]}>
        {/* Left side buttons */}
        <View style={styles.leftButtons}>
          {/* Display mode toggle - single button */}
          <Pressable
            style={styles.displayModeToggle}
            onPress={() => {
              // photo ↔ text
              setDisplayMode(displayMode === 'photo' ? 'text' : 'photo');
            }}
          >
            {displayMode === 'photo' ? (
              <Ionicons name="image" size={20} color={CITY_THEME_COLORS.textPrimary} />
            ) : (
              <Text style={styles.displayModeToggleText}>A</Text>
            )}
          </Pressable>

          {/* Category button */}
          <Pressable
            style={[styles.actionButton, styles.categoryButton]}
            onPress={onCategoryPress}
          >
            <Ionicons name="layers-outline" size={22} color={CITY_THEME_COLORS.textPrimary} />
            <Text style={styles.actionButtonText}>Categories</Text>
          </Pressable>
        </View>

        {/* Add memory button */}
        <Pressable
          style={[styles.actionButton, styles.addButton]}
          onPress={onAddPress}
        >
          <Ionicons name="add" size={28} color={CITY_THEME_COLORS.backgroundCard} />
        </Pressable>
      </View>

      {/* App title - city emoji branding */}
      <View style={[styles.brandContainer, { top: insets.top + CITY_SPACING.md }]}>
        <Text style={styles.brandText}>{CITY_EMOJI}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    position: 'absolute',
    left: CITY_SPACING.lg,
    right: CITY_SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: CITY_SPACING.md,
  },
  countBadge: {
    backgroundColor: CITY_THEME_COLORS.backgroundCard,
    paddingHorizontal: CITY_SPACING.lg,
    paddingVertical: CITY_SPACING.sm,
    borderRadius: CITY_RADIUS.full,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: CITY_SPACING.sm,
    ...CITY_SHADOWS.md,
  },
  countNumber: {
    fontSize: CITY_TYPOGRAPHY.fontSize.xxl,
    fontWeight: '700',
    color: CITY_THEME_COLORS.textPrimary,
  },
  countLabel: {
    fontSize: CITY_TYPOGRAPHY.fontSize.xs,
    color: CITY_THEME_COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  bottomContainer: {
    position: 'absolute',
    left: CITY_SPACING.lg,
    right: CITY_SPACING.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  leftButtons: {
    gap: CITY_SPACING.sm,
  },
  displayModeToggle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: CITY_THEME_COLORS.backgroundCard,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: CITY_THEME_COLORS.accentSecondary,
    ...CITY_SHADOWS.sm,
  },
  displayModeToggleText: {
    fontSize: 20,
    color: CITY_THEME_COLORS.textPrimary,
    fontWeight: '600',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CITY_SPACING.sm,
    paddingHorizontal: CITY_SPACING.lg,
    paddingVertical: CITY_SPACING.md,
    borderRadius: CITY_RADIUS.full,
    ...CITY_SHADOWS.md,
  },
  categoryButton: {
    backgroundColor: CITY_THEME_COLORS.backgroundCard,
  },
  addButton: {
    backgroundColor: CITY_THEME_COLORS.primary,
    width: 56,
    height: 56,
    paddingHorizontal: 0,
    justifyContent: 'center',
  },
  actionButtonText: {
    fontSize: CITY_TYPOGRAPHY.fontSize.sm,
    color: CITY_THEME_COLORS.textPrimary,
    fontWeight: '500',
  },
  brandContainer: {
    position: 'absolute',
    right: CITY_SPACING.lg,
  },
  brandText: {
    fontSize: CITY_TYPOGRAPHY.fontSize.display,
    fontWeight: '300',
    color: CITY_THEME_COLORS.primary,
    opacity: 0.4,
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
