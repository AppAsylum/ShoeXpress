import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { COLORS } from '../Constants/theme';
import LottieView from 'lottie-react-native';

const PopUpAnimation = ({style, source}) => {
  return <View style={styles.animationContainer}>
    <LottieView style={style} source={source} autoPlay loop={false}/>
  </View>;
};

export default PopUpAnimation;

const styles = StyleSheet.create({
  animationContainer: {
    flex: 1, 
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: COLORS.secondaryBlackRGBA,
    justifyContent: 'center' 
},
});

