import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    ScrollView,
    TouchableOpacity,
  } from 'react-native';
  import React from 'react';
  import {useStore} from '../store/store';
  import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
  import {COLORS, SPACING} from '../Constants/theme';
  import HeaderBar from '../components/HeaderBar';
  import EmptyListAnimation from '../components/EmptyListAnimation';
  import PaymentFooter from '../components/PaymentFooter';
  import CartItem from '../components/CartItem';
  
  const CartScreen = ({navigation, route}) => {
    const CartList = useStore(state => state.CartList);
    const CartPrice = useStore(state => state.CartPrice);
    const incrementCartItemQuantity = useStore(
      state => state.incrementCartItemQuantity,
    );
    const decrementCartItemQuantity = useStore(
      state => state.decrementCartItemQuantity,
    );
    const calculateCartPrice = useStore(state => state.calculateCartPrice);
  
    const tabBarHeight = useBottomTabBarHeight();
  
    const buttonPressHandler = () => {
      navigation.push('Payment', {amount: CartPrice});
    };
  
    const incrementCartItemQuantityHandler = (id, size) => {
      incrementCartItemQuantity(id, size);
      calculateCartPrice();
    };
  
    const decrementCartItemQuantityHandler = (id, size) => {
      decrementCartItemQuantity(id, size);
      calculateCartPrice();
    };
  
  
    return (
      <SafeAreaView style={styles.screenContainer}>
        <StatusBar backgroundColor={COLORS.primaryBlackHex} />
        <ScrollView
          showsVerticalScrollIndicator
          contentContainerStyle={styles.scrollViewFlex}>
          <View
            style={[styles.scrollViewInnerView, {marginBottom: tabBarHeight}]}>
            <View style={styles.itemContainer}>
              <HeaderBar title="Cart" />
  
              {CartList.length == 0 ? (
                <EmptyListAnimation title={'Cart is Empty'} />
              ) : (
                <View style={styles.listItemContainer}>
                  {CartList.map((data) => (
                    <TouchableOpacity
                    onPress={() => {
                      navigation.push('Details', {
                        index: data.index,
                        id: data.id,
                        type: data.type,
                      });
                    }}
                      key={data.id}>
                        <CartItem 
                          id={data.id}
                          name={data.name}
                          imagelink_square={data.imagelink_square}
                          prices={data.prices}
                          type={data.type}
                          incrementCartItemQuantity={
                            incrementCartItemQuantityHandler
                          }
                          decrementCartItemQuantity={
                            decrementCartItemQuantityHandler
                          }
                        />
                      </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
  
            {CartList.length != 0 ? (
              <PaymentFooter
                buttonPressHandler={buttonPressHandler}
                buttonTitle="Pay"
                price={{price: CartPrice, currency: '$'}}
              />
            ) : (
              <></>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default CartScreen;
  
  const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: COLORS.primaryBlackHex,
    },
    scrollViewFlex: {
      flexGrow: 1,
    },
    scrollViewInnerView: {
      flex: 1,
      justifyContent: 'space-between',
    },
    itemContainer: {
      flex: 1,
    },
    listItemContainer: {
      paddingHorizontal: SPACING.space_20,
      gap: SPACING.space_20,
    },
  });
  
  