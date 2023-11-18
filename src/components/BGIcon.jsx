import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BORDERRADIUS, SPACING } from '../Constants/theme'



const BGIcon = ({name, color, size, BGColor}) => {
  return (
    <View style={[styles.iconBG, {backgroundColor: BGColor }]}>
      <Image 
      source={name}
      style={{
        height: size,
        width: size
      }}
      tintColor={color}
      />

    </View>
  )
}

export default BGIcon

const styles = StyleSheet.create({
    iconBG: {
        height: SPACING.space_30,
        width: SPACING.space_30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: BORDERRADIUS.radius_8
    }
})
