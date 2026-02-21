# CarbonTrack Mobile

React Native mobile app for iOS and Android (built with Expo).

## Features

- ✅ Same core functionality as web app
- ✅ Native mobile UI
- ✅ Works on iOS and Android
- ✅ 80%+ code sharing with web frontend
- 🚧 Camera for receipt scanning
- 🚧 Push notifications for reminders
- 🚧 Offline mode

## Quick Start

### Prerequisites
- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your phone (or iOS Simulator / Android Emulator)

### Installation

```bash
cd carbontrack/mobile

# Install dependencies
npm install

# Start Expo dev server
npm start
```

This will open Expo Developer Tools in your browser. You can:
- Scan the QR code with Expo Go app (iOS/Android)
- Press `i` to open iOS Simulator
- Press `a` to open Android Emulator
- Press `w` to open in web browser

## Development

### Running on Device

1. Install "Expo Go" from App Store (iOS) or Play Store (Android)
2. Make sure your phone and computer are on the same network
3. Run `npm start`
4. Scan the QR code with your phone camera (iOS) or Expo Go app (Android)

### Running on Simulator

**iOS (macOS only):**
```bash
npm run ios
```

**Android:**
```bash
npm run android
```

## Project Structure

```
mobile/
├── app/                  # Expo Router screens
│   ├── (tabs)/          # Tab navigation
│   ├── _layout.js       # Root layout
│   └── index.js         # Home screen
├── components/          # Shared components
├── services/            # API calls
├── app.json             # Expo config
└── package.json
```

## API Configuration

By default, the app connects to `http://localhost:3000` for development.

To connect to the backend from a physical device:
1. Find your computer's local IP (e.g., 192.168.1.100)
2. Update API URL in `services/api.js`
3. Make sure backend CORS allows your IP

## Building for Production

### iOS (requires macOS + Apple Developer account)
```bash
expo build:ios
```

### Android
```bash
expo build:android
```

Or use EAS Build:
```bash
npm install -g eas-cli
eas build --platform android
eas build --platform ios
```

## Shared Code with Web

The mobile app shares:
- API client (`services/`)
- Business logic
- Data models
- Utility functions

Platform-specific:
- Navigation (Expo Router vs React Router)
- UI components (React Native vs React DOM)
- Device features (camera, notifications)

## Coming Soon

- Receipt scanning with OCR
- Push notifications for tracking reminders
- Offline data sync
- Widgets for iOS/Android home screen

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native](https://reactnative.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
