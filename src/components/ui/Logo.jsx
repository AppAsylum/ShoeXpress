import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {Rect, Polygon, G, Defs, RadialGradient, Stop, Circle} from 'react-native-svg';
import {COLORS, FONTFAMILY} from '../../Constants/theme';

// Soft radial halo in the accent colour (RN has no blur filter, so use a gradient).
export const Glow = ({size = 320, color = COLORS.accent}) => (
  <Svg width={size} height={size}>
    <Defs>
      <RadialGradient id="g" cx="50%" cy="50%" r="50%">
        <Stop offset="0" stopColor={color} stopOpacity={1} />
        <Stop offset="0.45" stopColor={color} stopOpacity={0.35} />
        <Stop offset="1" stopColor={color} stopOpacity={0} />
      </RadialGradient>
    </Defs>
    <Circle cx={size / 2} cy={size / 2} r={size / 2} fill="url(#g)" />
  </Svg>
);

// Same geometry as assets/icon.png (generated from one source, 1024 box).
export const LogoMark = ({size = 48, color = COLORS.accent, cutColor = COLORS.bg}) => (
  <Svg width={size} height={size} viewBox="0 0 1024 1024">
    <G>
      <Rect x="130" y="424" width="170" height="44" rx="22" fill={color} opacity={0.55} />
      <Rect x="190" y="500" width="150" height="44" rx="22" fill={color} opacity={0.8} />
      <Rect x="150" y="576" width="120" height="44" rx="22" fill={color} opacity={0.55} />
      <Polygon points="372,232 512,232 812,792 672,792" fill={color} />
      {/* Rising blade drawn twice: outlined first (cuts a gap into the falling
          blade where they cross), then plain on top so the outline sits outside. */}
      <Polygon
        points="352,792 492,792 852,232 712,232"
        fill={color}
        stroke={cutColor}
        strokeWidth={36}
        strokeLinejoin="round"
      />
      <Polygon points="352,792 492,792 852,232 712,232" fill={color} />
    </G>
  </Svg>
);

// App icon tile: mark on a rounded dark square.
export const LogoTile = ({size = 96}) => (
  <View
    style={[
      styles.tile,
      {width: size, height: size, borderRadius: size * 0.26},
    ]}>
    <LogoMark size={size * 0.82} />
  </View>
);

export const Wordmark = ({size = 22, showMark = true}) => (
  <View style={styles.row}>
    {showMark && <LogoMark size={size * 1.5} />}
    <Text style={[styles.word, {fontSize: size}]}>
      Shoe<Text style={styles.accent}>Xpress</Text>
    </Text>
  </View>
);

const styles = StyleSheet.create({
  tile: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {flexDirection: 'row', alignItems: 'center', gap: 2},
  word: {fontFamily: FONTFAMILY.extrabold, color: COLORS.text, letterSpacing: -0.5},
  accent: {color: COLORS.accent},
});
