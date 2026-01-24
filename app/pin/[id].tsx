// ============================================
// My City - Pin Detail Screen
// Full-screen view of a memory pin
// ============================================

import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  Pressable,
  Dimensions,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { CITY_THEME_COLORS, CITY_TYPOGRAPHY, CITY_SPACING, CITY_RADIUS } from '../../src/constants/city-theme';
import { useStore } from '../../src/store/useStore';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function PinDetailScreen() {
  const router = useRouter();
  const { id: pinId } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();

  const getPinWithDetails = useStore((state) => state.getPinWithDetails);
  const deletePin = useStore((state) => state.deletePin);

  const pin = useMemo(() => {
    if (!pinId) return null;
    return getPinWithDetails(pinId);
  }, [pinId, getPinWithDetails]);

  if (!pin) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>Memory not found</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backLink}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const handleEdit = () => {
    router.push({
      pathname: '/add-memory',
      params: { pinId: pinId },
    });
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Memory',
      'Are you sure you want to delete this memory? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deletePin(pinId!);
            router.back();
          },
        },
      ]
    );
  };

  const visitedDate = pin.visitedAt
    ? format(new Date(pin.visitedAt), 'd MMMM yyyy')
    : null;

  const createdDate = format(new Date(pin.createdAt), 'dd/MM/yyyy HH:mm');

  // Get rank border color
  const rankBorderColor = pin.rank === 1 
    ? CITY_THEME_COLORS.rank1 
    : pin.rank === 3 
      ? CITY_THEME_COLORS.rank3 
      : CITY_THEME_COLORS.rank2;

  const backgroundContent = (
    <>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Pressable onPress={() => router.back()} style={styles.headerButton}>
          <Ionicons name="chevron-back" size={28} color={CITY_THEME_COLORS.textPrimary} />
        </Pressable>
        <View style={styles.headerActions}>
          <Pressable onPress={handleEdit} style={styles.headerButton}>
            <Ionicons name="pencil" size={22} color={CITY_THEME_COLORS.textPrimary} />
          </Pressable>
          <Pressable onPress={handleDelete} style={styles.headerButton}>
            <Ionicons name="trash-outline" size={22} color={CITY_THEME_COLORS.error} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Main Visual */}
        <View style={styles.heroContainer}>
          {pin.photoUri ? (
            <View style={[styles.heroImageWrapper, { borderColor: rankBorderColor }]}>
              <Image
                source={{ uri: pin.photoUri }}
                style={styles.heroImage}
                resizeMode="cover"
              />
            </View>
          ) : pin.pinType === 'text' ? (
            <View style={[styles.heroTextContainer, { borderColor: rankBorderColor }]}>
              <Text style={styles.heroText}>{pin.textChar}</Text>
            </View>
          ) : (
            <View style={[styles.heroPlaceholder, { borderColor: rankBorderColor }]}>
              <Ionicons name="image-outline" size={64} color={CITY_THEME_COLORS.textMuted} />
              <Text style={styles.heroPlaceholderText}>No Photo</Text>
            </View>
          )}

          {/* Rank Badge */}
          <View style={[styles.rankBadge, { backgroundColor: rankBorderColor }]}>
            <Text style={styles.rankBadgeText}>
              {pin.rank === 1 ? '★' : pin.rank === 3 ? '★★★' : '★★'}
            </Text>
          </View>

          {/* Pin Display Type Badge */}
          {pin.pinType === 'text' && pin.textChar && (
            <View style={styles.pinTypeBadge}>
              <Text style={styles.pinTypeBadgeText}>{pin.textChar}</Text>
            </View>
          )}
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Date */}
          {visitedDate && (
            <View style={styles.dateRow}>
              <View style={styles.dateBadge}>
                <Text style={styles.dateBadgeText}>{visitedDate}</Text>
              </View>
            </View>
          )}

          {/* Categories */}
          {pin.categories.length > 0 && (
            <View style={styles.section}>
              <View style={styles.textBackdrop}>
                <Text style={styles.sectionLabel}>Categories</Text>
              </View>
              <View style={styles.tagsContainer}>
                {pin.categories.map((cat) => (
                  <View key={cat.id} style={styles.categoryTag}>
                    <Text style={styles.categoryTagText}>{cat.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Note */}
          {pin.note && (
            <View style={styles.section}>
              <View style={styles.textBackdrop}>
                <Text style={styles.sectionLabel}>Note</Text>
                <Text style={styles.noteText}>{pin.note}</Text>
              </View>
            </View>
          )}

          {/* Context Metadata */}
          {pin.contextMeta && (
            <View style={styles.section}>
              <View style={styles.textBackdrop}>
                <Text style={styles.sectionLabel}>Context</Text>
              </View>
              <View style={styles.tagsContainer}>
                {[
                  pin.contextMeta.slot1,
                  pin.contextMeta.slot2,
                  pin.contextMeta.slot3,
                  pin.contextMeta.slot4,
                ]
                  .filter(Boolean)
                  .map((slot, index) => (
                    <View key={index} style={styles.contextTag}>
                      <Text style={styles.contextTagText}>{slot}</Text>
                    </View>
                  ))}
              </View>
            </View>
          )}

        </View>

        {/* Bottom padding */}
        <View style={{ height: insets.bottom + CITY_SPACING.xxxl }} />
      </ScrollView>
    </>
  );

  // Use backgroundUri if available, otherwise fall back to photoUri
  const bgImage = pin.backgroundUri || pin.photoUri;

  return (
    <View style={styles.container}>
      {bgImage ? (
        <ImageBackground
          source={{ uri: bgImage }}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.backgroundOverlay}>
            {backgroundContent}
          </View>
        </ImageBackground>
      ) : (
        backgroundContent
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CITY_THEME_COLORS.background,
  },
  backgroundImage: {
    flex: 1,
  },
  backgroundOverlay: {
    flex: 1,
    backgroundColor: `${CITY_THEME_COLORS.background}dd`,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContainer: {
    position: 'relative',
  },
  heroImageWrapper: {
    borderWidth: 4,
    borderRadius: CITY_RADIUS.lg,
    overflow: 'hidden',
    marginHorizontal: CITY_SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: CITY_SPACING.md,
    paddingBottom: CITY_SPACING.sm,
  },
  headerButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 0,
  },
  heroImage: {
    width: SCREEN_WIDTH - CITY_SPACING.md * 2 - 8,
    height: SCREEN_WIDTH - CITY_SPACING.md * 2 - 8,
  },
  heroTextContainer: {
    width: SCREEN_WIDTH - CITY_SPACING.md * 2,
    height: (SCREEN_WIDTH - CITY_SPACING.md * 2) * 0.6,
    marginHorizontal: CITY_SPACING.md,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CITY_THEME_COLORS.backgroundCard,
    borderWidth: 4,
    borderRadius: CITY_RADIUS.lg,
  },
  heroText: {
    fontSize: 120,
    color: CITY_THEME_COLORS.textPrimary,
  },
  heroPlaceholder: {
    width: SCREEN_WIDTH - CITY_SPACING.md * 2,
    height: (SCREEN_WIDTH - CITY_SPACING.md * 2) * 0.6,
    marginHorizontal: CITY_SPACING.md,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CITY_THEME_COLORS.surface,
    gap: CITY_SPACING.md,
    borderWidth: 4,
    borderRadius: CITY_RADIUS.lg,
  },
  heroPlaceholderText: {
    fontSize: CITY_TYPOGRAPHY.fontSize.md,
    color: CITY_THEME_COLORS.textMuted,
  },
  rankBadge: {
    position: 'absolute',
    top: CITY_SPACING.sm,
    left: CITY_SPACING.md + CITY_SPACING.sm,
    paddingHorizontal: CITY_SPACING.sm,
    paddingVertical: 4,
    borderRadius: CITY_RADIUS.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  rankBadgeText: {
    fontSize: CITY_TYPOGRAPHY.fontSize.sm,
    color: CITY_THEME_COLORS.backgroundCard,
    fontWeight: '600',
  },
  pinTypeBadge: {
    position: 'absolute',
    bottom: CITY_SPACING.md,
    right: CITY_SPACING.md + CITY_SPACING.md,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: CITY_THEME_COLORS.backgroundCard,
    borderWidth: 3,
    borderColor: CITY_THEME_COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  pinTypeBadgeText: {
    fontSize: 28,
  },
  content: {
    padding: CITY_SPACING.xl,
  },
  dateRow: {
    marginBottom: CITY_SPACING.xl,
  },
  dateBadge: {
    alignSelf: 'flex-start',
    backgroundColor: CITY_THEME_COLORS.primary,
    paddingHorizontal: CITY_SPACING.lg,
    paddingVertical: CITY_SPACING.sm,
    borderRadius: CITY_RADIUS.full,
  },
  dateBadgeText: {
    fontSize: CITY_TYPOGRAPHY.fontSize.md,
    fontWeight: '600',
    color: CITY_THEME_COLORS.backgroundCard,
  },
  section: {
    marginBottom: CITY_SPACING.xl,
  },
  textBackdrop: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  sectionLabel: {
    fontSize: CITY_TYPOGRAPHY.fontSize.xs,
    fontWeight: '600',
    color: CITY_THEME_COLORS.textPrimary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CITY_SPACING.sm,
  },
  categoryTag: {
    backgroundColor: CITY_THEME_COLORS.backgroundCard,
    paddingHorizontal: CITY_SPACING.md,
    paddingVertical: CITY_SPACING.sm,
    borderRadius: CITY_RADIUS.full,
    borderWidth: 1,
    borderColor: CITY_THEME_COLORS.primary,
  },
  categoryTagText: {
    fontSize: CITY_TYPOGRAPHY.fontSize.sm,
    color: CITY_THEME_COLORS.textPrimary,
  },
  contextTag: {
    backgroundColor: CITY_THEME_COLORS.surface,
    paddingHorizontal: CITY_SPACING.md,
    paddingVertical: CITY_SPACING.sm,
    borderRadius: CITY_RADIUS.md,
    borderWidth: 1,
    borderColor: CITY_THEME_COLORS.accentSecondary,
  },
  contextTagText: {
    fontSize: CITY_TYPOGRAPHY.fontSize.sm,
    color: CITY_THEME_COLORS.accentSecondary,
  },
  noteText: {
    fontSize: CITY_TYPOGRAPHY.fontSize.lg,
    color: CITY_THEME_COLORS.textPrimary,
    lineHeight: CITY_TYPOGRAPHY.fontSize.lg * CITY_TYPOGRAPHY.lineHeight.relaxed,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CITY_SPACING.sm,
  },
  locationText: {
    fontSize: CITY_TYPOGRAPHY.fontSize.md,
    color: CITY_THEME_COLORS.textPrimary,
    fontFamily: 'monospace',
  },
  metaSection: {
    marginTop: CITY_SPACING.xl,
    paddingTop: CITY_SPACING.xl,
  },
  metaText: {
    fontSize: CITY_TYPOGRAPHY.fontSize.xs,
    color: CITY_THEME_COLORS.textMuted,
    marginBottom: CITY_SPACING.xs,
  },
  errorText: {
    fontSize: CITY_TYPOGRAPHY.fontSize.lg,
    color: CITY_THEME_COLORS.textSecondary,
    marginBottom: CITY_SPACING.md,
  },
  backLink: {
    fontSize: CITY_TYPOGRAPHY.fontSize.md,
    color: CITY_THEME_COLORS.primary,
  },
});
