import {
    Dimensions,
    ImageBackground,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
  } from 'react-native';
  import React from 'react';
  import LinearGradient from 'react-native-linear-gradient';
  import {
    BORDERRADIUS,
    COLORS,
    FONTFAMILY,
    FONTSIZE,
    SPACING,
  } from '../Constants/theme';
  import BGIcon from './BGIcon';
  import Toast from 'react-native-toast-message';
  import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
  
  const CARD_WIDTH = Dimensions.get('window').width * 0.32;
  
  const starIcon = require('../assets/icons/star.png');
  const addIcon = require('../assets/icons/plus.jpg');
  
  const ShoeCard = ({
    id,
    name,
    index,
    type,
    imagelink_square,
    average_rating,
    price,
    buttonPressHandler,
  }) => {
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={[styles.cardLinearGradientContainer]}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
        <ImageBackground
          source={imagelink_square}
          style={styles.cardImageBG}
          resizeMode="cover">
          <View style={styles.cardRatingContainer}>
            <Image
              source={starIcon}
              style={{
                height: FONTSIZE.size_16,
                width: FONTSIZE.size_16,
              }}
              tintColor={COLORS.primaryOrangeHex}
            />
            <Text style={styles.cartRatingText}>{average_rating}</Text>
          </View>
        </ImageBackground>
        <Text style={styles.cartTitle}>{name}</Text>
        <View style={styles.cardFooterRow}>
          <Text style={styles.cardPriceCurrency}>
            $<Text style={styles.cardPrice}>{price.price}</Text>
          </Text>
          <TouchableOpacity
            onPress={() => {
              Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Success',
                text2: `${name} is Added to Cart`,
                visibilityTime: 2000, // Duration of the toast message in milliseconds
                autoHide: true, // Automatically hide the toast after visibilityTime
                topOffset: 30, // Adjust the vertical position from the top
                bottomOffset: 40, // Adjust the vertical position from the bottom
                textStyle: {
                  fontSize: 16,
                  fontWeight: 'bold',
                },
                backgroundColor: '#3CB371', // Background color of the toast
              });
              buttonPressHandler({
                id,
                index,
                type,
                imagelink_square,
                name,
                prices: [{...price, quantity: 1}],
              });
            }}>
            <BGIcon
              color={COLORS.primaryWhiteHex}
              name={addIcon}
              BGColor={COLORS.primaryOrangeHex}
              size={FONTSIZE.size_10}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  };
  
  export default ShoeCard;
  
  const styles = StyleSheet.create({
    cardLinearGradientContainer: {
      padding: SPACING.space_18,
      borderRadius: BORDERRADIUS.radius_25,
    },
    cardImageBG: {
      width: CARD_WIDTH,
      height: CARD_WIDTH,
      borderRadius: BORDERRADIUS.radius_20,
      marginBottom: SPACING.space_15,
      overflow: 'hidden',
      // margin: 20,
    },
    cardRatingContainer: {
      flexDirection: 'row',
      backgroundColor: COLORS.primaryBlackRGBA,
      alignItems: 'center',
      justifyContent: 'center',
      gap: SPACING.space_10,
      paddingHorizontal: SPACING.space_15,
      position: 'absolute',
      borderBottomLeftRadius: BORDERRADIUS.radius_20,
      borderTopRightRadius: BORDERRADIUS.radius_20,
      top: 0,
      right: 0,
    },
    cartRatingText: {
      fontFamily: FONTFAMILY.poppins_medium,
      lineHeight: 22,
      fontSize: FONTSIZE.size_14,
      color: COLORS.primaryWhiteHex,
    },
    cartTitle: {
      fontFamily: FONTFAMILY.poppins_medium,
      fontSize: FONTSIZE.size_16,
      color: COLORS.primaryWhiteHex,
    },
    cardFooterRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: SPACING.space_15,
    },
    cardPriceCurrency: {
      fontFamily: FONTFAMILY.poppins_semibold,
      color: COLORS.primaryOrangeHex,
      fontSize: FONTSIZE.size_18,
    },
    cardPrice: {
      color: COLORS.primaryWhiteHex,
    },
  });
  
  