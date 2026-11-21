import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {StatusBar} from 'expo-status-bar';
import {useStore} from '../store/store';
import ScreenHeader from '../components/ui/ScreenHeader';
import EmptyState from '../components/ui/EmptyState';
import OrderHistoryCard from '../components/OrderHistoryCard';
import {COLORS, SPACING} from '../Constants/theme';

const OrderHistoryScreen = ({navigation}) => {
  const orders = useStore(s => s.OrderHistoryLists);
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <StatusBar style="light" />
      <ScreenHeader
        title="Orders"
        subtitle={orders.length ? `${orders.length} ${orders.length === 1 ? 'order' : 'orders'} placed` : undefined}
      />
      {orders.length === 0 ? (
        <EmptyState
          icon="receipt-outline"
          title="No orders yet"
          subtitle="When you check out, your orders and receipts will appear here."
          actionTitle="Browse shoes"
          onAction={() => navigation.navigate('Home')}
        />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(o, i) => o.orderId || String(i)}
          contentContainerStyle={{paddingHorizontal: SPACING.lg, paddingBottom: tabBarHeight + SPACING.xl, gap: SPACING.md}}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <OrderHistoryCard
              order={item}
              onItemPress={shoe => navigation.push('Details', {index: shoe.index, id: shoe.id, type: shoe.type})}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default OrderHistoryScreen;

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: COLORS.bg},
});
