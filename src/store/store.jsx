import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import ShoeData from '../Constants/ShoeData';
import {current, produce} from 'immer';

export const useStore = create(
  // These are the state management values
  persist(
    (set, get) => ({
      ShoeList: ShoeData,
      CartPrice: 0,
      FavoritesLists: [],
      CartList: [],
      OrderHistoryLists: [],
      // And These are the controllers(addToCart,calculateCartPrice, addToFavoriteList,deleteFromFavoriteList)
      addToCart: cartItem =>
        set(
          produce(state => {
            let found = false;
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id == cartItem.id) {
                found = true;
                let size = false;
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (
                    state.CartList[i].prices[j].size == cartItem.prices[0].size
                  ) {
                    size = true;
                    state.CartList[i].prices[j].quantity++;
                    break;
                  }
                }
                if (size == false) {
                  state.CartList[i].prices.push(cartItem.prices[0]);
                }
                state.CartList[i].prices.sort((a, b) => {
                  if (a.size > b.size) {
                    return -1;
                  }
                  if (a.size < b.size) {
                    return 1;
                  }
                  return 0;
                });
                break;
              }
            }
            if (found == false) {
              state.CartList.push(cartItem);
            }
          }),
        ),
      calculateCartPrice: () =>
        set(
          produce(state => {
            let totalprice = 0;
            for (let i = 0; i < state.CartList.length; i++) {
              let temprice = 0;
              for (let j = 0; j < state.CartList[i].prices.length; j++) {
                temprice =
                  temprice +
                  parseFloat(state.CartList[i].prices[j].price) *
                    state.CartList[i].prices[j].quantity;
              }
              state.CartList[i].ItemPrice = temprice.toFixed(2).toString();
              totalprice = totalprice + temprice;
            }
            state.CartPrice = totalprice.toFixed(2).toString();
          }),
        ),
        addToFavoriteList: (type, id) =>
        set(
          produce(state => {
            if (type === 'Shoe') {
              for (let i = 0; i < state.ShoeList.length; i++) {
                if (state.ShoeList[i].id === id) {
                  if (state.ShoeList[i].favourite === false) {
                    state.ShoeList[i].favourite = true;
                    state.FavoritesLists.unshift(state.ShoeList[i]);
                  } else {
                    state.ShoeList[i].favourite = false;
                    // Remove the item from the FavoritesLists
                    const indexToRemove = state.FavoritesLists.findIndex(
                      item => item.id === id
                    );
                    if (indexToRemove !== -1) {
                      state.FavoritesLists.splice(indexToRemove, 1);
                    }
                  }
                  break;
                }
              }
            }
          }),
        ),
      deleteFromFavoriteList: (type, id) =>
        set(
          produce(state => {
            if (type == 'Shoe') {
              for (let i = 0; i < state.ShoeList.length; i++) {
                if (state.ShoeList[i].id == id) {
                  if (state.ShoeList[i].favourite == true) {
                    state.ShoeList[i].favourite = false;
                  }
                  break;
                }
              }
            }
            let spliceIndex = -1;
            for (let i = 0; i < state.FavoritesLists.length; i++) {
              if (state.FavoritesLists[i].id == id) {
                spliceIndex = i;
                break;
              }
            }
            state.FavoritesLists.splice(spliceIndex, 1);
          }),
        ),
        incrementCartItemQuantity: (id, size) =>
        set(
          produce(state => {
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id === id) {
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (state.CartList[i].prices[j].size === size) {
                    state.CartList[i].prices[j].quantity++;
                    break;
                  }
                }
                break; // Added break to exit outer loop
              }
            }
          }),
        ),
      
      decrementCartItemQuantity: (id, size) =>
        set(
          produce(state => {
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id === id) {
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (state.CartList[i].prices[j].size === size) {
                    state.CartList[i].prices[j].quantity--;
      
                    if (state.CartList[i].prices[j].quantity === 0) {
                      state.CartList[i].prices.splice(j, 1);
      
                      if (state.CartList[i].prices.length === 0) {
                        state.CartList.splice(i, 1);
                      }
                    }
                    break;
                  }
                }
                break; // Added break to exit outer loop
              }
            }
          }),
        ),
      addToOrderHistoryListFromCart: () =>
        set(
          produce(state => {
            let temp = state.CartList.reduce(
              (accumulator, currentValue) =>
                accumulator + parseFloat(currentValue.ItemPrice),
              0,
            );
            if(state.OrderHistoryLists.length > 0) {
              state.OrderHistoryLists.unshift({
                orderDate: 
                new Date().toDateString() +
                " " +
                new Date().toLocaleTimeString(),
                CartList: state.CartList,
                CartListPrice: temp.toFixed(2).toString(),
              })
            } else{
              state.OrderHistoryLists.push({
                orderDate: 
                new Date().toDateString() +
                " " +
                new Date().toLocaleTimeString(),
                CartList: state.CartList,
                CartListPrice: temp.toFixed(2).toString(),
              })
            }
            state.CartList = [];
          }),
        ),
    }),
    {
      name: 'shoe-app',
      getStorage: createJSONStorage(() => AsyncStorage),
    },
  ),
);




