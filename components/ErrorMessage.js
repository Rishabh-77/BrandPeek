import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';

const ErrorMessage = ({
  message = 'Something went wrong',
  onRetry,
  retryText = 'Try Again',
  style,
}) => {
  return (
    <View
      style={[styles.container, style]}
      accessibilityRole="alert"
      accessibilityLabel={`Error: ${message}`}
    >
      <Text style={styles.errorText} accessibilityRole="text">
        {message}
      </Text>
      {onRetry && (
        <TouchableOpacity
          style={styles.retryButton}
          onPress={onRetry}
          accessibilityRole="button"
          accessibilityLabel={`${retryText} button`}
          accessibilityHint="Tap to retry the failed operation"
        >
          <Text style={styles.retryButtonText}>{retryText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    minHeight: 120,
  },
  errorText: {
    ...typography.styles.body,
    color: colors.interactive.error,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
  },
  retryButton: {
    backgroundColor: colors.primary.deepBlue,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  retryButtonText: {
    ...typography.styles.button,
    color: colors.text.primary,
  },
});

export default ErrorMessage;
