import React, { useState, useCallback, memo, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  RefreshControl,
  Pressable,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BrandCard from './BrandCard';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import { gradients } from '../constants/gradients';
import { ListOptimization } from '../utils/listOptimization';
import imageCache from '../utils/imageCache';
import performanceMonitor from '../utils/performanceMonitor';

const { height: screenHeight } = Dimensions.get('window');

// Constants for performance optimization
const ITEM_HEIGHT = 88; // BrandCard height + margins (updated for better spacing)
const SKELETON_COUNT = 6;

const BrandList = ({
  brands = [],
  loading = false,
  error = null,
  onRefresh,
  onBrandPress,
  testID = 'brand-list',
}) => {
  const [refreshing, setRefreshing] = useState(false);

  // Preload brand images for better performance
  useEffect(() => {
    if (brands.length > 0) {
      performanceMonitor.measure('preload-brand-logos', () => {
        return imageCache.preloadBrandLogos(brands);
      });
    }
  }, [brands]);

  // Performance monitoring for FlatList
  const flatListMonitoring = performanceMonitor.monitorFlatList('brand-list');

  // Handle pull-to-refresh
  const handleRefresh = useCallback(async () => {
    if (onRefresh && !refreshing) {
      setRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setRefreshing(false);
      }
    }
  }, [onRefresh, refreshing]);

  // Optimized keyExtractor
  const keyExtractor = useCallback((item, index) => {
    return item?.id ? `brand-${item.id}` : `skeleton-${index}`;
  }, []);

  // Get optimized performance settings
  const performanceSettings = ListOptimization.getOptimalSettings(
    ITEM_HEIGHT,
    brands.length
  );
  const viewabilityConfig = ListOptimization.getViewabilityConfig();

  // Optimized getItemLayout for performance
  const getItemLayout = useCallback(
    ListOptimization.getItemLayout(ITEM_HEIGHT, 0),
    []
  );

  // Render individual brand item
  const renderBrandItem = useCallback(
    ({ item, index }) => (
      <BrandCard
        brand={item}
        onPress={onBrandPress}
        testID={`${testID}-item-${index}`}
      />
    ),
    [onBrandPress, testID]
  );

  // Render list header
  const renderListHeader = useCallback(
    () => (
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Top 10 Brands</Text>
      </View>
    ),
    []
  );

  // Generate skeleton data for loading state
  const getSkeletonData = useCallback(() => {
    return Array.from({ length: SKELETON_COUNT }, (_, index) => ({
      id: `skeleton-${index}`,
      skeleton: true,
    }));
  }, []);

  // Empty state component
  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <LinearGradient
        colors={gradients.cardOverlay.config.colors}
        locations={gradients.cardOverlay.config.locations}
        start={gradients.cardOverlay.config.start}
        end={gradients.cardOverlay.config.end}
        style={styles.emptyCard}
      >
        <Text style={styles.emptyTitle}>No Brands Found</Text>
        <Text style={styles.emptyDescription}>
          We couldn&apos;t find any brands to display right now.
        </Text>
        {onRefresh && (
          <Pressable
            style={styles.emptyButton}
            onPress={handleRefresh}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Refresh to try again"
            testID={`${testID}-empty-refresh`}
          >
            <LinearGradient
              colors={gradients.button.config.colors}
              locations={gradients.button.config.locations}
              start={gradients.button.config.start}
              end={gradients.button.config.end}
              style={styles.emptyButtonGradient}
            >
              <Text style={styles.emptyButtonText}>Try Again</Text>
            </LinearGradient>
          </Pressable>
        )}
      </LinearGradient>
    </View>
  );

  // Error state component
  const ErrorState = () => (
    <View style={styles.errorContainer}>
      <LinearGradient
        colors={gradients.cardOverlay.config.colors}
        locations={gradients.cardOverlay.config.locations}
        start={gradients.cardOverlay.config.start}
        end={gradients.cardOverlay.config.end}
        style={styles.errorCard}
      >
        <Text style={styles.errorTitle}>Something went wrong</Text>
        <Text style={styles.errorDescription}>
          {error ||
            'Unable to load brands. Please check your connection and try again.'}
        </Text>
        {onRefresh && (
          <Pressable
            style={styles.errorButton}
            onPress={handleRefresh}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Retry loading brands"
            testID={`${testID}-error-retry`}
          >
            <LinearGradient
              colors={gradients.button.config.colors}
              locations={gradients.button.config.locations}
              start={gradients.button.config.start}
              end={gradients.button.config.end}
              style={styles.errorButtonGradient}
            >
              <Text style={styles.errorButtonText}>Retry</Text>
            </LinearGradient>
          </Pressable>
        )}
      </LinearGradient>
    </View>
  );

  // Determine what data to show
  const listData = loading ? getSkeletonData() : brands;

  // Show error state if there's an error and no data
  if (error && !loading && (!brands || brands.length === 0)) {
    return <ErrorState />;
  }

  // Show empty state if no loading, no error, and no data
  if (!loading && !error && (!brands || brands.length === 0)) {
    return <EmptyState />;
  }

  return (
    <FlatList
      data={listData}
      renderItem={renderBrandItem}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      ListHeaderComponent={renderListHeader}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.text.secondary}
            colors={[colors.primary.deepBlue]}
            progressBackgroundColor={colors.background.secondary}
            testID={`${testID}-refresh-control`}
          />
        ) : undefined
      }
      // Performance optimizations
      {...performanceSettings}
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={null}
      maintainVisibleContentPosition={{
        minIndexForVisible: 0,
        autoscrollToTopThreshold: 10,
      }}
      scrollEventThrottle={16}
      decelerationRate="fast"
      // Performance monitoring
      onScrollBeginDrag={flatListMonitoring.onScrollBeginDrag}
      onScrollEndDrag={flatListMonitoring.onScrollEndDrag}
      onMomentumScrollBegin={flatListMonitoring.onMomentumScrollBegin}
      onMomentumScrollEnd={flatListMonitoring.onMomentumScrollEnd}
      // Accessibility
      accessible={true}
      accessibilityLabel="List of brands"
      accessibilityHint="Scroll to browse brands, pull down to refresh"
      testID={testID}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 8,
    paddingHorizontal: 4, // Reduced to prevent double padding with cards
    flexGrow: 1,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
    alignItems: 'center',
    backgroundColor: 'transparent',
    minHeight: 60,
  },
  headerTitle: {
    ...typography.styles.header,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.text.primary,
    lineHeight: 28,
    marginBottom: 0,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },

  // Empty state styles
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    minHeight: screenHeight * 0.6,
  },
  emptyCard: {
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    maxWidth: 300,
    width: '100%',
  },
  emptyTitle: {
    ...typography.styles.header,
    fontSize: 20,
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyDescription: {
    ...typography.styles.description,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  emptyButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  emptyButtonGradient: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  emptyButtonText: {
    ...typography.styles.button,
    textAlign: 'center',
  },

  // Error state styles
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    minHeight: screenHeight * 0.6,
  },
  errorCard: {
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    maxWidth: 300,
    width: '100%',
  },
  errorTitle: {
    ...typography.styles.header,
    fontSize: 20,
    color: colors.interactive.error,
    marginBottom: 12,
    textAlign: 'center',
  },
  errorDescription: {
    ...typography.styles.description,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  errorButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  errorButtonGradient: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  errorButtonText: {
    ...typography.styles.button,
    textAlign: 'center',
  },
});

export default memo(BrandList);
