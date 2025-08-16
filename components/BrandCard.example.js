import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import BrandCard from './BrandCard';
import { GradientBackground } from './index';

// Example brand data
const exampleBrands = [
  {
    id: '1',
    name: 'Apple',
    logo: 'https://logo.clearbit.com/apple.com',
    description: 'Think different. Innovation at its finest.',
  },
  {
    id: '2',
    name: 'Google',
    logo: 'https://logo.clearbit.com/google.com',
    description: "Organizing the world's information.",
  },
  {
    id: '3',
    name: 'Microsoft',
    logo: 'https://logo.clearbit.com/microsoft.com',
    description: 'Empowering every person and organization.',
  },
];

const BrandCardExample = () => {
  const handleBrandPress = brand => {
    console.log('Brand pressed:', brand.name);
    // In a real app, this would navigate to the brand detail screen
  };

  return (
    <GradientBackground variant="primary">
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Regular brand cards */}
          {exampleBrands.map(brand => (
            <BrandCard
              key={brand.id}
              brand={brand}
              onPress={handleBrandPress}
            />
          ))}

          {/* Loading skeleton example */}
          <BrandCard brand={null} />

          {/* Brand with long text example */}
          <BrandCard
            brand={{
              id: '4',
              name: 'Very Long Brand Name That Should Be Truncated',
              logo: 'https://logo.clearbit.com/amazon.com',
              description:
                'This is a very long description that should be truncated after two lines to maintain consistent card heights and visual hierarchy.',
            }}
            onPress={handleBrandPress}
          />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});

export default BrandCardExample;
