import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.espacemarrakesh.app',
  appName: 'Espace Marrakech',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    url: 'https://espacemarrakesh.netlify.app',
    cleartext: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      backgroundColor: '#059669',
      androidScaleType: 'CENTER_CROP',
      showSpinner: true,
      spinnerColor: '#e03b26',
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#065f46',
    },
  },
  android: {
    backgroundColor: '#065f46',
    allowMixedContent: true,
  },
};

export default config;
