import { configureStore } from '@reduxjs/toolkit';
import { flitersReducer } from './filters/slice';
import { favouritesReducer } from './favourites/slice';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { carsReducer } from './cars/slice';

const favouritesPersistConfig = { key: 'favourites', storage };

const favouritesPersistReducer = persistReducer(
  favouritesPersistConfig,
  favouritesReducer
);

export const store = configureStore({
  reducer: {
    filters: flitersReducer,
    favourites: favouritesPersistReducer,
    cars: carsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
