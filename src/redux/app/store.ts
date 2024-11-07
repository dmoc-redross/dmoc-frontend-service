import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import loadingSlice from "../features/reducers/loading.slice";
import { persistReducer } from "redux-persist";
import { UserSlice } from "../features/reducers/user.slice";
import { useDispatch } from "react-redux";

const persistConfig = {
  key: "root",
  version: 1,
  storage: storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  loading: loadingSlice,
  user: UserSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
