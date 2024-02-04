import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { BookQueryResponse } from "../../types";

export type BookListState = {
  mySet: { [key: string]: [number, number, number] };
};

const initialState: BookListState = {
  mySet: {},
};

const BookListSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (
      state: BookListState,
      action: PayloadAction<BookQueryResponse>
    ) => {
      let firstpart = action.payload[0];
      let secondpart_arr = action.payload[1];
      state.mySet[firstpart] = secondpart_arr;
    },
    removeBook: (state, action) => {
      const keyToRemove = action.payload;
      delete state.mySet[keyToRemove];
    },
    clearAllBook: (state) => {
      state.mySet = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { addBook, clearAllBook, removeBook } = BookListSlice.actions;

export default BookListSlice.reducer;
