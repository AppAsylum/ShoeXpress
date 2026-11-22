import React from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'expo-status-bar';
import {LogoTile} from './ui/Logo';
import {IconButton} from './ui/Button';
import {COLORS, SPACING, TYPE} from '../Constants/theme';

// Shared frame for sign up / login / forgot password.
const AuthLayout = ({title, subtitle, onBack, children, footer}) => (
  <SafeAreaView style={styles.screen}>
    <StatusBar style="light" />
    <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.top}>
          {onBack ? <IconButton icon="chevron-back" onPress={onBack} label="Go back" /> : <View />}
        </View>
        <LogoTile size={64} />
        <Text style={[TYPE.title, styles.title]}>{title}</Text>
        {subtitle ? <Text style={[TYPE.body, styles.subtitle]}>{subtitle}</Text> : null}
        <View style={styles.form}>{children}</View>
        <View style={{flex: 1}} />
        {footer ? <View style={styles.footer}>{footer}</View> : null}
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>
);

export default AuthLayout;

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: COLORS.bg},
  content: {flexGrow: 1, paddingHorizontal: SPACING.xl, paddingBottom: SPACING.xl},
  top: {height: 52, justifyContent: 'center', marginBottom: SPACING.md},
  title: {marginTop: SPACING.xl},
  subtitle: {marginTop: SPACING.xs},
  form: {marginTop: SPACING.xxl, gap: SPACING.lg},
  footer: {flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: SPACING.xxl},
});
