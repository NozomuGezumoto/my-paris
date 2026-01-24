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
  Pressable,
  Dimensions,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { CITY_THEME_COLORS, CITY_TYPOGRAPHY, CITY_SPACING, CITY_RADIUS } from '../constants/city-theme';
import { RootStackParamList } from '../types';
import { useStore } from '../store/useStore';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'PinDetail'>;
type PinDetailRouteProp = RouteProp<RootStackParamList, 'PinDetail'>;

export default function PinDetailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<PinDetailRouteProp>();
  const insets = useSafeAreaInsets();

  const { pinId } = route.params;
  const getPinWithDetails = useStore((state) => state.getPinWithDetails);
  const deletePin = useStore((state) => state.deletePin);

  const pin = useMemo(() => getPinWithDetails(pinId), [pinId, getPinWithDetails]);

  if (!pin) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>Memory not found</Text>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.backLink}>Go back</Text>
        </Pressable>
      </View>
    );
  }

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
            deletePin(pinId);
            navigation.goBack();
          },
        },
      ]
    );
  };

  const visitedDate = pin.visitedAt
    ? format(new Date(pin.visitedAt), 'd MMMM yyyy')
    : null;

  const createdDate = format(new Date(pin.createdAt), 'dd/MM/yyyy HH:mm');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Pressable onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Ionicons name="chevron-back" size={28} color={CITY_THEME_COLORS.textPrimary} />
        </Pressable>
        <Pressable onPress={handleDelete} style={styles.headerButton}>
          <Ionicons name="trash-outline" size={24} color={CITY_THEME_COLORS.error} />
        </Pressable>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Main Visual */}
        {pin.pinType === 'photo' && pin.photoUri ? (
          <Image
            source={{ uri: pin.photoUri }}
            style={styles.heroImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.heroTextContainer}>
            <Text style={styles.heroText}>{pin.textChar}</Text>
          </View>
        )}

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
              <Text style={styles.sectionLabel}>Categories</Text>
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
              <Text style={styles.sectionLabel}>Note</Text>
              <Text style={styles.noteText}>{pin.note}</Text>
            </View>
          )}

          {/* Context Metadata */}
          {pin.contextMeta && (
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Context</Text>
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

          {/* Location */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Location</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location" size={16} color={CITY_THEME_COLORS.primary} />
              <Text style={styles.locationText}>
                {pin.lat.toFixed(6)}, {pin.lng.toFixed(6)}
              </Text>
            </View>
          </View>

          {/* Metadata */}
          <View style={styles.metaSection}>
            <Text style={styles.metaText}>
              Created: {createdDate}
            </Text>
            <Text style={styles.metaText}>
              ID: {pin.id.slice(0, 8)}...
            </Text>
          </View>
        </View>

        {/* Bottom padding */}
        <View style={{ height: insets.bottom + CITY_SPACING.xxxl }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CITY_THEME_COLORS.background,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: CITY_SPACING.md,
    paddingBottom: CITY_SPACING.md,
    zIndex: 10,
    backgroundColor: `${CITY_THEME_COLORS.background}dd`,
  },
  headerButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 0,
  },
  heroImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
  },
  heroTextContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CITY_THEME_COLORS.surface,
  },
  heroText: {
    fontSize: 120,
    color: CITY_THEME_COLORS.textPrimary,
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
  sectionLabel: {
    fontSize: CITY_TYPOGRAPHY.fontSize.sm,
    fontWeight: '600',
    color: CITY_THEME_COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: CITY_SPACING.md,
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
    color: CITY_THEME_COLORS.textSecondary,
    fontFamily: 'monospace',
  },
  metaSection: {
    marginTop: CITY_SPACING.xl,
    paddingTop: CITY_SPACING.xl,
    borderTopWidth: 1,
    borderTopColor: CITY_THEME_COLORS.border,
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
