import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { gradients } from '../constants/gradients';
import colors from '../constants/colors';

interface GradientBackgroundProps {
  variant?: keyof typeof gradients;
  children?: React.ReactNode;
  style?: ViewStyle;
}

/**
 * Reusable gradient background component that provides consistent gradient styling
 * across the application. Supports multiple variants defined in `constants/gradients.ts`.
 *
 * The `primary` variant creates a radial-like effect using a complex LinearGradient.
 * All gradient configurations are managed in `constants/gradients.ts`.
 */
const GradientBackground: React.FC<GradientBackgroundProps> = ({
  variant = 'primary',
  children,
  style,
}) => {
  const gradientConfig = gradients[variant]?.config;

  if (!gradientConfig) {
    if (__DEV__) {
      console.warn(
        `[GradientBackground] Variant "${variant}" not found in gradients.ts. Using a fallback.`
      );
    }
    // Provide a simple fallback gradient to prevent crashes
    return (
      <LinearGradient
        colors={[colors.primary.deepBlue, colors.primary.nearBlack]}
        style={[styles.container, style]}
      >
        {children}
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={gradientConfig.colors as string[]}
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
