import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../Constants/theme';
import GradientBGIcon from './GradientBGIcon ';
import ProfilePic from './ProfilePic';




const HeaderBar = ({title}) => {
  return (
    <View style={styles.headerContainer}>
        <GradientBGIcon name='menu' color={COLORS.primaryLightGreyHex} size={FONTSIZE.size_16}/>
      <Text style={styles.headerText}>{title}</Text>
      <ProfilePic />
    </View>
  )
}

export default HeaderBar

const styles = StyleSheet.create({
    headerContainer: {
        padding: SPACING.space_20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerText: {
        fontFamily: FONTFAMILY.poppins_extrabold,
        fontSize: FONTSIZE.size_20,
        color: COLORS.primaryWhiteHex
    }
})
