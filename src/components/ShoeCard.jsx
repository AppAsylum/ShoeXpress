import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import PressableScale from './ui/PressableScale';
import ShoeImage from './ui/ShoeImage';
import {COLORS, FONTFAMILY, FONTSIZE, RADIUS, SPACING} from '../Constants/theme';

// Product tile for the home grid.
const ShoeCard = ({shoe, width, onPress, onAdd, onToggleFavourite}) => {
  const price = shoe.prices[0];
  return (
    <PressableScale onPress={onPress} style={[styles.card, {width}]} scaleTo={0.97}>
      <View>
        <ShoeImage source={shoe.imagelink_square} style={[styles.image, {height: width}]} />
        <PressableScale
          onPress={onToggleFavourite}
          hitSlop={8}
          scaleTo={0.85}
          accessibilityLabel={shoe.favourite ? 'Remove from favorites' : 'Add to favorites'}
          style={styles.fav}>
          <Ionicons
            name={shoe.favourite ? 'heart' : 'heart-outline'}
            size={16}
            color={shoe.favourite ? COLORS.danger : COLORS.text}
          />
        </PressableScale>
        <View style={styles.rating}>
          <Ionicons name="star" size={10} color={COLORS.star} />
          <Text style={styles.ratingText}>{shoe.average_rating}</Text>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.brand} numberOfLines={1}>{shoe.name}</Text>
        <Text style={styles.model} numberOfLines={1}>{shoe.model}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>
            <Text style={styles.currency}>{price.currency}</Text>
            {price.price}
          </Text>
          <PressableScale
            onPress={onAdd}
            scaleTo={0.85}
            hitSlop={6}
            accessibilityLabel={`Add ${shoe.model} to cart`}
            style={styles.add}>
            <Ionicons name="add" size={20} color={COLORS.onAccent} />
          </PressableScale>
        </View>
      </View>
    </PressableScale>
  );
};

export default React.memo(ShoeCard);

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  image: {width: '100%'},
  fav: {
    position: 'absolute',
    top: SPACING.xs,
    right: SPACING.xs,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.scrim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rating: {
    position: 'absolute',
    left: SPACING.xs,
    bottom: SPACING.xs,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.scrimStrong,
  },
  ratingText: {fontFamily: FONTFAMILY.semibold, fontSize: 10, color: COLORS.text},
  info: {padding: SPACING.sm, paddingTop: SPACING.sm},
  brand: {fontFamily: FONTFAMILY.medium, fontSize: FONTSIZE.xs, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: 0.8},
  model: {fontFamily: FONTFAMILY.semibold, fontSize: FONTSIZE.md, color: COLORS.text, marginTop: 1},
  footer: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: SPACING.xs},
  price: {fontFamily: FONTFAMILY.bold, fontSize: FONTSIZE.lg, color: COLORS.text},
  currency: {color: COLORS.accent, fontSize: FONTSIZE.md},
  add: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
