import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ImageBackgroundInfo from './ImageBackgroundInfo'
import LinearGradient from 'react-native-linear-gradient'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../Constants/theme'

const FavoritesItemCard = ({
    id,
    imagelink_portrait,
    name,
    type,
    average_rating,
    ratings_count,
    description,
    favourite,
    ToggleFavouriteItem
}) => {
  return (
    <View style={styles.cardContainer}>
      <ImageBackgroundInfo 
       EnableBackHandler={false}
       imagelink_portrait={imagelink_portrait}
       type={type}
       id={id}
       favourite={favourite}
       name={name}
       average_rating={average_rating}
       ratings_count={ratings_count}
       ToggleFavourite={ToggleFavouriteItem}
      />
      <LinearGradient 
      start={{ x: 0, y: 0 }}
      end={{x: 1, y: 1}}
      colors={[
        COLORS.primaryGreyHex,
        COLORS.primaryBlackHex
      ]}
      style={styles.containerLinearGradient}
      >
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.descriptionText}>{description}</Text>
      </LinearGradient>
    </View>
  )
}

export default FavoritesItemCard

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: BORDERRADIUS.radius_25,
        overflow: 'hidden'
    },
    containerLinearGradient: {
        gap: SPACING.space_10,
        padding: SPACING.space_20
    },
    descriptionTitle: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.secondaryLightGreyHex
    },
    descriptionText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex
    }
})
