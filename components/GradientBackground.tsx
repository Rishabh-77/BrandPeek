import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { gradients } from '../constants/gradients';

interface GradientBackgroundProps {
  variant?: 'primary' | 'subtle';
  children?: React.ReactNode;
  style?: ViewStyle;
}

/**
 * Reusable gradient background component that provides consistent gradient styling
 * across the application. Supports primary (radial-like) and subtle (linear) variants.
 *
 * Primary variant creates a radial-like effect using LinearGradient with specific positioning
 * to match the deep blue (#1E3A8A) center to near-black (#0F172A) edges specification.
 */
const GradientBackground: React.FC<GradientBackgroundProps> = ({
  variant = 'primary',
  children,
  style,
}) => {
  if (variant === 'primary') {
    // Create radial-like effect using LinearGradient with multiple color stops
    // Bright blue center fading to very dark edges
    return (
      <LinearGradient
        colors={[
          '#B0E0E6',
          '#87CEEB',
          '#4A90E2',
          '#2E5BBA',
          '#1A2B5C',
          '#0F1419',
          '#030507',
          '#000000',
        ]}
        locations={[0, 0.08, 0.2, 0.35, 0.55, 0.75, 0.9, 1]}
        start={{ x: 0.5, y: 0.3 }}
        end={{ x: 0.5, y: 1 }}
        style={[styles.container, style]}
      >
        {children}
      </LinearGradient>
    );
  }

  // Subtle variant for detail screens
  const gradientConfig = gradients[variant].config;

  return (
    <LinearGradient
      colors={gradientConfig.colors}
      locations={gradientConfig.locations}
      start={gradientConfig.start}
      end={gradientConfig.end}
      style={[styles.container, style]}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GradientBackground;
