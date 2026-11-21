import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'expo-status-bar';
import {useFonts} from 'expo-font';
import Toast from 'react-native-toast-message';
import AppNavigator from './src/navigations/AppNavigator';
import {COLORS} from './src/Constants/theme';

const App = () => {
  const [fontsLoaded] = useFonts({
    'Poppins-Black': require('./src/assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('./src/assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('./src/assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraLight': require('./src/assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('./src/assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('./src/assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('./src/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./src/assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Thin': require('./src/assets/fonts/Poppins-Thin.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.primaryBlackHex,
        }}>
        <ActivityIndicator color={COLORS.primaryOrangeHex} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
      <Toast />
    </SafeAreaProvider>
  );
};

export default App;
