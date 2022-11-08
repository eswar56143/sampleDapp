import { applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import { configureStore } from '@reduxjs/toolkit';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userPersistReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [sagaMiddleware];

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware,
})

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
