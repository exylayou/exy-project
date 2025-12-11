/**
 * Island Concierge Design System
 * Caribbean-inspired color palette and typography
 */

export const Colors = {
  // Primary Colors - Caribbean Teal/Turquoise
  primary: '#00BCD4',
  primaryDark: '#0097A7',
  primaryLight: '#B2EBF2',

  // Accent Colors
  accent: '#00ACC1',

  // Emergency/Alert Colors
  emergency: '#E53935',
  emergencyDark: '#C62828',
  warning: '#FF9800',
  warningLight: '#FFE0B2',

  // Neutral Colors
  white: '#FFFFFF',
  background: '#F5F5F5',
  backgroundLight: '#FAFAFA',

  // Text Colors
  textPrimary: '#212121',
  textSecondary: '#757575',
  textLight: '#BDBDBD',
  textWhite: '#FFFFFF',

  // UI Elements
  border: '#E0E0E0',
  divider: '#EEEEEE',
  shadow: '#000000',

  // Status Colors
  success: '#4CAF50',
  info: '#2196F3',

  // Rating/Star Color
  star: '#FFC107',

  // Caribbean Blues (for hero images, gradients)
  oceanBlue: '#006994',
  skyBlue: '#4FC3F7',
};

export const Typography = {
  // Font Families
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },

  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    hero: 40,
  },

  // Font Weights
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
};

export const BorderRadius = {
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const Shadows = {
  small: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  large: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
};

export const Layout = {
  // Screen padding
  screenPadding: Spacing.base,

  // Card spacing
  cardSpacing: Spacing.md,

  // Tab bar height
  tabBarHeight: 60,

  // Hero heights
  heroSmall: 200,
  heroMedium: 250,
  heroLarge: 300,
};

export default {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
  Shadows,
  Layout,
};
