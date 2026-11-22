import React, {useState} from 'react';
import {Animated, Pressable, StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';
import {StatusBar} from 'expo-status-bar';
import {useStore} from '../store/store';
import ShoeImage from '../components/ui/ShoeImage';
import Button, {IconButton} from '../components/ui/Button';
import PressableScale from '../components/ui/PressableScale';
import {addShoeToCart, toggleFavourite, DEFAULT_SIZE} from '../utils/cartActions';
import {COLORS, FONTFAMILY, FONTSIZE, RADIUS, SPACING, TYPE} from '../Constants/theme';

const DetailsScreen = ({navigation, route}) => {
  const shoe = useStore(s => s.ShoeList[route.params.index]);
  const {width, height} = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [size, setSize] = useState(DEFAULT_SIZE);
  const [expanded, setExpanded] = useState(false);
  const scrollY = useState(() => new Animated.Value(0))[0];

  const imageHeight = Math.min(height * 0.56, width * 1.25);
  const price = shoe.prices.find(p => p.size === size) || shoe.prices[0];

  // Photo zooms slightly when pulling down and drifts up slower than the content.
  const imageTransform = [
    {translateY: scrollY.interpolate({inputRange: [-200, 0, imageHeight], outputRange: [-100, 0, imageHeight * 0.4], extrapolateRight: 'clamp'})},
    {scale: scrollY.interpolate({inputRange: [-200, 0], outputRange: [1.4, 1], extrapolateRight: 'clamp'})},
  ];

  const addToCart = () => {
    addShoeToCart(shoe, size);
    navigation.popTo('Tab', {screen: 'Cart'});
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {useNativeDriver: true})}
        contentContainerStyle={{paddingBottom: 120 + insets.bottom}}>
        <Animated.View style={{height: imageHeight, transform: imageTransform}}>
          <ShoeImage source={shoe.imagelink_portrait} style={StyleSheet.absoluteFill} transition={200} />
          <LinearGradient
            colors={['rgba(11,11,13,0.55)', 'rgba(11,11,13,0)', 'rgba(11,11,13,0)', COLORS.bg]}
            locations={[0, 0.25, 0.7, 1]}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>

        <View style={styles.sheet}>
          <Text style={styles.brand}>{shoe.name}</Text>
          <View style={styles.titleRow}>
            <Text style={[TYPE.title, {flex: 1}]}>{shoe.model}</Text>
          </View>

          <View style={styles.metaRow}>
            <View style={styles.metaPill}>
              <Ionicons name="star" size={14} color={COLORS.star} />
              <Text style={styles.metaStrong}>{shoe.average_rating}</Text>
              <Text style={styles.metaMuted}>({shoe.ratings_count})</Text>
            </View>
            <View style={styles.metaPill}>
              <Ionicons name="cube-outline" size={14} color={COLORS.accent} />
              <Text style={styles.metaMuted}>Free delivery</Text>
            </View>
            <View style={styles.metaPill}>
              <Ionicons name="refresh-outline" size={14} color={COLORS.accent} />
              <Text style={styles.metaMuted}>30-day returns</Text>
            </View>
          </View>

          <Text style={styles.section}>About</Text>
          <Pressable onPress={() => setExpanded(e => !e)} accessibilityRole="button">
            <Text style={TYPE.body} numberOfLines={expanded ? undefined : 3}>
              {shoe.description}
            </Text>
            <Text style={styles.more}>{expanded ? 'Show less' : 'Read more'}</Text>
          </Pressable>

          <View style={styles.sizeHeader}>
            <Text style={styles.section}>Select size</Text>
            <Text style={styles.metaMuted}>US Men’s</Text>
          </View>
          <View style={styles.sizes}>
            {shoe.prices.map(p => {
              const active = p.size === size;
              return (
                <PressableScale
                  key={p.size}
                  onPress={() => setSize(p.size)}
                  scaleTo={0.92}
                  accessibilityState={{selected: active}}
                  accessibilityLabel={`Size ${p.size}`}
                  style={[styles.size, active && styles.sizeActive]}>
                  <Text style={[styles.sizeText, active && styles.sizeTextActive]}>{p.size}</Text>
                </PressableScale>
              );
            })}
          </View>
        </View>
      </Animated.ScrollView>

      {/* Floating top buttons */}
      <View style={[styles.topBar, {top: insets.top + SPACING.xs}]}>
        <IconButton icon="chevron-back" onPress={() => navigation.goBack()} label="Go back" />
        <IconButton
          icon={shoe.favourite ? 'heart' : 'heart-outline'}
          color={shoe.favourite ? COLORS.danger : COLORS.text}
          onPress={() => toggleFavourite(shoe)}
          label={shoe.favourite ? 'Remove from favorites' : 'Add to favorites'}
        />
      </View>

      {/* Sticky purchase bar */}
      <View style={[styles.bottomBar, {paddingBottom: insets.bottom + SPACING.sm}]}>
        <View>
          <Text style={styles.metaMuted}>Price</Text>
          <Text style={styles.price}>
            <Text style={{color: COLORS.accent}}>{price.currency}</Text>
            {price.price}
          </Text>
        </View>
        <Button title="Add to cart" icon="bag-add-outline" onPress={addToCart} style={{flex: 1}} />
      </View>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: COLORS.bg},
  sheet: {
    marginTop: -SPACING.xxl,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    backgroundColor: COLORS.bg,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
  },
  brand: {fontFamily: FONTFAMILY.semibold, fontSize: FONTSIZE.sm, color: COLORS.accent, textTransform: 'uppercase', letterSpacing: 1},
  titleRow: {flexDirection: 'row', alignItems: 'flex-start', marginTop: 2},
  metaRow: {flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.xs, marginTop: SPACING.md},
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: SPACING.sm,
    height: 32,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  metaStrong: {fontFamily: FONTFAMILY.semibold, fontSize: FONTSIZE.sm, color: COLORS.text},
  metaMuted: {fontFamily: FONTFAMILY.regular, fontSize: FONTSIZE.sm, color: COLORS.textMuted},
  section: {...TYPE.subheading, marginTop: SPACING.xl, marginBottom: SPACING.xs},
  more: {fontFamily: FONTFAMILY.semibold, fontSize: FONTSIZE.sm, color: COLORS.accent, marginTop: SPACING.xxs},
  sizeHeader: {flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between'},
  sizes: {flexDirection: 'row', gap: SPACING.xs},
  size: {
    flex: 1,
    height: 52,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeActive: {backgroundColor: COLORS.accent, borderColor: COLORS.accent},
  sizeText: {fontFamily: FONTFAMILY.semibold, fontSize: FONTSIZE.md, color: COLORS.text},
  sizeTextActive: {color: COLORS.onAccent},
  topBar: {
    position: 'absolute',
    left: SPACING.lg,
    right: SPACING.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    backgroundColor: COLORS.bg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  price: {fontFamily: FONTFAMILY.bold, fontSize: FONTSIZE.xxl, color: COLORS.text},
});
