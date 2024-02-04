import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export type UserState = {
  loggedIn?: boolean;
  accessToken?: string | null;
  refreshToken?: string | null;
  cifid?: string | null;
  deviceId?: string | null;
  email?: string | null;
  fullName?: string | null;
  username?: string | null;
};

const initialState: UserState = {
  loggedIn: false,
  accessToken: '',
  cifid: '',
  deviceId: '',
  username: '',
  email: '',
  fullName: '',
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<UserState>) => {
      return {...state, ...action.payload};
    },
    logUserOut: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setUser, logUserOut} = UserSlice.actions;

export default UserSlice.reducer;
