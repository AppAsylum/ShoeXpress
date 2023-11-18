import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen ';
import FavoritesScreen from '../screens/FavoritesScreen';
import CartScreen from '../screens/CartScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen ';
import { COLORS } from '../Constants/theme';



const Tab = createBottomTabNavigator();
const homeIcon = require('../assets/icons/home.png')
const bagIcon = require('../assets/icons/bag.png')
const favoriteIcon = require('../assets/icons/heart.png')
const orderHistoryIcon = require('../assets/icons/notification.png')

const TabNavigator = () => {
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
      }}
    >
      <Tab.Screen name='Home' 
      component={HomeScreen} 
      options={{
        tabBarIcon: ({focused, color, size}) => (
  
            <Image source={homeIcon} style={{height: 28, width: 28,}} tintColor={focused? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}/>
        )
      }}></Tab.Screen>
      <Tab.Screen 
       options={{
        tabBarIcon: ({focused, color, size}) => (
  
            <Image source={bagIcon} style={{height: 28, width: 28,}} tintColor={focused? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}/>
        )
      }}
      name='Cart' 
      component={CartScreen}></Tab.Screen>
      <Tab.Screen 
       options={{
        tabBarIcon: ({focused, color, size}) => (
  
            <Image source={favoriteIcon} style={{height: 28, width: 28,}} tintColor={focused? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}/>
        )
      }}
      name='Favorite' component={FavoritesScreen}></Tab.Screen>
      <Tab.Screen
       options={{
        tabBarIcon: ({focused, color, size}) => (
  
            <Image source={orderHistoryIcon} style={{height: 28, width: 28,}} tintColor={focused? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}/>
        )
      }}
      name='History' component={OrderHistoryScreen}></Tab.Screen>
    </Tab.Navigator>
   
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.9)',
    borderTopWidth: 0,
    elevation: 0,
    borderColor: 'transparent',
  },
});

