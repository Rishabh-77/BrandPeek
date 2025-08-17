import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';
import { AnimationUtils } from '../utils/animations';

const LoadingSpinner = ({
  size = 40,
  color = colors.primary.deepBlue,
  style,
}) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinAnimation = AnimationUtils.rotate(spinValue, 1200);
    spinAnimation.start();

    return () => spinAnimation.stop();
  }, [spinValue]);

  const spin = AnimationUtils.interpolateRotation(spinValue);

  return (
    <View
      style={[styles.container, style]}
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
    >
      <Animated.View
        style={[
          styles.spinner,
          {
            width: size,
            height: size,
            borderColor: `${color}20`,
            borderTopColor: color,
            transform: [{ rotate: spin }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  spinner: {
    borderWidth: 3,
    borderRadius: 50,
  },
});

export default LoadingSpinner;
