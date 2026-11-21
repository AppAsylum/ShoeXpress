import React, {useEffect, useState} from 'react';
import {Animated, Easing, StyleSheet, Text, View} from 'react-native';
import {LogoMark, Glow} from '../components/ui/Logo';
import {COLORS, FONTFAMILY, SPACING} from '../Constants/theme';

// Branded loading screen shown right after the native splash. It starts from
// the exact same frame (mark centred, 180pt) so the hand-off is seamless,
// then glows, slides the mark up and reveals the wordmark.
const LaunchScreen = ({onDone}) => {
  const glow = useState(() => new Animated.Value(0))[0];
  const lift = useState(() => new Animated.Value(0))[0];
  const word = useState(() => new Animated.Value(0))[0];
  const out = useState(() => new Animated.Value(1))[0];
  const bar = useState(() => new Animated.Value(0))[0];

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(glow, {toValue: 1, duration: 500, easing: Easing.out(Easing.quad), useNativeDriver: true}),
        Animated.timing(bar, {toValue: 1, duration: 1300, easing: Easing.inOut(Easing.cubic), useNativeDriver: false}),
        Animated.sequence([
          Animated.delay(150),
          Animated.timing(lift, {toValue: 1, duration: 550, easing: Easing.out(Easing.cubic), useNativeDriver: true}),
          Animated.timing(word, {toValue: 1, duration: 450, easing: Easing.out(Easing.cubic), useNativeDriver: true}),
        ]),
      ]),
      Animated.delay(250),
      Animated.timing(out, {toValue: 0, duration: 300, useNativeDriver: true}),
    ]).start(() => onDone?.());
  }, [glow, lift, word, out, bar, onDone]);

  return (
    <Animated.View style={[styles.screen, {opacity: out}]}>
      <Animated.View
        style={[
          styles.glow,
          {
            opacity: glow.interpolate({inputRange: [0, 1], outputRange: [0, 0.35]}),
            transform: [
              {translateY: lift.interpolate({inputRange: [0, 1], outputRange: [0, -36]})},
              {scale: glow.interpolate({inputRange: [0, 1], outputRange: [0.6, 1]})},
            ],
          },
        ]}>
        <Glow size={360} />
      </Animated.View>
      <Animated.View
        style={{
          transform: [
            {translateY: lift.interpolate({inputRange: [0, 1], outputRange: [0, -36]})},
            {scale: lift.interpolate({inputRange: [0, 1], outputRange: [1, 0.72]})},
          ],
        }}>
        <LogoMark size={180} />
      </Animated.View>
      <Animated.View
        style={[
          styles.wordWrap,
          {
            opacity: word,
            transform: [{translateY: word.interpolate({inputRange: [0, 1], outputRange: [12, 0]})}],
          },
        ]}>
        <Text style={styles.word}>
          Shoe<Text style={{color: COLORS.accent}}>Xpress</Text>
        </Text>
        <Text style={styles.tag}>Step into something new</Text>
      </Animated.View>
      <View style={styles.track}>
        <Animated.View
          style={[styles.fill, {width: bar.interpolate({inputRange: [0, 1], outputRange: ['0%', '100%']})}]}
        />
      </View>
    </Animated.View>
  );
};

export default LaunchScreen;

const styles = StyleSheet.create({
  screen: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: COLORS.bg,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  glow: {position: 'absolute'},
  wordWrap: {position: 'absolute', top: '56%', alignItems: 'center'},
  word: {fontFamily: FONTFAMILY.extrabold, fontSize: 34, color: COLORS.text, letterSpacing: -0.8},
  tag: {fontFamily: FONTFAMILY.medium, fontSize: 14, color: COLORS.textMuted, marginTop: SPACING.xxs},
  track: {
    position: 'absolute',
    bottom: '12%',
    width: 120,
    height: 3,
    borderRadius: 2,
    backgroundColor: COLORS.surfaceRaised,
    overflow: 'hidden',
  },
  fill: {height: '100%', backgroundColor: COLORS.accent, borderRadius: 2},
});
