import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { gradients } from '../constants/gradients';
import { brandColors } from '../constants/colors';

interface GradientBackgroundProps {
  variant?: keyof typeof gradients;
  children?: React.ReactNode;
  style?: ViewStyle;
}

/**
 * Reusable gradient background component.
 *
 * For the 'primary' variant, it uses `react-native-svg` to render a true RadialGradient
 * that matches the desired "center glow" effect coming from the top.
 *
 * For all other variants, it falls back to using `expo-linear-gradient`.
 */
const GradientBackground: React.FC<GradientBackgroundProps> = ({
  variant = 'primary',
  children,
  style,
}) => {
  // Special implementation for the primary variant to achieve the radial glow
  if (variant === 'primary') {
    return (
      <View style={[styles.container, style]}>
        <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
          <Defs>
            <RadialGradient
              id="grad"
              cx="50%"
              cy="0%" // Position the glow's center at the very top edge
              // Use rx and ry to create a semi-oval shape that is wider than it is tall
              rx="100%" // Horizontal radius - makes the glow wide
              ry="70%" // Vertical radius - controls the downward spread to create the oval shape
            >
              <Stop offset="0" stopColor="#4158B8" />
              {/* Brighter blue for the glow */}
              <Stop offset="0.3" stopColor="#25347B" />
              {/* Adjusted mid-point for a smoother transition */}
              <Stop offset="1" stopColor="#06071B" />
            </RadialGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
        </Svg>
        {/* Content must be rendered in a separate view on top of the SVG */}
        <View style={styles.contentContainer}>{children}</View>
      </View>
    );
  }

  // Fallback to LinearGradient for other variants
  const gradientConfig = gradients[variant]?.config;

  if (!gradientConfig) {
    if (__DEV__) {
      console.warn(
        `[GradientBackground] Variant "${variant}" not found in gradients.ts. Using a fallback.`
      );
    }
    return (
      <LinearGradient
        colors={[brandColors.primary.deepBlue, brandColors.primary.nearBlack]}
        style={[styles.container, style]}
      >
        {children}
      </LinearGradient>
    );
  }

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
  contentContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default GradientBackground;
