import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { COLORS, SPACING } from '../Constants/theme'

const profilePic = require('../assets/app_images/avatar.jpg')

const ProfilePic = () => {
  return (
    <View style={styles.imageContainer}>
     <Image 
     source={profilePic}
     style={styles.image}/>
    </View>
  )
}


const styles = StyleSheet.create({
    imageContainer: {
        height: SPACING.space_36,
        width: SPACING.space_36,
        borderRadius: SPACING.space_12,
        borderWidth: 2,
        borderColor: COLORS.secondaryDarkGreyHex,
        alignItems: 'center',
        overflow: 'hidden'
    },
    image: {
        height: SPACING.space_36,
        width: SPACING.space_36,
    }
})


export default ProfilePic
