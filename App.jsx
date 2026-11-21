import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import {useFonts} from 'expo-font';
import {Ionicons} from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import AppNavigator from './src/navigations/AppNavigator';
import LaunchScreen from './src/screens/LaunchScreen';
import {useStore} from './src/store/store';
import {COLORS, FONTFAMILY, RADIUS, SPACING} from './src/Constants/theme';

// Keep the native splash up until fonts and saved data are ready.
SplashScreen.preventAutoHideAsync().catch(() => {});

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: COLORS.accent,
    background: COLORS.bg,
    card: COLORS.bg,
    text: COLORS.text,
    border: COLORS.border,
  },
};

const ToastCard = ({text1, text2, icon = 'checkmark'}) => (
  <View style={styles.toast}>
    <View style={styles.toastIcon}>
      <Ionicons name={icon} size={16} color={COLORS.onAccent} />
    </View>
    <View style={{flex: 1}}>
      <Text style={styles.toastTitle}>{text1}</Text>
      {text2 ? <Text style={styles.toastBody} numberOfLines={1}>{text2}</Text> : null}
    </View>
  </View>
);

const toastConfig = {
  cart: props => <ToastCard {...props} icon="bag-check" />,
  success: props => <ToastCard {...props} />,
};

const useHydrated = () => {
  const [hydrated, setHydrated] = useState(useStore.persist.hasHydrated());
  useEffect(() => {
    const unsub = useStore.persist.onFinishHydration(() => setHydrated(true));
    setHydrated(useStore.persist.hasHydrated());
    return unsub;
  }, []);
  return hydrated;
};

const App = () => {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./src/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('./src/assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('./src/assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('./src/assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('./src/assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-Black': require('./src/assets/fonts/Poppins-Black.ttf'),
    ...Ionicons.font,
  });
  const hydrated = useHydrated();
  const hasOnboarded = useStore(s => s.hasOnboarded);
  const [launchDone, setLaunchDone] = useState(false);
  const ready = fontsLoaded && hydrated;

  const onLayout = useCallback(() => {
    if (ready) SplashScreen.hideAsync().catch(() => {});
  }, [ready]);

  if (!ready) return null;

  return (
    <SafeAreaProvider>
      <View style={styles.root} onLayout={onLayout}>
        <StatusBar style="light" />
        <NavigationContainer theme={navTheme}>
          <AppNavigator initialRouteName={hasOnboarded ? 'Login' : 'Welcome'} />
        </NavigationContainer>
        <Toast config={toastConfig} topOffset={56} />
        {!launchDone && <LaunchScreen onDone={() => setLaunchDone(true)} />}
      </View>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: COLORS.bg},
  toast: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    padding: SPACING.sm,
    paddingRight: SPACING.md,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surfaceRaised,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 16,
    shadowOffset: {width: 0, height: 8},
    elevation: 10,
  },
  toastIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toastTitle: {fontFamily: FONTFAMILY.semibold, fontSize: 14, color: COLORS.text},
  toastBody: {fontFamily: FONTFAMILY.regular, fontSize: 12, color: COLORS.textMuted},
});
