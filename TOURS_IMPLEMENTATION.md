# Tours Screen Implementation

## Overview
This document describes the implementation of the ToursScreen feature for a React Native application showcasing tours in Saint Vincent and the Grenadines.

## Project Structure

```
exy-project/
├── screens/
│   └── ToursScreen.js          # Main tours screen component
├── components/
│   ├── TourCard.js              # Card component for displaying individual tours
│   └── ToursFilterBar.js        # Filter bar for tour categories, duration, and difficulty
├── api/
│   └── api.js                   # API functions including fetchTours()
└── images/
    └── README.md                # Instructions for hero image placement
```

## Components

### 1. ToursScreen.js (`/screens/ToursScreen.js`)

The main screen component that implements:

- **Hero Header**: Large image with "SAINT VINCENT AND THE GRENADINES" overlay text
- **Filter Integration**: ToursFilterBar component for filtering tours
- **Data Fetching**: useEffect hook that calls fetchTours() on mount and filter changes
- **Loading State**: Shows "Loading Tours..." with activity indicator
- **Content Display**: FlatList rendering TourCard components
- **Empty State**: Message displayed when no tours match filters

**Key Features:**
- Fully scrollable within SafeAreaView
- Responsive to filter changes
- Error handling for API failures
- Optimized FlatList rendering with keyExtractor

### 2. TourCard.js (`/components/TourCard.js`)

A card component for displaying tour information:

**Props:**
- `tour`: Tour object with properties (id, title, description, image, duration, difficulty, price, category)
- `onPress`: Callback function when card is pressed

**Displays:**
- Tour image
- Title and description
- Duration and difficulty badges
- Price
- Category badge

**Styling:**
- Material Design-inspired card with shadows
- Rounded corners
- Responsive layout
- Touch feedback

### 3. ToursFilterBar.js (`/components/ToursFilterBar.js`)

A filter bar component with three filter categories:

**Filter Options:**
- **Category**: All Tours, Adventure, Cultural, Water Sports, Nature, Sailing
- **Duration**: Any Duration, Half Day, Full Day, Multi-Day
- **Difficulty**: Any Level, Easy, Moderate, Challenging

**Features:**
- Horizontal scrollable filter chips
- Active state highlighting (green background)
- Calls `onFilterChange` callback with active filters
- Automatically removes 'all' values from filter object

### 4. API Module (`/api/api.js`)

**Functions:**

#### `fetchTours(filters = {})`
- Fetches tours from mock data (replace with actual API in production)
- Accepts filter object with category, duration, and difficulty
- Returns filtered array of tour objects
- Simulates 800ms API delay

#### `fetchTourById(tourId)`
- Fetches a single tour by ID
- Throws error if tour not found
- Simulates 500ms API delay

**Mock Data:**
Includes 10 sample tours covering various categories and difficulties

## Usage Example

```javascript
import ToursScreen from './screens/ToursScreen';

// In your navigation setup
<Stack.Screen name="Tours" component={ToursScreen} />

// Or standalone
<ToursScreen navigation={navigation} />
```

## Data Flow

1. **Initial Load**:
   - ToursScreen mounts
   - useEffect triggers fetchTours() with empty filters
   - Loading state displayed
   - Tours data populated and displayed

2. **Filter Change**:
   - User selects filter in ToursFilterBar
   - onFilterChange callback fires with new filters
   - activeFilters state updates
   - useEffect detects change and refetches tours
   - Updated tours displayed

3. **Tour Selection**:
   - User taps a TourCard
   - handleTourPress navigates to TourDetails (if navigation available)
   - Or logs tour selection to console

## Customization

### Changing the Hero Image
1. Add your image to `/images/hero_placeholder.jpg`
2. Update the ToursScreen.js image source:
```javascript
source={require('../images/hero_placeholder.jpg')}
```

### Adding More Tours
Edit the `MOCK_TOURS` array in `/api/api.js`

### Styling
- All styles are in StyleSheet objects within each component
- Primary color: `#2e7d32` (green)
- Background: `#f5f5f5` (light gray)
- Cards: White with shadows

### Connecting to Real API
Replace the mock data in `fetchTours()` with actual API calls:

```javascript
export const fetchTours = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  const response = await fetch(`${API_URL}/tours?${queryParams}`);
  const data = await response.json();
  return data;
};
```

## Requirements Met

✅ **Hero Header**: Implemented with image and text overlay
✅ **Filter Integration**: ToursFilterBar rendered below hero
✅ **Data Fetching**: useEffect with fetchTours integration
✅ **Loading State**: ActivityIndicator with "Loading Tours..." message
✅ **Content Display**: FlatList with TourCard components
✅ **Empty State**: Custom message when no tours match filters
✅ **Scrollable UI**: All content in scrollable SafeAreaView

## Dependencies

This implementation uses only React Native core components:
- react
- react-native (View, Text, Image, FlatList, SafeAreaView, StyleSheet, etc.)

No external libraries required.

## Next Steps

1. **Navigation**: Integrate with React Navigation for tour details
2. **Real API**: Connect to backend API
3. **Hero Image**: Add actual hero_placeholder.jpg to /images/
4. **Favorites**: Add ability to save favorite tours
5. **Booking**: Implement tour booking functionality
6. **Search**: Add text search capability
7. **Sort**: Add sorting options (price, popularity, etc.)
