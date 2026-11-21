import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {StatusBar} from 'expo-status-bar';
import * as Haptics from 'expo-haptics';
import {useStore} from '../store/store';
import ScreenHeader from '../components/ui/ScreenHeader';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';
import CartItem from '../components/CartItem';
import {COLORS, FONTFAMILY, FONTSIZE, RADIUS, SPACING} from '../Constants/theme';

const CartScreen = ({navigation}) => {
  const CartList = useStore(s => s.CartList);
  const CartPrice = useStore(s => s.CartPrice);
  const tabBarHeight = useBottomTabBarHeight();
  const count = CartList.reduce((n, i) => n + i.prices.reduce((m, p) => m + p.quantity, 0), 0);

  const change = (fn, id, size) => {
    const s = useStore.getState();
    s[fn](id, size);
    s.calculateCartPrice();
    Haptics.selectionAsync().catch(() => {});
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <StatusBar style="light" />
      <ScreenHeader
        title="Cart"
        subtitle={count ? `${count} ${count === 1 ? 'pair' : 'pairs'} ready to go` : undefined}
      />
      {CartList.length === 0 ? (
        <EmptyState
          icon="bag-handle-outline"
          title="Your cart is empty"
          subtitle="Find something you love and it will show up here."
          actionTitle="Start shopping"
          onAction={() => navigation.navigate('Home')}
        />
      ) : (
        <>
          <FlatList
            data={CartList}
            keyExtractor={i => i.id}
            contentContainerStyle={[styles.list, {paddingBottom: tabBarHeight + 200}]}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <CartItem
                item={item}
                onPress={() => navigation.push('Details', {index: item.index, id: item.id, type: item.type})}
                onIncrement={(id, size) => change('incrementCartItemQuantity', id, size)}
                onDecrement={(id, size) => change('decrementCartItemQuantity', id, size)}
              />
            )}
            ListFooterComponent={
              <View style={styles.summary}>
                <Row label="Subtotal" value={`$${CartPrice}`} />
                <Row label="Delivery" value="Free" accent />
                <View style={styles.divider} />
                <Row label="Total" value={`$${CartPrice}`} strong />
              </View>
            }
          />
          <View style={[styles.checkout, {bottom: tabBarHeight + SPACING.sm}]}>
            <View>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${CartPrice}</Text>
            </View>
            <Button
              title="Checkout"
              icon="arrow-forward"
              onPress={() => navigation.push('Payment', {amount: CartPrice})}
              style={{flex: 1}}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const Row = ({label, value, strong, accent}) => (
  <View style={styles.row}>
    <Text style={[styles.rowLabel, strong && styles.rowStrong]}>{label}</Text>
    <Text style={[styles.rowValue, strong && styles.rowStrong, accent && {color: COLORS.accent}]}>{value}</Text>
  </View>
);

export default CartScreen;

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: COLORS.bg},
  list: {paddingHorizontal: SPACING.lg, gap: SPACING.sm},
  summary: {
    marginTop: SPACING.sm,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.sm,
  },
  row: {flexDirection: 'row', justifyContent: 'space-between'},
  rowLabel: {fontFamily: FONTFAMILY.regular, fontSize: FONTSIZE.md, color: COLORS.textMuted},
  rowValue: {fontFamily: FONTFAMILY.medium, fontSize: FONTSIZE.md, color: COLORS.text},
  rowStrong: {fontFamily: FONTFAMILY.bold, fontSize: FONTSIZE.lg, color: COLORS.text},
  divider: {height: 1, backgroundColor: COLORS.border},
  checkout: {
    position: 'absolute',
    left: SPACING.lg,
    right: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.lg,
    padding: SPACING.sm,
    paddingLeft: SPACING.lg,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.surfaceRaised,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  totalLabel: {fontFamily: FONTFAMILY.regular, fontSize: FONTSIZE.xs, color: COLORS.textMuted},
  totalValue: {fontFamily: FONTFAMILY.bold, fontSize: FONTSIZE.xl, color: COLORS.text},
});
