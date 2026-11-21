import React from 'react';
import {StyleSheet} from 'react-native';
import {Image} from 'expo-image';
import {COLORS} from '../../Constants/theme';

// Product photo that fades in over a neutral placeholder instead of popping in.
const ShoeImage = ({source, style, transition = 250, contentFit = 'cover', ...rest}) => (
  <Image
    source={source}
    style={[styles.base, style]}
    contentFit={contentFit}
    transition={transition}
    cachePolicy="memory-disk"
    {...rest}
  />
);

export default ShoeImage;

const styles = StyleSheet.create({
  base: {backgroundColor: COLORS.surfaceRaised},
});
