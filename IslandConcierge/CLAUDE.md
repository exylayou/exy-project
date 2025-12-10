# IslandConcierge - Initial Project Structure

## Overview
IslandConcierge is a React Native mobile application built with Expo, designed to provide a comprehensive Caribbean island concierge experience. This document outlines the initial project structure and architectural decisions.

## Tech Stack
- **Frontend Framework**: React Native (via Expo SDK ~54.0)
- **Navigation**: React Navigation v7
  - `@react-navigation/native` - Core navigation library
  - `@react-navigation/bottom-tabs` - Bottom tab navigation
- **Styling**: React Native StyleSheet API
- **State Management**: React Hooks (Context API or Redux Toolkit to be added later)

## Project Structure

```
IslandConcierge/
├── api/
│   └── api.js                      # API utilities and fetch wrappers
├── components/
│   ├── common/                     # Reusable UI components
│   │   ├── Button.js              # Custom button component
│   │   ├── Card.js                # Card container component
│   │   └── Header.js              # Header component
│   ├── explore/                    # Explore-specific components
│   │   ├── FilterBar.js           # Filter selection component
│   │   └── PoiCard.js             # Point of Interest card
│   └── tours/                      # Tour-specific components
│       ├── DateFilter.js          # Date selection component
│       └── TourCard.js            # Tour card component
├── navigation/
│   └── TabNavigator.js            # Bottom tab navigation setup
├── screens/
│   ├── ConciergeScreen.js         # Concierge chat/assistance screen
│   ├── EmergencyScreen.js         # Emergency contacts and information
│   ├── ExploreScreen.js           # Points of interest explorer
│   ├── LandingPage.js             # Initial landing/welcome screen
│   └── ToursScreen.js             # Tours browsing and booking
├── assets/                         # Images, fonts, and static resources
├── App.js                          # Main app entry point
├── app.json                        # Expo configuration
└── package.json                    # Project dependencies

```

## Key Features

### Navigation Structure
The app uses a bottom tab navigator with four main sections:

1. **Concierge Tab** - Personalized island assistant
   - Icon: Chat bubbles
   - Color: Caribbean blue (#006994)

2. **Explore Tab** - Discover points of interest
   - Icon: Compass
   - Color: Caribbean blue (#006994)

3. **Tours Tab** - Browse and book island adventures
   - Icon: Map
   - Color: Caribbean blue (#006994)

4. **Emergency Tab** - Important contacts and information
   - Icon: Alert circle
   - Color: Emergency red (#C41E3A)

### Design System

#### Color Palette
- **Primary Blue**: #006994 (Caribbean ocean blue)
- **Secondary Blue**: #4A90A4 (Light ocean blue)
- **Background**: #F0F8FF (Light sky blue)
- **Emergency Red**: #C41E3A
- **White**: #FFFFFF
- **Text Gray**: #666666

#### Component Architecture
- **Common Components**: Shared UI elements (Button, Card, Header)
- **Feature Components**: Screen-specific components organized by feature
- **Screens**: Full-page views managed by the navigation system

### API Structure
The `api/api.js` file provides:
- Generic fetch wrapper with error handling
- Placeholder functions for:
  - `fetchPOIs()` - Retrieve points of interest
  - `fetchTours()` - Get available tours
  - `fetchEmergencyContacts()` - Load emergency information
  - `submitConciergeRequest()` - Submit concierge requests

## Future Enhancements
- State management (Context API or Redux Toolkit)
- API integration with backend services
- User authentication
- Offline data caching
- Push notifications
- Map integration for POIs
- Booking and payment processing
- User reviews and ratings

## Development Commands

```bash
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS (macOS only)
npm run ios

# Run in web browser
npm run web
```

## Notes
- All screens currently display placeholder content
- API functions are stubs and need backend integration
- Component styling follows a mobile-first, clean Caribbean aesthetic
- Navigation is fully configured and functional
- Icons use Expo's built-in Ionicons library

---
*Last updated: 2025-12-10*
*Created with Claude Code*
