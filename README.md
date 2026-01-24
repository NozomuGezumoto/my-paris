# My City 🌍

A beautiful memory pin map app for your favorite cities. Drop pins on the map to save your memories from around the world.

## Supported Cities

| City | Emoji | Country |
|------|-------|---------|
| 京都 (Kyoto) | ⛩️ | Japan |
| シドニー (Sydney) | ⛵ | Australia |
| パリ (Paris) | 🗼 | France |
| ロンドン (London) | 🎡 | United Kingdom |
| ローマ (Rome) | 🏛️ | Italy |
| バンコク (Bangkok) | 🛕 | Thailand |
| クアンタン (Kuantan) | 🏖️ | Malaysia |
| 東京 (Tokyo) | 🗼 | Japan |
| 台北 (Taipei) | 🏯 | Taiwan |
| バルセロナ (Barcelona) | 🏗️ | Spain |
| ベルリン (Berlin) | 🐻 | Germany |
| リオ (Rio de Janeiro) | 🎭 | Brazil |
| マラケシュ (Marrakech) | 🕌 | Morocco |

## Features

- 📍 Interactive map centered on your chosen city
- 📸 Photo pins with image preview
- 🔤 Text pins with custom emoji/character
- 🏷️ Category-based organization
- ⭐ Pin ranking system (1-3 stars)
- 🔍 Filter by categories
- 🎨 City-specific themes and color palettes

## Tech Stack

- [Expo](https://expo.dev) with Expo Router
- React Native Maps with clustering
- Zustand for state management
- Bottom Sheet for modal interactions
- TypeScript

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the app for a specific city

```bash
# Start for Kyoto (default)
npm run start:kyoto

# Start for other cities
npm run start:sydney
npm run start:paris
npm run start:london
npm run start:rome
npm run start:bangkok
npm run start:kuantan
npm run start:tokyo
npm run start:taipei
npm run start:barcelona
npm run start:berlin
npm run start:rio
npm run start:marrakech
```

### 3. Run on your device

Use one of the following:
- [Expo Go](https://expo.dev/go)
- [iOS Simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Android Emulator](https://docs.expo.dev/workflow/android-studio-emulator/)

## Building for Production

### Build for a specific city

```bash
# Build Kyoto version
npm run build:kyoto

# Build Paris version
npm run build:paris

# etc...
```

### Manual build with custom city

```bash
# On macOS/Linux
CITY=kyoto npx expo start

# On Windows (PowerShell)
$env:CITY="kyoto"; npx expo start

# Cross-platform (requires cross-env)
npx cross-env CITY=kyoto expo start
```

## Project Structure

```
src/
├── config/
│   ├── types.ts                # City config type definitions
│   ├── index.ts                # Main config entry point
│   └── cities/                 # City-specific configurations
│       ├── kyoto.ts
│       ├── sydney.ts
│       ├── paris.ts
│       └── ...
├── components/
│   ├── map/
│   │   └── CityMap.tsx         # Main map component
│   └── ui/
│       ├── MapOverlay.tsx      # Floating UI controls
│       ├── CategorySheet.tsx   # Category filter sheet
│       └── PinDetailSheet.tsx  # Pin preview sheet
├── constants/
│   └── city-theme.ts           # Design system exports
├── screens/
│   ├── ShowcaseMapScreen.tsx   # Main screen
│   ├── AddMemoryScreen.tsx     # Pin creation
│   └── PinDetailScreen.tsx     # Full pin details
├── store/
│   └── useStore.ts             # Zustand store
└── types/
    └── index.ts                # TypeScript types
```

## Adding a New City

1. Create a new config file in `src/config/cities/`:

```typescript
// src/config/cities/newcity.ts
import { CityConfig } from '../types';

export const newcityConfig: CityConfig = {
  id: 'newcity',
  name: 'New City',
  nameJa: 'ニューシティ',
  // ... add all required config
};
```

2. Export from `src/config/cities/index.ts`:

```typescript
export { newcityConfig } from './newcity';
// Add to CITIES map
```

3. Add app config in `app.config.js`:

```javascript
const CITY_APP_CONFIG = {
  // ... existing cities
  newcity: {
    name: 'My New City',
    // ...
  },
};
```

4. Add scripts to `package.json`:

```json
{
  "scripts": {
    "start:newcity": "cross-env CITY=newcity expo start",
    "build:newcity": "cross-env CITY=newcity eas build"
  }
}
```

## Design Philosophy

- **Map as the main UI** - The map is always the hero
- **Personal memories** - No social features, reviews, or ratings
- **Minimal UI** - Screenshot-friendly, clean aesthetic
- **City-specific themes** - Each city has its unique color palette

## License

MIT
