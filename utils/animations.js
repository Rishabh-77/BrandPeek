import { Animated, Easing } from 'react-native';

/**
 * Animation utilities for smooth transitions and interactions
 */
export class AnimationUtils {
  /**
   * Create a smooth fade in animation
   * @param {Animated.Value} animatedValue - The animated value to animate
   * @param {number} duration - Animation duration in milliseconds
   * @param {number} toValue - Target value (default: 1)
   * @returns {Animated.CompositeAnimation} Animation object
   */
  static fadeIn(animatedValue, duration = 300, toValue = 1) {
    return Animated.timing(animatedValue, {
      toValue,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });
  }

  /**
   * Create a smooth fade out animation
   * @param {Animated.Value} animatedValue - The animated value to animate
   * @param {number} duration - Animation duration in milliseconds
   * @param {number} toValue - Target value (default: 0)
   * @returns {Animated.CompositeAnimation} Animation object
   */
  static fadeOut(animatedValue, duration = 300, toValue = 0) {
    return Animated.timing(animatedValue, {
      toValue,
      duration,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    });
  }

  /**
   * Create a smooth scale animation
   * @param {Animated.Value} animatedValue - The animated value to animate
   * @param {number} toValue - Target scale value
   * @param {number} duration - Animation duration in milliseconds
   * @returns {Animated.CompositeAnimation} Animation object
   */
  static scale(animatedValue, toValue = 1, duration = 200) {
    return Animated.spring(animatedValue, {
      toValue,
      tension: 300,
      friction: 10,
      useNativeDriver: true,
    });
  }

  /**
   * Create a smooth slide animation
   * @param {Animated.Value} animatedValue - The animated value to animate
   * @param {number} toValue - Target position value
   * @param {number} duration - Animation duration in milliseconds
   * @returns {Animated.CompositeAnimation} Animation object
   */
  static slide(animatedValue, toValue = 0, duration = 300) {
    return Animated.timing(animatedValue, {
      toValue,
      duration,
      easing: Easing.out(Easing.bezier(0.25, 0.46, 0.45, 0.94)),
      useNativeDriver: true,
    });
  }

  /**
   * Create a bounce animation
   * @param {Animated.Value} animatedValue - The animated value to animate
   * @param {number} toValue - Target value
   * @returns {Animated.CompositeAnimation} Animation object
   */
  static bounce(animatedValue, toValue = 1) {
    return Animated.spring(animatedValue, {
      toValue,
      tension: 400,
      friction: 8,
      useNativeDriver: true,
    });
  }

  /**
   * Create a staggered animation for multiple elements
   * @param {Array} animations - Array of animation objects
   * @param {number} stagger - Delay between animations in milliseconds
   * @returns {Animated.CompositeAnimation} Staggered animation
   */
  static stagger(animations, stagger = 100) {
    return Animated.stagger(stagger, animations);
  }

  /**
   * Create a sequence of animations
   * @param {Array} animations - Array of animation objects
   * @returns {Animated.CompositeAnimation} Sequence animation
   */
  static sequence(animations) {
    return Animated.sequence(animations);
  }

  /**
   * Create a parallel animation
   * @param {Array} animations - Array of animation objects
   * @returns {Animated.CompositeAnimation} Parallel animation
   */
  static parallel(animations) {
    return Animated.parallel(animations);
  }

  /**
   * Create a loading pulse animation
   * @param {Animated.Value} animatedValue - The animated value to animate
   * @returns {Animated.CompositeAnimation} Pulse animation
   */
  static pulse(animatedValue) {
    return Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 0.7,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
  }

  /**
   * Create a shimmer animation for loading states
   * @param {Animated.Value} animatedValue - The animated value to animate
   * @returns {Animated.CompositeAnimation} Shimmer animation
   */
  static shimmer(animatedValue) {
    return Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
  }

  /**
   * Create a smooth rotation animation
   * @param {Animated.Value} animatedValue - The animated value to animate
   * @param {number} duration - Animation duration in milliseconds
   * @returns {Animated.CompositeAnimation} Rotation animation
   */
  static rotate(animatedValue, duration = 1000) {
    return Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
  }

  /**
   * Interpolate rotation values
   * @param {Animated.Value} animatedValue - The animated value
   * @returns {Animated.AnimatedInterpolation} Interpolated rotation
   */
  static interpolateRotation(animatedValue) {
    return animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
  }

  /**
   * Create smooth easing curves
   */
  static easings = {
    easeInOut: Easing.inOut(Easing.ease),
    easeOut: Easing.out(Easing.ease),
    easeIn: Easing.in(Easing.ease),
    bounceOut: Easing.bounce,
    elasticOut: Easing.elastic(1),
    backOut: Easing.back(1.5),
    bezier: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  };
}

/**
 * Pre-configured animation presets
 */
export const AnimationPresets = {
  // Card entrance animation
  cardEntrance: animatedValue => {
    return AnimationUtils.sequence([
      AnimationUtils.fadeIn(animatedValue, 300),
      AnimationUtils.scale(animatedValue, 1, 200),
    ]);
  },

  // Button press animation
  buttonPress: scaleValue => {
    return AnimationUtils.sequence([
      AnimationUtils.scale(scaleValue, 0.95, 100),
      AnimationUtils.scale(scaleValue, 1, 100),
    ]);
  },

  // List item entrance
  listItemEntrance: (animatedValue, delay = 0) => {
    return Animated.sequence([
      Animated.delay(delay),
      AnimationUtils.parallel([
        AnimationUtils.fadeIn(animatedValue, 400),
        AnimationUtils.slide(animatedValue, 0, 400),
      ]),
    ]);
  },

  // Screen transition
  screenTransition: animatedValue => {
    return AnimationUtils.slide(animatedValue, 0, 300);
  },
};

export default {
  AnimationUtils,
  AnimationPresets,
};
