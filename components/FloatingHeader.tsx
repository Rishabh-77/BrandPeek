import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import { gradients } from '../constants/gradients';

const { width: screenWidth } = Dimensions.get('window');

// Match BrandCard margins
const HEADER_MARGIN = 12; // Horizontal margin for the header card

interface FloatingHeaderProps {
  title?: string;
}

export default function FloatingHeader({
  title = 'BrandPeek',
}: FloatingHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={gradients.cardOverlay.config.colors}
        locations={gradients.cardOverlay.config.locations}
        start={gradients.cardOverlay.config.start}
        end={gradients.cardOverlay.config.end}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  gradient: {
    marginHorizontal: HEADER_MARGIN, // Add horizontal margins like BrandCard
    borderRadius: 16, // Add border radius like BrandCard
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: colors.primary.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden', // Ensure gradient respects border radius
  },
  content: {
    paddingHorizontal: 16, // Match BrandCard padding
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  title: {
    ...typography.styles.brandName,
    fontSize: Math.min(20, screenWidth * 0.05), // Responsive font size like BrandCard
    fontWeight: '700',
    textAlign: 'center',
    color: colors.text.primary,
    lineHeight: Math.min(24, screenWidth * 0.06), // Better line height for readability
    paddingHorizontal: 8, // Prevent text from touching edges
  },
});
