// ============================================
// My City - Category Bottom Sheet
// Scrollable list of categories with counts
// ============================================

import React, { useCallback, useMemo, forwardRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { CITY_THEME_COLORS, CITY_TYPOGRAPHY, CITY_SPACING, CITY_RADIUS } from '../../constants/city-theme';
import { useStore } from '../../store/useStore';
import { CategoryWithCount } from '../../types';

interface CategorySheetProps {
  onClose?: () => void;
}

const CategorySheet = forwardRef<BottomSheet, CategorySheetProps>(
  ({ onClose }, ref) => {
    // Subscribe directly to state for proper re-rendering
    const categories = useStore((state) => state.categories);
    const pinCategories = useStore((state) => state.pinCategories);
    const selectedCategoryId = useStore((state) => state.selectedCategoryId);
    const setSelectedCategory = useStore((state) => state.setSelectedCategory);

    // Calculate categories with counts
    const categoriesWithCounts: CategoryWithCount[] = useMemo(() => {
      return categories
        .map((cat) => ({
          ...cat,
          pinCount: pinCategories.filter((pc) => pc.categoryId === cat.id).length,
        }))
        .sort((a, b) => b.pinCount - a.pinCount);
    }, [categories, pinCategories]);

    const snapPoints = useMemo(() => ['22%', '45%'], []);

    const handleCategoryPress = useCallback(
      (category: CategoryWithCount) => {
        if (selectedCategoryId === category.id) {
          // Clear filter
          setSelectedCategory(null);
        } else {
          // Apply filter
          setSelectedCategory(category.id);
        }
      },
      [selectedCategoryId, setSelectedCategory]
    );

    const renderCategory = (category: CategoryWithCount) => {
      const isSelected = selectedCategoryId === category.id;
      
      return (
        <Pressable
          key={category.id}
          style={[styles.categoryItem, isSelected && styles.categoryItemSelected]}
          onPress={() => handleCategoryPress(category)}
        >
          <Text
            style={[styles.categoryName, isSelected && styles.categoryNameSelected]}
            numberOfLines={1}
          >
            #{category.name}
          </Text>
          <Text style={[styles.countText, isSelected && styles.countTextSelected]}>
            {category.pinCount}
          </Text>
        </Pressable>
      );
    };

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
        <View style={styles.header}>
          <Text style={styles.title}>Categories</Text>
        </View>

        <BottomSheetScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          {categoriesWithCounts.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No categories yet</Text>
              <Text style={styles.emptySubtext}>
                Add memories to create categories
              </Text>
            </View>
          ) : (
            <View style={styles.gridContainer}>
              {categoriesWithCounts.map(renderCategory)}
            </View>
          )}
        </BottomSheetScrollView>

        {selectedCategoryId && (
          <Pressable
            style={styles.clearButton}
            onPress={() => setSelectedCategory(null)}
          >
            <Text style={styles.clearButtonText}>Clear Filter</Text>
          </Pressable>
        )}
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
    width: 32,
    height: 4,
    marginTop: 6,
  },
  header: {
    paddingHorizontal: CITY_SPACING.lg,
    paddingTop: 2,
    paddingBottom: 4,
  },
  title: {
    fontSize: CITY_TYPOGRAPHY.fontSize.sm,
    fontWeight: '500',
    color: CITY_THEME_COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: CITY_SPACING.lg,
    paddingTop: 2,
    paddingBottom: 32,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: CITY_SPACING.xs,
    columnGap: CITY_SPACING.md,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: CITY_SPACING.sm,
    backgroundColor: 'transparent',
    borderRadius: CITY_RADIUS.sm,
  },
  categoryItemSelected: {
    backgroundColor: CITY_THEME_COLORS.primary,
  },
  categoryName: {
    fontSize: CITY_TYPOGRAPHY.fontSize.sm,
    color: CITY_THEME_COLORS.textSecondary,
    marginRight: 4,
  },
  categoryNameSelected: {
    color: CITY_THEME_COLORS.backgroundCard,
    fontWeight: '600',
  },
  countText: {
    fontSize: CITY_TYPOGRAPHY.fontSize.sm,
    color: CITY_THEME_COLORS.textMuted,
  },
  countTextSelected: {
    color: CITY_THEME_COLORS.backgroundCard,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: CITY_SPACING.xxxl,
  },
  emptyText: {
    fontSize: CITY_TYPOGRAPHY.fontSize.lg,
    color: CITY_THEME_COLORS.textSecondary,
    marginBottom: CITY_SPACING.sm,
  },
  emptySubtext: {
    fontSize: CITY_TYPOGRAPHY.fontSize.sm,
    color: CITY_THEME_COLORS.textMuted,
  },
  clearButton: {
    margin: CITY_SPACING.lg,
    marginTop: 0,
    padding: CITY_SPACING.md,
    backgroundColor: CITY_THEME_COLORS.surface,
    borderRadius: CITY_RADIUS.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: CITY_THEME_COLORS.border,
  },
  clearButtonText: {
    fontSize: CITY_TYPOGRAPHY.fontSize.md,
    color: CITY_THEME_COLORS.textSecondary,
    fontWeight: '500',
  },
});

export default CategorySheet;
