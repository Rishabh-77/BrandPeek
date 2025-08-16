import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
  StatusBar,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import GradientBackground from '@/components/GradientBackground';
import BrandList from '@/components/BrandList';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import brandService from '@/services/brandService';
import { typography } from '@/constants/typography';
// import { colors } from '@/constants/colors';

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
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
        console.log('[HomeScreen] Fetching brands...');
      }

      const brandsData = await brandService.getBrands();
      setBrands(brandsData);

      if (__DEV__) {
        console.log(
          `[HomeScreen] Successfully loaded ${brandsData.length} brands`
        );
      }
    } catch (err) {
      if (__DEV__) {
        console.error('[HomeScreen] Error fetching brands:', err);
      }

      const errorMessage =
        err.message || 'Failed to load brands. Please try again.';
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
   * @param {Object} brand - Selected brand object
   */
  const handleBrandPress = useCallback(brand => {
    if (!brand || !brand.id) {
      if (__DEV__) {
      }
      Alert.alert('Error', 'Unable to view brand details. Please try again.');
      return;
    }

    if (__DEV__) {
    }

    // Navigate to brand detail screen with brand ID
    // Note: This will be implemented when BrandDetailScreen is created
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
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Top Brands Today</Text>
          </View>
          <View style={styles.loadingContainer}>
            <LoadingSpinner size="large" />
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
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Top Brands Today</Text>
          </View>
          <View style={styles.errorContainer}>
            <ErrorMessage
              message={error}
              onRetry={handleRetry}
              testID="home-screen-error"
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

        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Top Brands Today</Text>
          {brands.length > 0 && (
            <Text style={styles.headerSubtitle}>
              Discover {brands.length} amazing brands
            </Text>
          )}
        </View>

        {/* Brand List Section */}
        <View style={styles.content}>
          <BrandList
            brands={brands}
            loading={refreshing}
            error={error}
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 24, // Increased top padding
    paddingBottom: 32, // Increased bottom padding for more space
    alignItems: 'center',
  },
  headerTitle: {
    ...typography.styles.header,
    fontSize: Math.min(28, Dimensions.get('window').width * 0.07), // Responsive font size
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16, // Increased spacing between title and subtitle
    paddingHorizontal: 10, // Prevent text from touching edges
    lineHeight: Math.min(34, Dimensions.get('window').width * 0.085), // Better line height
  },
  headerSubtitle: {
    ...typography.styles.description,
    fontSize: Math.min(16, Dimensions.get('window').width * 0.04), // Responsive font size
    textAlign: 'center',
    opacity: 0.8,
    paddingHorizontal: 10, // Prevent text from touching edges
    lineHeight: Math.min(22, Dimensions.get('window').width * 0.055), // Better line height
    marginTop: 4, // Small top margin for better separation
  },
  content: {
    flex: 1,
    paddingHorizontal: Math.max(10, Dimensions.get('window').width * 0.025), // Responsive padding
    paddingTop: 8, // Add top padding for separation from header
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadingText: {
    ...typography.styles.body,
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
});
