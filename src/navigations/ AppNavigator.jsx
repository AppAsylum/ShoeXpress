import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from '../screens/ DetailsScreen';
import PaymentScreen from '../screens/PaymentScreen ';
import TabNavigator from './TabNavigator ';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();


const AppNavigator = () => {
  return (
    <Stack.Navigator 
    screenOptions={{headerShown: false}}
    >
       <Stack.Screen name='SignUp' 
        component={SignUpScreen} 
        options={{animation: 'slide_from_bottom'}} ></Stack.Screen>
       <Stack.Screen name='Login' 
        component={LoginScreen} 
        options={{animation: 'slide_from_bottom'}} ></Stack.Screen>
        <Stack.Screen name='Tab' 
        component={TabNavigator} 
        options={{animation: 'slide_from_bottom'}} ></Stack.Screen>
        <Stack.Screen name='Details' 
        component={DetailsScreen} 
        options={{animation: 'slide_from_bottom'}} ></Stack.Screen>
        <Stack.Screen name='Payment' 
        component={PaymentScreen} 
        options={{animation: 'slide_from_bottom'}} ></Stack.Screen>
    </Stack.Navigator>
  )
}

export default AppNavigator

