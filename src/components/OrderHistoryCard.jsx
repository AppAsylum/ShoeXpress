import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import PressableScale from './ui/PressableScale';
import ShoeImage from './ui/ShoeImage';
import {COLORS, FONTFAMILY, FONTSIZE, RADIUS, SPACING} from '../Constants/theme';

const formatDate = iso => {
  const d = new Date(iso);
  if (isNaN(d)) return String(iso);
  return d.toLocaleDateString(undefined, {day: 'numeric', month: 'short', year: 'numeric'}) +
    ' · ' + d.toLocaleTimeString(undefined, {hour: 'numeric', minute: '2-digit'});
};

const OrderHistoryCard = ({order, onItemPress}) => {
  const count = order.CartList.reduce((n, i) => n + i.prices.reduce((m, p) => m + p.quantity, 0), 0);
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <Ionicons name="checkmark" size={14} color={COLORS.onAccent} />
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.status}>Order placed</Text>
          <Text style={styles.date}>{formatDate(order.orderDate)}</Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={styles.total}>${order.CartListPrice}</Text>
          <Text style={styles.date}>{count} {count === 1 ? 'item' : 'items'}</Text>
        </View>
      </View>
      {order.orderId ? <Text style={styles.orderId}>#{order.orderId}</Text> : null}
      <View style={styles.items}>
        {order.CartList.map(item => (
          <PressableScale key={item.id} onPress={() => onItemPress(item)} scaleTo={0.98} style={styles.item}>
            <ShoeImage source={item.imagelink_square} style={styles.thumb} />
            <View style={{flex: 1}}>
              <Text style={styles.model} numberOfLines={1}>{item.model}</Text>
              <Text style={styles.sizes}>
                {item.prices.map(p => `US ${p.size} × ${p.quantity}`).join('  ·  ')}
              </Text>
            </View>
            <Text style={styles.itemPrice}>${item.ItemPrice}</Text>
          </PressableScale>
        ))}
      </View>
    </View>
  );
};

export default OrderHistoryCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    gap: SPACING.sm,
  },
  header: {flexDirection: 'row', alignItems: 'center', gap: SPACING.sm},
  badge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  status: {fontFamily: FONTFAMILY.semibold, fontSize: FONTSIZE.md, color: COLORS.text},
  date: {fontFamily: FONTFAMILY.regular, fontSize: FONTSIZE.xs, color: COLORS.textMuted},
  total: {fontFamily: FONTFAMILY.bold, fontSize: FONTSIZE.lg, color: COLORS.text},
  orderId: {fontFamily: FONTFAMILY.medium, fontSize: FONTSIZE.xs, color: COLORS.textFaint, letterSpacing: 0.6},
  items: {gap: SPACING.xs},
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    backgroundColor: COLORS.surfaceRaised,
    borderRadius: RADIUS.md,
    padding: SPACING.xs,
  },
  thumb: {width: 52, height: 52, borderRadius: RADIUS.sm},
  model: {fontFamily: FONTFAMILY.semibold, fontSize: FONTSIZE.sm, color: COLORS.text},
  sizes: {fontFamily: FONTFAMILY.regular, fontSize: FONTSIZE.xs, color: COLORS.textMuted, marginTop: 2},
  itemPrice: {fontFamily: FONTFAMILY.semibold, fontSize: FONTSIZE.sm, color: COLORS.text, marginRight: SPACING.xxs},
});
