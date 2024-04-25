import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import movieReducer from "./movieSlice";
import watchListReducer from "./watchListSlice";
import ratingReducer from "./ratingSlice";
import queryReducer from "./querySlice";
import popupReducer from "./PopupSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["watchList", "rating"], 
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    movie: movieReducer,
    watchList: watchListReducer,
    rating: ratingReducer,
    query: queryReducer,
    popup: popupReducer,
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