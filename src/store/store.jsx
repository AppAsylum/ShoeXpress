import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {produce} from 'immer';
import ShoeData from '../Constants/ShoeData';

const byId = Object.fromEntries(ShoeData.map(s => [s.id, s]));
const sizeOrder = (a, b) => parseFloat(a.size) - parseFloat(b.size);

// Re-attach catalog fields (images, names) to a saved item. Images are
// require() ids that can change between builds, so they are never trusted
// from storage.
const withCatalog = item => {
  const s = byId[item.id];
  return s
    ? {...item, name: s.name, model: s.model, imagelink_square: s.imagelink_square}
    : null;
};

export const useStore = create(
  persist(
    (set, get) => ({
      ShoeList: ShoeData,
      CartPrice: '0.00',
      FavoritesLists: [],
      CartList: [],
      OrderHistoryLists: [],
      hasOnboarded: false,

      completeOnboarding: () => set({hasOnboarded: true}),

      addToCart: cartItem =>
        set(
          produce(state => {
            const existing = state.CartList.find(i => i.id === cartItem.id);
            if (!existing) {
              state.CartList.push(cartItem);
              return;
            }
            const incoming = cartItem.prices[0];
            const line = existing.prices.find(p => p.size === incoming.size);
            if (line) {
              line.quantity++;
            } else {
              existing.prices.push(incoming);
              existing.prices.sort(sizeOrder);
            }
          }),
        ),

      calculateCartPrice: () =>
        set(
          produce(state => {
            let total = 0;
            for (const item of state.CartList) {
              const itemTotal = item.prices.reduce(
                (sum, p) => sum + parseFloat(p.price) * p.quantity,
                0,
              );
              item.ItemPrice = itemTotal.toFixed(2);
              total += itemTotal;
            }
            state.CartPrice = total.toFixed(2);
          }),
        ),

      addToFavoriteList: (type, id) =>
        set(
          produce(state => {
            const shoe = state.ShoeList.find(s => s.id === id);
            if (!shoe || shoe.favourite) return;
            shoe.favourite = true;
            state.FavoritesLists.unshift(shoe);
          }),
        ),

      deleteFromFavoriteList: (type, id) =>
        set(
          produce(state => {
            const shoe = state.ShoeList.find(s => s.id === id);
            if (shoe) shoe.favourite = false;
            state.FavoritesLists = state.FavoritesLists.filter(f => f.id !== id);
          }),
        ),

      incrementCartItemQuantity: (id, size) =>
        set(
          produce(state => {
            const line = state.CartList.find(i => i.id === id)?.prices.find(p => p.size === size);
            if (line) line.quantity++;
          }),
        ),

      decrementCartItemQuantity: (id, size) =>
        set(
          produce(state => {
            const i = state.CartList.findIndex(c => c.id === id);
            if (i === -1) return;
            const item = state.CartList[i];
            const j = item.prices.findIndex(p => p.size === size);
            if (j === -1) return;
            item.prices[j].quantity--;
            if (item.prices[j].quantity <= 0) item.prices.splice(j, 1);
            if (item.prices.length === 0) state.CartList.splice(i, 1);
          }),
        ),

      addToOrderHistoryListFromCart: () =>
        set(
          produce(state => {
            const total = state.CartList.reduce(
              (sum, item) => sum + parseFloat(item.ItemPrice || 0),
              0,
            );
            state.OrderHistoryLists.unshift({
              orderId: `SX-${Date.now().toString(36).toUpperCase()}`,
              orderDate: new Date().toISOString(),
              CartList: state.CartList,
              CartListPrice: total.toFixed(2),
            });
            state.CartList = [];
            state.CartPrice = '0.00';
          }),
        ),
    }),
    {
      name: 'shoe-app',
      version: 2,
      storage: createJSONStorage(() => AsyncStorage),
      // Only user data is saved; the catalog always comes from ShoeData.
      partialize: state => ({
        CartList: state.CartList,
        CartPrice: state.CartPrice,
        OrderHistoryLists: state.OrderHistoryLists,
        favoriteIds: state.FavoritesLists.map(f => f.id),
        hasOnboarded: state.hasOnboarded,
      }),
      // Data saved by older versions used different product ids, so start fresh.
      migrate: () => ({}),
      merge: (saved, current) => {
        const s = saved || {};
        const favIds = new Set(s.favoriteIds || []);
        const ShoeList = current.ShoeList.map(shoe => ({...shoe, favourite: favIds.has(shoe.id)}));
        return {
          ...current,
          hasOnboarded: !!s.hasOnboarded,
          CartPrice: s.CartPrice || '0.00',
          ShoeList,
          FavoritesLists: (s.favoriteIds || []).map(id => ShoeList.find(x => x.id === id)).filter(Boolean),
          CartList: (s.CartList || []).map(withCatalog).filter(Boolean),
          OrderHistoryLists: (s.OrderHistoryLists || []).map(order => ({
            ...order,
            CartList: order.CartList.map(withCatalog).filter(Boolean),
          })),
        };
      },
    },
  ),
);
