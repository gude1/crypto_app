import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { BookQueryResponse } from "../../types";

export type BookListState = {
  mySet: { [key: string]: string[] };
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
      let data_arr = action.payload[1];

      //handle mainpulating and updating state
      const handleData = (data: Number[] = []) => {
        let price = data[0] as number;
        let count = data[1] as number;
        let amount = data[2] as number;
        if (count <= 0) {
          delete state.mySet[price];
        } else {
          state.mySet[price] = [price.toString(), amount.toString()];
        }
      };
      if (Array.isArray(data_arr) && Array.isArray(data_arr[0])) {
        // extra book list
        let booklist = data_arr as Array<Number[]>;

        //iterate over booklist
        booklist.forEach((arr, index) => {
          handleData(arr);
        });
      } else if (Array.isArray(data_arr) && !Array.isArray(data_arr[0])) {
        let new_data = data_arr as Number[];
        handleData(new_data);
      }
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
