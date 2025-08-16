import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import FollowButton from './FollowButton';
import GradientBackground from './GradientBackground';

/**
 * Example usage of the FollowButton component
 * This demonstrates different states and configurations
 */
const FollowButtonExample = () => {
  const handleFollowPress = isFollowing => {
    Alert.alert(
      'Follow Action',
      `Brand ${isFollowing ? 'followed' : 'unfollowed'}!`,
      [{ text: 'OK' }]
    );
  };

  return (
    <GradientBackground variant="subtle">
      <View style={styles.container}>
        {/* Basic Follow Button */}
        <FollowButton
          onPress={handleFollowPress}
          testID="basic-follow-button"
        />

        {/* Disabled Follow Button */}
        <FollowButton disabled={true} testID="disabled-follow-button" />

        {/* Follow Button with custom style */}
        <FollowButton
          onPress={handleFollowPress}
          style={styles.customButton}
          testID="custom-follow-button"
        />
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  customButton: {
    marginTop: 30,
  },
});

export default FollowButtonExample;
