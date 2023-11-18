import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../Constants/theme';

const decrementIcon = require('../assets/icons/minus.png');
const incrementIcon = require('../assets/icons/plus.jpg')

// Import statements

const CartItem = ({
  id,
  name,
  imagelink_square,
  prices,
  type,
  incrementCartItemQuantity, // Updated prop name
  decrementCartItemQuantity,
}) => {
  const isMultiplePrices = prices.length !== 1;

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[
        isMultiplePrices
          ? COLORS.primaryGreyHex
          : COLORS.primaryLightGreyHex,
        COLORS.primaryBlackHex,
      ]}
      style={styles.cartItemLinearGradient}
    >
      <View style={styles.cartItemRow}>
        <Image source={imagelink_square} style={styles.cartItemImage} />
        <View style={styles.cartItemInfo}>
          <View>
            <Text style={styles.cartItemTitle}>{name}</Text>
          </View>
        </View>
      </View>
      {prices.map((data, index) => (
        <View
          key={index.toString()}
          style={styles.cartItemSizeRowContainer}
        >
          <View style={styles.cartItemSizeValueContainer}>
            <View style={styles.sizeBox}>
              <Text
                style={[
                  styles.sizeText,
                  {
                    fontSize: type === 'Shoe' ? FONTSIZE.size_16 : null,
                  },
                ]}
              >
                {data.size}
              </Text>
            </View>

            <View style={{ position: 'relative', right: -10 }}>
              <Text style={styles.sizeCurrency}>
                {data.currency}
                <Text style={styles.sizePrice}>{data.price}</Text>
              </Text>
            </View>
          </View>
          <View style={styles.cartItemSizeValueContainer2}>
            <TouchableOpacity
              onPress={() => {
                decrementCartItemQuantity(id, data.size);
              }}
              style={styles.cartItemIcon}
            >
              <Image
                source={decrementIcon}
                style={{
                  height: FONTSIZE.size_10,
                  width: FONTSIZE.size_10,
                }}
              />
            </TouchableOpacity>
            <View style={styles.cartQuantityContainer}>
              <Text style={styles.cardItemQuantityText}>
                {data.quantity}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                incrementCartItemQuantity(id, data.size);
              }}
              style={styles.cartItemIcon}
            >
              <Image
                source={incrementIcon}
                style={{
                  height: FONTSIZE.size_10,
                  width: FONTSIZE.size_10,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </LinearGradient>
  );
};

export default CartItem;

// StyleSheet.create and other constants...


const styles = StyleSheet.create({
  cartItemLinearGradient: {
    flex: 1,
    gap: SPACING.space_12,
    padding: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_25,
  },
  cartItemRow: {
    flexDirection: 'row',
    gap: SPACING.space_12,
    flex: 1,
  },
  cartItemImage: {
    height: 130,
    width: 130,
    borderRadius: BORDERRADIUS.radius_20,
  },
  cartItemInfo: {
    flex: 1,
    paddingVertical: SPACING.space_4,
    justifyContent: 'space-between',
  },
  cartItemTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  cartItemSizeRowContainer: {
    flex: 1,
    alignItems: 'center',
    gap: SPACING.space_20,
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: 'red'
  },
  cartItemSizeValueContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cartItemSizeValueContainer2: {
    flex: 0.98,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingBottom: 5,
    // backgroundColor: 'yellow'
  },
  sizeBox: {
    backgroundColor: COLORS.primaryBlackHex,
    height: 40,
    width: 100,
    borderRadius: BORDERRADIUS.radius_10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
  sizeCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryOrangeHex,
    fontSize: FONTSIZE.size_18
  },
  sizePrice: {
    color: COLORS.primaryWhiteHex,
  },
  cartItemIcon: {
    backgroundColor: COLORS.primaryOrangeHex,
    padding: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_10,
    width: 35
  },
  cartQuantityContainer: {
    flex: 0.7,
    backgroundColor: COLORS.primaryBlackHex,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
    borderColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    paddingVertical: SPACING.space_4,
  },
  cardItemQuantityText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex
  }
});

