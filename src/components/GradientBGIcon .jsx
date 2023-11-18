import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SPACING } from '../Constants/theme';



const gradientBgIcon = require('../assets/icons/linearBg.png')

const GradientBGIcon = ({name,color,size}) => {
  return (
    <View style={styles.container}> 
      <LinearGradient 
      start={{x:0, y: 0}}
      end={{x:1, y: 1}}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      style={styles.linearGradientBg}>
        <Image 
        tintColor={COLORS.primaryLightGreyHex}
        source={gradientBgIcon}
        style={{
            height: size,
            width: size
        }}
        />
      </LinearGradient>
    </View>
  )
}

export default GradientBGIcon

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: COLORS.secondaryDarkGreyHex,
        borderRadius: SPACING.space_12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.secondaryDarkGreyHex,
        overflow: 'hidden'
    },
    linearGradientBg: {
        height: SPACING.space_36,
        width: SPACING.space_36,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
