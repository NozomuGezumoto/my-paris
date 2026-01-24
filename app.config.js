// ============================================
// My City - Dynamic Expo Configuration
// Build with: CITY=kyoto npx expo start
// ============================================

// City configurations (simplified for app.config.js - full config in src/config)
const CITY_APP_CONFIG = {
  kyoto: {
    name: 'My Kyoto',
    nameJa: 'My 京都',
    slug: 'my-kyoto',
    scheme: 'mykyoto',
    backgroundColor: '#faf8f5',
    emoji: '⛩️',
  },
  sydney: {
    name: 'My Sydney',
    nameJa: 'My シドニー',
    slug: 'my-sydney',
    scheme: 'mysydney',
    backgroundColor: '#f0f7ff',
    emoji: '⛵',
  },
  paris: {
    name: 'My Paris',
    nameJa: 'My パリ',
    slug: 'my-paris',
    scheme: 'myparis',
    backgroundColor: '#f7f5f0',
    emoji: '🗼',
  },
  london: {
    name: 'My London',
    nameJa: 'My ロンドン',
    slug: 'my-london',
    scheme: 'mylondon',
    backgroundColor: '#f5f5f0',
    emoji: '🎡',
  },
  rome: {
    name: 'My Rome',
    nameJa: 'My ローマ',
    slug: 'my-rome',
    scheme: 'myrome',
    backgroundColor: '#faf6f0',
    emoji: '🏛️',
  },
  bangkok: {
    name: 'My Bangkok',
    nameJa: 'My バンコク',
    slug: 'my-bangkok',
    scheme: 'mybangkok',
    backgroundColor: '#fdfaf5',
    emoji: '🛕',
  },
  kuantan: {
    name: 'My Kuantan',
    nameJa: 'My クアンタン',
    slug: 'my-kuantan',
    scheme: 'mykuantan',
    backgroundColor: '#f0fdfa',
    emoji: '🏖️',
  },
  tokyo: {
    name: 'My Tokyo',
    nameJa: 'My 東京',
    slug: 'my-tokyo',
    scheme: 'mytokyo',
    backgroundColor: '#f8fafc',
    emoji: '🗼',
  },
  taipei: {
    name: 'My Taipei',
    nameJa: 'My 台北',
    slug: 'my-taipei',
    scheme: 'mytaipei',
    backgroundColor: '#fafaf9',
    emoji: '🏯',
  },
  barcelona: {
    name: 'My Barcelona',
    nameJa: 'My バルセロナ',
    slug: 'my-barcelona',
    scheme: 'mybarcelona',
    backgroundColor: '#fffbeb',
    emoji: '🏗️',
  },
  berlin: {
    name: 'My Berlin',
    nameJa: 'My ベルリン',
    slug: 'my-berlin',
    scheme: 'myberlin',
    backgroundColor: '#f9fafb',
    emoji: '🐻',
  },
  rio: {
    name: 'My Rio',
    nameJa: 'My リオ',
    slug: 'my-rio',
    scheme: 'myrio',
    backgroundColor: '#f0fdf4',
    emoji: '🎭',
  },
  marrakech: {
    name: 'My Marrakech',
    nameJa: 'My マラケシュ',
    slug: 'my-marrakech',
    scheme: 'mymarrakech',
    backgroundColor: '#fef7ed',
    emoji: '🕌',
  },
};

// Get city from environment variable (default: kyoto)
const cityId = process.env.CITY || 'kyoto';
const cityConfig = CITY_APP_CONFIG[cityId] || CITY_APP_CONFIG.kyoto;

console.log(`📍 Building for: ${cityConfig.name} ${cityConfig.emoji}`);

export default {
  expo: {
    name: cityConfig.name,
    slug: cityConfig.slug,
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: cityConfig.scheme,
    userInterfaceStyle: 'light',
    newArchEnabled: true,

    // Pass city ID to the app via Constants.expoConfig.extra
    extra: {
      city: cityId,
      cityName: cityConfig.name,
      cityNameJa: cityConfig.nameJa,
    },

    ios: {
      supportsTablet: true,
      bundleIdentifier: `com.mycity.${cityConfig.slug.replace(/-/g, '')}`,
    },

    android: {
      package: `com.mycity.${cityConfig.slug.replace(/-/g, '')}`,
      adaptiveIcon: {
        backgroundColor: cityConfig.backgroundColor,
        foregroundImage: './assets/images/android-icon-foreground.png',
        backgroundImage: './assets/images/android-icon-background.png',
        monochromeImage: './assets/images/android-icon-monochrome.png',
      },
      edgeToEdgeEnabled: true,
    },

    web: {
      output: 'static',
      favicon: './assets/images/favicon.png',
    },

    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: cityConfig.backgroundColor,
        },
      ],
    ],

    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
  },
};

