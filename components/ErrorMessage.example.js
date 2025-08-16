import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import ErrorMessage from './ErrorMessage';
import { colors } from '../constants/colors';

// Example usage of ErrorMessage component
const ErrorMessageExample = () => {
  const [retryCount, setRetryCount] = useState(0);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    Alert.alert('Retry', `Retry attempt #${retryCount + 1}`);
  };

  return (
    <View style={styles.container}>
      {/* Basic error message without retry */}
      <ErrorMessage
        message="Unable to load data"
        style={styles.errorContainer}
      />

      {/* Error message with retry functionality */}
      <ErrorMessage
        message="Network connection failed. Please check your internet connection and try again."
        onRetry={handleRetry}
        retryText="Retry"
        style={styles.errorContainer}
      />

      {/* Custom error message with custom retry text */}
      <ErrorMessage
        message="Failed to load brand details"
        onRetry={handleRetry}
        retryText="Reload"
        style={styles.errorContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: colors.background.primary,
    padding: 20,
  },
  errorContainer: {
    backgroundColor: colors.background.card,
    borderRadius: 10,
    marginVertical: 10,
  },
});

export default ErrorMessageExample;
