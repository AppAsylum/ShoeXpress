import * as Haptics from 'expo-haptics';
import Toast from 'react-native-toast-message';
import {useStore} from '../store/store';

// Default size used when adding straight from a product card.
export const DEFAULT_SIZE = '9';

// Adds one pair to the cart, recalculates the total and gives feedback.
export const addShoeToCart = (shoe, size = DEFAULT_SIZE) => {
  const {addToCart, calculateCartPrice} = useStore.getState();
  const price = shoe.prices.find(p => p.size === size) || shoe.prices[0];
  addToCart({
    id: shoe.id,
    index: shoe.index,
    name: shoe.name,
    model: shoe.model,
    imagelink_square: shoe.imagelink_square,
    type: shoe.type,
    prices: [{...price, quantity: 1}],
  });
  calculateCartPrice();
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
  Toast.show({
    type: 'cart',
    text1: 'Added to cart',
    text2: `${shoe.model} · US ${price.size}`,
    position: 'top',
    visibilityTime: 1800,
  });
};

export const toggleFavourite = shoe => {
  const {addToFavoriteList, deleteFromFavoriteList} = useStore.getState();
  Haptics.selectionAsync().catch(() => {});
  if (shoe.favourite) deleteFromFavoriteList(shoe.type, shoe.id);
  else addToFavoriteList(shoe.type, shoe.id);
};
