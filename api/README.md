# API Utility Documentation

This directory contains the API utility layer for the Island Concierge travel app. It provides functions for fetching tour data and other backend resources.

## 📁 Files

- **`api.js`** - Main API utility with all fetch functions
- **`api.example.js`** - Usage examples and sample implementations
- **`index.js`** - Barrel export for easy imports
- **`README.md`** - This documentation file

## 🎯 Current Implementation

**Status**: Placeholder/Mock API

Currently, all API functions use local JSON data from `/data/tours.json` to simulate backend API calls. Each function includes:
- ✅ 500ms delay to simulate network latency
- ✅ Proper error handling
- ✅ Consistent response format
- ✅ Filter support

This allows frontend development to proceed while the real backend API is being built.

## 📚 Available Functions

### 1. `fetchTours(filters)`

Fetches tours with optional filtering capabilities.

**Parameters:**
```javascript
{
  date: string,           // Date for availability (YYYY-MM-DD)
  max_price: number,      // Maximum price in USD
  activity_type: string,  // Activity type filter
  min_rating: number,     // Minimum rating (0-5)
  max_duration: number,   // Maximum duration in hours
  difficulty: string      // Difficulty level
}
```

**Returns:**
```javascript
{
  success: boolean,
  data: Array<Tour>,
  count: number,
  filters: Object,
  timestamp: string
}
```

**Example:**
```javascript
import { fetchTours } from './api';

// Fetch affordable adventure tours
const result = await fetchTours({
  max_price: 100,
  activity_type: 'Adventure',
  min_rating: 4.5
});

if (result.success) {
  console.log(`Found ${result.count} tours`);
  setTours(result.data);
}
```

### 2. `fetchTourById(tourId)`

Fetches a single tour by its unique identifier.

**Parameters:**
- `tourId` (string) - The unique tour ID

**Returns:**
```javascript
{
  success: boolean,
  data: Tour | null,
  timestamp: string
}
```

**Example:**
```javascript
const result = await fetchTourById('tour_001');
if (result.success) {
  console.log('Tour:', result.data.name);
}
```

### 3. `fetchActivityTypes()`

Fetches all unique activity types available in the tour database.

**Returns:**
```javascript
{
  success: boolean,
  data: Array<string>,
  count: number
}
```

**Example:**
```javascript
const result = await fetchActivityTypes();
// Returns: ['Adventure', 'Cultural', 'Leisure', 'Nature', 'Water Sports']
```

### 4. `fetchTopRatedTours(limit)`

Fetches tours sorted by rating (highest first).

**Parameters:**
- `limit` (number, optional) - Maximum number of tours to return (default: 10)

**Returns:**
```javascript
{
  success: boolean,
  data: Array<Tour>,
  count: number
}
```

**Example:**
```javascript
const result = await fetchTopRatedTours(5);
// Returns the top 5 highest-rated tours
```

### 5. `fetchToursByPriceRange(minPrice, maxPrice)`

Fetches tours within a specific price range.

**Parameters:**
- `minPrice` (number) - Minimum price in USD (default: 0)
- `maxPrice` (number) - Maximum price in USD (default: Infinity)

**Returns:**
```javascript
{
  success: boolean,
  data: Array<Tour>,
  count: number,
  price_range: { min: number, max: number }
}
```

**Example:**
```javascript
const result = await fetchToursByPriceRange(50, 100);
// Returns tours priced between $50 and $100
```

## 📋 Tour Data Structure

Each tour object contains:

```javascript
{
  tour_id: string,              // Unique identifier
  name: string,                 // Tour name
  description: string,          // Detailed description
  price_usd: number,            // Price in US dollars
  duration_hours: number,       // Duration in hours
  activity_type: string,        // Category/type
  rating: number,               // Rating (0-5)
  difficulty: string,           // Easy, Moderate, or Challenging
  max_group_size: number,       // Maximum participants
  includes: Array<string>,      // What's included
  meeting_point: string,        // Where tour starts
  available_days: Array<string>,// Days available
  image_url: string            // Tour image URL
}
```

## 🎨 Filter Examples

### Basic Price Filter
```javascript
const result = await fetchTours({ max_price: 100 });
```

### Multiple Filters
```javascript
const result = await fetchTours({
  max_price: 200,
  activity_type: 'Adventure',
  min_rating: 4.5,
  difficulty: 'Moderate'
});
```

### Date-Based Filtering
```javascript
// Find tours available on April 15, 2026
const result = await fetchTours({
  date: '2026-04-15'
});
```

### Complex Filter Combination
```javascript
const result = await fetchTours({
  date: '2026-04-15',
  max_price: 150,
  activity_type: 'Water Sports',
  min_rating: 4.7,
  max_duration: 6
});
```

## 🔄 Response Format

All API functions return a consistent response format:

**Success Response:**
```javascript
{
  success: true,
  data: [...],           // Result data
  count: number,         // Number of items
  timestamp: string,     // ISO timestamp
  // Additional context-specific fields
}
```

**Error Response:**
```javascript
{
  success: false,
  error: string,         // Error message
  data: [],              // Empty array or null
  count: 0
}
```

## 🚀 Usage in React Components

### Example 1: Simple Tours List
```javascript
import React, { useState, useEffect } from 'react';
import { fetchTours } from './api';

const ToursScreen = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTours();
  }, []);

  const loadTours = async () => {
    const result = await fetchTours();
    if (result.success) {
      setTours(result.data);
    }
    setLoading(false);
  };

  // ... render component
};
```

### Example 2: Filtered Tours with State
```javascript
const [filters, setFilters] = useState({
  max_price: 200,
  activity_type: 'Adventure'
});

useEffect(() => {
  const loadFilteredTours = async () => {
    const result = await fetchTours(filters);
    if (result.success) {
      setTours(result.data);
    }
  };
  loadFilteredTours();
}, [filters]);
```

### Example 3: Error Handling
```javascript
const loadTours = async () => {
  try {
    const result = await fetchTours({ max_price: 100 });

    if (result.success) {
      setTours(result.data);
      setError(null);
    } else {
      setError(result.error);
    }
  } catch (err) {
    setError('Network error occurred');
  } finally {
    setLoading(false);
  }
};
```

## 🔮 Future Migration to Real API

When migrating to a real backend API:

1. **Update the import**: Change from JSON to HTTP fetch
```javascript
// Replace this:
import toursData from '../data/tours.json';

// With this:
const API_BASE_URL = 'https://api.islandconcierge.com/v1';
```

2. **Update fetch functions**: Replace local data access with HTTP calls
```javascript
export const fetchTours = async (filters = {}) => {
  await delay(500); // Keep or remove based on preference

  const queryParams = new URLSearchParams(filters).toString();
  const response = await fetch(`${API_BASE_URL}/tours?${queryParams}`);
  const data = await response.json();

  return data;
};
```

3. **Keep the same interface**: The response format should remain consistent, so no changes needed in components!

## 📊 Current Tour Database

The placeholder database (`/data/tours.json`) contains:
- **10 sample tours**
- **5 activity types**: Adventure, Water Sports, Cultural, Nature, Leisure
- **Price range**: $40 - $145 USD
- **Duration range**: 3 - 8 hours
- **Ratings**: 4.3 - 4.9 stars

## 🧪 Testing

Run the example functions to test the API:

```javascript
import { runAllExamples } from './api/api.example';

// Run all test examples
await runAllExamples();
```

Or test individual functions:
```javascript
import { example2_fetchAffordableTours } from './api/api.example';

await example2_fetchAffordableTours();
```

## 📝 Notes

- All functions are async and return Promises
- All functions include simulated network delay (500ms)
- Filter parameters are optional
- Empty filters return all tours
- Invalid tour IDs return error response
- Date filtering uses day-of-week matching

---

**Status**: Mock API (Placeholder)
**Backend Integration**: Pending
**Last Updated**: 2025-12-10
