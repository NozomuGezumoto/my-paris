// ============================================
// My City - Add Memory Screen
// Registration screen for new memories
// ============================================

import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  CITY_CENTER,
  CITY_NAME,
  isWithinCity,
  CITY_THEME_COLORS,
  CITY_RADIUS,
  CITY_SPACING,
  CITY_TYPOGRAPHY,
} from '../constants/city-theme';
import { useStore } from '../store/useStore';
import { PinType, RootStackParamList } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddMemory'>;
type AddMemoryRouteProp = RouteProp<RootStackParamList, 'AddMemory'>;

// Common emoji suggestions for text pins
const EMOJI_SUGGESTIONS = [
  '📍', '⭐', '❤️', '🏠', '🍽️', '☕', '🎭', '🏛️', '🎨', '📸',
  '🌸', '🌳', '⛩️', '🏰', '🗼', '🌊', '🏖️', '⛵', '🎡', '🚶',
  '🍜', '🍣', '🍷', '🍺', '🎵', '🎸', '✨', '💫', '🌙', '☀️',
];
const SYMBOL_SUGGESTIONS = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'M', 'N',
  '◆', '◇', '✦', '✧', '⬡', '1', '2', '3', '4', '5',
  '★', '♥', '☆', '♪', '●', '+', '&', '@', '#', '!',
];

export default function AddMemoryScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<AddMemoryRouteProp>();
  const insets = useSafeAreaInsets();

  const { addPin, categories, addCategory, setPinCategories, setContextMeta } = useStore();

  // Form state
  const [pinType, setPinType] = useState<PinType>('photo');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [textChar, setTextChar] = useState('');
  const [note, setNote] = useState('');
  const [visitedAt, setVisitedAt] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Location state
  const [latitude, setLatitude] = useState(route.params?.initialLat ?? CITY_CENTER.latitude);
  const [longitude, setLongitude] = useState(route.params?.initialLng ?? CITY_CENTER.longitude);
  const [locationLabel, setLocationLabel] = useState('');

  // Categories state
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');

  // Context metadata
  const [slot1, setSlot1] = useState('');
  const [slot2, setSlot2] = useState('');
  const [slot3, setSlot3] = useState('');
  const [slot4, setSlot4] = useState('');

  // Get current location on mount if no initial location
  useEffect(() => {
    if (!route.params?.initialLat) {
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

  const handleSave = () => {
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

    // Create pin
    const pinId = addPin({
      lat: latitude,
      lng: longitude,
      pinType,
      photoUri: pinType === 'photo' ? photoUri! : undefined,
      textChar: pinType === 'text' ? textChar : undefined,
      note: note.trim() || undefined,
      visitedAt: visitedAt.toISOString(),
    });

    // Set categories
    if (selectedCategoryIds.length > 0) {
      setPinCategories(pinId, selectedCategoryIds);
    }

    // Set context metadata
    if (slot1 || slot2 || slot3 || slot4) {
      setContextMeta(pinId, {
        slot1: slot1.trim() || undefined,
        slot2: slot2.trim() || undefined,
        slot3: slot3.trim() || undefined,
        slot4: slot4.trim() || undefined,
      });
    }

    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + CITY_SPACING.md }]}>
        <Pressable onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Ionicons name="close" size={24} color={CITY_THEME_COLORS.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>New Memory</Text>
        <Pressable onPress={handleSave} style={styles.headerButton}>
          <Text style={styles.saveText}>Save</Text>
        </Pressable>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Pin Type Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Memory Type</Text>
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

        {/* Photo Selection */}
        {pinType === 'photo' && (
          <View style={styles.section}>
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
          </View>
        )}

        {/* Text Character Input */}
        {pinType === 'text' && (
          <View style={styles.section}>
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
                    setPinType('text');
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
                    setPinType('text');
                  }}
                >
                  <Text style={styles.suggestionText}>{symbol}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

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

        {/* Date */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Visit Date</Text>
          <Pressable
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicons name="calendar-outline" size={20} color={CITY_THEME_COLORS.textSecondary} />
            <Text style={styles.dateText}>
              {visitedAt.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </Pressable>
          {showDatePicker && (
            <DateTimePicker
              value={visitedAt}
              mode="date"
              display="spinner"
              onChange={(event, date) => {
                setShowDatePicker(Platform.OS === 'ios');
                if (date) setVisitedAt(date);
              }}
              maximumDate={new Date()}
            />
          )}
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
