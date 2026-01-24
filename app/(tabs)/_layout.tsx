// ============================================
// My City - Tab Layout (Single tab - Map only)
// ============================================

import { Stack } from 'expo-router';
import { CITY_THEME_COLORS } from '../../src/constants/city-theme';

export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: CITY_THEME_COLORS.background },
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
