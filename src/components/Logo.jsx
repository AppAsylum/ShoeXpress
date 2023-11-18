import {StyleSheet, Text, View, Dimensions, ImageBackground, Image} from 'react-native';
import React from 'react';
import { BORDERRADIUS } from '../Constants/theme';

const {width, height} = Dimensions.get('window');
// console.log(`Screen Width: ${width}`);
// console.log(`Screen Height: ${height}`);
const backgroundLogo = require('../assets/app_images/shoeLogo.png')

const Logo = () => {
  return (
    <View style={styles.container}>
      <Image 
      source={backgroundLogo}
      resizeMode='cover'
      style={styles.logoContainer}
      />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logoContainer: {
    height: 100,
    width: 100,
    borderRadius: BORDERRADIUS.radius_10
  },
});