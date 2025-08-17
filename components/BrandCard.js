import React, { useState, memo } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import { gradients } from '../constants/gradients';

const { width: screenWidth } = Dimensions.get('window');

// Calculate responsive card width with proper margins
const CARD_MARGIN = 12; // Horizontal margin for each card
const CARD_WIDTH = screenWidth - CARD_MARGIN * 2 - 32; // Account for container padding

const BrandCard = ({ brand, onPress, testID }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = async () => {
    // Provide enhanced haptic feedback
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      // Add a subtle selection feedback after a short delay
      setTimeout(() => {
        Haptics.selectionAsync();
      }, 50);
    } catch (_error) {
      // Haptic feedback not available on this device
      if (__DEV__) {
      }
    }

    if (onPress && brand) {
      onPress(brand);
    }
  };

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <View style={styles.skeletonContainer}>
      <LinearGradient
        colors={gradients.shimmer.config.colors}
        locations={gradients.shimmer.config.locations}
        start={gradients.shimmer.config.start}
        end={gradients.shimmer.config.end}
        style={styles.skeletonGradient}
      >
        <View style={styles.skeletonContent}>
          <View style={styles.skeletonLogo} />
          <View style={styles.skeletonTextContainer}>
            <View style={styles.skeletonTitle} />
            <View style={styles.skeletonDescription} />
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  // Show loading skeleton if no brand data
  if (!brand) {
    return <LoadingSkeleton />;
  }

  return (
    <Pressable
      style={[styles.container, isPressed && styles.containerPressed]}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`View details for ${brand.name}`}
      accessibilityHint="Double tap to view brand details"
      testID={testID || `brand-card-${brand.id}`}
    >
      <LinearGradient
        colors={gradients.cardOverlay.config.colors}
        locations={gradients.cardOverlay.config.locations}
        start={gradients.cardOverlay.config.start}
        end={gradients.cardOverlay.config.end}
        style={styles.cardGradient}
      >
        <View style={styles.content}>
          {/* Brand Logo */}
          <View style={styles.logoContainer}>
            {imageLoading && (
              <View style={styles.imageLoadingContainer}>
                <ActivityIndicator
                  size="small"
                  color={colors.text.secondary}
                  testID={`${testID || `brand-card-${brand.id}`}-loading`}
                />
              </View>
            )}

            {imageError ? (
              <View style={styles.imageFallback}>
                <Text style={styles.imageFallbackText}>
                  {brand.name ? brand.name.charAt(0).toUpperCase() : '?'}
                </Text>
              </View>
            ) : (
              <Image
                source={{ uri: brand.logo }}
                style={[styles.logo, imageLoading && styles.logoHidden]}
                onLoad={handleImageLoad}
                onError={handleImageError}
                placeholder={null}
                contentFit="contain"
                transition={300}
                cachePolicy="memory-disk"
                priority="high"
                recyclingKey={brand.id}
                accessible={true}
                accessibilityLabel={`${brand.name} logo`}
              />
            )}
          </View>

          {/* Brand Information */}
          <View style={styles.textContainer}>
            <Text
              style={styles.brandName}
              numberOfLines={1}
              ellipsizeMode="tail"
              accessible={true}
              accessibilityLabel={`Brand name: ${brand.name}`}
            >
              {brand.name}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginHorizontal: CARD_MARGIN,
    marginVertical: 8,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: colors.primary.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    alignSelf: 'center',
  },
  containerPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  cardGradient: {
    flex: 1,
    borderRadius: 16,
  },
  content: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    minHeight: 72, // Increased height for better text spacing
  },
  logoContainer: {
    width: 48,
    height: 48,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  logoHidden: {
    opacity: 0,
  },
  imageLoadingContainer: {
    position: 'absolute',
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
  },
  imageFallback: {
    width: 48,
    height: 48,
    backgroundColor: colors.primary.darkBlue,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageFallbackText: {
    ...typography.styles.brandName,
    fontSize: 20,
    color: colors.text.primary,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    minWidth: 0, // Allow text to shrink and wrap properly
    paddingVertical: 4, // Add vertical padding for better spacing
  },
  brandName: {
    ...typography.styles.brandName,
    marginBottom: 0, // No margin since no description below
    fontSize: Math.min(typography.fontSize.lg, screenWidth * 0.045), // Responsive font size
    lineHeight: Math.min(24, screenWidth * 0.055), // Better line height for readability
    paddingVertical: 2, // Small vertical padding
  },
  description: {
    ...typography.styles.description,
    fontSize: Math.min(typography.fontSize.sm, screenWidth * 0.035), // Responsive font size
    lineHeight: Math.min(20, screenWidth * 0.05), // Responsive line height
  },

  // Loading skeleton styles
  skeletonContainer: {
    width: CARD_WIDTH,
    marginHorizontal: CARD_MARGIN,
    marginVertical: 8,
    borderRadius: 16,
    overflow: 'hidden',
    height: 72, // Updated height to match content
    alignSelf: 'center',
  },
  skeletonGradient: {
    flex: 1,
  },
  skeletonContent: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    flex: 1,
  },
  skeletonLogo: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    marginRight: 16,
  },
  skeletonTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  skeletonTitle: {
    height: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    width: '70%',
  },
});

export default memo(BrandCard);
