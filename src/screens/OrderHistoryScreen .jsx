import React, {useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useStore} from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {
  COLORS,
  SPACING,
  BORDERRADIUS,
  FONTFAMILY,
  FONTSIZE,
} from '../Constants/theme';
import HeaderBar from '../components/ HeaderBar ';
import PopUpAnimation from '../components/PopUpAnimation';
import OrderHistoryCard from '../components/OrderHistoryCard';
import EmptyListAnimation from '../components/EmptyListAnimation';

const OrderHistoryScreen = ({navigation}) => {
  const OrderHistoryLists = useStore(state => state.OrderHistoryLists);
  const tabBarHeight = useBottomTabBarHeight();
  const [showAnimation, setShowAnimation] = useState(false);

  const navigationHandler = ({index, id, type}) => {
    navigation.push("Details", {
      index,
      id,
      type
    })
  };



  return (
    <SafeAreaView style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      {showAnimation ? (
        <PopUpAnimation
          style={styles.lottieAnimation}
          source={require('../lottie/successful.json')}
        />
      ) : null}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
        <View
          style={[styles.scrollViewInnerView, {marginBottom: tabBarHeight}]}>
          <View style={styles.itemContainer}>
            <HeaderBar title="Order History" />

            {OrderHistoryLists.length === 0 ? (
              <EmptyListAnimation title={'No Order History'} />
            ) : (
              <View style={styles.listItemContainer}>
                {OrderHistoryLists.map((data, index) => (
                  <TouchableOpacity
                    key={index.toString()}
                    onPress={() => navigationHandler(data)}>
                    <OrderHistoryCard
                      navigationHandler={navigationHandler}
                      CartList={data.CartList}
                      CartListPrice={data.CartListPrice}
                      OrderDate={data.orderDate}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {OrderHistoryLists.length > 0 ? (
            <TouchableOpacity
              style={styles.downloadButton}
              onPress={() => {}}>
              <Text style={styles.buttonText}>Download</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderHistoryScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  lottieAnimation: {
    height: 250,
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
    gap: SPACING.space_30,
  },
  downloadButton: {
    margin: SPACING.space_20,
    backgroundColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_36 * 2,
    borderRadius: BORDERRADIUS.radius_20,
  },
  buttonText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
});

