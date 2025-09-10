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
import { reservationsReducer } from './reservations/slice';

const favouritesPersistConfig = {
  key: 'favourites',
  storage,
  whitelist: ['ids'],
};
const reservationPersistConfig = { key: 'reservations', storage };

const favouritesPersistReducer = persistReducer(
  favouritesPersistConfig,
  favouritesReducer
);
const reservationPersistReducer = persistReducer(
  reservationPersistConfig,
  reservationsReducer
);

export const store = configureStore({
  reducer: {
    filters: flitersReducer,
    favourites: favouritesPersistReducer,
    cars: carsReducer,
    reservations: reservationPersistReducer,
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
