import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    Image,
  } from 'react-native';
  import React, {useState} from 'react';
import GradientBGIcon from './GradientBGIcon ';
  import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../Constants/theme'
  
  const backIcon = require('../assets/icons/left.png');
  const favouriteIcon = require('../assets/icons/heart.png');
  const shoeIcon = require('../assets/icons/shoes.png');
  const ratingIcon = require('../assets/icons/star.png')
  
  const ImageBackgroundInfo = ({
    EnableBackHandler,
    imagelink_portrait,
    type,
    id,
    favourite,
    name,
    average_rating,
    ratings_count,
    BackHandler,
    ToggleFavourite,
  }) => {
    return (
      <View>
        <ImageBackground
          source={imagelink_portrait}
          style={styles.itemBackgroundImage}>
          {EnableBackHandler ? (
            <View style={styles.imageHeaderBarContainerWithBack}>
              <TouchableOpacity
                onPress={() => {
                  BackHandler();
                }}
                style={{
                  borderWidth: 2,
                  borderColor: COLORS.secondaryDarkGreyHex,
                  borderRadius: SPACING.space_12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: COLORS.secondaryDarkGreyHex,
                  overflow: 'hidden',
                  height: SPACING.space_36,
                  width: SPACING.space_36,
                }}>
                <Image
                  source={backIcon}
                  style={{
                    height: SPACING.space_18,
                    width: SPACING.space_18,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  tintColor={COLORS.primaryLightGreyHex}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  ToggleFavourite(favourite, type, id);
                }}
                style={{
                  borderWidth: 2,
                  borderColor: COLORS.secondaryDarkGreyHex,
                  borderRadius: SPACING.space_12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: COLORS.secondaryDarkGreyHex,
                  overflow: 'hidden',
                  height: SPACING.space_36,
                  width: SPACING.space_36,
                }}>
                <Image
                  source={favouriteIcon}
                  style={{
                    height: SPACING.space_18,
                    width: SPACING.space_18,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  tintColor={
                    favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex
                  }
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.imageHeaderBarContainerWithoutBack}>
              <TouchableOpacity
                onPress={() => {
                  ToggleFavourite(favourite, type, id);
                  setFavourite(!favourite)
                }}
                style={{
                  borderWidth: 2,
                  borderColor: COLORS.secondaryDarkGreyHex,
                  borderRadius: SPACING.space_12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: COLORS.secondaryDarkGreyHex,
                  overflow: 'hidden',
                  height: SPACING.space_36,
                  width: SPACING.space_36,
                }}>
                <Image
                  source={favouriteIcon}
                  style={{
                    height: SPACING.space_18,
                    width: SPACING.space_18,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  tintColor={
                    favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex
                  }
                />
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.imageInfoOuterContainer}>
            <View style={styles.imageInfoInnerContainer}>
                <View>
                  <Text style={styles.itemTitleText}>{name}</Text>
                </View>
          
              <View style={styles.itemPropertiesContainer}>
                <View style={styles.propertyFirst}>
                  <Image
                    source={shoeIcon}
                    style={{
                      height: FONTSIZE.size_28,
                      width: FONTSIZE.size_28,
                    }}
                  />
                  <Text
                    style={[
                      styles.propertyTextFirst,
                      {marginTop: SPACING.space_8},
                    ]}>
                    {type}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.infoContainerRow}>
                  <View style={styles.ratingContainer}>
                      <Image 
                      source={ratingIcon}
                      style={{
                          height: 20,
                          width: 20,
                      }}
                      tintColor={COLORS.primaryOrangeHex}
                      />
                      <Text style={styles.ratingText}>{average_rating}</Text>
                      <Text style={styles.ratingCountText}>({ratings_count})</Text>
                  </View>
              </View>
          </View>
        </ImageBackground>
      </View>
    );
  };
  
  export default ImageBackgroundInfo;
  
  const styles = StyleSheet.create({
    itemBackgroundImage: {
      width: '100%',
      aspectRatio: 20 / 25,
      justifyContent: 'space-between',
    },
    imageHeaderBarContainerWithBack: {
      marginTop: SPACING.space_10,
      padding: SPACING.space_30,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    imageHeaderBarContainerWithoutBack: {
      padding: SPACING.space_30,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    imageInfoOuterContainer: {
      paddingVertical: SPACING.space_24,
      paddingHorizontal: SPACING.space_30,
      backgroundColor: COLORS.primaryBlackRGBA,
      borderTopLeftRadius: BORDERRADIUS.radius_20*2,
      borderTopRightRadius: BORDERRADIUS.radius_20*2,
    },
    imageInfoInnerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap:SPACING.space_15,
      // backgroundColor: 'red'
    },
    itemPropertiesContainer: {
      flexDirection: 'row',
    },
    itemTitleText: {
      fontFamily:FONTFAMILY.poppins_medium,
      fontSize: FONTSIZE.size_24,
      color: COLORS.primaryWhiteHex
    },
    propertyFirst: {
      height: 55,
      width: 55,
      borderRadius: BORDERRADIUS.radius_15,
      justifyContent:'center',
      alignItems: 'center',
      backgroundColor: COLORS.primaryBlackHex
    },
    propertyTextFirst: {
      fontFamily:FONTFAMILY.poppins_medium,
      fontSize: FONTSIZE.size_10,
      color: COLORS.primaryWhiteHex
    },
    ratingContainer: {
      flexDirection: 'row',
      gap: SPACING.space_10,
      alignItems:'center'
    },
    ratingText: {
      fontFamily: FONTFAMILY.poppins_semibold,
      fontSize: FONTSIZE.size_16,
      color: COLORS.primaryWhiteHex
    },
    ratingCountText: {
      fontFamily: FONTFAMILY.poppins_regular,
      fontSize: FONTSIZE.size_12,
      color: COLORS.primaryWhiteHex
    }
  });
  
  