import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import movieReducer from "./movieSlice";
import watchListReducer from "./watchListSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["watchList"], 
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    movie: movieReducer,
    watchList: watchListReducer,
  })
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };