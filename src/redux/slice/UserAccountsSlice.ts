import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {FetchUserAccountsResponse} from '../types/account';
import {Console} from '../../utils';

export type AccountState = FetchUserAccountsResponse[];

const initialState: AccountState = [];

const UserAccountsSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAccounts: (
      state: AccountState,
      action: PayloadAction<AccountState>,
    ) => {
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setUserAccounts} = UserAccountsSlice.actions;

export default UserAccountsSlice.reducer;
