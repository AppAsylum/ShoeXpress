import React, {useEffect, useState} from 'react';
import {Animated, StyleSheet, Text} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {COLORS, SPACING, TYPE} from '../Constants/theme';

// Full-screen "order confirmed" moment: a volt check pops in with a ripple.
const SuccessOverlay = ({title = 'Order confirmed', subtitle}) => {
  const fade = useState(() => new Animated.Value(0))[0];
  const pop = useState(() => new Animated.Value(0.4))[0];
  const ripple = useState(() => new Animated.Value(0))[0];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {toValue: 1, duration: 200, useNativeDriver: true}),
      Animated.spring(pop, {toValue: 1, friction: 5, tension: 90, useNativeDriver: true}),
      Animated.timing(ripple, {toValue: 1, duration: 900, useNativeDriver: true}),
    ]).start();
  }, [fade, pop, ripple]);

  return (
    <Animated.View style={[styles.overlay, {opacity: fade}]}>
      <Animated.View
        style={[
          styles.ripple,
          {
            opacity: ripple.interpolate({inputRange: [0, 1], outputRange: [0.5, 0]}),
            transform: [{scale: ripple.interpolate({inputRange: [0, 1], outputRange: [0.6, 2.4]})}],
          },
        ]}
      />
      <Animated.View style={[styles.check, {transform: [{scale: pop}]}]}>
        <Ionicons name="checkmark" size={56} color={COLORS.onAccent} />
      </Animated.View>
      <Text style={[TYPE.title, styles.text]}>{title}</Text>
      {subtitle ? <Text style={[TYPE.body, styles.text]}>{subtitle}</Text> : null}
    </Animated.View>
  );
};

export default SuccessOverlay;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: COLORS.scrimStrong,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    padding: SPACING.xxl,
  },
  ripple: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.accent,
  },
  check: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  text: {textAlign: 'center', marginTop: SPACING.xs},
});
