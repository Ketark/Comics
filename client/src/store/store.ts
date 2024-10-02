import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { comicAPI } from "../services/comicServices";

const rootReducer = combineReducers({
  [comicAPI.reducerPath]: comicAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(comicAPI.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
