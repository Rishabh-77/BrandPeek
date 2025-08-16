import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import BrandList from './BrandList';
import GradientBackground from './GradientBackground';
import { brandService } from '../services/brandService';

/**
 * Example usage of BrandList component
 * This demonstrates all the different states and functionality
 */
const BrandListExample = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate API call
  const fetchBrands = async () => {
    try {
      setLoading(true);
      setError(null);

      // Using the actual brand service
      const response = await brandService.getBrands();
      setBrands(response.brands || response);
    } catch (err) {
      console.error('Failed to fetch brands:', err);
      setError(err.message || 'Failed to load brands');
    } finally {
      setLoading(false);
    }
  };

  // Handle brand selection
  const handleBrandPress = brand => {
    console.log('Brand selected:', brand);
    // In a real app, this would navigate to the brand detail screen
    // navigation.navigate('BrandDetail', { brandId: brand.id });
  };

  // Handle refresh
  const handleRefresh = async () => {
    console.log('Refreshing brands...');
    await fetchBrands();
  };

  // Initial load
  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <GradientBackground variant="primary">
        <View style={styles.content}>
          <BrandList
            brands={brands}
            loading={loading}
            error={error}
            onRefresh={handleRefresh}
            onBrandPress={handleBrandPress}
            testID="example-brand-list"
          />
        </View>
      </GradientBackground>
    </SafeAreaView>
  );
};

/**
 * Example with different states for testing
 */
export const BrandListStatesExample = () => {
  const [currentState, setCurrentState] = useState('loading');

  const mockBrands = [
    {
      id: '1',
      name: 'Apple',
      description: 'Think Different - Innovation at its finest',
      logo: 'https://logo.clearbit.com/apple.com',
    },
    {
      id: '2',
      name: 'Google',
      description: "Organizing the world's information",
      logo: 'https://logo.clearbit.com/google.com',
    },
    {
      id: '3',
      name: 'Microsoft',
      description: 'Empowering every person and organization',
      logo: 'https://logo.clearbit.com/microsoft.com',
    },
  ];

  const getStateProps = () => {
    switch (currentState) {
      case 'loading':
        return {
          brands: [],
          loading: true,
          error: null,
        };
      case 'success':
        return {
          brands: mockBrands,
          loading: false,
          error: null,
        };
      case 'empty':
        return {
          brands: [],
          loading: false,
          error: null,
        };
      case 'error':
        return {
          brands: [],
          loading: false,
          error: 'Failed to load brands. Please check your connection.',
        };
      default:
        return {
          brands: [],
          loading: true,
          error: null,
        };
    }
  };

  const handleRefresh = async () => {
    console.log('Refresh triggered');
    // Simulate state change
    setCurrentState('loading');
    setTimeout(() => {
      setCurrentState('success');
    }, 2000);
  };

  const handleBrandPress = brand => {
    console.log('Brand pressed:', brand.name);
  };

  return (
    <SafeAreaView style={styles.container}>
      <GradientBackground variant="primary">
        <View style={styles.content}>
          {/* State controls for testing */}
          <View style={styles.controls}>
            <button onClick={() => setCurrentState('loading')}>Loading</button>
            <button onClick={() => setCurrentState('success')}>Success</button>
            <button onClick={() => setCurrentState('empty')}>Empty</button>
            <button onClick={() => setCurrentState('error')}>Error</button>
          </View>

          <BrandList
            {...getStateProps()}
            onRefresh={handleRefresh}
            onBrandPress={handleBrandPress}
            testID="states-example-brand-list"
          />
        </View>
      </GradientBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    marginBottom: 10,
  },
});

export default BrandListExample;
