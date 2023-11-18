import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Logo from './Logo';
import { COLORS } from '../Constants/theme';

const AuthHeader = ({title, subTitle}) => {
  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.createAccount}>{title}</Text>
      <Text style={styles.accountText}>
        {subTitle}
      </Text>
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 255,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 16,
  },
  createAccount: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.primaryOrangeHex,
    marginTop: 30,
  },
  accountText: {
    textAlign: 'center',
    fontWeight: '500',
    color: COLORS.primaryWhiteHex
  },
});