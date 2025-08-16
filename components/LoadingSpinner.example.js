import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoadingSpinner from './LoadingSpinner';
import { colors } from '../constants/colors';

// Example usage of LoadingSpinner component
const LoadingSpinnerExample = () => {
  return (
    <View style={styles.container}>
      {/* Default spinner */}
      <LoadingSpinner />

      {/* Large spinner with custom color */}
      <LoadingSpinner
        size={60}
        color={colors.interactive.success}
        style={styles.customSpinner}
      />

      {/* Small spinner for inline loading */}
      <LoadingSpinner size={20} color={colors.text.secondary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
    padding: 20,
  },
  customSpinner: {
    backgroundColor: colors.background.card,
    borderRadius: 10,
  },
});

export default LoadingSpinnerExample;
