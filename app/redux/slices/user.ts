import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { 
  UserState, 
  SetTokenActionType,
  SetRefreshTokenActionType,
} from '../types/user';

const initialState: UserState = {
  token: '',
  refreshToken: '',
};

const SystemSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {

    setToken: (state, action: PayloadAction<SetTokenActionType>) => {
      state.token = action.payload.token;
    },

    setRefreshToken: (state, action: PayloadAction<SetRefreshTokenActionType>) => {
      state.refreshToken = action.payload.refreshToken;
    },
  }
});

export const {
  setToken,
  setRefreshToken,
} = SystemSlice.actions

export default SystemSlice.reducer
