// ============================================
// My City - Pin Detail Bottom Sheet
// Shows full details of selected memory pin
// ============================================

import React, { useMemo, forwardRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
} from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { format } from 'date-fns';
import { CITY_THEME_COLORS, CITY_TYPOGRAPHY, CITY_SPACING, CITY_RADIUS } from '../../constants/city-theme';
import { useStore } from '../../store/useStore';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_HEIGHT = 200;

interface PinDetailSheetProps {
  pinId: string | null;
  onClose?: () => void;
  onOpenFull?: () => void;
}

const PinDetailSheet = forwardRef<BottomSheet, PinDetailSheetProps>(
  ({ pinId, onClose, onOpenFull }, ref) => {
    const getPinWithDetails = useStore((state) => state.getPinWithDetails);
    
    const pin = useMemo(() => {
      if (!pinId) return null;
      return getPinWithDetails(pinId);
    }, [pinId, getPinWithDetails]);

    const snapPoints = useMemo(() => ['40%', '70%'], []);

    const visitedDate = pin?.visitedAt
      ? format(new Date(pin.visitedAt), 'd MMM yyyy')
      : null;

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundStyle={styles.sheetBackground}
        handleIndicatorStyle={styles.handleIndicator}
        onClose={onClose}
      >
        <BottomSheetScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          {pin ? (
            <>
              {/* Photo or Text Character Display */}
              {pin.pinType === 'photo' && pin.photoUri ? (
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: pin.photoUri }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </View>
              ) : (
                <View style={styles.textCharContainer}>
                  <Text style={styles.textChar}>{pin.textChar}</Text>
                </View>
              )}

              {/* Date */}
              {visitedDate && (
                <View style={styles.dateContainer}>
                  <Text style={styles.dateLabel}>Visited</Text>
                  <Text style={styles.dateValue}>{visitedDate}</Text>
                </View>
              )}

              {/* Categories */}
              {pin.categories.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Categories</Text>
                  <View style={styles.categoriesContainer}>
                    {pin.categories.map((cat) => (
                      <View key={cat.id} style={styles.categoryChip}>
                        <Text style={styles.categoryChipText}>{cat.name}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {/* Note */}
              {pin.note && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Note</Text>
                  <Text style={styles.noteText}>{pin.note}</Text>
                </View>
              )}

              {/* Context Metadata */}
              {pin.contextMeta && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Context</Text>
                  <View style={styles.metaContainer}>
                    {[
                      pin.contextMeta.slot1,
                      pin.contextMeta.slot2,
                      pin.contextMeta.slot3,
                      pin.contextMeta.slot4,
                    ]
                      .filter(Boolean)
                      .map((slot, index) => (
                        <View key={index} style={styles.metaChip}>
                          <Text style={styles.metaChipText}>{slot}</Text>
                        </View>
                      ))}
                  </View>
                </View>
              )}

              {/* Open Full Detail Button */}
              {onOpenFull && (
                <Pressable style={styles.openButton} onPress={onOpenFull}>
                  <Text style={styles.openButtonText}>Open Details</Text>
                </Pressable>
              )}
            </>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Select a pin to view details</Text>
            </View>
          )}
        </BottomSheetScrollView>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: CITY_THEME_COLORS.backgroundCard,
    borderTopLeftRadius: CITY_RADIUS.xl,
    borderTopRightRadius: CITY_RADIUS.xl,
  },
  handleIndicator: {
    backgroundColor: CITY_THEME_COLORS.textMuted,
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: CITY_SPACING.xxxl,
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    height: IMAGE_HEIGHT,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textCharContainer: {
    width: SCREEN_WIDTH,
    height: IMAGE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CITY_THEME_COLORS.surface,
  },
  textChar: {
    fontSize: 72,
    color: CITY_THEME_COLORS.textPrimary,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: CITY_SPACING.xl,
    paddingVertical: CITY_SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: CITY_THEME_COLORS.border,
  },
  dateLabel: {
    fontSize: CITY_TYPOGRAPHY.fontSize.sm,
    color: CITY_THEME_COLORS.textMuted,
    marginRight: CITY_SPACING.md,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  dateValue: {
    fontSize: CITY_TYPOGRAPHY.fontSize.lg,
    color: CITY_THEME_COLORS.textPrimary,
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: CITY_SPACING.xl,
    paddingVertical: CITY_SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: CITY_THEME_COLORS.border,
  },
  sectionTitle: {
    fontSize: CITY_TYPOGRAPHY.fontSize.sm,
    color: CITY_THEME_COLORS.textMuted,
    marginBottom: CITY_SPACING.md,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CITY_SPACING.sm,
  },
  categoryChip: {
    backgroundColor: CITY_THEME_COLORS.primary,
    paddingHorizontal: CITY_SPACING.md,
    paddingVertical: CITY_SPACING.sm,
    borderRadius: CITY_RADIUS.full,
  },
  categoryChipText: {
    fontSize: CITY_TYPOGRAPHY.fontSize.sm,
    color: CITY_THEME_COLORS.backgroundCard,
    fontWeight: '500',
  },
  noteText: {
    fontSize: CITY_TYPOGRAPHY.fontSize.md,
    color: CITY_THEME_COLORS.textPrimary,
    lineHeight: CITY_TYPOGRAPHY.fontSize.md * CITY_TYPOGRAPHY.lineHeight.relaxed,
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CITY_SPACING.sm,
  },
  metaChip: {
    backgroundColor: CITY_THEME_COLORS.surface,
    paddingHorizontal: CITY_SPACING.md,
    paddingVertical: CITY_SPACING.sm,
    borderRadius: CITY_RADIUS.md,
    borderWidth: 1,
    borderColor: CITY_THEME_COLORS.accentSecondary,
  },
  metaChipText: {
    fontSize: CITY_TYPOGRAPHY.fontSize.sm,
    color: CITY_THEME_COLORS.accentSecondary,
  },
  openButton: {
    marginHorizontal: CITY_SPACING.xl,
    marginTop: CITY_SPACING.xl,
    padding: CITY_SPACING.lg,
    backgroundColor: CITY_THEME_COLORS.surface,
    borderRadius: CITY_RADIUS.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: CITY_THEME_COLORS.borderLight,
  },
  openButtonText: {
    fontSize: CITY_TYPOGRAPHY.fontSize.md,
    color: CITY_THEME_COLORS.textPrimary,
    fontWeight: '500',
  },
  emptyState: {
    padding: CITY_SPACING.xxxl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: CITY_TYPOGRAPHY.fontSize.md,
    color: CITY_THEME_COLORS.textMuted,
  },
});

export default PinDetailSheet;
