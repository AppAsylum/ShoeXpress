import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import PressableScale from './PressableScale';
import {COLORS, RADIUS, SPACING, TYPE} from '../../Constants/theme';

// variant: 'primary' (volt) | 'secondary' (raised surface) | 'ghost' (text only)
const Button = ({title, onPress, variant = 'primary', icon, loading, disabled, style}) => {
  const fg =
    variant === 'primary' ? COLORS.onAccent : variant === 'ghost' ? COLORS.accent : COLORS.text;
  return (
    <PressableScale
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={title}
      style={[styles.base, styles[variant], style]}>
      {loading ? (
        <ActivityIndicator color={fg} />
      ) : (
        <View style={styles.row}>
          <Text style={[TYPE.button, {color: fg}]}>{title}</Text>
          {icon && <Ionicons name={icon} size={18} color={fg} />}
        </View>
      )}
    </PressableScale>
  );
};

export const IconButton = ({icon, onPress, size = 44, color = COLORS.text, style, filled = true, label}) => (
  <PressableScale
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={label || icon}
    hitSlop={8}
    scaleTo={0.9}
    style={[
      styles.icon,
      {width: size, height: size, borderRadius: size / 2},
      filled && styles.iconFilled,
      style,
    ]}>
    <Ionicons name={icon} size={size * 0.45} color={color} />
  </PressableScale>
);

export default Button;

const styles = StyleSheet.create({
  base: {
    height: 56,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },
  primary: {backgroundColor: COLORS.accent},
  secondary: {backgroundColor: COLORS.surfaceRaised, borderWidth: 1, borderColor: COLORS.border},
  ghost: {backgroundColor: 'transparent', height: 44},
  row: {flexDirection: 'row', alignItems: 'center', gap: SPACING.xs},
  icon: {alignItems: 'center', justifyContent: 'center'},
  iconFilled: {backgroundColor: COLORS.glass, borderWidth: 1, borderColor: COLORS.border},
});
