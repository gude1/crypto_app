import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export type SettingsState = {
  displaymode?: 'dark' | 'light';
};

const initialState: SettingsState = {
  displaymode: 'light',
};

const SettingsSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSettings: (
      state: SettingsState,
      action: PayloadAction<SettingsState>,
    ) => {
      return {...state, ...action.payload};
    },
  },
});

// Action creators are generated for each case reducer function
export const {setSettings} = SettingsSlice.actions;

export default SettingsSlice.reducer;
