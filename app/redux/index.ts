import { 
  Middleware, 
  configureStore,
  combineReducers, 
  isRejectedWithValue,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import UserReducer from './slices/user';
import RoomsReducer from './slices/rooms';
import SystemReducer from './slices/system';

import authApi from "./requests/auth";
import roomsApi from "./requests/rooms";

const rootReducer = combineReducers({
  user: UserReducer,
  rooms: RoomsReducer,
  system: SystemReducer,
  [authApi.reducerPath]: authApi.reducer,
  [roomsApi.reducerPath]: roomsApi.reducer,
});

const rtkQueryErrorLogger: Middleware =
  () => (next) => (action) => {

    if (isRejectedWithValue(action)) {

      console.log(action, ' middleware ');
      console.log(action.error.message, ' error message ');
      console.warn(action.payload.status, ' Current state ');
      console.warn(action.payload.data?.message, ' error message ');
      console.warn(' Middleware intercepted ');
    }

    return next(action);
  };

const middlewareHandler = (getDefaultMiddleware) => {
  
  const middlewareList = [
    rtkQueryErrorLogger, 
    ...getDefaultMiddleware().concat(
      authApi.middleware,
      roomsApi.middleware,
    )
  ];

  return middlewareList;
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    middlewareHandler(getDefaultMiddleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export default store
