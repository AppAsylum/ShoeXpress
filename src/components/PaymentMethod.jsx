import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../Constants/theme';

const walletIcon = require('../assets/icons/wallet.png');

const PaymentMethod = ({paymentMode, name, icon, isIcon}) => {
  return (
    <View
      style={[
        styles.paymentCardContainer,
        {
          borderColor:
            paymentMode == name
              ? COLORS.primaryOrangeHex
              : COLORS.primaryGreyHex,
        },
      ]}>
      {isIcon ? (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.linearGradientWallet}>
          <View style={styles.walletRow}>
            <Image
              source={walletIcon}
              style={{
                height: SPACING.space_30,
                width: SPACING.space_30,
              }}
              tintColor={COLORS.primaryOrangeHex}
            />
            <Text style={styles.paymentTitle}>{name}</Text>
          </View>
          <Text style={styles.paymentPrice}> $ 100.5</Text>
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.linearGradientRegular}>
          <Image source={icon} style={styles.paymentImage} />
          <Text style={styles.paymentTitle}>{name}</Text>
        </LinearGradient>
      )}
    </View>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({
  paymentCardContainer: {
    borderRadius: BORDERRADIUS.radius_15 * 2,
    backgroundColor: COLORS.primaryGreyHex,
    borderWidth: 3,
  },
  linearGradientWallet: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.space_12,
    paddingHorizontal: SPACING.space_24,
    gap: SPACING.space_24,
    borderRadius: BORDERRADIUS.radius_15*2
  },
  walletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_24
  },
  linearGradientRegular: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.space_12,
    paddingHorizontal: SPACING.space_24,
    gap: SPACING.space_24,
    borderRadius: BORDERRADIUS.radius_15*2
  },
  paymentTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex
  },
  paymentPrice: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex
  },
  paymentImage: {
    height: SPACING.space_30,
    width: SPACING.space_30
  }
});

