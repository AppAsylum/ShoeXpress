jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

const {useStore} = require('../src/store/store');
const ShoeData = require('../src/Constants/ShoeData').default;

const shoe = ShoeData[0];
const line = size => ({
  id: shoe.id,
  index: shoe.index,
  name: shoe.name,
  model: shoe.model,
  imagelink_square: shoe.imagelink_square,
  type: shoe.type,
  prices: [{...shoe.prices.find(p => p.size === size), quantity: 1}],
});

beforeEach(() => {
  useStore.setState({CartList: [], CartPrice: '0.00', FavoritesLists: [], OrderHistoryLists: [], ShoeList: ShoeData});
});

test('adding the same shoe merges sizes and quantities, sorted by size', () => {
  const s = useStore.getState();
  s.addToCart(line('10'));
  s.addToCart(line('8'));
  s.addToCart(line('10'));
  s.calculateCartPrice();
  const {CartList, CartPrice} = useStore.getState();
  expect(CartList).toHaveLength(1);
  expect(CartList[0].prices.map(p => [p.size, p.quantity])).toEqual([['8', 1], ['10', 2]]);
  expect(CartPrice).toBe((parseFloat(shoe.prices[0].price) * 3).toFixed(2));
});

test('decrementing the last pair removes the item', () => {
  const s = useStore.getState();
  s.addToCart(line('9'));
  s.decrementCartItemQuantity(shoe.id, '9');
  expect(useStore.getState().CartList).toHaveLength(0);
});

test('favourites toggle on and off', () => {
  useStore.getState().addToFavoriteList('Shoe', shoe.id);
  expect(useStore.getState().FavoritesLists.map(f => f.id)).toEqual([shoe.id]);
  expect(useStore.getState().ShoeList[0].favourite).toBe(true);
  useStore.getState().deleteFromFavoriteList('Shoe', shoe.id);
  expect(useStore.getState().FavoritesLists).toHaveLength(0);
  expect(useStore.getState().ShoeList[0].favourite).toBe(false);
});

test('checkout moves the cart into order history', () => {
  const s = useStore.getState();
  s.addToCart(line('9'));
  s.calculateCartPrice();
  s.addToOrderHistoryListFromCart();
  const {CartList, OrderHistoryLists, CartPrice} = useStore.getState();
  expect(CartList).toHaveLength(0);
  expect(CartPrice).toBe('0.00');
  expect(OrderHistoryLists).toHaveLength(1);
  expect(OrderHistoryLists[0].CartListPrice).toBe(shoe.prices[0].price + '.00');
});

test('saved data restores favourites and refreshes images from the catalog', () => {
  const {merge} = useStore.persist.getOptions();
  const merged = merge(
    {favoriteIds: [shoe.id], CartList: [{...line('9'), imagelink_square: 'stale'}], OrderHistoryLists: [], hasOnboarded: true},
    useStore.getState(),
  );
  expect(merged.hasOnboarded).toBe(true);
  expect(merged.FavoritesLists[0].id).toBe(shoe.id);
  expect(merged.ShoeList[0].favourite).toBe(true);
  expect(merged.CartList[0].imagelink_square).toBe(shoe.imagelink_square);
});

test('data from the old app version is discarded', () => {
  expect(useStore.persist.getOptions().migrate({ShoeList: [], CartList: [{id: '1'}]}, 0)).toEqual({});
});
