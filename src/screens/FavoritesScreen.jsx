import React from 'react';
import {FlatList, StyleSheet, useWindowDimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {StatusBar} from 'expo-status-bar';
import {useStore} from '../store/store';
import ScreenHeader from '../components/ui/ScreenHeader';
import EmptyState from '../components/ui/EmptyState';
import ShoeCard from '../components/ShoeCard';
import {addShoeToCart, toggleFavourite} from '../utils/cartActions';
import {COLORS, SPACING} from '../Constants/theme';

const GAP = SPACING.sm;

const FavoritesScreen = ({navigation}) => {
  const favorites = useStore(s => s.FavoritesLists);
  const tabBarHeight = useBottomTabBarHeight();
  const {width} = useWindowDimensions();
  const columns = width >= 700 ? 3 : 2;
  const cardWidth = (width - SPACING.lg * 2 - GAP * (columns - 1)) / columns;

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <StatusBar style="light" />
      <ScreenHeader
        title="Favorites"
        subtitle={favorites.length ? `${favorites.length} saved ${favorites.length === 1 ? 'pair' : 'pairs'}` : undefined}
      />
      {favorites.length === 0 ? (
        <EmptyState
          icon="heart-outline"
          title="No favorites yet"
          subtitle="Tap the heart on any shoe to save it here for later."
          actionTitle="Explore shoes"
          onAction={() => navigation.navigate('Home')}
        />
      ) : (
        <FlatList
          key={columns}
          data={favorites}
          numColumns={columns}
          keyExtractor={s => s.id}
          columnWrapperStyle={{gap: GAP}}
          contentContainerStyle={{paddingHorizontal: SPACING.lg, paddingBottom: tabBarHeight + SPACING.xl, gap: GAP}}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <ShoeCard
              shoe={item}
              width={cardWidth}
              onPress={() => navigation.push('Details', {index: item.index, id: item.id, type: item.type})}
              onAdd={() => addShoeToCart(item)}
              onToggleFavourite={() => toggleFavourite(item)}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: COLORS.bg},
});
