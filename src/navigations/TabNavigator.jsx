import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BlurView} from 'expo-blur';
import {Ionicons} from '@expo/vector-icons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import CartScreen from '../screens/CartScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import {useStore} from '../store/store';
import {COLORS, FONTFAMILY} from '../Constants/theme';

const Tab = createBottomTabNavigator();

const ICONS = {
  Home: ['home', 'home-outline'],
  Cart: ['bag-handle', 'bag-handle-outline'],
  Favorite: ['heart', 'heart-outline'],
  History: ['receipt', 'receipt-outline'],
};
const LABELS = {Home: 'Home', Cart: 'Cart', Favorite: 'Saved', History: 'Orders'};

const TabIcon = ({route, focused, color}) => (
  <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
    <Ionicons name={ICONS[route.name][focused ? 0 : 1]} size={22} color={color} />
  </View>
);

const TabNavigator = () => {
  const insets = useSafeAreaInsets();
  const cartCount = useStore(s => s.CartList.reduce((n, i) => n + i.prices.reduce((m, p) => m + p.quantity, 0), 0));

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarLabel: LABELS[route.name],
        tabBarLabelStyle: styles.label,
        tabBarIcon: props => <TabIcon route={route} {...props} />,
        tabBarStyle: [styles.bar, {height: 64 + insets.bottom, paddingBottom: insets.bottom}],
        tabBarItemStyle: styles.item,
        tabBarBackground: () =>
          Platform.OS === 'ios' ? (
            <BlurView tint="dark" intensity={60} style={StyleSheet.absoluteFill} />
          ) : (
            <View style={[StyleSheet.absoluteFill, {backgroundColor: 'rgba(11,11,13,0.96)'}]} />
          ),
        sceneStyle: {backgroundColor: COLORS.bg},
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarBadge: cartCount > 0 ? cartCount : undefined,
          tabBarBadgeStyle: styles.badge,
        }}
      />
      <Tab.Screen name="Favorite" component={FavoritesScreen} />
      <Tab.Screen name="History" component={OrderHistoryScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.border,
    backgroundColor: 'transparent',
    elevation: 0,
  },
  item: {paddingTop: 8},
  label: {fontFamily: FONTFAMILY.medium, fontSize: 11, marginTop: 2},
  iconWrap: {width: 48, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center'},
  iconWrapActive: {backgroundColor: COLORS.accentSoft},
  badge: {
    backgroundColor: COLORS.accent,
    color: COLORS.onAccent,
    fontFamily: FONTFAMILY.bold,
    fontSize: 10,
    minWidth: 18,
    height: 18,
    lineHeight: 18,
  },
});
