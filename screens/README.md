# Screens

This directory contains all screen components for the Island Concierge travel app.

## ExploreScreen

The main discovery screen for Points of Interest in Saint Vincent and the Grenadines.

### Features

🏝️ **Hero Header** - Full-width header image with island branding
🔍 **Filter Bar** - Horizontal scrollable filter for category selection
📱 **Two-Column Grid** - Optimized POI card layout for mobile
🎨 **Dynamic Content** - Filter-based content switching
⚡ **Performance** - Efficient rendering with proper state management

### Sections

#### 1. Hero Header
- Displays "SAINT VINCENT AND THE GRENADINES" with background image
- Occupies 15% of screen height
- Dark overlay for text readability
- Uses hero placeholder image from `/images/hero_placeholder.jpg`

#### 2. Filter Bar
Horizontal scrollable categories:
- **FOR YOU** - Personalized recommendations (default)
- **THINGS TO DO** - Activities and experiences
- **BEACHES** - Beach destinations
- **CULTURAL** - Cultural attractions and landmarks
- **OUTDOOR & ADVENTURE** - Adventure activities
- **RESTAURANTS** - Dining establishments

Active filter is highlighted with the primary ocean blue color.

#### 3. Content Grid
- Two-column responsive layout
- Uses `PoiCard` component for each POI
- Dynamically updates based on selected filter
- Placeholder data provided via `/data/poiData.js`

### Usage

```javascript
import { ExploreScreen } from './screens';

// In your navigator:
<Stack.Screen
  name="Explore"
  component={ExploreScreen}
  options={{ headerShown: false }}
/>
```

### Props

The screen expects a `navigation` prop from React Navigation:
- `navigation` - React Navigation navigation object

### State Management

- `activeFilter` (string) - Currently selected filter
- Defaults to "FOR YOU"
- Updates via filter button press

### Data Structure

POI objects require:
```javascript
{
  poiId: string,
  name: string,
  category: string,
  rating: number,
  imageUrl: string
}
```

### Styling

Mobile-optimized with:
- Responsive grid layout (2 columns)
- Touch-optimized filter buttons
- Smooth scrolling
- Shadow effects for depth
- Island Concierge color palette

### Performance Considerations

1. **ScrollView** - Used for vertical scrolling (consider VirtualizedList for 100+ items)
2. **Horizontal ScrollView** - Used for filter bar
3. **Image Loading** - Remote images via URI (consider caching for production)
4. **State Updates** - Minimal re-renders on filter change

### Future Enhancements

- [ ] Pull-to-refresh functionality
- [ ] Search functionality
- [ ] Favorite/bookmark POIs
- [ ] Filter count badges
- [ ] Skeleton loading states
- [ ] Infinite scroll for large datasets
- [ ] Integration with real API
- [ ] User location-based sorting

### Dependencies

- `PoiCard` component (`/components/common/PoiCard.js`)
- POI data (`/data/poiData.js`)
- Colors theme (`/themes/colors.js`)
- React Native core components

---

**Screen Type**: Main Navigation Screen
**Navigation**: Bottom Tab / Stack Navigator
**Platform**: React Native (iOS & Android)
