import React, {useEffect, useState} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Button from './Button';
import {COLORS, SPACING, TYPE} from '../../Constants/theme';

// Friendly empty screen: glowing icon that gently floats, a title, a hint and an optional action.
const EmptyState = ({icon = 'bag-outline', title, subtitle, actionTitle, onAction}) => {
  const float = useState(() => new Animated.Value(0))[0];
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(float, {toValue: 1, duration: 1600, useNativeDriver: true}),
        Animated.timing(float, {toValue: 0, duration: 1600, useNativeDriver: true}),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [float]);
  const translateY = float.interpolate({inputRange: [0, 1], outputRange: [0, -8]});

  return (
    <View style={styles.wrap}>
      <Animated.View style={[styles.halo, {transform: [{translateY}]}]}>
        <View style={styles.circle}>
          <Ionicons name={icon} size={40} color={COLORS.accent} />
        </View>
      </Animated.View>
      <Text style={[TYPE.heading, styles.center]}>{title}</Text>
      {subtitle ? <Text style={[TYPE.body, styles.center, styles.sub]}>{subtitle}</Text> : null}
      {actionTitle ? (
        <Button title={actionTitle} onPress={onAction} icon="arrow-forward" style={styles.btn} />
      ) : null}
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  wrap: {flex: 1, alignItems: 'center', justifyContent: 'center', padding: SPACING.xxl, minHeight: 420},
  halo: {
    width: 132,
    height: 132,
    borderRadius: 66,
    backgroundColor: COLORS.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  circle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {textAlign: 'center'},
  sub: {marginTop: SPACING.xs, maxWidth: 280},
  btn: {marginTop: SPACING.xl, alignSelf: 'stretch'},
});
