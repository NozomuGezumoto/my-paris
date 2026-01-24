// ============================================
// My City - Add/Edit Memory Screen
// Registration and editing screen for memories
// ============================================

import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Audio } from 'expo-av';
import {
  CITY_THEME_COLORS,
  CITY_TYPOGRAPHY,
  CITY_SPACING,
  CITY_RADIUS,
  CITY_CENTER,
  CITY_NAME,
  isWithinCity,
  SYMBOL_SUGGESTIONS,
  EMOJI_SUGGESTIONS,
} from '../src/constants/city-theme';
import { PinType, PinRank } from '../src/types';
import { useStore } from '../src/store/useStore';

// Sound files
const SOUND_START = require('../assets/sounds/start.mp3');
const SOUND_COMPLETE = require('../assets/sounds/complete.mp3');

export default function AddMemoryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ lat?: string; lng?: string; pinId?: string }>();
  const insets = useSafeAreaInsets();

  const isEditMode = !!params.pinId;
  const soundRef = useRef<Audio.Sound | null>(null);

  // Play sound function
  const playSound = useCallback(async (soundFile: any) => {
    try {
      // Unload previous sound if exists
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }
      const { sound } = await Audio.Sound.createAsync(soundFile);
      soundRef.current = sound;
      await sound.playAsync();
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  }, []);

  // Cleanup sound on unmount
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  // Play start sound when screen opens (only for new registration)
  useEffect(() => {
    if (!isEditMode) {
      playSound(SOUND_START);
    }
  }, [isEditMode, playSound]);

  const { 
    addPin, 
    updatePin,
    categories, 
    addCategory, 
    setPinCategories, 
    setContextMeta,
    getPinWithDetails,
    getCategoriesForPin,
    getContextMeta,
  } = useStore();

  // Load existing pin data for edit mode
  const existingPin = isEditMode ? getPinWithDetails(params.pinId!) : null;
  const existingCategories = isEditMode ? getCategoriesForPin(params.pinId!) : [];
  const existingContextMeta = isEditMode ? getContextMeta(params.pinId!) : null;

  // Form state
  const [pinType, setPinType] = useState<PinType>(existingPin?.pinType || 'photo');
  const [photoUri, setPhotoUri] = useState<string | null>(existingPin?.photoUri || null);
  const [backgroundUri, setBackgroundUri] = useState<string | null>(existingPin?.backgroundUri || null);
  const [textChar, setTextChar] = useState(existingPin?.textChar || '');
  const [rank, setRank] = useState<PinRank>(existingPin?.rank || 2);
  const [note, setNote] = useState(existingPin?.note || '');
  const [visitedAt, setVisitedAt] = useState(
    existingPin?.visitedAt ? new Date(existingPin.visitedAt) : new Date()
  );

  // Location state
  const [latitude, setLatitude] = useState(
    existingPin?.lat || (params.lat ? parseFloat(params.lat) : CITY_CENTER.latitude)
  );
  const [longitude, setLongitude] = useState(
    existingPin?.lng || (params.lng ? parseFloat(params.lng) : CITY_CENTER.longitude)
  );
  const [locationLabel, setLocationLabel] = useState(
    isEditMode ? 'Saved Location' : (params.lat ? 'Selected Location' : '')
  );

  // Categories state
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(
    existingCategories.map(c => c.id)
  );
  const [newCategoryName, setNewCategoryName] = useState('');

  // Context metadata
  const [slot1, setSlot1] = useState(existingContextMeta?.slot1 || '');
  const [slot2, setSlot2] = useState(existingContextMeta?.slot2 || '');
  const [slot3, setSlot3] = useState(existingContextMeta?.slot3 || '');
  const [slot4, setSlot4] = useState(existingContextMeta?.slot4 || '');

  // Get current location on mount if no initial location (only for new pins)
  useEffect(() => {
    if (!isEditMode && !params.lat) {
      getCurrentLocation();
    }
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Location Permission', 'Please enable location to add memories at your current position.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude: lat, longitude: lng } = location.coords;

      if (isWithinCity(lat, lng)) {
        setLatitude(lat);
        setLongitude(lng);
        setLocationLabel('Current Location');
      } else {
        Alert.alert(
          `Outside ${CITY_NAME}`,
          `You are outside ${CITY_NAME} region. Memories can only be added within ${CITY_NAME} area.`,
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.log('Location error:', error);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setPhotoUri(result.assets[0].uri);
      setPinType('photo');
    }
  };

  const pickBackgroundImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [9, 16],
      quality: 0.6,
    });

    if (!result.canceled && result.assets[0]) {
      setBackgroundUri(result.assets[0].uri);
    }
  };

  const handleTextCharChange = (text: string) => {
    // Only allow 1 character
    if (text.length <= 2) { // Allow for emoji which can be 2 code units
      setTextChar(text.slice(-1) || text); // Take last char if multiple entered
      if (text) setPinType('text');
    }
  };

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newId = addCategory(newCategoryName.trim());
      setSelectedCategoryIds((prev) => [...prev, newId]);
      setNewCategoryName('');
    }
  };

  const handleSave = async () => {
    // Validation
    if (pinType === 'photo' && !photoUri) {
      Alert.alert('Photo Required', 'Please select a photo for this memory.');
      return;
    }
    if (pinType === 'text' && !textChar) {
      Alert.alert('Character Required', 'Please enter a character for this memory.');
      return;
    }
    if (!isWithinCity(latitude, longitude)) {
      Alert.alert('Location Error', `Memory location must be within ${CITY_NAME} region.`);
      return;
    }
    if (selectedCategoryIds.length === 0) {
      Alert.alert('Category Required', 'Please select at least one category.');
      return;
    }

    let pinId: string;

    if (isEditMode) {
      // Update existing pin
      pinId = params.pinId!;
      updatePin(pinId, {
        lat: latitude,
        lng: longitude,
        pinType,
        photoUri: photoUri || undefined,
        backgroundUri: backgroundUri || undefined,
        textChar: pinType === 'text' ? textChar : undefined,
        rank,
        note: note.trim() || undefined,
        visitedAt: visitedAt.toISOString(),
      });
    } else {
      // Create new pin
      pinId = addPin({
        lat: latitude,
        lng: longitude,
        pinType,
        photoUri: photoUri || undefined,
        rank,
        backgroundUri: backgroundUri || undefined,
        textChar: pinType === 'text' ? textChar : undefined,
        note: note.trim() || undefined,
        visitedAt: visitedAt.toISOString(),
      });
    }

    // Set categories
    setPinCategories(pinId, selectedCategoryIds);

    // Set context metadata
    setContextMeta(pinId, {
      slot1: slot1.trim() || undefined,
      slot2: slot2.trim() || undefined,
      slot3: slot3.trim() || undefined,
      slot4: slot4.trim() || undefined,
    });

    // Play completion sound
    await playSound(SOUND_COMPLETE);

    // Small delay to let the sound start playing before navigating
    setTimeout(() => {
      if (isEditMode) {
        // After editing, go back to map screen (skip detail screen)
        router.replace('/');
      } else {
        // After new registration, just go back
        router.back();
      }
    }, 300);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + CITY_SPACING.md }]}>
        <Pressable onPress={() => router.back()} style={styles.headerButton}>
          <Ionicons name="close" size={24} color={CITY_THEME_COLORS.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>{isEditMode ? 'Edit Memory' : 'New Memory'}</Text>
        <Pressable onPress={handleSave} style={styles.headerButton}>
          <Text style={styles.saveText}>{isEditMode ? 'Update' : 'Save'}</Text>
        </Pressable>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Pin Display Type Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pin Appearance</Text>
          <Text style={styles.helperText}>Choose how it appears on the map</Text>
          <View style={styles.pinTypeContainer}>
            <Pressable
              style={[styles.pinTypeButton, pinType === 'photo' && styles.pinTypeButtonActive]}
              onPress={() => setPinType('photo')}
            >
              <Ionicons
                name="camera"
                size={24}
                color={pinType === 'photo' ? CITY_THEME_COLORS.backgroundCard : CITY_THEME_COLORS.textMuted}
              />
              <Text
                style={[styles.pinTypeText, pinType === 'photo' && styles.pinTypeTextActive]}
              >
                Photo
              </Text>
            </Pressable>
            <Pressable
              style={[styles.pinTypeButton, pinType === 'text' && styles.pinTypeButtonActive]}
              onPress={() => setPinType('text')}
            >
              <Text
                style={[
                  styles.pinTypeIcon,
                  pinType === 'text' && styles.pinTypeIconActive,
                ]}
              >
                A
              </Text>
              <Text
                style={[styles.pinTypeText, pinType === 'text' && styles.pinTypeTextActive]}
              >
                Text
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Text Character Input - only for text type */}
        {pinType === 'text' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Display Character</Text>
            <View style={styles.textCharContainer}>
                <TextInput
                style={styles.textCharInput}
                value={textChar}
                onChangeText={handleTextCharChange}
                placeholder="📍"
                placeholderTextColor={CITY_THEME_COLORS.textMuted}
                maxLength={2}
                textAlign="center"
              />
            </View>
            <Text style={styles.helperText}>Letter, Number, Emoji, Symbol...</Text>

            {/* Quick suggestions */}
            <View style={styles.suggestionsRow}>
              {EMOJI_SUGGESTIONS.map((emoji) => (
                <Pressable
                  key={emoji}
                  style={styles.suggestionChip}
                  onPress={() => {
                    setTextChar(emoji);
                  }}
                >
                  <Text style={styles.suggestionText}>{emoji}</Text>
                </Pressable>
              ))}
            </View>
            <View style={styles.suggestionsRow}>
              {SYMBOL_SUGGESTIONS.map((symbol) => (
                <Pressable
                  key={symbol}
                  style={styles.suggestionChip}
                  onPress={() => {
                    setTextChar(symbol);
                  }}
                >
                  <Text style={styles.suggestionText}>{symbol}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {/* Photo Selection - always available */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Photo{pinType === 'photo' ? ' (Required)' : ' (Optional)'}
          </Text>
          <Pressable style={styles.photoSelector} onPress={pickImage}>
            {photoUri ? (
              <Image source={{ uri: photoUri }} style={styles.photoPreview} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Ionicons name="image-outline" size={48} color={CITY_THEME_COLORS.textMuted} />
                <Text style={styles.photoPlaceholderText}>Select Photo</Text>
              </View>
            )}
          </Pressable>
          {photoUri && (
            <Pressable 
              style={styles.removePhotoButton} 
              onPress={() => setPhotoUri(null)}
            >
              <Text style={styles.removePhotoText}>Remove Photo</Text>
            </Pressable>
          )}
        </View>

        {/* Background Image Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Background (Optional)</Text>
          <Text style={styles.helperText}>Shown on the detail screen</Text>
          <Pressable style={styles.backgroundSelector} onPress={pickBackgroundImage}>
            {backgroundUri ? (
              <Image source={{ uri: backgroundUri }} style={styles.backgroundPreview} />
            ) : (
              <View style={styles.backgroundPlaceholder}>
                <Ionicons name="layers-outline" size={32} color={CITY_THEME_COLORS.textMuted} />
                <Text style={styles.photoPlaceholderText}>Select Background</Text>
              </View>
            )}
          </Pressable>
          {backgroundUri && (
            <Pressable 
              style={styles.removePhotoButton} 
              onPress={() => setBackgroundUri(null)}
            >
              <Text style={styles.removePhotoText}>Remove Background</Text>
            </Pressable>
          )}
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <View style={styles.locationDisplay}>
            <Ionicons name="location" size={20} color={CITY_THEME_COLORS.primary} />
            <Text style={styles.locationText}>
              {locationLabel || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`}
            </Text>
          </View>
          <Pressable style={styles.locationButton} onPress={getCurrentLocation}>
            <Ionicons name="navigate" size={18} color={CITY_THEME_COLORS.textSecondary} />
            <Text style={styles.locationButtonText}>Use Current Location</Text>
          </Pressable>
        </View>

        {/* Date Display */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Visit Date</Text>
          <View style={styles.dateButton}>
            <Ionicons name="calendar-outline" size={20} color={CITY_THEME_COLORS.textSecondary} />
            <Text style={styles.dateText}>
              {visitedAt.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </View>
        </View>

        {/* Rank Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rank</Text>
          <View style={styles.rankContainer}>
            {([1, 2, 3] as PinRank[]).map((r) => (
                <Pressable
                key={r}
                style={[
                  styles.rankButton,
                  { borderColor: r === 1 ? CITY_THEME_COLORS.rank1 : r === 2 ? CITY_THEME_COLORS.rank2 : CITY_THEME_COLORS.rank3 },
                  rank === r && styles.rankButtonActive,
                  rank === r && { backgroundColor: r === 1 ? CITY_THEME_COLORS.rank1 : r === 2 ? CITY_THEME_COLORS.rank2 : CITY_THEME_COLORS.rank3 },
                ]}
                onPress={() => setRank(r)}
              >
                <Text style={[
                  styles.rankButtonText,
                  rank === r && styles.rankButtonTextActive,
                ]}>
                  {r === 1 ? '★' : r === 2 ? '★★' : '★★★'}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Note */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Note (Optional)</Text>
          <TextInput
            style={styles.noteInput}
            value={note}
            onChangeText={setNote}
            placeholder="About this memory..."
            placeholderTextColor={CITY_THEME_COLORS.textMuted}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesContainer}>
            {categories.map((cat) => (
              <Pressable
                key={cat.id}
                style={[
                  styles.categoryChip,
                  selectedCategoryIds.includes(cat.id) && styles.categoryChipSelected,
                ]}
                onPress={() => handleCategoryToggle(cat.id)}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedCategoryIds.includes(cat.id) && styles.categoryChipTextSelected,
                  ]}
                >
                  {cat.name}
                </Text>
              </Pressable>
            ))}
          </View>
          <View style={styles.newCategoryRow}>
            <TextInput
              style={styles.newCategoryInput}
              value={newCategoryName}
              onChangeText={setNewCategoryName}
              placeholder="New Category"
              placeholderTextColor={CITY_THEME_COLORS.textMuted}
              onSubmitEditing={handleAddCategory}
            />
            <Pressable
              style={[
                styles.addCategoryButton,
                !newCategoryName.trim() && styles.addCategoryButtonDisabled,
              ]}
              onPress={handleAddCategory}
              disabled={!newCategoryName.trim()}
            >
              <Ionicons name="add" size={20} color={CITY_THEME_COLORS.backgroundCard} />
            </Pressable>
          </View>
        </View>

        {/* Context Metadata */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Context (Optional)</Text>
          <Text style={styles.helperText}>Free tags to help you remember</Text>
          <View style={styles.slotsContainer}>
            <TextInput
              style={styles.slotInput}
              value={slot1}
              onChangeText={setSlot1}
              placeholder="Slot 1"
              placeholderTextColor={CITY_THEME_COLORS.textMuted}
            />
            <TextInput
              style={styles.slotInput}
              value={slot2}
              onChangeText={setSlot2}
              placeholder="Slot 2"
              placeholderTextColor={CITY_THEME_COLORS.textMuted}
            />
            <TextInput
              style={styles.slotInput}
              value={slot3}
              onChangeText={setSlot3}
              placeholder="Slot 3"
              placeholderTextColor={CITY_THEME_COLORS.textMuted}
            />
            <TextInput
              style={styles.slotInput}
              value={slot4}
              onChangeText={setSlot4}
              placeholder="Slot 4"
              placeholderTextColor={CITY_THEME_COLORS.textMuted}
            />
          </View>
        </View>

        {/* Bottom padding */}
        <View style={{ height: insets.bottom + CITY_SPACING.xxxl }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CITY_THEME_COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: CITY_SPACING.lg,
    paddingBottom: CITY_SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: CITY_THEME_COLORS.border,
  },
  headerButton: {
    padding: CITY_SPACING.sm,
  },
  headerTitle: {
    fontSize: CITY_TYPOGRAPHY.fontSize.lg,
    fontWeight: '600',
    color: CITY_THEME_COLORS.textPrimary,
  },
  saveText: {
    fontSize: CITY_TYPOGRAPHY.fontSize.md,
    fontWeight: '600',
    color: CITY_THEME_COLORS.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: CITY_SPACING.lg,
  },
  section: {
    marginBottom: CITY_SPACING.xl,
  },
  sectionTitle: {
    fontSize: CITY_TYPOGRAPHY.fontSize.sm,
    fontWeight: '600',
    color: CITY_THEME_COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: CITY_SPACING.md,
  },
  helperText: {
    fontSize: CITY_TYPOGRAPHY.fontSize.sm,
    color: CITY_THEME_COLORS.textMuted,
    marginTop: CITY_SPACING.sm,
    marginBottom: CITY_SPACING.md,
  },
  pinTypeContainer: {
    flexDirection: 'row',
    gap: CITY_SPACING.md,
  },
  pinTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: CITY_SPACING.sm,
    padding: CITY_SPACING.lg,
    backgroundColor: CITY_THEME_COLORS.backgroundCard,
    borderRadius: CITY_RADIUS.lg,
    borderWidth: 2,
    borderColor: CITY_THEME_COLORS.border,
  },
  pinTypeButtonActive: {
    borderColor: CITY_THEME_COLORS.primary,
    backgroundColor: CITY_THEME_COLORS.primary,
  },
  pinTypeIcon: {
    fontSize: CITY_TYPOGRAPHY.fontSize.xxl,
    color: CITY_THEME_COLORS.textMuted,
  },
  pinTypeIconActive: {
    color: CITY_THEME_COLORS.backgroundCard,
  },
  pinTypeText: {
    fontSize: CITY_TYPOGRAPHY.fontSize.md,
    color: CITY_THEME_COLORS.textMuted,
  },
  pinTypeTextActive: {
    color: CITY_THEME_COLORS.backgroundCard,
    fontWeight: '600',
  },
  photoSelector: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: CITY_RADIUS.lg,
    overflow: 'hidden',
    backgroundColor: CITY_THEME_COLORS.backgroundCard,
    borderWidth: 2,
    borderColor: CITY_THEME_COLORS.border,
    borderStyle: 'dashed',
  },
  photoPreview: {
    width: '100%',
    height: '100%',
  },
  photoPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: CITY_SPACING.md,
  },
  photoPlaceholderText: {
    fontSize: CITY_TYPOGRAPHY.fontSize.md,
    color: CITY_THEME_COLORS.textMuted,
  },
  removePhotoButton: {
    marginTop: CITY_SPACING.md,
    padding: CITY_SPACING.sm,
    alignItems: 'center',
  },
  removePhotoText: {
    fontSize: CITY_TYPOGRAPHY.fontSize.sm,
    color: CITY_THEME_COLORS.error,
  },
  backgroundSelector: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: CITY_RADIUS.lg,
    overflow: 'hidden',
    backgroundColor: CITY_THEME_COLORS.backgroundCard,
    borderWidth: 2,
    borderColor: CITY_THEME_COLORS.border,
    borderStyle: 'dashed',
  },
  backgroundPreview: {
    width: '100%',
    height: '100%',
  },
  backgroundPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: CITY_SPACING.sm,
  },
  textCharContainer: {
    alignItems: 'center',
    padding: CITY_SPACING.xl,
    backgroundColor: CITY_THEME_COLORS.backgroundCard,
    borderRadius: CITY_RADIUS.lg,
  },
  textCharInput: {
    fontSize: 72,
    color: CITY_THEME_COLORS.textPrimary,
    width: 100,
    height: 100,
    textAlign: 'center',
  },
  suggestionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CITY_SPACING.sm,
    marginTop: CITY_SPACING.sm,
  },
  suggestionChip: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CITY_THEME_COLORS.backgroundCard,
    borderRadius: CITY_RADIUS.md,
    borderWidth: 1,
    borderColor: CITY_THEME_COLORS.border,
  },
  suggestionText: {
    fontSize: CITY_TYPOGRAPHY.fontSize.xl,
  },
  locationDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CITY_SPACING.sm,
    padding: CITY_SPACING.lg,
    backgroundColor: CITY_THEME_COLORS.backgroundCard,
    borderRadius: CITY_RADIUS.lg,
  },
  locationText: {
    fontSize: CITY_TYPOGRAPHY.fontSize.md,
    color: CITY_THEME_COLORS.textPrimary,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: CITY_SPACING.sm,
    marginTop: CITY_SPACING.md,
    padding: CITY_SPACING.md,
    backgroundColor: CITY_THEME_COLORS.surface,
    borderRadius: CITY_RADIUS.md,
  },
  locationButtonText: {
    fontSize: CITY_TYPOGRAPHY.fontSize.sm,
    color: CITY_THEME_COLORS.textSecondary,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CITY_SPACING.md,
    padding: CITY_SPACING.lg,
    backgroundColor: CITY_THEME_COLORS.backgroundCard,
    borderRadius: CITY_RADIUS.lg,
  },
  dateText: {
    fontSize: CITY_TYPOGRAPHY.fontSize.md,
    color: CITY_THEME_COLORS.textPrimary,
  },
  rankContainer: {
    flexDirection: 'row',
    gap: CITY_SPACING.md,
  },
  rankButton: {
    flex: 1,
    paddingVertical: CITY_SPACING.md,
    paddingHorizontal: CITY_SPACING.lg,
    backgroundColor: CITY_THEME_COLORS.backgroundCard,
    borderRadius: CITY_RADIUS.md,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankButtonActive: {
    borderWidth: 2,
  },
  rankButtonText: {
    fontSize: CITY_TYPOGRAPHY.fontSize.lg,
    color: CITY_THEME_COLORS.textMuted,
  },
  rankButtonTextActive: {
    color: CITY_THEME_COLORS.backgroundCard,
    fontWeight: '600',
  },
  noteInput: {
    backgroundColor: CITY_THEME_COLORS.backgroundCard,
    borderRadius: CITY_RADIUS.lg,
    padding: CITY_SPACING.lg,
    fontSize: CITY_TYPOGRAPHY.fontSize.md,
    color: CITY_THEME_COLORS.textPrimary,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CITY_SPACING.sm,
    marginBottom: CITY_SPACING.md,
  },
  categoryChip: {
    paddingHorizontal: CITY_SPACING.md,
    paddingVertical: CITY_SPACING.sm,
    backgroundColor: CITY_THEME_COLORS.backgroundCard,
    borderRadius: CITY_RADIUS.full,
    borderWidth: 1,
    borderColor: CITY_THEME_COLORS.border,
  },
  categoryChipSelected: {
    backgroundColor: CITY_THEME_COLORS.primary,
    borderColor: CITY_THEME_COLORS.primary,
  },
  categoryChipText: {
    fontSize: CITY_TYPOGRAPHY.fontSize.sm,
    color: CITY_THEME_COLORS.textSecondary,
  },
  categoryChipTextSelected: {
    color: CITY_THEME_COLORS.backgroundCard,
    fontWeight: '500',
  },
  newCategoryRow: {
    flexDirection: 'row',
    gap: CITY_SPACING.sm,
  },
  newCategoryInput: {
    flex: 1,
    backgroundColor: CITY_THEME_COLORS.backgroundCard,
    borderRadius: CITY_RADIUS.md,
    padding: CITY_SPACING.md,
    fontSize: CITY_TYPOGRAPHY.fontSize.md,
    color: CITY_THEME_COLORS.textPrimary,
  },
  addCategoryButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CITY_THEME_COLORS.primary,
    borderRadius: CITY_RADIUS.md,
  },
  addCategoryButtonDisabled: {
    backgroundColor: CITY_THEME_COLORS.surface,
  },
  slotsContainer: {
    gap: CITY_SPACING.sm,
  },
  slotInput: {
    backgroundColor: CITY_THEME_COLORS.backgroundCard,
    borderRadius: CITY_RADIUS.md,
    padding: CITY_SPACING.md,
    fontSize: CITY_TYPOGRAPHY.fontSize.md,
    color: CITY_THEME_COLORS.textPrimary,
    borderWidth: 1,
    borderColor: CITY_THEME_COLORS.border,
  },
});
