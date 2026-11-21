import React, {useRef, useState} from 'react';
import {Animated, StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StatusBar} from 'expo-status-bar';
import {Image} from 'expo-image';
import Button from '../components/ui/Button';
import {Wordmark} from '../components/ui/Logo';
import {useStore} from '../store/store';
import {COLORS, FONTFAMILY, RADIUS, SPACING, TYPE} from '../Constants/theme';

const SLIDES = [
  {
    key: '1',
    image: require('../assets/images/welcome/welcome-1.jpg'),
    eyebrow: 'New season drops',
    title: 'Step into\nyour best pair',
    body: 'Iconic sneakers and boots from the brands you love, all in one place.',
  },
  {
    key: '2',
    image: require('../assets/images/welcome/welcome-2.jpg'),
    eyebrow: 'Made for every move',
    title: 'Run, skate,\nwalk the city',
    body: 'Browse by brand, find your size in seconds and save favourites for later.',
  },
  {
    key: '3',
    image: require('../assets/images/welcome/welcome-3.jpg'),
    eyebrow: 'Fast & simple',
    title: 'Checkout in\na few taps',
    body: 'Your cart, payment and order history, beautifully organised.',
  },
];

const WelcomeScreen = ({navigation}) => {
  const {width, height} = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const completeOnboarding = useStore(s => s.completeOnboarding);
  const listRef = useRef(null);
  // scrollX drives the photo parallax on the native thread; dotsX mirrors it on
  // the JS side because width (used by the pager dots) can't animate natively.
  const scrollX = useState(() => new Animated.Value(0))[0];
  const dotsX = useState(() => new Animated.Value(0))[0];
  const [index, setIndex] = useState(0);
  const isLast = index === SLIDES.length - 1;

  const finish = () => {
    completeOnboarding();
    navigation.replace('SignUp');
  };

  const next = () => {
    if (isLast) return finish();
    listRef.current?.scrollToIndex({index: index + 1, animated: true});
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <Animated.FlatList
        ref={listRef}
        data={SLIDES}
        keyExtractor={s => s.key}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
          useNativeDriver: true,
          listener: e => dotsX.setValue(e.nativeEvent.contentOffset.x),
        })}
        onMomentumScrollEnd={e => setIndex(Math.round(e.nativeEvent.contentOffset.x / width))}
        getItemLayout={(_, i) => ({length: width, offset: width * i, index: i})}
        renderItem={({item, index: i}) => {
          // Slight parallax: the photo drifts slower than the page.
          const translateX = scrollX.interpolate({
            inputRange: [(i - 1) * width, i * width, (i + 1) * width],
            outputRange: [-width * 0.25, 0, width * 0.25],
          });
          return (
            <View style={{width, height, overflow: 'hidden'}}>
              <Animated.View style={[StyleSheet.absoluteFill, {transform: [{translateX}]}]}>
                <Image source={item.image} style={StyleSheet.absoluteFill} contentFit="cover" transition={300} />
              </Animated.View>
              <LinearGradient
                colors={['rgba(11,11,13,0.35)', 'rgba(11,11,13,0)', 'rgba(11,11,13,0.85)', COLORS.bg]}
                locations={[0, 0.3, 0.62, 0.82]}
                style={StyleSheet.absoluteFill}
              />
              <View style={[styles.copy, {bottom: insets.bottom + 150}]}>
                <View style={styles.eyebrow}>
                  <Text style={styles.eyebrowText}>{item.eyebrow}</Text>
                </View>
                <Text style={TYPE.display}>{item.title}</Text>
                <Text style={[TYPE.body, styles.body]}>{item.body}</Text>
              </View>
            </View>
          );
        }}
      />

      {/* Top bar */}
      <View style={[styles.topBar, {top: insets.top + SPACING.xs}]}>
        <Wordmark size={18} />
        {!isLast && <Button title="Skip" variant="ghost" onPress={finish} style={styles.skip} />}
      </View>

      {/* Bottom controls */}
      <View style={[styles.bottom, {paddingBottom: insets.bottom + SPACING.lg}]}>
        <View style={styles.dots}>
          {SLIDES.map((s, i) => {
            const w = dotsX.interpolate({
              inputRange: [(i - 1) * width, i * width, (i + 1) * width],
              outputRange: [8, 28, 8],
              extrapolate: 'clamp',
            });
            const opacity = dotsX.interpolate({
              inputRange: [(i - 1) * width, i * width, (i + 1) * width],
              outputRange: [0.35, 1, 0.35],
              extrapolate: 'clamp',
            });
            return <Animated.View key={s.key} style={[styles.dot, {width: w, opacity}]} />;
          })}
        </View>
        <Button
          title={isLast ? 'Get started' : 'Next'}
          icon="arrow-forward"
          onPress={next}
        />
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: COLORS.bg},
  topBar: {
    position: 'absolute',
    left: SPACING.lg,
    right: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skip: {paddingHorizontal: SPACING.sm},
  copy: {position: 'absolute', left: SPACING.lg, right: SPACING.lg},
  eyebrow: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.accentSoft,
    borderColor: 'rgba(212,255,58,0.35)',
    borderWidth: 1,
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    marginBottom: SPACING.md,
  },
  eyebrowText: {fontFamily: FONTFAMILY.semibold, fontSize: 12, color: COLORS.accent, letterSpacing: 0.4},
  body: {marginTop: SPACING.sm, maxWidth: 320},
  bottom: {position: 'absolute', left: SPACING.lg, right: SPACING.lg, bottom: 0, gap: SPACING.lg},
  dots: {flexDirection: 'row', gap: 6},
  dot: {height: 8, borderRadius: 4, backgroundColor: COLORS.accent},
});
