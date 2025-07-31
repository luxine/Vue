import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.myapp',
  appName: 'Vue App',
  webDir: 'dist',
  android: {
    path: '../.builds/android'  
  }
};

export default config;
