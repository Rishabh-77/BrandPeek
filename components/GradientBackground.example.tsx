import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GradientBackground from './GradientBackground';

/**
 * Example usage of GradientBackground component
 * This file demonstrates how to use the component with different variants
 */

// Example 1: Primary variant (for home screen)
export const PrimaryGradientExample = () => (
  <GradientBackground variant="primary">
    <View style={styles.content}>
      <Text style={styles.title}>Top Brands Today</Text>
      <Text style={styles.subtitle}>Discover amazing brands</Text>
    </View>
  </GradientBackground>
);

// Example 2: Subtle variant (for detail screen)
export const SubtleGradientExample = () => (
  <GradientBackground variant="subtle">
    <View style={styles.content}>
      <Text style={styles.title}>Brand Details</Text>
      <Text style={styles.description}>
        This is a detailed view with a subtle gradient background
      </Text>
    </View>
  </GradientBackground>
);

// Example 3: With custom styling
export const CustomStyledExample = () => (
  <GradientBackground variant="primary" style={styles.customContainer}>
    <View style={styles.content}>
      <Text style={styles.title}>Custom Styled</Text>
    </View>
  </GradientBackground>
);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#D1D5DB',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    lineHeight: 24,
  },
  customContainer: {
    borderRadius: 10,
  },
});
