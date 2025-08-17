import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, router } from 'expo-router';
import GradientBackground from '@/components/GradientBackground';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import FollowButton from '@/components/FollowButton';
import brandService from '@/services/brandService';
import { typography } from '@/constants/typography';
import { colors } from '../../constants/colors.js';
import { Brand } from '@/types/Brand';

/**
 * BrandDetailScreen - Displays detailed information about a selected brand
 *
 * Features:
 * - Subtle gradient background for detail view
 * - Brand information display with loading states
 * - Error handling with retry functionality
 * - Navigation back to home screen
 */
export default function BrandDetailScreen() {
  const { id, name } = useLocalSearchParams<{ id: string; name?: string }>();
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch brand details by ID
   */
  const fetchBrandDetails = useCallback(async () => {
    if (!id) {
      setError('No brand ID provided');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (__DEV__) {
        console.log('Fetching brand details for ID:', id);
      }

      const brandData = await brandService.getBrandById(id as string);
      setBrand(brandData as Brand);

      if (__DEV__) {
        console.log(
          'Brand data loaded successfully:',
          (brandData as any)?.name
        );
      }
    } catch (err: any) {
      if (__DEV__) {
      }

      const errorMessage =
        err?.message || 'Failed to load brand details. Please try again.';
      setError(errorMessage);

      Alert.alert('Error Loading Brand', errorMessage, [
        { text: 'Retry', onPress: fetchBrandDetails },
        { text: 'Go Back', onPress: () => router.back() },
      ]);
    } finally {
      setLoading(false);
    }
  }, [id]);

  /**
   * Handle retry functionality
   */
  const handleRetry = () => {
    fetchBrandDetails();
  };

  // Fetch brand details on component mount
  useEffect(() => {
    fetchBrandDetails();
  }, [fetchBrandDetails]);

  // Show loading state
  if (loading) {
    return (
      <GradientBackground variant="primary">
        <SafeAreaView style={styles.safeArea}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          <View style={styles.loadingContainer}>
            <LoadingSpinner size={60} style={styles.spinnerStyle} />
            <Text style={styles.loadingText}>Loading brand details...</Text>
          </View>
        </SafeAreaView>
      </GradientBackground>
    );
  }

  // Show error state
  if (error) {
    return (
      <GradientBackground variant="primary">
        <SafeAreaView style={styles.safeArea}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          <View style={styles.errorContainer}>
            <ErrorMessage
              message={error || ''}
              onRetry={handleRetry}
              style={styles.errorMessageStyle}
            />
          </View>
        </SafeAreaView>
      </GradientBackground>
    );
  }

  // Main render with brand details
  return (
    <GradientBackground variant="primary">
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Brand Header */}
          <View style={styles.header}>
            {/* Brand Logo */}
            <View style={styles.logoContainer}>
              {brand?.logo ? (
                <Image
                  source={{ uri: brand.logo }}
                  style={styles.logo}
                  contentFit="contain"
                  transition={300}
                  placeholder={null}
                  cachePolicy="memory-disk"
                  priority="high"
                  recyclingKey={brand.id}
                  accessible={true}
                  accessibilityLabel={`${brand.name} logo`}
                />
              ) : (
                <View style={styles.logoFallback}>
                  <Text style={styles.logoFallbackText}>
                    {(brand?.name || name)?.charAt(0)?.toUpperCase() || '?'}
                  </Text>
                </View>
              )}
            </View>

            <Text style={styles.brandName}>{brand?.name || name}</Text>
            {brand?.category && (
              <Text style={styles.category}>{brand.category}</Text>
            )}
          </View>

          {/* Brand Details */}
          <View style={styles.detailsContainer}>
            {brand?.description && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>About</Text>
                <Text style={styles.description}>{brand.description}</Text>
              </View>
            )}

            {brand?.fullDescription &&
              brand.fullDescription !== brand.description && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Details</Text>
                  <Text style={styles.fullDescription}>
                    {brand.fullDescription}
                  </Text>
                </View>
              )}

            {(brand?.founded || brand?.headquarters) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Company Info</Text>
                {brand.founded && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Founded:</Text>
                    <Text style={styles.infoValue}>{brand.founded}</Text>
                  </View>
                )}
                {brand.headquarters && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Headquarters:</Text>
                    <Text style={styles.infoValue}>{brand.headquarters}</Text>
                  </View>
                )}
              </View>
            )}

            {brand?.website && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Website</Text>
                <Text style={styles.website}>{brand.website}</Text>
              </View>
            )}
          </View>

          {/* Follow Button */}
          <View style={styles.actionContainer}>
            <FollowButton
              onPress={() => {
                // Visual feedback only - no actual follow logic needed per requirements
              }}
              style={styles.followButtonStyle}
              testID="brand-detail-follow-button"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadingText: {
    fontSize: typography.fontSize.base,
    fontWeight: '400',
    color: colors.text.primary,
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
    marginTop: 16,
    textAlign: 'center',
    opacity: 0.8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    width: Math.min(120, Dimensions.get('window').width * 0.3),
    height: Math.min(120, Dimensions.get('window').width * 0.3),
    marginBottom: 24,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logo: {
    width: Math.min(100, Dimensions.get('window').width * 0.25),
    height: Math.min(100, Dimensions.get('window').width * 0.25),
    borderRadius: 16,
  },
  logoFallback: {
    width: Math.min(100, Dimensions.get('window').width * 0.25),
    height: Math.min(100, Dimensions.get('window').width * 0.25),
    borderRadius: 16,
    backgroundColor: 'rgba(30, 64, 175, 0.8)', // colors.primary.darkBlue with opacity
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoFallbackText: {
    fontSize: Math.min(48, Dimensions.get('window').width * 0.12),
    fontWeight: '700',
    color: '#FFFFFF', // colors.text.primary
    textAlign: 'center',
  },
  brandName: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text.primary,
    lineHeight: 40,
    textAlign: 'center',
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.text.secondary,
    lineHeight: typography.lineHeight.relaxed * 16,
    textAlign: 'center',
    opacity: 0.8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  detailsContainer: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    lineHeight: typography.lineHeight.tight * 20,
    marginBottom: 12,
  },
  description: {
    fontSize: typography.fontSize.base,
    fontWeight: '400',
    color: colors.text.primary,
    lineHeight: 24,
  },
  fullDescription: {
    fontSize: typography.fontSize.base,
    fontWeight: '400',
    color: colors.text.primary,
    lineHeight: 24,
    opacity: 0.9,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.text.primary,
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
    width: 120,
  },
  infoValue: {
    fontSize: typography.fontSize.base,
    fontWeight: '400',
    color: colors.text.primary,
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
    flex: 1,
    opacity: 0.9,
  },
  website: {
    fontSize: typography.fontSize.base,
    fontWeight: '400',
    color: colors.primary.darkBlue,
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
    textDecorationLine: 'underline',
  },
  actionContainer: {
    marginTop: 40, // Increased top margin for better separation
    marginBottom: 24, // Added bottom margin for better spacing
    paddingVertical: 16, // Added vertical padding
    alignItems: 'center',
  },
  spinnerStyle: {
    alignSelf: 'center',
  },
  errorMessageStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  followButtonStyle: {
    alignSelf: 'center',
  },
});
