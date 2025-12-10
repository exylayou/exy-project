# Common Components

This directory contains reusable React Native components for the Island Concierge travel app.

## PoiCard Component

A premium, mobile-first card component for displaying Points of Interest (POI) in Explore and Tours lists.

### Features

✨ **High-aspect ratio image display** with elegant overlay
⭐ **Star rating system** with visual stars and numeric rating
🎨 **Island Concierge aesthetic** with clean typography and subtle shadows
📱 **Mobile-first design** optimized for premium travel app experience
🎯 **Category badges** with color-coded styling
👆 **Touch-optimized** with smooth press feedback

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `poiId` | `string` | Yes | Unique identifier for the POI |
| `name` | `string` | Yes | Display name (e.g., "Botanical Gardens") |
| `category` | `string` | Yes | Category type (e.g., "Attraction", "Restaurant") |
| `rating` | `number` | Yes | Rating value from 0-5 (supports decimals) |
| `imageUrl` | `string` | Yes | Remote image URL |
| `onPress` | `function` | Yes | Callback handler receiving `poiId` as argument |

### Usage

```javascript
import { PoiCard } from './components/common';

<PoiCard
  poiId="poi-123"
  name="Botanical Gardens"
  category="Attraction"
  rating={4.5}
  imageUrl="https://example.com/image.jpg"
  onPress={(id) => navigation.navigate('PoiDetail', { poiId: id })}
/>
```

### Design System

The component uses the **Island Concierge** color palette defined in `/themes/colors.js`:

- **Primary**: Ocean blue (#2E86AB) - Main brand color
- **Accent**: Warm sand/sunset orange (#F4A261) - Category badges
- **Star Rating**: Golden yellow (#FFB800)
- **Text**: High contrast with text shadows for readability on images

### Styling

The component features:
- 16px border radius for modern rounded corners
- Subtle shadow (elevation 6) for depth
- 240px image height for premium landscape aspect ratio
- Gradient overlay for text readability
- Text shadows for overlay text legibility

### Example Implementation

See `PoiCard.example.js` for a complete working example including:
- Sample data structure
- FlatList integration for performance
- Navigation handling
- Customization options

### Performance Tips

1. **Use FlatList** for long lists instead of ScrollView
2. **Optimize images**: Use appropriately sized images (recommended: 800x480px)
3. **Memoization**: Consider wrapping in `React.memo` for list performance
4. **Image caching**: Implement image caching for better performance

### Accessibility

Future enhancements may include:
- `accessibilityLabel` support
- `accessibilityHint` for screen readers
- High contrast mode support

---

**Created for**: Island Concierge Travel App
**Component Type**: Presentational
**Platform**: React Native (iOS & Android)
