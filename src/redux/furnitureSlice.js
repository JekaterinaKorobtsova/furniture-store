import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { calcTotalPrice } from "../utils/calcTotalPrice";


const API_URL = 'https://64633f3a7a9eead6fae1062c.mockapi.io/item';

export const fetchFurniture = createAsyncThunk(
  "furniture/fetchFurnitureStatus",
  async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);



const initialState = {
    items: [],
    status: 'succeeded',
    categoryId: 0,
    searchValue: "",
    cart: {
      items: [],
      totalPrice: 0,
    },
}


const furnitureSlice = createSlice({
    name: 'furniture',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        },
        setCategoryId(state, action) {
          state.categoryId = action.payload;
        },
        setSearchValue(state, action) {
          state.searchValue = action.payload;
        },
        addItem: (state, action) => {
          const { id } = action.payload;
          const item = state.items.find((item) => item.id === id);
          if (item) {
            const cartItem = state.cart.items.find((item) => item.id === id);
            if (cartItem) {
              cartItem.count++;
            } else {
              state.cart.items.push({ ...item, count: 1 });
            }
            state.cart.totalPrice = calcTotalPrice(state.cart.items);
          }
        },
        minusItem: (state, action) => {
          const itemId = action.payload;
          const cartItem = state.cart.items.find((item) => item.id === itemId);
          if (cartItem) {
            if (cartItem.count > 1) {
              cartItem.count--;
            } else {
              state.cart.items = state.cart.items.filter((item) => item.id !== itemId);
            }
            state.cart.totalPrice = calcTotalPrice(state.cart.items);
          }
        },
        
        
        removeItem(state, action) {
          const itemId = action.payload;
          state.cart.items = state.cart.items.filter(item => item.id !== itemId);
          state.cart.totalPrice = calcTotalPrice(state.cart.items);
        },
        clearItems(state) {
          state.cart.items = [];
          state.cart.totalPrice = 0;
        },
    },


    extraReducers: (builder) => {
      builder
        .addCase(fetchFurniture.pending, (state, action) => {
          state.status = 'loading';
        })
        .addCase(fetchFurniture.fulfilled, (state, action) => {
          state.items = action.payload;
          state.status = 'succeeded';
        })
        .addCase(fetchFurniture.rejected, (state, action) => {
          state.status = 'failed';
        });
    }
});

//selector
export const selectCartItemById = (id) => (state) => state.furniture.items.find((item) => item.id === id);
export const selectCart = (state) => state.furniture.cart;
export const selectCartItemCount = (state) => {
  return state.furniture.cart.items.length;
};
export const selectStatus = (state) => state.furniture.status;
 


export const {setItems, setCategoryId, setSearchValue, addItem, removeItem, clearItems, minusItem} = furnitureSlice.actions;

export default furnitureSlice.reducer;


