import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import GradientBackground from '@/components/GradientBackground';
import BrandList from '@/components/BrandList';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import FloatingHeader from '@/components/FloatingHeader';
import brandService from '@/services/brandService';
import { typography } from '@/constants/typography';
import { Brand } from '@/types/Brand';
import imageCache from '@/utils/imageCache';

/**
 * HomeScreen - Main screen displaying the brand discovery interface
 *
 * Features:
 * - Radial gradient background matching design specifications
 * - Brand list with loading and error states
 * - Pull-to-refresh functionality
 * - Navigation to brand detail screen
 * - Proper state management with React hooks
 */
export default function HomeScreen() {
  // State management for brands data and UI states
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  /**
   * Fetch brands from the API
   * Handles loading states and error management
   */
  const fetchBrands = useCallback(async (isRefresh = false) => {
    try {
      if (!isRefresh) {
        setLoading(true);
      }
      setError(null);

      if (__DEV__) {
      }

      const brandsData = await brandService.getBrands();
      setBrands(brandsData);

      // Preload brand images for better performance
      if (brandsData.length > 0) {
        imageCache.preloadBrandLogos(brandsData);
      }

      if (__DEV__) {
      }
    } catch (err) {
      if (__DEV__) {
      }

      const errorMessage =
        (err as Error).message || 'Failed to load brands. Please try again.';
      setError(errorMessage);

      // Show alert for critical errors (not during refresh)
      if (!isRefresh) {
        Alert.alert('Error Loading Brands', errorMessage, [
          { text: 'Retry', onPress: () => fetchBrands() },
          { text: 'Cancel', style: 'cancel' },
        ]);
      }
    } finally {
      setLoading(false);
      if (isRefresh) {
        setRefreshing(false);
      }
    }
  }, []);

  /**
   * Handle pull-to-refresh functionality
   */
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchBrands(true);
  }, [fetchBrands]);

  /**
   * Handle brand selection and navigation to detail screen
   * @param {Brand} brand - Selected brand object
   */
  const handleBrandPress = useCallback((brand: Brand) => {
    if (!brand || !brand.id) {
      if (__DEV__) {
      }
      Alert.alert('Error', 'Unable to view brand details. Please try again.');
      return;
    }

    if (__DEV__) {
    }

    // Navigate to brand detail screen with brand ID
    router.push({
      pathname: '/brand/[id]',
      params: { id: brand.id, name: brand.name },
    });
  }, []);

  /**
   * Retry function for error states
   */
  const handleRetry = useCallback(() => {
    fetchBrands();
  }, [fetchBrands]);

  // Initial data fetch on component mount
  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  // Show loading spinner during initial load
  if (loading && !refreshing && brands.length === 0) {
    return (
      <GradientBackground variant="primary" style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          <View style={styles.loadingContainer}>
            <LoadingSpinner size={60} style={{}} />
            <Text style={styles.loadingText}>Loading brands...</Text>
          </View>
        </SafeAreaView>
      </GradientBackground>
    );
  }

  // Show error state if there's an error and no cached data
  if (error && !loading && brands.length === 0) {
    return (
      <GradientBackground variant="primary" style={styles.container}>
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
              style={{}}
            />
          </View>
        </SafeAreaView>
      </GradientBackground>
    );
  }

  // Main render with brand list
  return (
    <GradientBackground variant="primary" style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />

        <FloatingHeader title="BrandPeek" />

        {/* Brand List Section */}
        <View style={styles.content}>
          <BrandList
            brands={brands}
            loading={refreshing}
            error={error || undefined}
            onRefresh={handleRefresh}
            onBrandPress={handleBrandPress}
            testID="home-screen-brand-list"
          />
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },

  content: {
    flex: 1,
    paddingHorizontal: 16, // Fixed padding for consistency
    paddingTop: 80, // Increased padding to account for both floating header and brand list header
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadingText: {
    fontSize: typography.fontSize.base,
    fontWeight: '400' as const,
    color: typography.styles.body.color,
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
    marginTop: 16,
    textAlign: 'center' as const,
    opacity: 0.8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
