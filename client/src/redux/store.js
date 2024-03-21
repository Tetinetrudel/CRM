import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './users/userSlice'
import clientReducer from './clients/clientSlice'
import categoryReducer from './categories/categorySlice'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  user: userReducer,
  clients: clientReducer,
  categories: categoryReducer
})

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export const persistor = persistStore(store)