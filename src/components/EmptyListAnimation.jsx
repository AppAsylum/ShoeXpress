import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../Constants/theme';

const shoeIcon = require('../assets/icons/shoes.png');

const EmptyListAnimation = ({title}) => {
  return (
    <View style={styles.EmptyCartContainer}>
      <View style={styles.iconContainer}>
        <Image
          source={shoeIcon}
          style={styles.icon}
          tintColor={COLORS.primaryOrangeHex}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.animatedText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  EmptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  iconContainer: {
    height: 150,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: COLORS.primaryDarkGreyHex,
  },
  icon: {
    height: 72,
    width: 72,
  },
  animatedText: {
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryOrangeHex,
    textAlign: 'center',
  },
});

export default EmptyListAnimation;
