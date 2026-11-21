import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import TabNavigator from './TabNavigator';
import DetailsScreen from '../screens/DetailsScreen';
import PaymentScreen from '../screens/PaymentScreen';
import CreditsScreen from '../screens/CreditsScreen';
import {COLORS} from '../Constants/theme';

const Stack = createNativeStackNavigator();

const AppNavigator = ({initialRouteName = 'Welcome'}) => (
  <Stack.Navigator
    initialRouteName={initialRouteName}
    screenOptions={{
      headerShown: false,
      animation: 'slide_from_right',
      contentStyle: {backgroundColor: COLORS.bg},
    }}>
    <Stack.Screen name="Welcome" component={WelcomeScreen} options={{animation: 'fade'}} />
    <Stack.Screen name="SignUp" component={SignUpScreen} options={{animation: 'fade'}} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <Stack.Screen name="Tab" component={TabNavigator} options={{animation: 'fade'}} />
    <Stack.Screen name="Details" component={DetailsScreen} options={{animation: 'fade_from_bottom'}} />
    <Stack.Screen name="Payment" component={PaymentScreen} />
    <Stack.Screen name="Credits" component={CreditsScreen} />
  </Stack.Navigator>
);

export default AppNavigator;
