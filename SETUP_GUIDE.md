# Island Concierge App - Setup & Preview Guide

## 🎯 Recommended: Expo Setup (Best for Chromebook)

### Step 1: Initialize Expo Project

```bash
# Install Expo CLI globally
npm install -g expo-cli

# Initialize Expo in current directory
cd /home/user/exy-project
expo init . --template blank

# Install dependencies
npm install
```

### Step 2: Install Project Dependencies

```bash
# Install React Navigation (for screens)
npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context

# Install additional dependencies
npm install react-native-gesture-handler react-native-reanimated
```

### Step 3: Start Development Server

```bash
expo start
```

This will:
- Start Metro bundler
- Show QR code in terminal
- Open browser with development tools

### Step 4: Preview Options

#### A) Phone (Easiest - Recommended)
1. Install **Expo Go** app from Play Store or App Store
2. Scan QR code from terminal
3. App loads on your phone instantly!
4. Changes auto-refresh (hot reload)

#### B) Web Browser (Quick Preview)
1. Press `w` in terminal (or click "Run in web browser")
2. Opens in Chrome at `http://localhost:19006`
3. Good for quick UI testing

#### C) Android Emulator (If Available)
1. Press `a` in terminal
2. Launches in Android emulator if installed

---

## 📁 Project Structure

Your current project structure:
```
exy-project/
├── api/                    # API utilities
│   ├── api.js             # Main API functions
│   └── README.md          # API documentation
├── components/            # Reusable components
│   └── common/
│       ├── PoiCard.js     # POI card component
│       └── README.md
├── data/                  # Local data
│   ├── poiData.js        # POI placeholder data
│   └── tours.json        # Tour database
├── screens/              # App screens
│   ├── ExploreScreen.js  # Main explore screen
│   └── README.md
├── themes/               # Design system
│   └── colors.js         # Color palette
└── images/               # Image assets
```

---

## 🔧 Create App Entry Point

You'll need to create `App.js` to tie everything together:

```javascript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ExploreScreen } from './screens';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Explore">
        <Stack.Screen
          name="Explore"
          component={ExploreScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

---

## 🚀 Quick Start Commands

```bash
# Start development server
expo start

# Start on specific platform
expo start --web          # Web browser
expo start --android      # Android
expo start --ios          # iOS (Mac only)

# Clear cache and restart
expo start -c

# Install new package
npm install package-name
```

---

## 📱 Using Expo Go App

### First Time Setup:
1. **Download Expo Go**:
   - Android: [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)

2. **Connect to Same WiFi**:
   - Chromebook and phone must be on same network

3. **Scan QR Code**:
   - Android: Use Expo Go app scanner
   - iOS: Use Camera app, opens in Expo Go

### Development Workflow:
1. Edit code in your editor
2. Save file (Ctrl+S)
3. App auto-refreshes on phone
4. Shake phone to open developer menu

---

## 🌐 Web Preview Notes

React Native Web has some limitations:
- Some native components may not work
- Performance may differ from mobile
- Good for UI layout testing
- Not for production testing

**Web-specific considerations:**
- Touch gestures work as mouse clicks
- ScrollView works with mouse wheel
- Image URLs must be absolute or remote

---

## 🔍 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 19000
lsof -ti:19000 | xargs kill -9

# Or start on different port
expo start --port 19001
```

### Can't Connect to Phone
1. Check WiFi (same network)
2. Try tunnel mode: `expo start --tunnel`
3. Check firewall settings

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
expo start -c
```

### Images Not Loading
- Use remote URLs (https://)
- Or use `require()` for local images
- Check image paths are correct

---

## 📚 Next Steps

1. **Initialize Expo** → `expo init .`
2. **Install dependencies** → `npm install`
3. **Create App.js** → Entry point
4. **Start server** → `expo start`
5. **Scan QR code** → Preview on phone

---

## 🎨 Current Components Ready to Use

✅ **PoiCard** - POI display component
✅ **ExploreScreen** - Main explore screen with hero, filters, grid
✅ **Color Theme** - Island Concierge palette
✅ **POI Data** - Placeholder data for 6 categories
✅ **Tour API** - Mock API with 10 tours

All components are ready to preview once you set up Expo!

---

## 💡 Tips for Chromebook Development

1. **Use Expo Go** - Easiest option for Chromebook users
2. **Web preview** - Quick UI checks in Chrome
3. **Save often** - Hot reload is your friend
4. **Use console.log()** - Check terminal/browser console
5. **Shake phone** - Access dev menu (reload, debug, etc.)

**Performance Tips:**
- Close unnecessary Chrome tabs
- Use `--no-dev` flag for better performance
- Disable unnecessary features during development

---

Need help? Check:
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- Components README files in `/components/` and `/screens/`
