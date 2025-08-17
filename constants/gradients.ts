// Gradient specifications matching the screenshot requirements
import { ColorValue } from 'react-native';

interface GradientConfig {
  colors: readonly [ColorValue, ColorValue, ...ColorValue[]];
  locations: readonly [number, number, ...number[]];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

interface GradientDefinition {
  type: 'radial' | 'linear';
  colors: (string | ColorValue)[];
  locations: number[];
  center?: number[];
  radius?: number;
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  opacity?: number;
  config: GradientConfig;
}

export const gradients: Record<string, GradientDefinition> = {
  // Primary gradient for home screen - updated to match the reference image
  primary: {
    type: 'linear',
    colors: ['#2B3C8F', '#10194E', '#06071B'],
    locations: [0, 0.3, 1],
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
    config: {
      colors: ['#2B3C8F', '#10194E', '#06071B'],
      locations: [0, 0.3, 1],
      start: { x: 0.5, y: 0 },
      end: { x: 0.5, y: 1 },
    },
  },

  // Subtle linear gradient for detail screen
  subtle: {
    type: 'linear',
    colors: ['#1E40AF', '#000000'],
    locations: [0, 1],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
    opacity: 0.8,
    // For expo-linear-gradient LinearGradient
    config: {
      colors: ['rgba(30, 64, 175, 0.8)', 'rgba(0, 0, 0, 0.8)'],
      locations: [0, 1],
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
    },
  },

  // Card overlay gradient
  cardOverlay: {
    type: 'linear',
    colors: ['rgba(30, 41, 59, 0.9)', 'rgba(15, 23, 42, 0.9)'],
    locations: [0, 1],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
    config: {
      colors: ['rgba(30, 41, 59, 0.9)', 'rgba(15, 23, 42, 0.9)'],
      locations: [0, 1],
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
    },
  },

  // Button gradient
  button: {
    type: 'linear',
    colors: ['#1E40AF', '#1E3A8A'],
    locations: [0, 1],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
    config: {
      colors: ['#1E40AF', '#1E3A8A'],
      locations: [0, 1],
      start: { x: 0, y: 0 },
      end: { x: 1, y: 0 },
    },
  },

  // Loading shimmer gradient
  shimmer: {
    type: 'linear',
    colors: [
      'rgba(255, 255, 255, 0.1)',
      'rgba(255, 255, 255, 0.3)',
      'rgba(255, 255, 255, 0.1)',
    ],
    locations: [0, 0.5, 1],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
    config: {
      colors: [
        'rgba(255, 255, 255, 0.1)',
        'rgba(255, 255, 255, 0.3)',
        'rgba(255, 255, 255, 0.1)',
      ],
      locations: [0, 0.5, 1],
      start: { x: 0, y: 0 },
      end: { x: 1, y: 0 },
    },
  },
};

export default gradients;
