// ============================================
// My City - Main Map Component
// Full-screen map centered on the selected city
// Using react-native-maps with clustering
// ============================================

import React, { useRef, useCallback, useMemo, useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, Pressable } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import ClusteredMapView from 'react-native-map-clustering';
import { Ionicons } from '@expo/vector-icons';
import {
  CITY_INITIAL_REGION,
  CITY_THEME_COLORS,
  CITY_PIN_SIZE,
  CITY_SPACING,
  CITY_RADIUS,
  CITY_SHADOWS,
} from '../../constants/city-theme';
import { useStore } from '../../store/useStore';
import { MemoryPin } from '../../types';

// Generic map style using city colors
const createMapStyle = (colors: typeof CITY_THEME_COLORS) => [
  { elementType: 'geometry', stylers: [{ color: colors.background }] },
  { elementType: 'labels.text.fill', stylers: [{ color: colors.textSecondary }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: colors.background }] },
  { featureType: 'administrative.country', elementType: 'geometry.stroke', stylers: [{ color: colors.primary }] },
  { featureType: 'administrative.land_parcel', elementType: 'labels.text.fill', stylers: [{ color: colors.textMuted }] },
  { featureType: 'administrative.province', elementType: 'geometry.stroke', stylers: [{ color: colors.primary }] },
  { featureType: 'landscape.man_made', elementType: 'geometry.stroke', stylers: [{ color: colors.surface }] },
  { featureType: 'landscape.natural', elementType: 'geometry', stylers: [{ color: colors.surfaceDark }] },
  { featureType: 'landscape.natural.terrain', elementType: 'geometry', stylers: [{ color: colors.surfaceDark }] },
  { featureType: 'poi', elementType: 'geometry', stylers: [{ color: colors.surface }] },
  { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: colors.accentSecondary }] },
  { featureType: 'poi', elementType: 'labels.text.stroke', stylers: [{ color: colors.background }] },
  { featureType: 'poi.park', elementType: 'geometry.fill', stylers: [{ color: colors.accentSecondary + '40' }] },
  { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: colors.accentSecondary }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: colors.backgroundElevated }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: colors.textSecondary }] },
  { featureType: 'road', elementType: 'labels.text.stroke', stylers: [{ color: colors.background }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: colors.surface }] },
  { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: colors.primary }] },
  { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: colors.textPrimary }] },
  { featureType: 'road.highway', elementType: 'labels.text.stroke', stylers: [{ color: colors.background }] },
  { featureType: 'transit', elementType: 'labels.text.fill', stylers: [{ color: colors.accent }] },
  { featureType: 'transit', elementType: 'labels.text.stroke', stylers: [{ color: colors.background }] },
  { featureType: 'transit.line', elementType: 'geometry.fill', stylers: [{ color: colors.primaryLight }] },
  { featureType: 'transit.station', elementType: 'geometry', stylers: [{ color: colors.surface }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: colors.primaryLight + '60' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: colors.primary }] },
];

interface CityMapProps {
  onPinPress: (pin: MemoryPin) => void;
  onLongPress?: (coordinates: { latitude: number; longitude: number }) => void;
  interactive?: boolean;
}

export default function CityMap({
  onPinPress,
  onLongPress,
  interactive = true,
}: CityMapProps) {
  const mapRef = useRef<MapView | null>(null);
  
  // Subscribe to state directly to ensure re-render on changes
  const allPins = useStore((state) => state.pins);
  const selectedCategoryId = useStore((state) => state.selectedCategoryId);
  const pinCategories = useStore((state) => state.pinCategories);
  const displayMode = useStore((state) => state.displayMode);

  // Track when filter is cleared to force re-render
  const [resetKey, setResetKey] = useState(0);
  const prevCategoryId = useRef(selectedCategoryId);

  // Generate map style based on city colors
  const mapStyle = useMemo(() => createMapStyle(CITY_THEME_COLORS), []);

  useEffect(() => {
    // Only trigger re-render when filter is cleared (category -> null)
    if (prevCategoryId.current !== null && selectedCategoryId === null) {
      setResetKey((k) => k + 1);
    }
    prevCategoryId.current = selectedCategoryId;
  }, [selectedCategoryId]);

  // Filter pins based on selected category
  const pins = useMemo(() => {
    if (!selectedCategoryId) {
      return allPins;
    }
    const filteredPinIds = pinCategories
      .filter((pc) => pc.categoryId === selectedCategoryId)
      .map((pc) => pc.pinId);
    return allPins.filter((pin) => filteredPinIds.includes(pin.id));
  }, [allPins, selectedCategoryId, pinCategories]);

  // Reset map to city center
  const handleResetToCenter = useCallback(() => {
    mapRef.current?.animateToRegion(CITY_INITIAL_REGION, 500);
  }, []);

  const handleLongPress = useCallback(
    (event: any) => {
      if (!onLongPress || !interactive) return;
      const { coordinate } = event.nativeEvent;
      onLongPress({
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
      });
    },
    [onLongPress, interactive]
  );

  const handleMarkerPress = useCallback(
    (pin: MemoryPin) => {
      onPinPress(pin);
      
      // Animate to pin location
      mapRef.current?.animateToRegion({
        latitude: pin.lat,
        longitude: pin.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 500);
    },
    [onPinPress]
  );

  // Render custom cluster marker
  const renderCluster = (cluster: any) => {
    const { id, geometry, onPress, properties } = cluster;
    const points = properties.point_count;
    
    return (
      <Marker
        key={`cluster-${id}`}
        coordinate={{
          longitude: geometry.coordinates[0],
          latitude: geometry.coordinates[1],
        }}
        onPress={onPress}
        tracksViewChanges={false}
      >
        <View style={styles.clusterContainer}>
          <Text style={styles.clusterText}>
            {points > 99 ? '99+' : points}
          </Text>
        </View>
      </Marker>
    );
  };

  return (
    <View style={styles.container}>
      {/* Reset to center button */}
      <Pressable style={styles.resetButton} onPress={handleResetToCenter}>
        <Ionicons name="locate" size={22} color={CITY_THEME_COLORS.accent} />
      </Pressable>

      <ClusteredMapView
        key={`map-${resetKey}`}
        mapRef={(ref: MapView | null) => { mapRef.current = ref; }}
        style={styles.map}
        initialRegion={CITY_INITIAL_REGION}
        customMapStyle={mapStyle}
        onLongPress={handleLongPress}
        showsUserLocation={false}
        showsMyLocationButton={false}
        showsCompass={false}
        showsScale={false}
        toolbarEnabled={false}
        minZoomLevel={10}
        maxZoomLevel={18}
        onRegionChangeComplete={() => {}}
        // Clustering options
        clusterColor={CITY_THEME_COLORS.cluster}
        clusterTextColor={CITY_THEME_COLORS.backgroundCard}
        clusterFontFamily="System"
        radius={50}
        renderCluster={renderCluster}
        minPoints={2}
      >
        {pins.map((pin) => {
          // Determine what to show based on displayMode
          const showPhoto = 
            displayMode === 'photo' || 
            (displayMode === 'original' && pin.pinType === 'photo');
          
          const hasPhoto = !!pin.photoUri;
          
          // Get rank border color
          const rankBorderColor = pin.rank === 1 
            ? CITY_THEME_COLORS.rank1 
            : pin.rank === 3 
              ? CITY_THEME_COLORS.rank3 
              : CITY_THEME_COLORS.rank2;
          
          return (
            <Marker
              key={pin.id}
              coordinate={{
                latitude: pin.lat,
                longitude: pin.lng,
              }}
              onPress={() => handleMarkerPress(pin)}
              tracksViewChanges={false}
            >
              {showPhoto ? (
                hasPhoto ? (
                  <View style={[styles.photoMarker, { borderColor: rankBorderColor }]}>
                    <Image
                      source={{ uri: pin.photoUri }}
                      style={styles.photoImage}
                    />
                  </View>
                ) : (
                  <View style={[styles.nullMarker, { borderColor: rankBorderColor }]}>
                    <Text style={styles.nullChar}>N</Text>
                  </View>
                )
              ) : (
                <View style={[styles.textMarker, { borderColor: rankBorderColor }]}>
                  <Text style={styles.textChar}>{pin.textChar || '?'}</Text>
                </View>
              )}
            </Marker>
          );
        })}
      </ClusteredMapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CITY_THEME_COLORS.background,
  },
  map: {
    flex: 1,
  },
  resetButton: {
    position: 'absolute',
    top: 100,
    right: CITY_SPACING.lg,
    zIndex: 10,
    width: 44,
    height: 44,
    borderRadius: CITY_RADIUS.full,
    backgroundColor: CITY_THEME_COLORS.backgroundCard,
    borderWidth: 2,
    borderColor: CITY_THEME_COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    ...CITY_SHADOWS.md,
  },
  photoMarker: {
    width: CITY_PIN_SIZE.photo,
    height: CITY_PIN_SIZE.photo,
    borderRadius: CITY_PIN_SIZE.photo / 2,
    borderWidth: 3,
    borderColor: CITY_THEME_COLORS.primary,
    backgroundColor: CITY_THEME_COLORS.backgroundCard,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: CITY_THEME_COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  photoImage: {
    width: CITY_PIN_SIZE.photo - 6,
    height: CITY_PIN_SIZE.photo - 6,
    borderRadius: (CITY_PIN_SIZE.photo - 6) / 2,
  },
  textMarker: {
    width: CITY_PIN_SIZE.text,
    height: CITY_PIN_SIZE.text,
    borderRadius: CITY_PIN_SIZE.text / 2,
    borderWidth: 2,
    borderColor: CITY_THEME_COLORS.accentSecondary,
    backgroundColor: CITY_THEME_COLORS.backgroundCard,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: CITY_THEME_COLORS.accentSecondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  textChar: {
    fontSize: 18,
    color: CITY_THEME_COLORS.accentSecondary,
    fontWeight: '600',
  },
  nullMarker: {
    width: CITY_PIN_SIZE.text,
    height: CITY_PIN_SIZE.text,
    borderRadius: CITY_PIN_SIZE.text / 2,
    borderWidth: 2,
    borderColor: CITY_THEME_COLORS.textMuted,
    backgroundColor: CITY_THEME_COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: CITY_THEME_COLORS.textMuted,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  nullChar: {
    fontSize: 16,
    color: CITY_THEME_COLORS.textMuted,
    fontWeight: '600',
  },
  clusterContainer: {
    width: CITY_PIN_SIZE.cluster,
    height: CITY_PIN_SIZE.cluster,
    borderRadius: CITY_PIN_SIZE.cluster / 2,
    backgroundColor: CITY_THEME_COLORS.cluster,
    borderWidth: 2,
    borderColor: CITY_THEME_COLORS.backgroundCard,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.95,
    shadowColor: CITY_THEME_COLORS.cluster,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  clusterText: {
    fontSize: 14,
    fontWeight: '700',
    color: CITY_THEME_COLORS.backgroundCard,
  },
});

