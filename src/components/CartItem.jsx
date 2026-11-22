import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import PressableScale from './ui/PressableScale';
import ShoeImage from './ui/ShoeImage';
import {COLORS, FONTFAMILY, FONTSIZE, RADIUS, SPACING} from '../Constants/theme';

const Stepper = ({quantity, onMinus, onPlus}) => (
  <View style={styles.stepper}>
    <PressableScale onPress={onMinus} scaleTo={0.85} hitSlop={6} style={styles.stepBtn} accessibilityLabel="Decrease quantity">
      <Ionicons name={quantity === 1 ? 'trash-outline' : 'remove'} size={16} color={COLORS.text} />
    </PressableScale>
    <Text style={styles.qty}>{quantity}</Text>
    <PressableScale onPress={onPlus} scaleTo={0.85} hitSlop={6} style={[styles.stepBtn, styles.stepPlus]} accessibilityLabel="Increase quantity">
      <Ionicons name="add" size={16} color={COLORS.onAccent} />
    </PressableScale>
  </View>
);

// One cart line per product, with a row per selected size.
const CartItem = ({item, onPress, onIncrement, onDecrement}) => (
  <PressableScale onPress={onPress} scaleTo={0.98} style={styles.card}>
    <View style={styles.top}>
      <ShoeImage source={item.imagelink_square} style={styles.image} />
      <View style={styles.meta}>
        <Text style={styles.brand}>{item.name}</Text>
        <Text style={styles.model} numberOfLines={2}>{item.model}</Text>
        {item.ItemPrice ? <Text style={styles.total}>${item.ItemPrice}</Text> : null}
      </View>
    </View>
    {item.prices.map(p => (
      <View key={p.size} style={styles.line}>
        <View style={styles.sizeChip}>
          <Text style={styles.sizeLabel}>US</Text>
          <Text style={styles.sizeValue}>{p.size}</Text>
        </View>
        <Text style={styles.unit}>${p.price}</Text>
        <Stepper
          quantity={p.quantity}
          onMinus={() => onDecrement(item.id, p.size)}
          onPlus={() => onIncrement(item.id, p.size)}
        />
      </View>
    ))}
  </PressableScale>
);

export default CartItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.sm,
    gap: SPACING.xs,
  },
  top: {flexDirection: 'row', gap: SPACING.md, marginBottom: SPACING.xxs},
  image: {width: 88, height: 88, borderRadius: RADIUS.md},
  meta: {flex: 1, justifyContent: 'center'},
  brand: {fontFamily: FONTFAMILY.medium, fontSize: FONTSIZE.xs, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: 0.8},
  model: {fontFamily: FONTFAMILY.semibold, fontSize: FONTSIZE.md, color: COLORS.text, marginTop: 2},
  total: {fontFamily: FONTFAMILY.bold, fontSize: FONTSIZE.lg, color: COLORS.accent, marginTop: 4},
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceRaised,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
  },
  sizeChip: {flexDirection: 'row', alignItems: 'baseline', gap: 4, width: 64},
  sizeLabel: {fontFamily: FONTFAMILY.medium, fontSize: FONTSIZE.xs, color: COLORS.textFaint},
  sizeValue: {fontFamily: FONTFAMILY.semibold, fontSize: FONTSIZE.md, color: COLORS.text},
  unit: {flex: 1, fontFamily: FONTFAMILY.medium, fontSize: FONTSIZE.sm, color: COLORS.textMuted},
  stepper: {flexDirection: 'row', alignItems: 'center', gap: SPACING.sm},
  stepBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepPlus: {backgroundColor: COLORS.accent, borderColor: COLORS.accent},
  qty: {fontFamily: FONTFAMILY.semibold, fontSize: FONTSIZE.md, color: COLORS.text, minWidth: 18, textAlign: 'center'},
});
