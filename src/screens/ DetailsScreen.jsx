import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    TouchableOpacity,
  } from 'react-native';
  import React, {useState} from 'react';
  import {useStore} from '../store/store';
  import {
    COLORS,
    FONTFAMILY,
    FONTSIZE,
    SPACING,
    BORDERRADIUS,
  } from '../Constants/theme';
  import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
  import PaymentFooter from '../components/PaymentFooter';
  
  const DetailsScreen = ({navigation, route}) => {
    const ItemOfIndex = useStore(state =>
      route.params.type == 'Shoe' ? state.ShoeList : null,
    )[route.params.index];
  
    const addToFavoriteList = useStore(state => state.addToFavoriteList);
    const deleteFromFavoriteList = useStore(
      state => state.deleteFromFavoriteList,
    );
  
    const addToCart = useStore(state => state.addToCart);
    const calculateCartPrice = useStore(state => state.calculateCartPrice);
  
    const [price, setPrice] = useState(ItemOfIndex.prices[0]);
    const [fullDesc, setFullDesc] = useState(false);
  
    const ToggleFavorite = (favourite, type, id) => {
      favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
    };
  
    const BackHandler = () => {
      navigation.pop();
    };
  
  
  
    const addToCartHandler =({
      id,
      index,
      name,
      imagelink_square,
      type,
      price,
    }) => {
      console.log('Adding to cart:', { id, index, name, type, price });
      addToCart({
        id,
        index,
        name,
        imagelink_square,
        type,
        prices: [{...price, quantity: 1}],
      });
      calculateCartPrice();
      navigation.navigate('Cart');
    }
  
  
    return (
      <View style={styles.screenContainer}>
        <StatusBar backgroundColor={COLORS.primaryBlackHex} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewFlex}>
          <ImageBackgroundInfo
            EnableBackHandler={true}
            imagelink_portrait={ItemOfIndex.imagelink_portrait}
            type={ItemOfIndex.type}
            id={ItemOfIndex.id}
            favourite={ItemOfIndex.favourite}
            name={ItemOfIndex.name}
            average_rating={ItemOfIndex.average_rating}
            ratings_count={ItemOfIndex.ratings_count}
            BackHandler={BackHandler}
            ToggleFavourite={ToggleFavorite}
          />
          <View style={styles.footerInfoArea}>
            <Text style={styles.infoTitle}>Description</Text>
            {fullDesc ? (
              <TouchableWithoutFeedback
                onPress={() => {
                  setFullDesc(prev => !prev);
                }}>
                <Text style={styles.descriptionText}>
                  {ItemOfIndex.description}
                </Text>
              </TouchableWithoutFeedback>
            ) : (
              <TouchableWithoutFeedback
                onPress={() => {
                  setFullDesc(prev => !prev);
                }}>
                <Text numberOfLines={3} style={styles.descriptionText}>
                  {ItemOfIndex.description}
                </Text>
              </TouchableWithoutFeedback>
            )}
            <Text style={styles.infoTitle}>Size</Text>
            <View style={styles.sizeOuterContainer}>
              {ItemOfIndex.prices.map(data => (
                <TouchableOpacity
                  key={data.size}
                  onPress={() => {
                    setPrice(data)
                  }}
                  style={[
                    styles.sizeBox,
  
                    {
                      borderColor:
                        data.size === price.size
                          ? COLORS.primaryOrangeHex
                          : COLORS.primaryDarkGreyHex,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.sizeText,
                      {
                        fontSize:
                          ItemOfIndex.type === 'Shoe'
                            ? FONTSIZE.size_14
                            : FONTSIZE.size_16,
                        color:
                          data.size === price.size
                            ? COLORS.primaryOrangeHex
                            : COLORS.secondaryLightGreyHex,
                      },
                    ]}>
                    {data.size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <PaymentFooter 
          price={price}
          buttonTitle='Add to Cart'
          buttonPressHandler={() => {
            addToCartHandler({
              id: ItemOfIndex.id,
              index: ItemOfIndex.index,
              name: ItemOfIndex.name,
              imagelink_square: ItemOfIndex.imagelink_square,
              type: ItemOfIndex.type,
              price: price
            })
          }}
          />
        </ScrollView>
      </View>
    );
  };
  
  export default DetailsScreen;
  
  const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: COLORS.primaryBlackHex,
    },
    scrollViewFlex: {
      flexGrow: 1,
      justifyContent: 'space-between'
    },
    footerInfoArea: {
      padding: SPACING.space_20,
    },
    descriptionText: {},
    infoTitle: {
      fontFamily: FONTFAMILY.poppins_semibold,
      fontSize: FONTSIZE.size_16,
      color: COLORS.primaryWhiteHex,
      marginBottom: SPACING.space_10,
    },
    descriptionText: {
      letterSpacing: 0.5,
      fontFamily: FONTFAMILY.poppins_regular,
      fontSize: FONTSIZE.size_14,
      color: COLORS.primaryWhiteHex,
      marginBottom: SPACING.space_10,
    },
    sizeOuterContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: SPACING.space_20,
    },
    sizeBox: {
      flex: 1,
      backgroundColor: COLORS.primaryDarkGreyHex,
      alignItems: 'center',
      justifyContent: 'center',
      height: SPACING.space_24 * 2,
      borderRadius: BORDERRADIUS.radius_10,
      borderWidth: 2,
    },
    sizeText: {
      fontFamily: FONTFAMILY.poppins_medium,
    },
  });
  
  