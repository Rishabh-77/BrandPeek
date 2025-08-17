import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import colors from '../constants/colors';
import typography from '../constants/typography';

const { width } = Dimensions.get('window');

const FollowButton = ({
  onPress,
  disabled = false,
  style,
  testID = 'follow-button',
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [scaleValue] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    setIsPressed(true);

    Animated.timing(scaleValue, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = async () => {
    if (disabled) return;

    // Provide haptic feedback on button press
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      // Haptic feedback not available on this device
      if (__DEV__) {
        console.log('Haptic feedback not available:', error);
      }
    }

    // Toggle follow state for visual feedback
    setIsFollowing(!isFollowing);

    // Call the onPress callback
    if (onPress) {
      onPress(!isFollowing);
    }
  };

  const buttonText = isFollowing ? 'Following' : 'Follow';
  const buttonColors = isFollowing
    ? [colors.interactive.success, colors.primary.darkBlue]
    : [colors.primary.deepBlue, colors.primary.darkBlue];

  return (
    <Animated.View
      style={[styles.container, { transform: [{ scale: scaleValue }] }, style]}
    >
      <TouchableOpacity
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={`${buttonText} this brand`}
        accessibilityHint={
          isFollowing
            ? 'Tap to unfollow this brand'
            : 'Tap to follow this brand'
        }
        accessibilityState={{ selected: isFollowing, disabled }}
        testID={testID}
        style={[
          styles.touchable,
          disabled && styles.disabled,
          isPressed && styles.pressed,
        ]}
      >
        <LinearGradient
          colors={
            disabled
              ? [colors.interactive.disabled, colors.interactive.disabled]
              : buttonColors
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <Text
            style={[
              styles.buttonText,
              disabled && styles.disabledText,
              isFollowing && styles.followingText,
            ]}
          >
            {buttonText}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginVertical: 24, // Increased vertical margin for better spacing
  },
  touchable: {
    borderRadius: 28, // Increased border radius for better proportions
    overflow: 'hidden',
    elevation: 4, // Increased elevation for better visual depth
    shadowColor: colors.primary.deepBlue,
    shadowOffset: {
      width: 0,
      height: 3, // Increased shadow offset
    },
    shadowOpacity: 0.3, // Increased shadow opacity
    shadowRadius: 4.5, // Increased shadow radius
  },
  gradient: {
    paddingVertical: 16, // Increased vertical padding for better text spacing
    paddingHorizontal: 40, // Increased horizontal padding for better button size
    minWidth: width * 0.45, // Slightly wider button
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    ...typography.styles.button,
    fontSize: typography.fontSize.lg, // Increased font size for better visibility
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    textAlign: 'center',
    lineHeight: typography.fontSize.lg * 1.2, // Better line height for readability
    letterSpacing: 0.5, // Slight letter spacing for better readability
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: colors.text.muted,
  },
  followingText: {
    color: colors.text.primary,
  },
});

export default FollowButton;
