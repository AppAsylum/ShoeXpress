import { StyleSheet, Text, View , SafeAreaView, StatusBar, ScrollView, TouchableOpacity} from 'react-native'
import React from 'react'
import { useStore } from '../store/store'
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs'
import { COLORS,SPACING, BORDERRADIUS, FONTSIZE, FONTFAMILY} from '../Constants/theme';
import HeaderBar from '../components/ HeaderBar ';
import EmptyListAnimation from '../components/EmptyListAnimation';
import FavoritesItemCard from '../components/FavoritesItemCard';

const FavoritesScreen = ({navigation}) => {
  const FavoritesLists = useStore((state) => state.FavoritesLists);
  const tabBarHeight = useBottomTabBarHeight();
  const addToFavoriteList = useStore(state => state.addToFavoriteList);
  const deleteFromFavoriteList = useStore(
    state => state.deleteFromFavoriteList,
  );
  const ToggleFavorite = (favourite, type, id) => {
    favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
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
            <HeaderBar title="Favorites" />

            {FavoritesLists.length == 0 ? (
              <EmptyListAnimation title={'No Favorites'} />
            ) : (
              <View style={styles.listItemContainer}>
                {FavoritesLists.map((data) => (
                  <TouchableOpacity
                  onPress={() => {
                    navigation.push('Details', {
                      index: data.index,
                      id: data.id,
                      type: data.type,
                    });
                  }}
                    key={data.id}>
                      <FavoritesItemCard 
                      id={data.id}
                      imagelink_portrait={data.imagelink_portrait}
                      name={data.name}
                      type={data.type}
                      average_rating={data.average_rating}
                      ratings_count={data.ratings_count}
                      description={data.description}
                      favourite={data.favourite}
                      ToggleFavouriteItem={ToggleFavorite}
                      />
                    </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default FavoritesScreen

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
})
