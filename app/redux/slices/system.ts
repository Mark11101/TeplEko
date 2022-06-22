import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { System as SystemState } from '../types/system';

const initialState: SystemState = {
  appVersion: '',
  identifier: '',
  isAtHome: false,
  isOnPause: false,
  isNotificationsOnWhenOffline: false,
  isNotificationsOnWhenLowTemperature: false,
};

const SystemSlice = createSlice({
  name: 'system',
  initialState,

  reducers: {

    toggleIsAtHome: (state, action: PayloadAction<boolean>) => {
      state.isAtHome = action.payload;
    },

    toggleIsOnPause: (state) => {
      state.isOnPause = !state.isOnPause;
      state.isAtHome  = false;
    },
  }
});

export const {
  toggleIsAtHome,
  toggleIsOnPause,
} = SystemSlice.actions

export default SystemSlice.reducer
